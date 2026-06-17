import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

const uploadSchema = z.object({
  filename:    z.string().min(1),
  contentType: z.string().regex(/^image\/(jpeg|png|webp|gif)$/),
});

/**
 * POST /api/admin/uploads
 * Handles file uploads to S3 or Supabase Storage
 */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Try to get FormData if it's a multipart upload
    let formDataUpload = false;
    let file: File | null = null;
    let folder = 'uploads';

    if (req.headers.get('content-type')?.includes('multipart/form-data')) {
      formDataUpload = true;
      const formData = await req.formData();
      file = formData.get('file') as File;
      folder = (formData.get('folder') as string) || 'uploads';

      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
      }

      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        return NextResponse.json({ error: 'File too large' }, { status: 400 });
      }
    } else {
      // Legacy JSON upload
      const body = await req.json();
      const data = uploadSchema.parse(body);
      
      // Check if Supabase is configured
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_STORAGE_BUCKET}/uploads/${Date.now()}-${data.filename}`;
        return NextResponse.json({
          uploadUrl: '',
          publicUrl,
          key: `uploads/${Date.now()}-${data.filename}`,
          contentType: data.contentType,
        });
      }

      // Fall back to S3
      const key  = `uploads/${Date.now()}-${data.filename.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
      const requiredConfig = [
        'S3_ENDPOINT',
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_S3_BUCKET',
      ];
      const missingConfig = requiredConfig.filter((name) => !process.env[name]);

      if (missingConfig.length > 0) {
        return NextResponse.json(
          { error: `Upload storage is not configured: ${missingConfig.join(', ')}` },
          { status: 503 }
        );
      }

      const uploadEndpoint = process.env.S3_ENDPOINT?.replace(/\/+$/, '');
      const publicUrl = `${uploadEndpoint}/${key}`;

      return NextResponse.json({
        uploadUrl: '',
        publicUrl,
        key,
        contentType: data.contentType,
      });
    }

    // Handle Supabase upload
    if (formDataUpload && file && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const timestamp = Date.now();
      const filename = `${folder}/${timestamp}-${file.name.replace(/\s+/g, '-')}`;

      const { data, error } = await supabaseAdmin.storage
        .from(process.env.SUPABASE_STORAGE_BUCKET || 'content-images')
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        console.error('Supabase upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
      }

      const { data: { publicUrl } } = supabaseAdmin.storage
        .from(process.env.SUPABASE_STORAGE_BUCKET || 'content-images')
        .getPublicUrl(filename);

      return NextResponse.json({
        success: true,
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          url: publicUrl,
          path: filename,
        },
      }, { status: 201 });
    }

    return NextResponse.json({ error: 'Invalid upload method' }, { status: 400 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
