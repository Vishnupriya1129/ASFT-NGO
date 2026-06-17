# 📋 Supabase CMS Implementation Checklist

## ✅ Files Created & Updated

### New Files
- ✅ `src/lib/supabase.ts` - Supabase client & types
- ✅ `src/lib/useImageUpload.ts` - Image upload hook
- ✅ `.env` (updated) - Supabase variables added
- ✅ `.env.example` (updated) - Supabase variables template
- ✅ `SUPABASE_CMS_SETUP.md` - Complete setup guide

### Modified Files
- ✅ `src/app/api/admin/uploads/route.ts` - Added Supabase support

---

## 🚀 Next Steps for Full CMS

### Phase 1: Dependencies (Run This First)
```bash
npm install @supabase/supabase-js
```

### Phase 2: Set Up Supabase Account
1. Go to https://supabase.com
2. Create new project
3. Get credentials from Settings → API
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_key"
   SUPABASE_SERVICE_ROLE_KEY="your_key"
   SUPABASE_STORAGE_BUCKET="content-images"
   ```

### Phase 3: Create Storage Bucket
1. Go to Supabase Dashboard → Storage
2. Create bucket `content-images`
3. Make it PUBLIC

### Phase 4: Set Up Database
Copy SQL from SUPABASE_CMS_SETUP.md and run in Supabase SQL Editor

### Phase 5: Admin Components (To Be Built)
```
/admin/cms/
├── page.tsx           # CMS Dashboard
├── pages/
│   ├── page.tsx       # Manage pages
│   └── [slug]/
│       └── page.tsx   # Edit page
├── programs/
│   ├── page.tsx       # Manage programs
│   └── [id]/
│       └── page.tsx   # Edit program
├── campaigns/
│   ├── page.tsx       # Manage campaigns
│   └── [id]/
│       └── page.tsx   # Edit campaign
├── gallery/
│   ├── page.tsx       # Manage gallery
│   └── upload/
│       └── page.tsx   # Upload images
└── settings/
    └── page.tsx       # Site settings
```

---

## 📦 Installation Commands

### 1. Install Dependencies
```bash
cd apps/web
npm install @supabase/supabase-js
npm install react-quill           # Rich text editor
npm install react-dropzone        # Drag-drop upload
npm install framer-motion         # Animations
npm install react-hot-toast       # Notifications
```

### 2. Verify Installation
```bash
npm list @supabase/supabase-js
```

---

## 🔧 Configuration

### .env.local Setup
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIs..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIs..."
SUPABASE_STORAGE_BUCKET="content-images"
```

### Environment Variables Checklist
- [ ] NEXT_PUBLIC_SUPABASE_URL set
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY set
- [ ] SUPABASE_SERVICE_ROLE_KEY set
- [ ] SUPABASE_STORAGE_BUCKET set to "content-images"

---

## ✨ Features Implemented So Far

### ✅ Upload API
- Handles image uploads to Supabase Storage
- Validates file type (JPEG, PNG, WebP, GIF)
- Validates file size (max 10MB)
- Returns public URL
- Error handling & logging

### ✅ Image Upload Hook
- Client-side upload function
- File validation
- Error handling
- Progress tracking ready

### ✅ Supabase Client
- Initialized with proper credentials
- Service role key for server-side operations
- Anon key for client-side operations
- Type definitions for CMS entities

### ✅ Authentication Integration
- Uses existing NextAuth setup
- Admin/Editor role checks
- Session validation

---

## 🛠️ Current API Endpoints

### Upload Images
```
POST /api/admin/uploads
Content-Type: multipart/form-data

Parameters:
- file: File (required)
- folder: string (optional, default: "uploads")

Response:
{
  "success": true,
  "file": {
    "name": "image.jpg",
    "size": 12345,
    "type": "image/jpeg",
    "url": "https://xxx.supabase.co/storage/...",
    "path": "uploads/123-image.jpg"
  }
}
```

---

## 🧪 Testing Upload

### With cURL
```bash
curl -X POST http://localhost:3000/api/admin/uploads \
  -F "file=@image.jpg" \
  -F "folder=campaigns"
```

### With JavaScript
```javascript
const formData = new FormData();
formData.append('file', file);
formData.append('folder', 'campaigns');

const response = await fetch('/api/admin/uploads', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
console.log(result.file.url);
```

