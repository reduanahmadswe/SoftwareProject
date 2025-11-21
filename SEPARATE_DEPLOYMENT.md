# আলাদা Frontend ও Backend Deployment Guide

এই গাইডে frontend ও backend আলাদাভাবে host করার সম্পূর্ণ প্রক্রিয়া বর্ণিত আছে।

## 🎯 Deployment Strategy

### Frontend Options:

- ✅ **Vercel** (সবচেয়ে সহজ)
- ✅ **Netlify**
- ✅ **GitHub Pages**
- ✅ **Firebase Hosting**

### Backend Options:

- ✅ **Vercel** (Serverless Functions)
- ✅ **Render** (Free tier available)
- ✅ **Heroku** (Paid)
- ✅ **Railway**
- ✅ **DigitalOcean**

## 🚀 Frontend Deployment

### Option 1: Vercel (Recommended)

#### 1. Frontend Setup

```bash
cd frontend
```

#### 2. Deploy to Vercel

```bash
# Vercel CLI install করুন (if not already)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### 3. Environment Variables

Vercel Dashboard → Settings → Environment Variables:

- `VITE_API_URL` = Your backend URL (e.g., `https://your-backend.vercel.app`)

### Option 2: Netlify

#### 1. Build Setup

```bash
cd frontend
npm run build
```

#### 2. Deploy Options

**Via Netlify CLI:**

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**Via Drag & Drop:**

1. Go to [Netlify](https://app.netlify.com)
2. Drag & drop the `dist` folder

#### 3. Environment Variables

Netlify Dashboard → Site Settings → Environment Variables:

- `VITE_API_URL` = Your backend URL

### Option 3: GitHub Pages

#### 1. Install gh-pages

```bash
cd frontend
npm install --save-dev gh-pages
```

#### 2. Update package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/repository-name"
}
```

#### 3. Deploy

```bash
npm run deploy
```

## 🔧 Backend Deployment

### Option 1: Vercel Serverless

#### 1. Backend Setup

```bash
cd backend
```

#### 2. Deploy

```bash
vercel --prod
```

#### 3. Environment Variables

Vercel Dashboard → Settings → Environment Variables:

- `DATABASE_URL` = MongoDB connection string
- `JWT_SECRET` = Secure secret key
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`
- `FRONTEND_URL` = Your frontend URL
- `NODE_ENV` = `production`

### Option 2: Render (Free Tier)

#### 1. GitHub Repository

Push your backend code to GitHub

#### 2. Render Setup

1. Go to [Render](https://render.com)
2. Connect GitHub account
3. Create new Web Service
4. Select your repository
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

#### 3. Environment Variables

Add in Render Dashboard:

- `DATABASE_URL`, `JWT_SECRET`, etc.

### Option 3: Railway

#### 1. Railway CLI

```bash
npm install -g @railway/cli
railway login
```

#### 2. Deploy

```bash
cd backend
railway deploy
```

## 🔗 Connecting Frontend & Backend

### 1. Backend URL সেট করুন

Frontend deploy করার পর:

```bash
# Frontend এর environment variables আপডেট করুন
VITE_API_URL=https://your-backend-url.com
```

### 2. CORS Configuration

Backend এ frontend URL যোগ করুন:

```javascript
// backend/src/index.ts
app.use(
  cors({
    origin: [
      "https://your-frontend-url.com",
      "http://localhost:5173", // for development
    ],
    credentials: true,
  })
);
```

### 3. Re-deploy

উভয় services re-deploy করুন environment variables আপডেট করার পর।

## 📋 Deployment Checklist

### Frontend Deployment:

- [ ] Build test করেছেন (`npm run build`)
- [ ] Platform choose করেছেন (Vercel/Netlify/etc.)
- [ ] Deploy করেছেন
- [ ] `VITE_API_URL` সেট করেছেন
- [ ] Site কাজ করছে কিনা check করেছেন

### Backend Deployment:

- [ ] Build test করেছেন (`npm run build`)
- [ ] Database connection string প্রস্তুত
- [ ] Platform choose করেছেন (Vercel/Render/etc.)
- [ ] Environment variables সেট করেছেন
- [ ] Deploy করেছেন
- [ ] API endpoints test করেছেন

### Final Testing:

- [ ] Frontend থেকে backend API call হচ্ছে
- [ ] Registration form কাজ করছে
- [ ] Admin login কাজ করছে
- [ ] Email sending কাজ করছে
- [ ] Data export কাজ করছে

## 🆘 Troubleshooting

### Common Issues:

#### CORS Error:

```
Access to fetch at 'backend-url' from origin 'frontend-url' has been blocked by CORS policy
```

**Solution**: Backend এ frontend URL যোগ করুন CORS configuration এ

#### Environment Variables না পাওয়া:

```
Cannot read property of undefined
```

**Solution**: সব environment variables সঠিকভাবে সেট করেছেন কিনা check করুন

#### API Not Found:

```
404 - API route not found
```

**Solution**: Backend deployment সফল হয়েছে কিনা এবং সঠিক URL ব্যবহার করছেন কিনা check করুন

## 💡 Pro Tips

1. **Free Tier Limits**: Free hosting services এর limits সম্পর্কে সচেতন থাকুন
2. **Database**: MongoDB Atlas free tier ব্যবহার করুন
3. **Domain**: Custom domain চাইলে Cloudflare ব্যবহার করুন
4. **Monitoring**: Deployment পর regularly check করুন
5. **Backup**: Database এর regular backup নিন

## 🔧 Quick Commands Reference

```bash
# Frontend build
cd frontend && npm run build

# Backend build
cd backend && npm run build

# Vercel deploy
vercel --prod

# Netlify deploy
netlify deploy --prod --dir=dist

# Railway deploy
railway deploy
```

Happy Separate Hosting! 🎉
