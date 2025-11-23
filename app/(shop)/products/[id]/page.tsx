import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from "lucide-react"

// Dummy product data
const product = {
  id: '1',
  name: 'Wireless Earbuds Pro Max',
  price: 2999,
  comparePrice: 4999,
  rating: 4.5,
  reviews: 128,
  images: [
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
    'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800',
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800',
  ],
  description: 'Experience premium sound quality with our Wireless Earbuds Pro Max. Featuring active noise cancellation, 30-hour battery life, and crystal-clear audio for music and calls.',
  specifications: {
    'Battery Life': '30 hours',
    'Bluetooth': '5.3',
    'Water Resistance': 'IPX7',
    'Charging': 'USB-C Fast Charging',
    'Weight': '45g',
  },
  inStock: true,
  category: 'Electronics',
}

const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
  id: `${i + 2}`,
  name: `Related Product ${i + 1}`,
  price: Math.floor(Math.random() * 5000) + 1000,
  image: `https://images.unsplash.com/photo-${1523275335684 + i}?w=400`,
  rating: (Math.random() * 2 + 3).toFixed(1),
}))

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(1).map((img, i) => (
              <div key={i} className="aspect-square relative rounded-lg overflow-hidden border cursor-pointer hover:border-primary">
                <Image src={img} alt={`${product.name} ${i + 2}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <Badge className="mb-2">{product.category}</Badge>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">₹{product.price}</span>
            <span className="text-xl text-muted-foreground line-through">₹{product.comparePrice}</span>
            <Badge variant="destructive">
              {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
            </Badge>
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-green-600" />
              <span>Free delivery on orders above ₹500</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RotateCcw className="h-5 w-5 text-blue-600" />
              <span>7 days easy return policy</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-purple-600" />
              <span>1 year warranty</span>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Button size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Specifications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Specifications</h3>
              <dl className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <Link key={item.id} href={`/products/${item.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{item.rating}</span>
                  </div>
                  <span className="text-lg font-bold">₹{item.price}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
