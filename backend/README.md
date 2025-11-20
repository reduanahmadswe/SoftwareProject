# Backend - Git & GitHub Workshop

Backend server for the Git & GitHub Workshop registration system.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- SMTP email account (Gmail, Outlook, etc.)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
   - Set your MongoDB connection string
   - Configure SMTP email settings
   - Set Discord invite link
   - Change JWT secret
   - Set admin credentials

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Public Endpoints

#### Register User
```
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "universityId": "2021-1-60-123",
  "whatsapp": "+880 1234567890",
  "batch": "Spring 2024",
  "github": "johndoe"
}
```

### Admin Endpoints (Require Authentication)

#### Admin Login
```
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your_password"
}

Response:
{
  "success": true,
  "token": "jwt_token_here"
}
```

#### Get All Registrations
```
GET /api/admin/registrations?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Statistics
```
GET /api/admin/stats
Authorization: Bearer <token>
```

#### Export CSV
```
GET /api/admin/export
Authorization: Bearer <token>
```

#### Delete Registration
```
DELETE /api/admin/registrations/:id
Authorization: Bearer <token>
```

## Email Configuration

### Using Gmail

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use the app password in your `.env` file:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## MongoDB Setup

### Local MongoDB
```bash
# Install MongoDB
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod --dbpath /path/to/data/directory
```

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get connection string
4. Update `.env` with connection string

## Security Notes

- Change default admin credentials in `.env`
- Use strong JWT secret
- Never commit `.env` file to git
- Use HTTPS in production
- Implement proper rate limiting
- Sanitize all user inputs

## Folder Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── middleware/       # Auth & validation
│   ├── utils/            # Helper functions
│   └── index.ts          # Entry point
├── dist/                 # Compiled JS (after build)
├── exports/              # Temporary CSV exports
├── .env                  # Environment variables
├── package.json
└── tsconfig.json
```

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in `.env`
- Check network access (for MongoDB Atlas)

### Email Not Sending
- Verify SMTP credentials
- Check if 2FA is enabled (for Gmail)
- Use app-specific password
- Check firewall settings

### Port Already in Use
- Change PORT in `.env`
- Kill process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :4000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:4000 | xargs kill
  ```

## License

MIT
