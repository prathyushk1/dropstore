# 🔌 API Documentation

Complete API reference for your dropshipping ecommerce platform.

---

## 📍 Base URL

```
http://localhost:3000/api
```

Production: `https://your-domain.com/api`

---

## 🔐 Authentication

Most endpoints require authentication. Include the session token in headers:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_TOKEN'
}
```

---

## 📦 Products API

### Get All Products
```
GET /api/products
```

**Query Parameters:**
- `category` - Filter by category slug
- `search` - Search products by name
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sort` - Sort by: `price_asc`, `price_desc`, `newest`, `popular`
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)

**Example:**
```
GET /api/products?category=electronics&sort=price_asc&page=1&limit=12
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Wireless Earbuds Pro",
      "slug": "wireless-earbuds-pro",
      "price": 2999,
      "compare_price": 3999,
      "images": ["url1", "url2"],
      "rating": 4.5,
      "stock": 50,
      "category": {
        "id": "uuid",
        "name": "Electronics",
        "slug": "electronics"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 48,
    "totalPages": 4
  }
}
```

---

### Get Single Product
```
GET /api/products/:id
```

**Example:**
```
GET /api/products/uuid-here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Wireless Earbuds Pro",
    "slug": "wireless-earbuds-pro",
    "description": "Full description...",
    "short_description": "Brief description",
    "price": 2999,
    "compare_price": 3999,
    "cost_price": 1500,
    "sku": "WEP-001",
    "stock": 50,
    "images": ["url1", "url2", "url3"],
    "specifications": {
      "Battery": "30 hours",
      "Bluetooth": "5.3"
    },
    "category": {
      "id": "uuid",
      "name": "Electronics"
    },
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "title": "Great product!",
        "comment": "Love it!",
        "user": {
          "name": "John Doe"
        },
        "created_at": "2024-01-15"
      }
    ],
    "related_products": []
  }
}
```

---

### Create Product (Admin Only)
```
POST /api/products
```

**Body:**
```json
{
  "name": "New Product",
  "slug": "new-product",
  "description": "Product description",
  "price": 2999,
  "sku": "NP-001",
  "stock": 100,
  "category_id": "uuid",
  "images": ["url1", "url2"],
  "is_active": true
}
```

---

### Update Product (Admin Only)
```
PUT /api/products/:id
```

---

### Delete Product (Admin Only)
```
DELETE /api/products/:id
```

---

## 🏷️ Categories API

### Get All Categories
```
GET /api/categories
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Electronics",
      "slug": "electronics",
      "description": "Electronic devices",
      "image": "url",
      "product_count": 45
    }
  ]
}
```

---

### Get Category with Products
```
GET /api/categories/:slug
```

**Example:**
```
GET /api/categories/electronics
```

---

### Create Category (Admin Only)
```
POST /api/categories
```

**Body:**
```json
{
  "name": "New Category",
  "slug": "new-category",
  "description": "Category description",
  "image": "url"
}
```

---

## 🛒 Cart API

### Get Cart
```
GET /api/cart
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "product": {
          "id": "uuid",
          "name": "Product Name",
          "price": 2999,
          "image": "url"
        },
        "quantity": 2,
        "subtotal": 5998
      }
    ],
    "subtotal": 5998,
    "shipping": 0,
    "tax": 0,
    "total": 5998
  }
}
```

---

### Add to Cart
```
POST /api/cart
```

**Body:**
```json
{
  "product_id": "uuid",
  "quantity": 1
}
```

---

### Update Cart Item
```
PUT /api/cart/:item_id
```

**Body:**
```json
{
  "quantity": 3
}
```

---

### Remove from Cart
```
DELETE /api/cart/:item_id
```

---

### Clear Cart
```
DELETE /api/cart
```

---

## 📦 Orders API

### Get User Orders
```
GET /api/orders
```

**Query Parameters:**
- `status` - Filter by status: `pending`, `processing`, `shipped`, `delivered`, `cancelled`
- `page` - Page number
- `limit` - Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "order_number": "ORD-001",
      "status": "delivered",
      "total": 5998,
      "items_count": 2,
      "created_at": "2024-01-15",
      "shipping_address": {
        "name": "John Doe",
        "address": "123 Main St",
        "city": "Mumbai"
      }
    }
  ]
}
```

---

### Get Single Order
```
GET /api/orders/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "order_number": "ORD-001",
    "status": "delivered",
    "payment_status": "paid",
    "items": [
      {
        "product": {
          "name": "Product Name",
          "image": "url"
        },
        "quantity": 2,
        "price": 2999,
        "total": 5998
      }
    ],
    "subtotal": 5998,
    "shipping": 0,
    "tax": 0,
    "total": 5998,
    "shipping_address": {},
    "created_at": "2024-01-15"
  }
}
```

---

### Create Order
```
POST /api/orders
```

**Body:**
```json
{
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2,
      "price": 2999
    }
  ],
  "shipping_address": {
    "name": "John Doe",
    "phone": "9876543210",
    "address_line1": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postal_code": "400001",
    "country": "India"
  },
  "payment_method": "razorpay",
  "coupon_code": "WELCOME20"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "order_id": "uuid",
    "order_number": "ORD-001",
    "total": 5998,
    "payment_required": true,
    "razorpay_order_id": "order_xxx"
  }
}
```

---

### Update Order Status (Admin Only)
```
PUT /api/orders/:id/status
```

**Body:**
```json
{
  "status": "shipped",
  "tracking_number": "TRACK123"
}
```

---

## 💳 Payment API

### Create Payment Intent
```
POST /api/payment/create
```

**Body:**
```json
{
  "order_id": "uuid",
  "amount": 5998
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "razorpay_order_id": "order_xxx",
    "amount": 5998,
    "currency": "INR",
    "key_id": "rzp_test_xxx"
  }
}
```

---

### Verify Payment
```
POST /api/payment/verify
```

**Body:**
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx",
  "order_id": "uuid"
}
```

