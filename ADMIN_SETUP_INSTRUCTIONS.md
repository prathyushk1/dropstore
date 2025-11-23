# Admin Setup Instructions

## Step 1: Run the Database Schema
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire content from `supabase-schema.sql`
4. Click **Run** to execute

## Step 2: Create Admin User in Supabase Auth
1. In Supabase dashboard, go to **Authentication** > **Users**
2. Click **Add User** (or **Invite User**)
3. Enter email: `admin@gmail.com` (or your preferred email)
4. Set a password
5. Click **Create User**
6. **Copy the User ID** (UUID) that appears in the users list

## Step 3: Add Admin to admin_users Table
1. Go back to **SQL Editor**
2. Run this query (replace `YOUR-USER-ID-HERE` with the actual UUID from step 2):

```sql
INSERT INTO admin_users (user_id, email, role)
VALUES ('YOUR-USER-ID-HERE', 'admin@gmail.com', 'admin');
```

Example:
```sql
INSERT INTO admin_users (user_id, email, role)
VALUES ('c27b3719-ffe2-48f2-9e18-b2a90fc43ac5', 'admin@gmail.com', 'admin');
```

## Step 4: Add Sample Data (Optional)
If you want test products to see how the store looks:
1. Open `sample-data.sql`
2. Copy and paste into SQL Editor
3. Click **Run**

## Step 5: Access Admin Panel
1. Start your development server: `npm run dev`
2. Go to: `http://localhost:3000/admin/login`
3. Enter the password you set in `.env.local` (ADMIN_PASSWORD)
4. You're in! 🎉

## Alternative: Simple Admin Login
If you prefer email/password login instead of just password:
- Go to: `http://localhost:3000/admin/login-simple`
- Use the Supabase auth credentials

## Troubleshooting

### Can't login to admin?
- Check that your user exists in `admin_users` table
- Verify the password in `.env.local` matches what you're entering
- Make sure you ran the schema SQL completely

### No products showing?
- Run the `sample-data.sql` to add test products
- Or add products manually through the admin panel

### Database errors?
- Make sure all tables were created (run the verification query at the end of schema file)
- Check Supabase logs for specific errors
