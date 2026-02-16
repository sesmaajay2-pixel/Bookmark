# 🔖 Smart Bookmark Manager

A modern, real-time bookmark management application built with Next.js, Supabase, and Google OAuth.

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure sign-in with Google accounts only
- 🔒 **Private Bookmarks** - Each user's bookmarks are completely private
- ⚡ **Real-time Sync** - Updates appear instantly across all tabs and devices
- ➕ **Add Bookmarks** - Save URL and title
- 🗑️ **Delete Bookmarks** - Remove bookmarks with one click
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS and shadcn/ui components
- 🛡️ **Row Level Security** - Database-level security with Supabase RLS
- 📱 **Responsive Design** - Works perfectly on desktop and mobile

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database & Auth:** Supabase (PostgreSQL + Auth + Realtime)
- **Styling:** Tailwind CSS + shadcn/ui
- **Authentication:** Google OAuth via Supabase
- **Deployment:** Vercel-ready

## 📁 Project Structure

```
/app
├── app/
│   ├── auth/
│   │   ├── actions.js          # Authentication server actions
│   │   └── callback/
│   │       └── route.js        # OAuth callback handler
│   ├── bookmarks/
│   │   ├── page.js             # Main bookmarks page
│   │   └── actions.js          # Bookmark CRUD actions
│   ├── layout.js               # Root layout with navigation
│   ├── page.js                 # Homepage
│   └── globals.css             # Global styles
├── components/
│   ├── Navigation.js           # Navigation bar
│   ├── BookmarkList.js         # Real-time bookmark list
│   ├── AddBookmarkForm.js      # Add bookmark form
│   └── ui/                     # shadcn/ui components
├── lib/
│   └── supabase/
│       ├── client.js           # Browser Supabase client
│       └── server.js           # Server Supabase client
├── middleware.js               # Session management middleware
├── supabase-setup.sql          # Database setup script
├── DEPLOYMENT-GUIDE.md         # Detailed deployment instructions
└── .env.local                  # Environment variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and Yarn
- Supabase account
- Google Cloud account (for OAuth)

### Setup Complete ✅

Your app is already configured with:
- ✅ Supabase credentials in `.env.local`
- ✅ Supabase client utilities
- ✅ Google OAuth integration
- ✅ Database schema (if SQL script was run)
- ✅ All components and pages

### Local Development

The app is currently running on:
```
http://localhost:3000
```

## 🧪 Testing the App

### 1. Test Authentication Flow

1. Open http://localhost:3000 in your browser
2. Click "Sign in with Google"
3. You should be redirected to Google's sign-in page
4. Select your Google account
5. After authorization, you should be redirected to `/bookmarks`

**Expected behavior:**
- ✅ Google OAuth popup appears
- ✅ After sign-in, redirected to bookmarks page
- ✅ Your email appears in the navigation bar

### 2. Test Adding Bookmarks

1. On the bookmarks page, find the "Add Bookmark" form (right side)
2. Enter a URL (e.g., `https://github.com`)
3. Enter a title (e.g., `GitHub`)
4. Click "Add Bookmark"

**Expected behavior:**
- ✅ Bookmark appears instantly in the list
- ✅ Toast notification shows "Bookmark added"
- ✅ Form clears after submission

### 3. Test Real-time Sync

1. Open the bookmarks page in **two browser tabs**
2. In **Tab 1**, add a new bookmark
3. Watch **Tab 2** - the bookmark should appear WITHOUT refreshing

**Expected behavior:**
- ✅ Bookmark appears in both tabs instantly
- ✅ No page refresh needed
- ✅ Real-time synchronization works

### 4. Test Deleting Bookmarks

1. Click the trash icon on any bookmark
2. The bookmark should disappear

**Expected behavior:**
- ✅ Bookmark removed from list
- ✅ Toast notification shows "Bookmark deleted"
- ✅ Deletion syncs in real-time to other tabs

### 5. Test Privacy

1. Sign out from the current account
2. Sign in with a **different Google account**
3. Verify you see an empty bookmark list
4. Add some bookmarks with the second account
5. Sign out and sign back in with the first account
6. Verify you only see the first account's bookmarks

**Expected behavior:**
- ✅ Each user sees only their own bookmarks
- ✅ Complete privacy between users
- ✅ Row Level Security working properly

## 🐛 Troubleshooting

### Issue: "Unsupported provider: provider is not enabled"

**Solution:** Google OAuth is not enabled in Supabase
1. Go to Supabase Dashboard > Authentication > Providers
2. Enable Google provider
3. Enter Google Client ID and Secret
4. Save changes

### Issue: "Invalid redirect URL"

**Solution:** Redirect URLs don't match
1. In Google Cloud Console, verify redirect URI is:
   `https://vvkgllwrmgyywllpotoo.supabase.co/auth/v1/callback`
2. In Supabase, verify Site URL is set correctly

### Issue: "relation 'public.bookmarks' does not exist"

**Solution:** Database tables not created
1. Go to Supabase Dashboard > SQL Editor
2. Run the SQL script from `supabase-setup.sql`

### Issue: "RLS policy error"

**Solution:** Row Level Security policies not set
1. Run the SQL script from `supabase-setup.sql`
2. Verify RLS is enabled on the bookmarks table

### Issue: Real-time updates not working

**Solution:** Realtime not enabled for bookmarks table
1. Ensure this line was executed in SQL script:
   ```sql
   ALTER PUBLICATION supabase_realtime ADD TABLE public.bookmarks;
   ```

## 📊 Database Schema

### bookmarks table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| user_id | UUID | Foreign key to auth.users |
| url | TEXT | Bookmark URL |
| title | TEXT | Bookmark title |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Row Level Security Policies

- Users can **SELECT** their own bookmarks
- Users can **INSERT** their own bookmarks
- Users can **UPDATE** their own bookmarks
- Users can **DELETE** their own bookmarks

## 🚀 Deployment to Vercel

See the comprehensive [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for step-by-step instructions.

**Quick steps:**
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy
5. Update OAuth redirect URLs with production URL

## 📝 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://vvkgllwrmgyywllpotoo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔒 Security Features

- ✅ Row Level Security (RLS) on all tables
- ✅ OAuth 2.0 authentication only (no passwords)
- ✅ Server-side session validation
- ✅ CSRF protection via middleware
- ✅ User-specific data filtering at database level
- ✅ Secure cookie handling

## 🎯 Future Enhancements

- [ ] Add bookmark categories/tags
- [ ] Search and filter bookmarks
- [ ] Add bookmark descriptions
- [ ] Export bookmarks to CSV/JSON
- [ ] Share bookmarks with other users
- [ ] Bookmark folders/collections
- [ ] Browser extension
- [ ] Bookmark screenshots/previews

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 🙏 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the DEPLOYMENT-GUIDE.md
3. Check Supabase logs in Dashboard > Database > Logs
4. Check Vercel logs in your deployment

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using Next.js, Supabase, and modern web technologies.