---

## 🔐 Authentication API

### Sign Up
```
POST /api/auth/signup
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "john@example.com",
      "name": "John Doe"
    },
    "session": {
      "access_token": "token_xxx"
    }
  }
}
```

---

### Sign In
```
POST /api/auth/signin
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Sign Out
```
POST /api/auth/signout
```

---

### Get Current User
```
GET /api/auth/me
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "customer",
    "avatar": "url"
  }
}
```

---

## 👤 User Profile API

### Get Profile
```
GET /api/user/profile
```

---

### Update Profile
```
PUT /api/user/profile
```

**Body:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "avatar": "url"
}
```

---

### Get Addresses
```
GET /api/user/addresses
```

---

### Add Address
```
POST /api/user/addresses
```

**Body:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "address_line1": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "postal_code": "400001",
  "country": "India",
  "is_default": true
}
```

---

### Update Address
```
PUT /api/user/addresses/:id
```

---

### Delete Address
```
DELETE /api/user/addresses/:id
```

---

## ❤️ Wishlist API

### Get Wishlist
```
GET /api/wishlist
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "product": {
        "id": "uuid",
        "name": "Product Name",
        "price": 2999,
        "image": "url",
        "in_stock": true
      },
      "added_at": "2024-01-15"
    }
  ]
}
```

---

### Add to Wishlist
```
POST /api/wishlist
```

**Body:**
```json
{
  "product_id": "uuid"
}
```

---

### Remove from Wishlist
```
DELETE /api/wishlist/:product_id
```

---

## ⭐ Reviews API

### Get Product Reviews
```
GET /api/products/:id/reviews
```

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `sort` - Sort by: `newest`, `highest`, `lowest`

---

### Add Review
```
POST /api/products/:id/reviews
```

**Body:**
```json
{
  "rating": 5,
  "title": "Great product!",
  "comment": "I love this product. Highly recommended!"
}
```

---

### Update Review
```
PUT /api/reviews/:id
```

---

### Delete Review
```
DELETE /api/reviews/:id
```

---

## 🎟️ Coupons API

### Validate Coupon
```
POST /api/coupons/validate
```

**Body:**
```json
{
  "code": "WELCOME20",
  "order_total": 5998
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "code": "WELCOME20",
    "type": "percentage",
    "value": 20,
    "discount_amount": 1199.6,
    "final_total": 4798.4
  }
}
```

---

### Get All Coupons (Admin Only)
```
GET /api/admin/coupons
```

---

### Create Coupon (Admin Only)
```
POST /api/admin/coupons
```

**Body:**
```json
{
  "code": "SUMMER25",
  "type": "percentage",
  "value": 25,
  "min_order_value": 2000,
  "usage_limit": 100,
  "expires_at": "2024-12-31"
}
```

---

## 📊 Admin Analytics API

### Get Dashboard Stats
```
GET /api/admin/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_revenue": 124500,
    "total_orders": 156,
    "total_products": 89,
    "total_customers": 1234,
    "revenue_change": "+12.5%",
    "orders_change": "+8.2%"
  }
}
```

---

### Get Sales Report
```
GET /api/admin/reports/sales
```

**Query Parameters:**
- `start_date` - Start date (YYYY-MM-DD)
- `end_date` - End date (YYYY-MM-DD)
- `group_by` - Group by: `day`, `week`, `month`

---

## 🔍 Search API

### Search Products
```
GET /api/search
```

**Query Parameters:**
- `q` - Search query
- `category` - Filter by category
- `page` - Page number
- `limit` - Items per page

**Example:**
```
GET /api/search?q=wireless&category=electronics
```

---

## 📧 Newsletter API

### Subscribe
```
POST /api/newsletter/subscribe
```

**Body:**
```json
{
  "email": "john@example.com"
}
```

---

## 🚨 Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

**Common Error Codes:**
- `UNAUTHORIZED` - Not authenticated
- `FORBIDDEN` - Not authorized
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid input
- `SERVER_ERROR` - Internal server error

---

## 📝 Rate Limiting

- **Anonymous**: 100 requests per 15 minutes
- **Authenticated**: 1000 requests per 15 minutes
- **Admin**: Unlimited

---

## 🔒 Security

- All endpoints use HTTPS in production
- Passwords are hashed with bcrypt
- JWT tokens for authentication
- CSRF protection enabled
- Rate limiting on all endpoints
- Input validation with Zod

---

## 📚 Example Usage

### JavaScript/TypeScript
```typescript
// Get products
const response = await fetch('http://localhost:3000/api/products?category=electronics')
const data = await response.json()

// Add to cart (authenticated)
const response = await fetch('http://localhost:3000/api/cart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    product_id: 'uuid',
    quantity: 1
  })
})
```

---

## 🎯 Next Steps

1. Implement these API routes in `app/api/` folder
2. Connect to Supabase database
3. Add authentication middleware
4. Test all endpoints
5. Deploy to production

---

**API Base URL:** http://localhost:3000/api

**Need implementation? Let me know which endpoints to create first!** 🚀
