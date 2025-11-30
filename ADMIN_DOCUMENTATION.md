# Admin System Documentation

## Overview
The admin panel provides a complete interface for managing your e-commerce store, including products, orders, categories, coupons, and settings.

## Authentication

### Simple Password Login (Recommended)
- **URL**: `/admin/login-simple`
- **Method**: Password-based authentication
- **Default Password**: `admin123`
- **How to Change**: Set `ADMIN_PASSWORD` in your `.env.local` file

**Example:**
```env
ADMIN_PASSWORD=your_secure_password_here
```

### Supabase-Based Login (Advanced)
- **URL**: `/admin/login`
- **Method**: Email/Password with Supabase Auth
- **Requirement**: User must be added to `admin_users` table

**To add an admin user:**
1. Create a user account via Supabase Auth
2. Get the user's UUID
3. Run this SQL in Supabase SQL Editor:
```sql
INSERT INTO admin_users (user_id, email, role)
VALUES ('user-uuid-here', 'admin@example.com', 'admin');
```

## Accessing the Admin Panel

1. Navigate to: `http://localhost:3000/admin/login-simple`
2. Enter the admin password (default: `admin123`)
3. Click "Login to Admin Panel"
4. You'll be redirected to the dashboard

## Admin Features

### Dashboard (`/admin`)
- Overview statistics (Revenue, Orders, Products, Customers)
- Revenue chart
- Recent activity feed
- Quick action buttons

### Products (`/admin/products`)
- View all products
- Add new products
- Edit existing products
- Manage inventory
- Upload product images

### Categories (`/admin/categories`)
- Create and manage product categories
- Organize category hierarchy
- Edit category details

### Orders (`/admin/orders`)
- View all orders
- Update order status
- View order details
- Track shipments

### Coupons (`/admin/coupons`)
- Create discount coupons
- Set coupon rules (percentage/fixed amount)
- Manage coupon expiration
- Track coupon usage

### Settings (`/admin/settings`)
- Store configuration
- Payment settings
- Shipping options
- General preferences

## Security Best Practices

### 1. Change Default Password
**CRITICAL**: Change the default admin password immediately in production.

```env
# .env.local
ADMIN_PASSWORD=your_very_secure_password_123!@#
```

### 2. Use HTTPS in Production
Ensure your production site uses HTTPS to encrypt the admin password during transmission.

### 3. Limit Admin Access
- Don't share admin credentials
- Use unique passwords
- Consider IP whitelisting for admin routes

### 4. Regular Backups
Regularly backup your database, especially before making bulk changes.

## Troubleshooting

### Blank Page After Login
If you see a blank page after logging in:
1. Open browser console (F12)
2. Check for JavaScript errors
3. Clear browser cache and cookies
4. Try logging out and back in
5. Ensure dev server is running (`npm run dev`)

### Can't Login
If login fails:
1. Verify password matches `ADMIN_PASSWORD` in `.env.local`
2. Check if `.env.local` file exists
3. Restart the dev server after changing environment variables
4. Try the simple login at `/admin/login-simple`

### Session Expires
Sessions last 7 days by default. After that, you'll need to log in again.

## Development

### Running Locally
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Environment Variables
Required variables for admin panel:
```env
# Optional - defaults to 'admin123' if not set
ADMIN_PASSWORD=your_password_here

# Required for Supabase-based admin login
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## API Routes

### Check Authentication
- **Endpoint**: `/api/admin/check-auth`
- **Method**: GET
- **Returns**: `{ authenticated: true/false }`

### Login
- **Endpoint**: `/api/admin/login`
- **Method**: POST
- **Body**: `{ password: string }`
- **Returns**: `{ success: true }` or `{ error: string }`

### Logout
- **Endpoint**: `/api/admin/logout`
- **Method**: POST
- **Returns**: `{ success: true }`

## Future Enhancements

Planned features for future releases:
- [ ] Role-based access control (Super Admin, Editor, Viewer)
- [ ] Activity logs and audit trail
- [ ] Two-factor authentication
- [ ] API key management
- [ ] Bulk product import/export
- [ ] Advanced analytics dashboard
- [ ] Email notifications for orders
- [ ] Inventory alerts

## Support

For issues or questions:
1. Check this documentation
2. Review the troubleshooting section
3. Check browser console for errors
4. Review server logs
