import { toast } from "sonner"

export const toastUtils = {
  // Cart actions
  addedToCart: (productName: string) => {
    toast.success(`${productName} added to cart!`)
  },
  
  removedFromCart: (productName: string) => {
    toast.info(`${productName} removed from cart`)
  },
  
  // Wishlist actions
  addedToWishlist: (productName: string) => {
    toast.success(`${productName} added to wishlist!`)
  },
  
  removedFromWishlist: (productName: string) => {
    toast.info(`${productName} removed from wishlist`)
  },
  
  // Order actions
  orderPlaced: (orderId: string) => {
    toast.success(`Order #${orderId} placed successfully!`)
  },
  
  orderCancelled: (orderId: string) => {
    toast.info(`Order #${orderId} has been cancelled`)
  },
  
  // Auth actions
  loginSuccess: () => {
    toast.success("Welcome back!")
  },
  
  logoutSuccess: () => {
    toast.info("You've been logged out")
  },
  
  // Generic actions
  copied: (text: string = "Copied to clipboard") => {
    toast.success(text)
  },
  
  error: (message: string = "Something went wrong") => {
    toast.error(message)
  },
  
  // Promise wrapper for async operations
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    }
  ) => {
    return toast.promise(promise, messages)
  }
}
