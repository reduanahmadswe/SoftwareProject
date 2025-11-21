# 🚀 Resend Email Service Setup Guide

## 📧 Email Timeout সমস্যার সমাধান

### ❌ সমস্যা:

- Gmail SMTP Vercel serverless environment এ timeout হচ্ছে
- Connection timeout after 30 seconds
- Email send হচ্ছে না production এ

### ✅ সমাধান: Resend Email Service

## 🔧 Setup Steps:

### 1. Resend Account Create করুন:

1. **Visit:** https://resend.com
2. **Sign up** with GitHub account
3. **Verify** your email address

### 2. Domain Setup (Optional):

- **Free Plan:** `onboarding@resend.dev` domain use করতে পারেন
- **Custom Domain:** আপনার নিজের domain add করতে পারেন

### 3. API Key Generate করুন:

1. **Resend Dashboard** এ যান
2. **API Keys** section এ যান
3. **Create API Key** click করুন
4. **Name:** "Git GitHub Workshop"
5. **Permissions:** Full access
6. **Copy** the API key (শুধু একবার দেখাবে!)

### 4. Vercel Environment Variable Add করুন:

#### Method 1: Vercel Dashboard

1. https://vercel.com/dashboard এ যান
2. **Backend project** select করুন
3. **Settings → Environment Variables**
4. **Add New:**
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_xxxxxxxxxxxxxxxxx` (your API key)
   - **Environment:** Production, Preview, Development

#### Method 2: Vercel CLI

```bash
cd backend
vercel env add RESEND_API_KEY
# Enter your API key when prompted
```

## 🎯 Features:

### ✅ Resend Advantages:

- **Serverless Optimized:** Vercel এর জন্য specially designed
- **Fast Delivery:** 99.9% uptime guarantee
- **No Timeout Issues:** Gmail SMTP timeout problem solve
- **Better Deliverability:** Spam folder এ যাওয়ার সম্ভাবনা কম
- **Free Tier:** 3,000 emails/month free

### 🎨 Improved Email Design:

- Modern responsive design
- Better typography
- Discord invite button
- Workshop details section
- Professional footer

## 📋 Current Implementation:

```typescript
// Clean, simple Resend implementation
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "Git & GitHub Workshop <onboarding@resend.dev>",
  to: email,
  subject: "🚀 Welcome to Git & GitHub Workshop!",
  html: beautifulEmailTemplate,
});
```

## 🧪 Test Flow:

1. **Setup Resend API Key**
2. **Deploy Backend**
3. **Test Registration**
4. **Verify Email Delivery**

**এই solution দিয়ে Gmail SMTP timeout issue completely solve হবে!** 📧✨
