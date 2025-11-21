# 📧 Email Configuration Guide

আপনার backend এ email functionality enable করার জন্য Vercel Dashboard এ environment variables set করতে হবে।

## 🔧 Environment Variables Setup

### 1. Vercel Dashboard এ যান:

- Go to: https://vercel.com/dashboard
- Select your backend project: `git-github-workshop-backend`
- Go to **Settings** → **Environment Variables**

### 2. Required Email Variables:

#### Gmail ব্যবহার করলে:

```
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = your-app-password
```

#### অন্য Email Provider:

```
EMAIL_HOST = your-smtp-host
EMAIL_PORT = 587 (or 465 for SSL)
EMAIL_USER = your-email@domain.com
EMAIL_PASSWORD = your-password
```

### 3. Other Required Variables:

```
DATABASE_URL = your-mongodb-connection-string
JWT_SECRET = your-super-secret-jwt-key
FRONTEND_URL = https://gitgithubwordshop-efcl26506-reduan-ahmads-projects.vercel.app
NODE_ENV = production
```

## 📧 Gmail App Password Setup

Gmail ব্যবহার করলে App Password তৈরি করতে হবে:

### 1. Gmail Account Settings:

- Go to: https://myaccount.google.com/
- Click **Security** → **2-Step Verification** (enable if not enabled)
- Click **App passwords**

### 2. Generate App Password:

- Select app: **Mail**
- Select device: **Other** (name it "Vercel Backend")
- Copy the generated 16-character password
- Use this password in `EMAIL_PASSWORD`

## 🧪 Test Email Functionality

### 1. Frontend থেকে Test:

- Go to: https://gitgithubwordshop-efcl26506-reduan-ahmads-projects.vercel.app
- Fill registration form with your email
- Submit and check email

### 2. Direct API Test:

```bash
curl -X POST https://git-github-workshop-backend.vercel.app/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "universityId": "TEST456",
    "semester": "Fall 2024",
    "batch": "2021",
    "email": "your-email@gmail.com",
    "whatsapp": "+8801234567890",
    "github": "testuser"
  }'
```

## 🔍 Debug Email Issues

### Check Vercel Logs:

```bash
vercel logs
```

### Common Issues:

1. **App Password not set**: Use Gmail App Password, not regular password
2. **SMTP blocked**: Some networks block SMTP ports
3. **Invalid credentials**: Double-check email/password
4. **Firewall**: Vercel might be blocked by email provider

## 📝 Email Template

Registration করলে এই email পাবেন:

```
Subject: Registration Confirmed — Join our Discord

Hi [Name],

Thank you for registering for "Collaborating in a Software Project using Git and GitHub" workshop!

We're excited to have you join us. Here's what you need to do next:

1. Join our Discord community - Connect with instructors and fellow participants
2. Set up your GitHub account - Make sure it's ready for the workshop
3. Install Git - Download from git-scm.com

[Join Discord Server Button]

Looking forward to seeing you at the workshop!

Best regards,
Git & GitHub Workshop Team
```

## 🚀 Re-deploy After Setting Variables

Environment variables set করার পর backend re-deploy করুন:

```bash
cd backend
vercel --prod
```

## ✅ Success Check

Email working হচ্ছে কিনা check করুন:

- [ ] Environment variables set করেছেন
- [ ] Backend re-deploy করেছেন
- [ ] Frontend registration form submit করেছেন
- [ ] Email inbox check করেছেন
- [ ] Spam folder check করেছেন

Happy Emailing! 📧
