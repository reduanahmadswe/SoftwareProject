# Collaborating in a Software Project using Git and GitHub

## Overview

This project is a registration website for students/participants to collect information for a Git and GitHub collaboration workshop. The system collects user information, sends confirmation emails with Discord invite links, and provides admin functionality to export registrations.

## Features

- User registration form with validation
- GitHub account creation tutorial video
- Hero section with banner
- Email confirmation with Discord invite link
- **Admin dashboard with authentication**
- **View all registrations in a table format**
- **Export registrations to CSV**
- **Delete registrations**
- **Registration statistics and analytics**
- TypeScript for both frontend and backend
- MongoDB database
- Responsive design with Tailwind CSS
- Modern Azure depths gradient theme

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form + Zod validation
- Axios for API calls

### Backend

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Nodemailer (Email service)
- CSV export functionality
- JWT authentication (for admin)
- Rate limiting & CSRF protection

## Project Structure

```
project-root/
├─ frontend/          # React + TypeScript frontend
├─ backend/           # Express + TypeScript backend
└─ README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- SMTP credentials for email service

### Quick Setup

#### Automated Setup (Recommended)

**Windows (PowerShell):**

```powershell
.\setup-windows.ps1
```

**Linux/Mac:**

```bash
chmod +x setup.sh
./setup.sh
```

#### Manual Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd SoftwareProject
```

2. Install dependencies:

```bash
# Install all dependencies at once
npm run install:all

# Or install individually
cd frontend && npm install
cd ../backend && npm install
```

3. Configure environment variables:

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your settings

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your settings
```

### Running the Application

#### Development Mode

1. Start the backend server:

```bash
cd backend
npm run dev
```

Backend runs on `http://localhost:4000`

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

#### Production Build

Frontend:

```bash
cd frontend
npm run build
npm run preview
```

Backend:

```bash
cd backend
npm run build
npm start
```

## Environment Setup

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
PORT=4000
DATABASE_URL=mongodb://localhost:27017/git-github-workshop
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=yourpassword
DISCORD_INVITE=https://discord.gg/yourinvite
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_this_password
```

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:4000
```

## API Endpoints

### Public Endpoints

- `POST /api/register` - Register a new user
  - Body: `{ name, universityId, whatsapp, batch, github }`
  - Returns: `{ success: true, message: 'Registration successful' }`

### Admin Endpoints (Requires Authentication)

- `POST /api/admin/login` - Admin login
  - Body: `{ email, password }`
  - Returns: `{ success: true, token: 'jwt_token' }`
- `GET /api/admin/registrations?page=1&limit=50` - Get all registrations (paginated)
  - Headers: `Authorization: Bearer <token>`
  - Returns: Paginated list of registrations
- `GET /api/admin/stats` - Get registration statistics
  - Headers: `Authorization: Bearer <token>`
  - Returns: Total registrations, email stats, batch distribution
- `GET /api/admin/export` - Export registrations as CSV
  - Headers: `Authorization: Bearer <token>`
  - Returns: CSV file download
- `DELETE /api/admin/registrations/:id` - Delete a registration
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success message

## Admin Access

### Setting Up Admin User

1. **Set admin credentials** in `backend/.env`:

   ```env
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

2. **Seed the admin user** to the database:

   ```bash
   cd backend
   npm run seed:admin
   ```

3. **Access the admin panel** at `http://localhost:5173/admin/login`

### Accessing the Admin Dashboard

1. Navigate to `http://localhost:5173/admin/login`
2. Login with the credentials from your database
3. After login, you'll be redirected to the dashboard

### Admin Features

- **Dashboard Overview**: View total registrations, email statistics, and batch distribution
- **Registrations Table**: See all registrations with detailed information
- **Export Data**: Download all registrations as a CSV file
- **Delete Entries**: Remove registrations if needed
- **Pagination**: Navigate through large datasets easily
- **Real-time Refresh**: Update data with a single click

### Security Notes

- **Change default credentials** in production!
- Admin tokens expire after 24 hours
- All admin routes are protected with JWT authentication
- Use HTTPS in production for secure token transmission

## Database Schema

### Registration Collection

```javascript
{
  _id: ObjectId,
  name: String,
  universityId: String,
  whatsapp: String,
  batch: String,
  github: String,
  emailSent: Boolean,
  createdAt: Date
}
```

## Security Features

- Input validation (client-side and server-side)
- Rate limiting on registration endpoint
- CSRF protection
- SQL injection prevention through Mongoose
- Environment variables for sensitive data
- JWT-based admin authentication

## Deployment

### Vercel Deployment (Recommended)

This project is configured for easy deployment to Vercel with both frontend and backend:

#### Quick Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Run deployment script
npm run deploy:vercel
```

#### Manual Deploy

```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Required Environment Variables for Vercel:

- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `EMAIL_HOST` - SMTP host (e.g., smtp.gmail.com)
- `EMAIL_PORT` - SMTP port (e.g., 587)
- `EMAIL_USER` - Your email address
- `EMAIL_PASS` - Your email password/app password
- `NODE_ENV` - Set to "production"

📖 **Detailed Guide**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

📋 **Checklist**: See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

### Alternative Deployments

#### Frontend Only

- Vercel / Netlify
- Build command: `npm run build`
- Output directory: `dist`

#### Backend Only

- Render / Heroku / DigitalOcean
- Start command: `npm start`
- Set environment variables in hosting platform

## Contributing

This is a workshop project. Feel free to fork and customize according to your needs.

## License

MIT License

## Support

For questions or issues, please join our Discord community or open an issue on GitHub.
