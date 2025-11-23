# 🚀 API Quick Reference

Quick guide to all available API endpoints.

---

## 📍 Base URL
```
http://localhost:3000/api
```

---

## ✅ Implemented APIs

### Products
- ✅ `GET /api/products` - Get all products with filters
- ✅ `GET /api/products/:id` - Get single product
- ✅ `POST /api/products` - Create product (Admin)
- ✅ `PUT /api/products/:id` - Update product (Admin)
- ✅ `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- ✅ `GET /api/categories` - Get all categories
- ✅ `POST /api/categories` - Create category (Admin)

---

## 🔜 To Be Implemented

### Cart
- ⏳ `GET /api/cart` - Get cart
- ⏳ `POST /api/cart` - Add to cart
- ⏳ `PUT /api/cart/:id` - Update cart item
- ⏳ `DELETE /api/cart/:id` - Remove from cart

### Orders
- ⏳ `GET /api/orders` - Get user orders
- ⏳ `GET /api/orders/:id` - Get single order
- ⏳ `POST /api/orders` - Create order

### Auth
- ⏳ `POST /api/auth/signup` - Sign up
- ⏳ `POST /api/auth/signin` - Sign in
- ⏳ `POST /api/auth/signout` - Sign out
- ⏳ `GET /api/auth/me` - Get current user

### Wishlist
- ⏳ `GET /api/wishlist` - Get wishlist
- ⏳ `POST /api/wishlist` - Add to wishlist
- ⏳ `DELETE /api/wishlist/:id` - Remove from wishlist

### Payment
- ⏳ `POST /api/payment/create` - Create payment
- ⏳ `POST /api/payment/verify` - Verify payment

---

## 🧪 Test the APIs

### Using Browser
```
http://localhost:3000/api/products
http://localhost:3000/api/categories
```

### Using cURL
```bash
# Get products
curl http://localhost:3000/api/products

# Get products with filters
curl "http://localhost:3000/api/products?category=electronics&sort=price_asc"

# Get single product
curl http://localhost:3000/api/products/YOUR_PRODUCT_ID

# Get categories
curl http://localhost:3000/api/categories
```

### Using JavaScript
```javascript
// Get products
fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(data => console.log(data))

// Get products with filters
fetch('http://localhost:3000/api/products?category=electronics&page=1&limit=12')
  .then(res => res.json())
  .then(data => console.log(data))

// Get single product
fetch('http://localhost:3000/api/products/YOUR_PRODUCT_ID')
  .then(res => res.json())
  .then(data => console.log(data))
```

---

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

---

## 🔑 Query Parameters

### Products API
```
?category=electronics     # Filter by category
?search=wireless         # Search products
?minPrice=1000          # Minimum price
?maxPrice=5000          # Maximum price
?sort=price_asc         # Sort by price ascending
?sort=price_desc        # Sort by price descending
?sort=newest            # Sort by newest
?page=1                 # Page number
?limit=12               # Items per page
```

### Example URLs
```
/api/products?category=electronics
/api/products?search=wireless&sort=price_asc
/api/products?minPrice=1000&maxPrice=5000
/api/products?category=fashion&page=2&limit=20
```

---

## 🎯 Next Steps

1. **Test existing APIs** - Try the products and categories endpoints
2. **Set up Supabase** - Connect database for real data
3. **Implement remaining APIs** - Cart, orders, auth, etc.
4. **Add authentication** - Protect user-specific endpoints
5. **Test with Postman** - Full API testing

---

## 📚 Full Documentation

See **API_DOCUMENTATION.md** for complete API reference with all endpoints, request/response examples, and authentication details.

---

**Current Status:**
- ✅ Products API - Working
- ✅ Categories API - Working
- ⏳ Cart API - Coming soon
- ⏳ Orders API - Coming soon
- ⏳ Auth API - Coming soon

**Test now:** http://localhost:3000/api/products 🚀
