# 🚀 Smart Bookmark App - Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. Supabase Database Setup

**IMPORTANT: Run the SQL script first!**

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project (vvkgllwrmgyywllpotoo)
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire content from `supabase-setup.sql` file
6. Paste it into the SQL Editor
7. Click **Run** to execute the script

This will create:
- ✅ `bookmarks` table with proper schema
- ✅ Row Level Security (RLS) policies
- ✅ Real-time subscriptions enabled
- ✅ Automatic timestamp updates
- ✅ Performance indexes

### 2. Google OAuth Configuration

#### Step A: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Configure Consent Screen**:
   - User Type: **External**
   - App name: "Smart Bookmark Manager"
   - User support email: Your email
   - Developer contact: Your email
   - Save and Continue through all steps
5. Go back to **Credentials** > **Create Credentials** > **OAuth 2.0 Client ID**
6. Application type: **Web application**
7. Name: "Smart Bookmarks Web Client"

#### Step B: Add Authorized Redirect URIs

Add these redirect URIs (replace with your actual URLs):

**For local development:**
```
http://localhost:3000/auth/callback
```

**For Supabase (REQUIRED):**
```
https://vvkgllwrmgyywllpotoo.supabase.co/auth/v1/callback
```

**For Vercel (add after deployment):**
```
https://your-app-name.vercel.app/auth/callback
```

8. Click **Create** and save your:
   - Client ID
   - Client Secret

#### Step C: Configure Google OAuth in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** > **Providers**
3. Find **Google** in the list and enable it
4. Enter your **Google Client ID**
5. Enter your **Google Client Secret**
6. Click **Save**

### 3. Verify Supabase Configuration

Before deploying, verify in Supabase Dashboard:

1. **Authentication** > **URL Configuration**
   - Site URL should be: `http://localhost:3000` (change to your Vercel URL after deployment)
   
2. **Authentication** > **Providers**
   - ✅ Google should be enabled
   - ✅ Email should be disabled (we're using Google only)

3. **Database** > **Tables**
   - ✅ `bookmarks` table should exist
   - ✅ RLS should be enabled (shield icon should be visible)

---

## 🌐 Deploy to Vercel

### Step 1: Push to GitHub

```bash
cd /app
git init
git add .
git commit -m "Initial commit - Smart Bookmark App"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click **Add New** > **Project**
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (or leave default)
   - Build Command: `next build`
   - Output Directory: `.next`

### Step 3: Set Environment Variables

In Vercel project settings, add these environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://vvkgllwrmgyywllpotoo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a2dsbHdybWd5eXdsbHBvdG9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTU0NTgsImV4cCI6MjA4NjgzMTQ1OH0.Z0M833eFDf_BzINPhu9exa6Ad-TGU-6pGwzKJAwdDLg
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

**Note:** Update `NEXT_PUBLIC_APP_URL` with your actual Vercel deployment URL after first deploy.

### Step 4: Deploy

1. Click **Deploy**
2. Wait for deployment to complete
3. Note your Vercel URL (e.g., `https://your-app-name.vercel.app`)

### Step 5: Update OAuth Redirects

After getting your Vercel URL:

1. **Update Google OAuth Redirects:**
   - Go to Google Cloud Console > Credentials
   - Edit your OAuth Client
   - Add: `https://your-app-name.vercel.app/auth/callback`
   - Save

2. **Update Supabase Site URL:**
   - Go to Supabase Dashboard > Authentication > URL Configuration
   - Update Site URL to: `https://your-app-name.vercel.app`
   - Save

3. **Update Vercel Environment Variable:**
   - Go to Vercel Project Settings > Environment Variables
   - Update `NEXT_PUBLIC_APP_URL` to your Vercel URL
   - Redeploy

---

## ✅ Testing Checklist

After deployment, test these features:

### Authentication
- [ ] Click "Sign in with Google" on homepage
- [ ] Google OAuth popup appears
- [ ] After authorization, redirected to /bookmarks
- [ ] User email appears in navigation

### Bookmarks
- [ ] Add a new bookmark (URL + Title)
- [ ] Bookmark appears in the list immediately
- [ ] Click bookmark URL to open in new tab
- [ ] Delete a bookmark
- [ ] Bookmark disappears from list

### Real-time Sync
- [ ] Open app in two browser tabs
- [ ] Add a bookmark in tab 1
- [ ] Bookmark appears instantly in tab 2 (without refresh)
- [ ] Delete a bookmark in tab 2
- [ ] Bookmark disappears in tab 1 (without refresh)

### Privacy
- [ ] Sign out
- [ ] Sign in with different Google account
- [ ] Verify you can't see first user's bookmarks
- [ ] Create bookmarks with second user
- [ ] Sign back in as first user
- [ ] Verify first user's bookmarks are private

---

## 🔧 Troubleshooting

### Issue: "Invalid redirect URL"
- **Solution:** Verify redirect URLs match exactly in Google Cloud Console and Supabase

### Issue: "Authentication failed"
- **Solution:** Check that Google OAuth is enabled in Supabase and credentials are correct

### Issue: "Can't fetch bookmarks"
- **Solution:** Ensure you ran the SQL script in Supabase SQL Editor

### Issue: "Real-time updates not working"
- **Solution:** Verify that `ALTER PUBLICATION supabase_realtime ADD TABLE public.bookmarks;` was run

### Issue: "RLS policy error"
- **Solution:** Verify RLS policies were created correctly in Supabase

---

## 📝 What's Built

This Smart Bookmark App includes:

✅ **Google OAuth Authentication** - Secure sign-in with Google accounts only  
✅ **Private Bookmarks** - Each user's bookmarks are completely private  
✅ **Real-time Sync** - Updates appear instantly across all tabs  
✅ **CRUD Operations** - Add and delete bookmarks  
✅ **Beautiful UI** - Modern design with Tailwind CSS and shadcn/ui  
✅ **Row Level Security** - Database-level security with Supabase RLS  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Production Ready** - Optimized for Vercel deployment  

---

## 🎉 Next Steps After Deployment

1. Share your app URL with users
2. Monitor usage in Supabase Dashboard
3. Optional enhancements:
   - Add bookmark categories/tags
   - Add search functionality
   - Add bookmark descriptions
   - Export bookmarks
   - Share bookmarks with other users

---

## 📚 Documentation Links

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Google OAuth Setup](https://support.google.com/cloud/answer/6158849)

---

**Need help?** Check the logs in:
- Vercel: Project > Deployments > Click deployment > Runtime Logs
- Supabase: Dashboard > Database > Logs
