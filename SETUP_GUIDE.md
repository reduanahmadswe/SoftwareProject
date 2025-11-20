# Quick Start Guide

## 🚀 Getting Started

This guide will help you set up and run the Git & GitHub Workshop registration website.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

## Step 1: Clone and Setup

```bash
# Navigate to your project directory
cd SoftwareProject

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

## Step 2: Configure Backend Environment

1. Create `.env` file in the `backend` folder:

```bash
cd backend
cp .env.example .env
```

2. Edit `.env` file with your settings:

```env
PORT=4000
NODE_ENV=development

# MongoDB Connection
DATABASE_URL=mongodb://localhost:27017/git-github-workshop

# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Discord Invite Link
DISCORD_INVITE=https://discord.gg/your-invite-code

# Admin Authentication
JWT_SECRET=your_random_secret_key_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password_123

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Getting Gmail App Password:

1. Enable 2-Factor Authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and generate a password
4. Copy the 16-character password to `SMTP_PASS` in `.env`

## Step 3: Configure Frontend Environment

1. Create `.env` file in the `frontend` folder:

```bash
cd ../frontend
cp .env.example .env
```

2. Edit `.env` file:

```env
VITE_API_URL=http://localhost:4000
VITE_DISCORD_INVITE=https://discord.gg/your-invite-code
```

## Step 4: Start MongoDB

### Option A: Local MongoDB

```bash
# Windows
mongod --dbpath C:\data\db

# Mac/Linux
mongod --dbpath /usr/local/var/mongodb
```

### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier available)
3. Create database user
4. Get connection string
5. Update `DATABASE_URL` in backend `.env`

## Step 5: Run the Application

Open two terminal windows:

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on http://localhost:4000
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

You should see:
```
VITE ready in X ms
➜  Local:   http://localhost:5173/
```

## Step 6: Access the Application

1. **Frontend**: Open browser to [http://localhost:5173](http://localhost:5173)
2. **Backend API**: [http://localhost:4000/health](http://localhost:4000/health)

## Step 7: Test Registration

1. Fill out the registration form
2. Submit the form
3. Check your email for confirmation
4. Verify data is saved in MongoDB

## Admin Access

### Login to Admin Panel

Use the admin credentials from your `.env` file:

```bash
# Example using curl
curl -X POST http://localhost:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "secure_password_123"
  }'
```

Response will include a JWT token:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Export Registrations

```bash
curl -X GET http://localhost:4000/api/admin/export \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  --output registrations.csv
```

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution**: 
- Ensure MongoDB is running
- Check connection string in `.env`
- For Atlas: Whitelist your IP address

### Issue: "Email not sending"
**Solution**:
- Verify SMTP credentials
- Use Gmail App Password (not regular password)
- Check spam folder

### Issue: "Port 4000 already in use"
**Solution**:
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:4000 | xargs kill -9
```

### Issue: "CORS error"
**Solution**:
- Verify `FRONTEND_URL` in backend `.env`
- Check frontend is running on port 5173

## Discord Setup

1. Create a Discord server
2. Go to Server Settings → Invites
3. Create a permanent invite link
4. Update `DISCORD_INVITE` in both frontend and backend `.env` files

## Project Structure

```
SoftwareProject/
├── frontend/              # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/   # Hero, Form, Footer
│   │   ├── pages/        # Home, ThankYou
│   │   └── api/          # API client
│   └── .env
│
├── backend/               # Express + TypeScript
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Email service
│   │   └── utils/        # CSV exporter
│   └── .env
│
└── README.md
```

## Next Steps

1. **Customize the design**: Edit Tailwind classes in frontend components
2. **Update branding**: Change colors, logo, and text
3. **Add features**: Implement additional functionality as needed
4. **Deploy**: See deployment guides in respective README files

## Deployment Options

### Frontend
- [Vercel](https://vercel.com/) (Recommended)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

### Backend
- [Render](https://render.com/) (Free tier available)
- [Railway](https://railway.app/)
- [Heroku](https://www.heroku.com/)
- [DigitalOcean](https://www.digitalocean.com/)

## Support

For issues or questions:
1. Check the README files in frontend and backend folders
2. Review error messages in browser console and terminal
3. Check MongoDB and email service logs

## License

MIT License - Feel free to use this project for your workshop!
