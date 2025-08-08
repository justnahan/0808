'use client'

import { useEffect, useState } from 'react'
import { Product, generateRefLink } from '@/lib/supabase'
import { EnhancedButton } from '@/components/ui/enhanced-button'
import { Card, CardContent } from '@/components/ui/enhanced-card'
import { Badge } from '@/components/ui/badge'
import { Star, Sparkles } from 'lucide-react'

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-8 bg-card/50 rounded-lg border border-border">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
          <p className="text-muted-foreground">
            商品資料載入中，請稍候...
          </p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-8 bg-card/50 rounded-lg border border-border">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            暫無商品資料
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {products.map((product) => (
        <Card key={product.id} variant="product" interactive className="group overflow-hidden">
          <div className="relative">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGNEQyOUYiIG9wYWNpdHk9IjAuMyIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0E3OEJGQSIgb3BhY2l0eT0iMC4zIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iI0Y0RDI5RiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWVhuWTgeWcluePiw==</text></svg>';
                }}
              />
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                <div className="text-center">
                  <Star className="w-12 h-12 mx-auto mb-2 text-primary/60" />
                  <p className="text-primary/60 text-sm">神秘商品</p>
                </div>
              </div>
            )}
            
            <div className="absolute top-4 right-4">
              <Badge className="bg-accent/90 text-accent-foreground">
                <Sparkles className="w-3 h-3 mr-1" />
                幸運物
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Star className="w-4 h-4 mr-1 text-accent" />
                  適合所有星座
                </div>
              </div>
              <div className="text-right">
                <p className="font-accent text-2xl font-semibold text-primary">
                  ${(product.price_in_cents / 100).toFixed(0)}
                </p>
                <p className="text-xs text-muted-foreground">含運費</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <EnhancedButton
                asChild
                variant="mystic"
                className="flex-1 particle-burst"
              >
                <a
                  href={generateRefLink(product, process.env.NEXT_PUBLIC_REF_CODE || 'DEFAULT')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  立即購買
                </a>
              </EnhancedButton>
              
              <EnhancedButton variant="outline" size="icon" className="border-primary/30 hover:bg-primary/10 golden-border">
                <Star className="w-4 h-4" />
              </EnhancedButton>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}