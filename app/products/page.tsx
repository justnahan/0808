import { Suspense } from 'react'
import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { ProductGrid } from '@/components/product-grid'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Filter, Star, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: '商品商城 - 星語集',
  description: '精選開運飾品、占卜工具、儀式用品、星座禮盒，為您帶來神秘力量與幸運能量',
}

export default function ProductsPage() {
  const categories = [
    { name: '開運飾品', count: 24, active: true },
    { name: '占卜工具', count: 18 },
    { name: '儀式用品', count: 12 },
    { name: '星座禮盒', count: 8 },
  ]

  return (
    <div className="min-h-screen particle-bg">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              精選神秘商品
            </Badge>
            
            <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              商品商城
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              精選開運飾品、占卜工具、儀式用品，每一件商品都蘊含著古老的智慧與神秘的能量
            </p>
          </header>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button variant="outline" size="sm" className="border-primary/30">
              <Filter className="w-4 h-4 mr-2" />
              篩選
            </Button>
            
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant={category.active ? "default" : "outline"}
                className={`px-4 py-2 cursor-pointer hover:bg-primary/20 transition-colors ${
                  category.active ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>

          {/* Featured Products */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl text-primary mb-2">
                本週精選
              </h2>
              <p className="text-muted-foreground">
                為您特別推薦的幸運物
              </p>
            </div>
            
            <Suspense fallback={
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse bg-card/30">
                    <div className="h-64 bg-muted/20 rounded-t-lg"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted/20 rounded mb-2"></div>
                      <div className="h-6 bg-muted/20 rounded mb-4"></div>
                      <div className="h-10 bg-muted/20 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            }>
              <ProductGrid />
            </Suspense>
          </section>

          {/* Empty State for Additional Products */}
          <section className="text-center py-16">
            <div className="inline-block p-8 bg-card/50 rounded-lg border border-border backdrop-blur-sm">
              <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-heading text-xl text-primary mb-2">
                更多商品即將上線
              </h3>
              <p className="text-muted-foreground mb-6">
                我們正在為您精心挑選更多神秘商品<br />
                敬請期待更豐富的占卜工具與開運飾品
              </p>
              <Button variant="outline">
                <Sparkles className="w-4 h-4 mr-2" />
                訂閱上架通知
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}