# Admin Panel Guide

## Quick Start

### 1. Access the Admin Panel

Navigate to: `http://localhost:5173/admin/login` (or your deployed URL + `/admin/login`)

### 2. Login Credentials

Use the credentials from your `.env` file:

- **Email**: `ADMIN_EMAIL` (default: `admin@example.com`)
- **Password**: `ADMIN_PASSWORD` (default: `change_this_password`)

> ⚠️ **Important**: Change these default credentials in production!

## Dashboard Features

### 📊 Statistics Overview

At the top of the dashboard, you'll see four key metrics:

1. **Total Registrations** - Total number of participants registered
2. **Emails Sent** - Number of confirmation emails successfully sent
3. **Pending Emails** - Registrations awaiting email confirmation
4. **Total Batches** - Number of unique batches represented

### 📋 Registrations Table

View all registrations with the following information:

- Name
- University ID
- WhatsApp number
- Batch
- GitHub username/profile
- Email status (Sent/Pending)
- Registration date
- Delete action

### 🔄 Refresh Data

Click the **Refresh** button in the header to reload all data from the database.

### 📥 Export to CSV

Click the **Export CSV** button to download all registrations as a CSV file. The file includes:

- All registration fields
- Timestamps
- Email status

The CSV file is automatically named with the current date: `registrations-YYYY-MM-DD.csv`

### 🗑️ Delete Registration

Click the trash icon (🗑️) next to any registration to delete it. You'll be asked to confirm before deletion.

### 📄 Pagination

Navigate through multiple pages of registrations using the **Previous** and **Next** buttons at the bottom of the table.

## Security Features

### JWT Authentication

- Login generates a JWT token valid for 24 hours
- Token is stored in browser's localStorage
- All admin API calls include the token in headers
- Expired tokens automatically redirect to login

### Automatic Logout

- Click the **Logout** button to manually end your session
- Token is cleared from localStorage
- You'll be redirected to the login page

## Troubleshooting

### Can't Login?

1. Check your `.env` file for correct `ADMIN_EMAIL` and `ADMIN_PASSWORD`
2. Restart the backend server after changing `.env`
3. Clear browser cache/localStorage

### Not Seeing Data?

1. Verify backend is running (`npm run dev` in `/backend`)
2. Check MongoDB connection
3. Click the Refresh button
4. Check browser console for errors

### Export Not Working?

1. Ensure you're logged in (token not expired)
2. Check browser's download settings
3. Verify backend has write permissions

### 401 Unauthorized Errors?

- Your token has expired (24 hours)
- Log out and log back in
- Check if `JWT_SECRET` matches between sessions

## API Endpoints Used

The admin dashboard uses these backend endpoints:

- `POST /api/admin/login` - Authentication
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/registrations?page=1&limit=50` - Get registrations
- `GET /api/admin/export` - Export CSV
- `DELETE /api/admin/registrations/:id` - Delete registration

## Production Deployment

### Before Deploying:

1. **Change Admin Credentials**

   ```env
   ADMIN_EMAIL=your-secure-email@domain.com
   ADMIN_PASSWORD=use-a-strong-password-here
   ```

2. **Update JWT Secret**

   ```env
   JWT_SECRET=generate-a-long-random-secure-key
   ```

3. **Set Frontend URL**

   ```env
   FRONTEND_URL=https://your-production-domain.com
   ```

4. **Enable HTTPS**

   - Use SSL certificates
   - Ensure all API calls use HTTPS

5. **Environment Variables**
   - Set all environment variables in your hosting platform
   - Never commit `.env` files to git

### Recommended Security Enhancements:

- Implement rate limiting on login endpoint
- Add multi-factor authentication (MFA)
- Set up IP whitelisting for admin routes
- Enable audit logging for admin actions
- Use a secrets manager for credentials
- Implement role-based access control (RBAC) for multiple admins

## Support

For issues or questions:

- Check the main [README.md](./README.md)
- Review [API_TESTING.md](./API_TESTING.md) for API details
- Open an issue on the project repository
