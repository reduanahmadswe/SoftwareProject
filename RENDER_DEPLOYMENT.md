# Render Deployment Guide

## Email Configuration Required

Your backend needs email environment variables to send confirmation emails. Without these, the app will timeout trying to create Ethereal test accounts (which doesn't work on Render's free tier due to network restrictions).

### Set Environment Variables in Render Dashboard

Go to your Render service → **Environment** tab → Add these variables:

#### Option 1: SendGrid (Recommended)

```
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=<your_sendgrid_api_key>
```

**To get SendGrid API key:**

1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Go to Settings → API Keys → Create API Key
3. Copy the key and paste as `EMAIL_PASSWORD`

#### Option 2: Gmail (with App Password)

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<your_gmail_address>
EMAIL_PASSWORD=<your_app_password>
```

**To create Gmail App Password:**

1. Enable 2FA on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate app password for "Mail"
4. Copy the 16-character password (remove spaces)
5. Use as `EMAIL_PASSWORD`

**Note:** Gmail may block connections from cloud servers. SendGrid is more reliable.

#### Option 3: Mailgun

```
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=<your_mailgun_smtp_username>
EMAIL_PASSWORD=<your_mailgun_smtp_password>
```

### Other Required Environment Variables

Make sure these are also set in Render:

```
PORT=4000
NODE_ENV=production
DATABASE_URL=<your_mongodb_connection_string>
DISCORD_INVITE=https://discord.gg/dt2yS4ET
JWT_SECRET=<generate_a_strong_random_secret>
FRONTEND_URL=https://your-render-app.onrender.com
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<strong_admin_password>
```

### Why Ethereal Doesn't Work on Render

The error you see (`Failed to create Ethereal test account: Connection timeout`) happens because:

- Render's free tier restricts outbound connections to many ports/services
- Ethereal.email API is blocked or times out
- The fallback email service cannot initialize

**Solution:** Use a real SMTP provider (SendGrid, Gmail, Mailgun) by setting the env vars above.

### After Setting Environment Variables

1. Save the environment variables in Render dashboard
2. Render will automatically redeploy your service
3. Check the logs - you should see:
   ```
   EMAIL_HOST: smtp.sendgrid.net
   EMAIL_PORT: 587
   EMAIL_USER: apikey
   EMAIL_PASSWORD: set
   SMTP transporter verified (production).
   ```
4. Test registration - emails should send successfully

### Troubleshooting

**Still seeing "EMAIL_HOST: undefined"?**

- Double-check env var names in Render match exactly (case-sensitive)
- Wait for redeploy to complete after adding variables
- Restart the service manually if needed

**SMTP connection errors?**

- Verify SMTP credentials are correct
- For Gmail, ensure App Password is used (not regular password)
- For SendGrid, ensure API key has "Mail Send" permission
- Check provider account is active and not suspended

**Rate limit errors (trust proxy)?**

- Already fixed in code with `app.set('trust proxy', 1)`
- Commit and push the updated code
- Render will redeploy automatically

## Quick Start Checklist

- [ ] Add email env vars in Render dashboard
- [ ] Commit and push the trust proxy fix
- [ ] Wait for Render to redeploy
- [ ] Check logs for successful SMTP verification
- [ ] Test registration to confirm emails send
