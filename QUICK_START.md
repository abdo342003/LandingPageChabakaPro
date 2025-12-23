# 🎯 Quick Reference Card

## Supabase Credentials
```
URL: https://kjxnnhidnsoqmypvmtkl.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## What To Do Next

### 1️⃣ Create Database Table (REQUIRED)
Go to: https://supabase.com/dashboard/project/kjxnnhidnsoqmypvmtkl/sql/new

Copy and run the SQL from: `supabase-setup.sql`

### 2️⃣ Start Development
```bash
npm run dev
```

### 3️⃣ Test Your App
- Visit: http://localhost:3000
- Fill contact form and submit
- Press `Ctrl + Shift + A` for admin panel
- Password: `ChabakaPro2025!`

### 4️⃣ Check Supabase Dashboard
View data at: https://supabase.com/dashboard/project/kjxnnhidnsoqmypvmtkl/editor

## Files Changed
- ✅ `utils/supabase.ts` - Supabase client
- ✅ `types.ts` - Database types added
- ✅ `components/ContactForm.tsx` - Saves to Supabase
- ✅ `App.tsx` - Loads from Supabase
- ✅ `.env` - Environment variables
- ✅ `.gitignore` - Protected .env
- ✅ `package.json` - Added @supabase/supabase-js

## Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Troubleshooting

### Problem: 403 Forbidden
**Fix:** Run in Supabase SQL Editor:
```sql
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;
```

### Problem: No data in admin panel
**Fix:** Check browser console for errors, verify table exists

### Problem: Variables not working
**Fix:** Restart dev server with `npm run dev`

## Important URLs
- 📊 Supabase Dashboard: https://supabase.com/dashboard/project/kjxnnhidnsoqmypvmtkl
- 📝 SQL Editor: https://supabase.com/dashboard/project/kjxnnhidnsoqmypvmtkl/sql
- 📋 Table Editor: https://supabase.com/dashboard/project/kjxnnhidnsoqmypvmtkl/editor
- 🔐 Authentication: https://supabase.com/dashboard/project/kjxnnhidnsoqmypvmtkl/auth

## Support Files
- `INTEGRATION_COMPLETE.md` - Full setup guide
- `SUPABASE_README.md` - Detailed documentation
- `supabase-setup.sql` - Database creation script
