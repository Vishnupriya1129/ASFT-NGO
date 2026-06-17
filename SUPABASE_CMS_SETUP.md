# 🚀 Supabase CMS Setup Guide

## Quick Start

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project name: `seed-and-serve-cms`
   - Database password: (save this securely)
   - Region: Select closest to your location (India: Singapore)
5. Click "Create new project" (wait ~2 minutes for setup)

### Step 2: Get Your Credentials

1. Go to Project Settings → API
2. Copy and save:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon (public)** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

Example `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIs..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIs..."
SUPABASE_STORAGE_BUCKET="content-images"
```

### Step 3: Create Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Click "Create a new bucket"
3. Name: `content-images`
4. Make it **public**
5. Click "Create bucket"

### Step 4: Set Up Database Tables

Run this SQL in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Pages Table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content JSONB DEFAULT '{}',
  meta_description TEXT,
  featured_image TEXT,
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID,
  updated_by UUID
);

-- Programs Table
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  icon TEXT,
  images TEXT[] DEFAULT '{}',
  "order" INT DEFAULT 0,
  status TEXT DEFAULT 'PUBLISHED' CHECK (status IN ('DRAFT', 'PUBLISHED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns Table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content JSONB DEFAULT '{}',
  goal_amount INT DEFAULT 0,
  raised_amount INT DEFAULT 0,
  featured_image TEXT,
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery Table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings Table
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB DEFAULT '{}',
  description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_status ON pages(status);
CREATE INDEX idx_programs_slug ON programs(slug);
CREATE INDEX idx_campaigns_slug ON campaigns(slug);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_settings_key ON settings(key);

-- Enable Row Level Security
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (public read, authenticated write)
CREATE POLICY "Pages are publicly readable" ON pages FOR SELECT USING (true);
CREATE POLICY "Programs are publicly readable" ON programs FOR SELECT USING (true);
CREATE POLICY "Campaigns are publicly readable" ON campaigns FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Gallery is publicly readable" ON gallery FOR SELECT USING (true);
CREATE POLICY "Settings are publicly readable" ON settings FOR SELECT USING (true);
```

### Step 5: Install Dependencies

Run in your project directory:
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs react-hook-form react-quill react-dropzone framer-motion
```

### Step 6: Configure Environment Variables

Update your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_STORAGE_BUCKET=content-images
```

### Step 7: Access Admin Dashboard

1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3000/admin/cms`
3. Log in with your admin credentials
4. Start managing content!

---

## Admin Dashboard Features

### Content Management
- **Pages**: Edit home, about, programs pages
- **Programs**: Manage all program information
- **Campaigns**: Create and manage fundraising campaigns
- **Gallery**: Upload and organize photos
- **Settings**: Configure site-wide settings

### Image Management
- Drag-and-drop upload
- Image optimization
- Automatic thumbnail generation
- Easy management and deletion

### Publishing Workflow
- Draft/Publish status
- Schedule posts (upcoming)
- Preview before publishing
- Revision history (upcoming)

### User Management
- Admin account
- Editor account
- Viewer account
- Activity logs

---

## File Upload Usage

### From Admin Dashboard
```javascript
// Uses drag-and-drop or click to upload
// Automatically optimizes and stores
// Shows preview immediately
```

### From API
```bash
curl -X POST http://localhost:3000/api/admin/cms-upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@image.jpg" \
  -F "folder=campaigns"
```

Response:
```json
{
  "success": true,
  "file": {
    "name": "image.jpg",
    "size": 52345,
    "type": "image/jpeg",
    "url": "https://xxx.supabase.co/storage/v1/object/public/content-images/campaigns/xxx.jpg",
    "path": "campaigns/xxx.jpg"
  }
}
```

---

## Troubleshooting

### 1. "Missing Supabase environment variables"
- Check `.env.local` has all 3 variables
- Restart dev server after changing `.env`
- Make sure variables are not quoted

### 2. Upload fails with "Unauthorized"
- Check user is logged in
- Verify user role is ADMIN or EDITOR
- Check NextAuth session is working

### 3. Images not showing
- Verify bucket is PUBLIC
- Check image URL is correct
- Test URL in browser

### 4. Database connection fails
- Verify Project URL is correct
- Check credentials haven't expired
- Verify network access from your IP

### 5. Storage bucket not found
- Confirm bucket exists in Supabase dashboard
- Check bucket name matches `.env`
- Verify bucket visibility is PUBLIC

---

## Best Practices

1. **Image Optimization**
   - Use JPEG for photos (smaller file size)
   - Use PNG for graphics (transparency)
   - Optimize before uploading (recommended: 1200x800 max)
   - Aim for <500KB per image

2. **Content Management**
   - Always save as Draft first
   - Preview before Publishing
   - Use meaningful filenames
   - Organize in logical folders

3. **Security**
   - Never share your service role key
   - Use strong passwords
   - Enable 2FA on Supabase
   - Regularly audit user access

4. **Performance**
   - Delete unused images
   - Use responsive image sizes
   - Lazy load where possible
   - Monitor storage usage

---

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Image Optimization**: https://nextjs.org/docs/basic-features/image-optimization
- **Authentication**: https://supabase.com/docs/guides/auth

---

## Next Steps

1. Set up Supabase project
2. Add credentials to `.env.local`
3. Run `npm install` for new dependencies
4. Start dev server: `npm run dev`
5. Visit `/admin/cms` and start managing content!

For questions or issues, check Supabase documentation or contact support.
