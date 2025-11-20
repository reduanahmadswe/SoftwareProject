# Database-Based Admin Authentication Setup ✅

## What Changed

The admin system now uses **MongoDB database** for storing admin credentials instead of environment variables.

### New Features

- ✅ Admin credentials stored securely in MongoDB
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Admin model with password comparison method
- ✅ Seed script to create admin user
- ✅ Database validation before login

## Files Created/Modified

### New Files

1. **`backend/src/models/Admin.model.ts`** - Admin user model with bcrypt hashing
2. **`backend/src/scripts/seedAdmin.ts`** - Script to seed admin user to database

### Modified Files

1. **`backend/src/middleware/auth.middleware.ts`** - Updated to use database admin
2. **`backend/package.json`** - Added `seed:admin` script

## How to Use

### 1. Configure Admin Credentials

Edit `backend/.env`:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
JWT_SECRET=your_super_secret_jwt_key_here
DATABASE_URL=mongodb://localhost:27017/git-github-workshop
```

### 2. Run Seed Script

```bash
cd backend
npm run seed:admin
```

**Output:**

```
✅ MongoDB connected successfully
✅ Admin user created successfully!
   Email: admin@example.com
   Password: admin123

⚠️  Please change the default password after first login!
```

### 3. Start the Server

```bash
npm run dev
```

### 4. Login to Admin Panel

Visit: `http://localhost:5173/admin/login`

Use the credentials:

- Email: `admin@example.com`
- Password: `admin123`

## Database Schema

```javascript
Admin Collection:
{
  _id: ObjectId,
  email: String (unique, lowercase),
  password: String (bcrypt hashed),
  name: String,
  role: String (default: 'admin'),
  createdAt: Date
}
```

## Security Features

### Password Hashing

- Passwords are hashed using **bcrypt** with 10 salt rounds
- Passwords are never stored in plain text
- Pre-save hook automatically hashes passwords

### Password Comparison

```typescript
const isValid = await admin.comparePassword(inputPassword);
```

### JWT Token

- Token contains: `{ email, id }`
- Expires in: 24 hours
- Required for all admin endpoints

## Commands

### Seed Admin User

```bash
npm run seed:admin
```

### Check if Admin Exists

The seed script automatically checks if admin exists and won't create duplicates.

## Important Notes

⚠️ **Change Default Password**: Always change the default password in production!

🔒 **Secure JWT Secret**: Use a strong, random JWT secret in production.

🗄️ **MongoDB Required**: Ensure MongoDB is running before seeding or starting the server.

## Troubleshooting

### "Admin user already exists"

- This is normal if you've already run the seed script
- To reset: Delete the admin from MongoDB and run seed again

### "MongoDB connection error"

- Check if MongoDB is running
- Verify DATABASE_URL in .env is correct

### Login fails after seeding

- Verify the password is exactly as set in .env
- Check backend console for error messages
- Ensure JWT_SECRET is set in .env

## Production Recommendations

1. **Use strong passwords**: Generate random passwords
2. **Environment variables**: Never commit .env to git
3. **HTTPS**: Always use HTTPS in production
4. **Rate limiting**: Add rate limiting to login endpoint
5. **2FA**: Consider adding two-factor authentication
6. **Audit logs**: Log all admin actions

---

**Admin system is now using database-based authentication! 🎉**
