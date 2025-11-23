import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Store <onboarding@resend.dev>',
      to,
      subject,
      html,
    })
    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

// Order Confirmation Email
export async function sendOrderConfirmation(order: any) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .order-details { background: #fff; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .item { padding: 10px 0; border-bottom: 1px solid #eee; }
          .total { font-size: 18px; font-weight: bold; margin-top: 15px; }
          .button { display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmed!</h1>
          </div>
          <div class="content">
            <p>Hi ${order.shipping_address?.name || 'Customer'},</p>
            <p>Thank you for your order! We've received your order and will process it shortly.</p>
            
            <div class="order-details">
              <h2>Order #${order.order_number}</h2>
              <p><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
              <p><strong>Payment Status:</strong> ${order.payment_status}</p>
              
              <h3>Items:</h3>
              ${order.items.map((item: any) => `
                <div class="item">
                  <strong>${item.product?.name || 'Product'}</strong><br>
                  Quantity: ${item.quantity} × $${item.price.toFixed(2)} = $${item.total.toFixed(2)}
                </div>
              `).join('')}
              
              <div class="total">
                <p>Subtotal: $${order.subtotal.toFixed(2)}</p>
                ${order.discount > 0 ? `<p>Discount: -$${order.discount.toFixed(2)}</p>` : ''}
                <p>Shipping: $${order.shipping.toFixed(2)}</p>
                <p>Tax: $${order.tax.toFixed(2)}</p>
                <p style="font-size: 20px; color: #000;">Total: $${order.total.toFixed(2)}</p>
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}" class="button">
                View Order Details
              </a>
            </div>
            
            <p><strong>Shipping Address:</strong><br>
            ${order.shipping_address?.name}<br>
            ${order.shipping_address?.address_line1}<br>
            ${order.shipping_address?.address_line2 ? order.shipping_address.address_line2 + '<br>' : ''}
            ${order.shipping_address?.city}, ${order.shipping_address?.state} ${order.shipping_address?.postal_code}<br>
            ${order.shipping_address?.country}</p>
          </div>
          <div class="footer">
            <p>Questions? Contact us at support@yourstore.com</p>
            <p>&copy; ${new Date().getFullYear()} Your Store. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: order.user?.email || order.shipping_address?.email,
    subject: `Order Confirmation #${order.order_number}`,
    html,
  })
}

// Shipping Notification Email
export async function sendShippingNotification(order: any, trackingNumber?: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .tracking { background: #fff; padding: 20px; margin: 20px 0; border-radius: 5px; text-align: center; }
          .tracking-number { font-size: 24px; font-weight: bold; color: #000; padding: 15px; background: #f0f0f0; border-radius: 5px; margin: 15px 0; }
          .button { display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📦 Your Order Has Shipped!</h1>
          </div>
          <div class="content">
            <p>Hi ${order.shipping_address?.name || 'Customer'},</p>
            <p>Great news! Your order #${order.order_number} has been shipped and is on its way to you.</p>
            
            ${trackingNumber ? `
              <div class="tracking">
                <h2>Tracking Information</h2>
                <div class="tracking-number">${trackingNumber}</div>
                <a href="https://track.yourshipping.com/${trackingNumber}" class="button">
                  Track Your Package
                </a>
              </div>
            ` : ''}
            
            <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
            
            <p><strong>Shipping Address:</strong><br>
            ${order.shipping_address?.name}<br>
            ${order.shipping_address?.address_line1}<br>
            ${order.shipping_address?.city}, ${order.shipping_address?.state} ${order.shipping_address?.postal_code}</p>
          </div>
          <div class="footer">
            <p>Questions? Contact us at support@yourstore.com</p>
            <p>&copy; ${new Date().getFullYear()} Your Store. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: order.user?.email || order.shipping_address?.email,
    subject: `Your Order #${order.order_number} Has Shipped!`,
    html,
  })
}

// Low Stock Alert Email (for admin)
export async function sendLowStockAlert(product: any) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: #fff; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .alert { background: #fff; padding: 20px; margin: 20px 0; border-left: 4px solid #dc2626; }
          .button { display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚠️ Low Stock Alert</h1>
          </div>
          <div class="content">
            <div class="alert">
              <h2>${product.name}</h2>
              <p><strong>SKU:</strong> ${product.sku}</p>
              <p><strong>Current Stock:</strong> ${product.stock} units</p>
              <p><strong>Status:</strong> ${product.stock === 0 ? 'OUT OF STOCK' : 'LOW STOCK'}</p>
            </div>
            
            <p>This product needs to be restocked soon to avoid running out.</p>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/products/${product.id}" class="button">
                Manage Product
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: process.env.ADMIN_EMAIL || 'admin@yourstore.com',
    subject: `Low Stock Alert: ${product.name}`,
    html,
  })
}