---

## 📊 Database Schema

### Tables Created (Run SQL)
1. **pages** - Website pages & content
2. **programs** - Program information
3. **campaigns** - Fundraising campaigns
4. **gallery** - Photo gallery
5. **settings** - Site configuration

### Indexes for Performance
- pages.slug
- programs.slug
- campaigns.slug
- campaigns.status
- gallery.category

### Row Level Security (RLS)
- Public read access
- Authenticated edit access
- Service role bypass

---

## 🔐 Security Checklist

- [ ] Supabase credentials in .env (not committed)
- [ ] Storage bucket is PUBLIC for reads
- [ ] RLS policies configured
- [ ] API keys rotated annually
- [ ] Admin accounts use strong passwords
- [ ] 2FA enabled on Supabase

---

## 📝 Admin Dashboard To-Do

### Dashboard Main Page
```typescript
// /admin/cms/page.tsx
- Show quick stats
- Recent uploads
- Quick links to all sections
- User info
```

### Pages Management
```typescript
// /admin/cms/pages/page.tsx
- List all pages
- Create new page
- Edit/delete pages
- Preview functionality
```

### Programs Management
```typescript
// /admin/cms/programs/page.tsx
- Drag-and-drop to reorder
- Edit program details
- Upload program images
- Publish/draft toggle
```

### Campaigns Management
```typescript
// /admin/cms/campaigns/page.tsx
- Create campaigns
- Edit campaign details
- Upload campaign images
- Track fundraising progress
- Publish workflow
```

### Gallery Manager
```typescript
// /admin/cms/gallery/page.tsx
- Drag-and-drop upload
- Image gallery view
- Category management
- Bulk upload
- Image optimization
```

### Settings
```typescript
// /admin/cms/settings/page.tsx
- Site name/logo
- Color scheme
- Meta settings
- Email configuration
```

---

## 🚢 Deployment Checklist

- [ ] Supabase project created
- [ ] Database tables created
- [ ] Storage bucket configured
- [ ] Environment variables set
- [ ] RLS policies applied
- [ ] Admin user created
- [ ] Admin dashboard built
- [ ] Testing completed
- [ ] Go live!

---

## 📚 Quick Reference

### File Locations
- **Supabase Client**: `src/lib/supabase.ts`
- **Upload Hook**: `src/lib/useImageUpload.ts`
- **Upload API**: `src/app/api/admin/uploads/route.ts`
- **Setup Guide**: `SUPABASE_CMS_SETUP.md`

### Important URLs
- **Supabase**: https://supabase.com
- **Documentation**: https://supabase.com/docs
- **Admin Dashboard**: http://localhost:3000/admin

### Key Commands
```bash
# Development
npm run dev

# Build
npm run build

# Test upload
curl -X POST http://localhost:3000/api/admin/uploads -F "file=@image.jpg"
```

---

## ❓ Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` has all variables
- Restart dev server
- Verify no extra quotes in values

### Upload returns 401 Unauthorized
- Ensure user is logged in
- Verify user role is ADMIN or EDITOR
- Check NextAuth session

### Images not displaying
- Verify bucket is PUBLIC in Supabase
- Check image URL format
- Test URL in browser directly

### Database connection fails
- Verify Project URL
- Check credentials
- Test connection in Supabase dashboard

---

## ✅ Status: PARTIAL IMPLEMENTATION

**Completed:**
- ✅ Supabase client setup
- ✅ Upload API with Supabase support
- ✅ Environment configuration
- ✅ Image upload hook
- ✅ Database schema (SQL provided)

**To Be Completed:**
- ⏳ Admin dashboard UI components
- ⏳ Pages management interface
- ⏳ Programs management interface
- ⏳ Campaigns management interface
- ⏳ Gallery manager
- ⏳ Settings panel
- ⏳ Rich text editor integration
- ⏳ Image optimization
- ⏳ Form builders

**Status:** Ready for Phase 2 - Admin UI Development

---

## 🎯 Next Action

1. Follow SUPABASE_CMS_SETUP.md to set up your Supabase account
2. Add credentials to `.env.local`
3. Run `npm install` for new dependencies
4. Run `npm run dev` to start development
5. Test upload API
6. Build admin dashboard components

---

**Documentation Version:** 1.0
**Last Updated:** June 6, 2026
**Maintained By:** AI Assistant
