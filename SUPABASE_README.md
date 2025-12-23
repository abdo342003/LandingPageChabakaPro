# Supabase Integration Guide

This project is now integrated with Supabase for backend data storage.

## Setup Instructions

### 1. Database Setup

1. Go to your Supabase project dashboard: https://kjxnnhidnsoqmypvmtkl.supabase.co
2. Navigate to the SQL Editor
3. Copy the contents of `supabase-setup.sql` and run it in the SQL Editor
4. This will create the `submissions` table with proper security policies

### 2. Environment Variables

The environment variables are already configured in `.env`:

```
VITE_SUPABASE_URL=https://kjxnnhidnsoqmypvmtkl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important**: Never commit the `.env` file to version control. Add it to `.gitignore`.

### 3. Row Level Security (RLS)

The database is configured with Row Level Security policies:

- **Public can INSERT**: Contact form submissions work without authentication
- **Authenticated can SELECT/UPDATE/DELETE**: Admin operations require authentication

For development/testing, you can temporarily allow anonymous access by uncommenting the anonymous policies in `supabase-setup.sql`. However, this is **not recommended for production**.

### 4. Testing Without Authentication

If you want to test the admin panel without setting up authentication:

1. In Supabase Dashboard, go to Authentication > Policies
2. Temporarily disable RLS on the submissions table, OR
3. Add anonymous access policies (see commented section in `supabase-setup.sql`)

## Features

### Contact Form
- Saves submissions to Supabase database
- Falls back to localStorage if Supabase is unavailable
- Includes device information (browser, OS, screen size, etc.)
- Sends notifications via WhatsApp and Email

### Admin Panel
- Loads submissions from Supabase
- Real-time status updates (new, contacted, completed)
- Delete submissions
- Export to CSV
- Analytics dashboard with device/browser statistics
- Access with Ctrl+Shift+A keyboard shortcut
- Password: `ChabakaPro2025!`

### Offline Support
- Data is synced to localStorage as a backup
- Works offline with cached data
- Syncs changes when connection is restored

## Database Schema

```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  business TEXT NOT NULL,
  message TEXT,
  timestamp TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  device_info JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## API Endpoints

The app uses Supabase's auto-generated REST API:

- **POST** `/rest/v1/submissions` - Create new submission
- **GET** `/rest/v1/submissions` - List all submissions
- **PATCH** `/rest/v1/submissions?id=eq.{id}` - Update submission status
- **DELETE** `/rest/v1/submissions?id=eq.{id}` - Delete submission

All requests are authenticated using the `VITE_SUPABASE_ANON_KEY`.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### 403 Forbidden Error
- Check Row Level Security policies in Supabase
- Verify the anon key is correct
- Ensure policies allow public inserts

### Data Not Appearing in Admin Panel
- Check browser console for errors
- Verify Supabase URL and key in `.env`
- Check if RLS policies allow reads

### Submissions Not Saving
- Check network tab for failed requests
- Verify the submissions table exists
- Check browser console for errors
- Data will fall back to localStorage if Supabase fails

## Security Notes

1. **Never expose your service_role key** - Only use the anon key in frontend
2. **Use RLS policies** - Always enable Row Level Security
3. **Add authentication** - For production, implement proper user authentication
4. **Rate limiting** - Consider adding rate limiting for form submissions
5. **Input validation** - Validate all user inputs on both client and server

## Next Steps

1. ✅ Database table created
2. ✅ RLS policies configured
3. ✅ Contact form integrated
4. ✅ Admin panel integrated
5. 🔄 Test the integration
6. 🔄 Add proper authentication for admin panel
7. 🔄 Deploy to production

## Support

For Supabase issues, visit: https://supabase.com/docs
