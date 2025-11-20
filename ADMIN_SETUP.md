# Admin Panel - Quick Setup Guide

## ✅ What Was Created

### Frontend (React + TypeScript)

1. **AdminLogin Page** (`frontend/src/pages/AdminLogin.tsx`)

   - Beautiful login form with Azure depths theme
   - Email and password authentication
   - Error handling and loading states

2. **AdminDashboard Page** (`frontend/src/pages/AdminDashboard.tsx`)

   - Statistics overview (total registrations, email status, batches)
   - Full registrations table with all details
   - CSV export functionality
   - Delete registration feature
   - Pagination support
   - Refresh button

3. **Updated API Client** (`frontend/src/api/client.ts`)

   - Added admin login endpoint
   - Get registrations with pagination
   - Get statistics
   - Export CSV
   - Delete registration
   - JWT token authentication

4. **Updated Routes** (`frontend/src/App.tsx`)
   - `/admin/login` - Admin login page
   - `/admin/dashboard` - Admin dashboard

### Backend (Already Existed)

- Admin controller with all endpoints
- JWT authentication middleware
- Protected routes

### Documentation

- **ADMIN_GUIDE.md** - Comprehensive admin panel user guide
- **Updated README.md** - Added admin features documentation

## 🚀 How to Use

### Step 1: Set Admin Credentials

Edit `backend/.env`:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
JWT_SECRET=your_super_secret_jwt_key_here
```

### Step 2: Seed Admin User to Database

Run this command to create the admin user in MongoDB:

```bash
cd backend
npm run seed:admin
```

You should see:

```
✅ MongoDB connected successfully
✅ Admin user created successfully!
   Email: admin@example.com
   Password: admin123
```

> **Note**: If the admin already exists, you'll see: `⚠️ Admin user already exists`

### Step 3: Start the Backend

```bash
cd backend
npm run dev
```

Server runs on: `http://localhost:4000`

### Step 4: Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Step 5: Access Admin Panel

1. Open browser: `http://localhost:5173/admin/login`
2. Login with your admin credentials
3. You'll be redirected to the dashboard

## 📋 Dashboard Features

### Statistics Cards

- **Total Registrations** - All registered participants
- **Emails Sent** - Successfully sent confirmation emails
- **Pending Emails** - Awaiting email delivery
- **Total Batches** - Number of unique batches

### Registrations Table

View all participant data:

- Name
- University ID
- WhatsApp number
- Batch
- GitHub profile (clickable link)
- Email status (Sent/Pending)
- Registration date
- Delete button

### Actions

- **Refresh** - Reload all data
- **Export CSV** - Download registrations as CSV file
- **Delete** - Remove individual registrations
- **Logout** - End admin session
- **Pagination** - Navigate through pages (50 records per page)

## 🔐 Security Features

- JWT token authentication (24-hour expiration)
- Protected routes (auto-redirect if not authenticated)
- Secure token storage in localStorage
- All admin API calls include authentication header
- Logout clears token

## 🎨 Theme

The admin panel uses the same **Azure Depths** theme as the main site:

- Dark gradient background (black to deep blue)
- Glass-morphism cards with backdrop blur
- Blue and white text colors
- Smooth transitions and hover effects

## 📊 API Endpoints

All admin endpoints are in `/api/admin/*`:

| Method | Endpoint                       | Description                       |
| ------ | ------------------------------ | --------------------------------- |
| POST   | `/api/admin/login`             | Admin login                       |
| GET    | `/api/admin/stats`             | Get statistics                    |
| GET    | `/api/admin/registrations`     | Get all registrations (paginated) |
| GET    | `/api/admin/export`            | Download CSV                      |
| DELETE | `/api/admin/registrations/:id` | Delete a registration             |

## 🧪 Testing

### 1. Test Login

```bash
curl -X POST http://localhost:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"change_this_password"}'
```

### 2. Test Get Registrations (use token from login)

```bash
curl http://localhost:4000/api/admin/registrations \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Test Stats

```bash
curl http://localhost:4000/api/admin/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## ⚠️ Important Notes

1. **Change default credentials** in production
2. **Use HTTPS** in production
3. Token expires after 24 hours
4. All routes are protected except login
5. CSV export works with blob download
6. Pagination shows 50 records per page

## 🐛 Troubleshooting

### Can't login?

- Check backend `.env` file has correct credentials
- Restart backend server after changing `.env`
- Check backend console for errors

### Not seeing registrations?

- Ensure MongoDB is running
- Check database has data
- Click refresh button
- Check browser console for errors

### Export not working?

- Check token hasn't expired
- Verify backend has write permissions
- Check browser download settings

### 401 Errors?

- Token expired (login again)
- Token missing (logout and login)
- Check JWT_SECRET matches

## 📞 Support

For detailed information, see:

- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) - Complete user guide
- [README.md](./README.md) - Project documentation
- [API_TESTING.md](./API_TESTING.md) - API testing guide

---

**Admin Panel is Ready! 🎉**

Navigate to `http://localhost:5173/admin/login` and start managing registrations!
