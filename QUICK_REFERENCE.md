# Quick Reference Card - Supabase CMS

## 🚀 Quick Start (30 Minutes)

```
1. Go to https://supabase.com → Sign Up (5 min)
2. Create Project → Copy API Keys (10 min)
3. Create Storage Bucket "content-images" (2 min)
4. Paste SQL from SUPABASE_CMS_SETUP.md (5 min)
5. Add keys to .env.local (2 min)
6. npm install @supabase/supabase-js (2 min)
7. You're ready! 🎉
```

---

## 📝 Environment Variables (.env.local)

```env
# Supabase CMS Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_STORAGE_BUCKET=content-images
```

---

## 🔗 Key Endpoints

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/admin/uploads` | POST | Upload images | Admin/Editor |
| `/admin` | GET | Admin dashboard | Admin/Editor |
| `/admin/cms` | GET | CMS dashboard | Admin/Editor |

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `src/lib/supabase.ts` | Supabase client & types |
| `src/lib/useImageUpload.ts` | Upload hook |
| `src/app/api/admin/uploads/route.ts` | Upload API |
| `SUPABASE_CMS_SETUP.md` | Setup guide |
| `SUPABASE_CMS_IMPLEMENTATION.md` | Technical guide |

---

## 💻 Upload Example

```javascript
// Using the hook
const { upload, isLoading, error } = useImageUpload();

// Upload a file
const file = new File([...], 'photo.jpg');
const result = await upload(file, 'campaigns');

// result.url → Public image URL
console.log(result.url);
```

---

## 🗂️ Database Tables

```sql
pages           # Website pages
programs        # Program information
campaigns       # Fundraising campaigns
gallery         # Photo gallery
settings        # Site configuration
```

---

## 🔐 Security

- ✅ Role-based access (Admin/Editor)
- ✅ File type validation
- ✅ File size limits (10MB)
- ✅ Row Level Security
- ✅ Credentials in env

---

## 📚 Documentation

1. **SUPABASE_CMS_SETUP.md**
   - Complete step-by-step setup
   - SQL queries
   - Troubleshooting

2. **SUPABASE_CMS_IMPLEMENTATION.md**
   - Technical details
   - File structure
   - Implementation checklist

3. **CMS_INTEGRATION_SUMMARY.md**
   - Overview
   - Features
   - Status

---

## ✅ Pre-Launch Checklist

- [ ] Supabase account created
- [ ] Project created
- [ ] Storage bucket created (public)
- [ ] Database SQL executed
- [ ] Keys added to .env.local
- [ ] Dependencies installed
- [ ] Dev server running
- [ ] Upload API tested

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| "Missing env vars" | Check .env.local has all 4 variables |
| Upload fails | Verify bucket is PUBLIC |
| 401 Unauthorized | Check user is logged in & has Admin/Editor role |
| Images not showing | Test URL directly in browser |

---

## 📞 Support

- **Supabase Docs**: https://supabase.com/docs
- **Setup Guide**: See SUPABASE_CMS_SETUP.md
- **Implementation**: See SUPABASE_CMS_IMPLEMENTATION.md

---

**Print this card and keep it handy!**
**Last Updated:** June 6, 2026
