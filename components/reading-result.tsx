'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Star, ShoppingCart, Sparkles, Heart, ExternalLink } from 'lucide-react'
import { TarotCard } from '@/components/tarot-card'
import { generateRefLink, type Product } from '@/lib/supabase'
import type { TarotReading } from '@/lib/tarot'

interface ReadingResultProps {
  reading: TarotReading
}

export function ReadingResult({ reading }: ReadingResultProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?ids=${reading.recommendedProducts.join(',')}`)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    if (reading.recommendedProducts.length > 0) {
      fetchProducts()
    } else {
      setLoading(false)
    }
  }, [reading.recommendedProducts])

  const formatPrice = (priceInCents: number) => {
    return `NT$ ${(priceInCents / 100).toLocaleString()}`
  }

  const getProductLink = (product: Product) => {
    const refCode = process.env.NEXT_PUBLIC_REF_CODE || 'DEFAULT'
    return generateRefLink(product, refCode)
  }

  return (
    <div className="space-y-12">
      {/* Cards Display */}
      <div className="text-center">
        <h2 className="text-3xl font-heading text-primary mb-8">
          您的占卜結果
        </h2>
        
        <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: `repeat(${reading.cards.length}, 1fr)` }}>
          {reading.cards.map((cardReading, index) => (
            <TarotCard
              key={index}
              card={cardReading.card}
              isRevealed={true}
              isReversed={cardReading.isReversed}
              position={cardReading.position}
            />
          ))}
        </div>
      </div>

      {/* Interpretation */}
      <Card className="bg-card/50 border-border backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <Sparkles className="w-8 h-8 mx-auto text-primary mb-3" />
            <h3 className="text-2xl font-heading text-primary">占卜解讀</h3>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {reading.interpretation}
            </p>
          </div>

          {/* Individual Card Meanings */}
          <Separator className="my-8" />
          
          <div className="space-y-6">
            <h4 className="text-xl font-heading text-primary text-center">
              詳細牌義解析
            </h4>
            
            {reading.cards.map((cardReading, index) => (
              <div key={index} className="p-6 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-secondary/30">
                        {cardReading.position}
                      </Badge>
                      <h5 className="font-semibold text-primary">
                        {cardReading.card.name}
                        {cardReading.isReversed && ' (逆位)'}
                      </h5>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">
                      {cardReading.card.description}
                    </p>
                    
                    <div className="text-sm">
                      <p className="font-medium text-primary mb-1">建議：</p>
                      <p className="text-muted-foreground">
                        {cardReading.card.advice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Recommendations */}
      {!loading && products.length > 0 && (
        <Card className="bg-card/50 border-border backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary mb-4">
                <Heart className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-heading text-primary mb-3">
                專屬幸運物推薦
              </h3>
              <p className="text-muted-foreground">
                根據您的占卜結果，我們為您精選了能夠增強運勢的特別商品
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover-lift bg-muted/20 border-border">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {product.image_url && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary mb-2">
                          {product.name}
                        </h4>
                        <p className="text-lg font-bold text-secondary mb-3">
                          {formatPrice(product.price_in_cents)}
                        </p>
                        
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            💫 為什麼推薦這個商品？
                          </p>
                          <p className="text-sm text-muted-foreground">
                            根據您抽到的牌，這個商品能夠幫助您增強{' '}
                            {reading.cards.map(c => c.card.productTags[0]).join('、')}的能量，
                            為您的生活帶來正面的轉變。
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <Button asChild className="w-full breathing-glow">
                        <a 
                          href={getProductLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          立即獲得幸運物
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <div className="inline-flex items-center text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 mr-2" />
                點擊商品連結將為您帶來額外的幸運能量
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reading Summary */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6 text-center">
          <Star className="w-8 h-8 mx-auto text-primary mb-3" />
          <h4 className="text-lg font-heading text-primary mb-2">
            占卜完成
          </h4>
          <p className="text-muted-foreground text-sm">
            占卜時間：{reading.timestamp.toLocaleString('zh-TW')}
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            請將這次的指引牢記在心，讓塔羅的智慧陪伴您前行
          </p>
        </CardContent>
      </Card>
    </div>
  )
}