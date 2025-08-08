import { Suspense } from 'react'
import { Navigation } from '@/components/navigation'
import { EnhancedButton } from '@/components/ui/enhanced-button'
import { Card, CardContent } from '@/components/ui/enhanced-card'
import { Badge } from '@/components/ui/badge'
import { StarfieldBackground } from '@/components/ui/starfield-background'
import { Sparkles, Star, Moon, Heart } from 'lucide-react'
import Link from 'next/link'
import { ProductGrid } from '@/components/product-grid'

export const metadata = {
  title: '星語集 - 神秘占卜與幸運物電商',
  description: '結合占卜體驗與購物的神秘電商平台，提供星座、塔羅、水晶等靈性商品，讓您在占卜過程中發現專屬的幸運物',
}

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <StarfieldBackground particleCount={150} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              神秘占卜與購物的完美結合
            </Badge>
            
            <h1 className="font-heading text-5xl md:text-7xl text-primary mb-6 tracking-wider">
              星語集
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              在占卜的神秘旅程中，發現專屬於您的<br />
              <span className="text-accent font-accent italic">幸運物與心靈寶藏</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <EnhancedButton asChild size="lg" variant="mystic" className="particle-burst">
                <Link href="/divination">
                  <Moon className="w-5 h-5 mr-2" />
                  立即占卜
                </Link>
              </EnhancedButton>
              
              <EnhancedButton variant="outline" size="lg" className="hover-lift golden-border">
                <Link href="/products">
                  <Star className="w-5 h-5 mr-2" />
                  探索商品
                </Link>
              </EnhancedButton>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Fortune Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-center text-primary mb-12">
            今日運勢指引
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card variant="floating" interactive className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-accent text-lg mb-2 text-primary">塔羅占卜</h3>
                <p className="text-muted-foreground text-sm">探索當下的心境與未來的可能</p>
              </CardContent>
            </Card>
            
            <Card variant="floating" interactive className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Moon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="font-accent text-lg mb-2 text-primary">星盤解析</h3>
                <p className="text-muted-foreground text-sm">深度解讀您的星座密碼與天賦</p>
              </CardContent>
            </Card>
            
            <Card variant="floating" interactive className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Heart className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-accent text-lg mb-2 text-primary">AI推薦</h3>
                <p className="text-muted-foreground text-sm">智能匹配最適合您的幸運物</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-primary mb-4">
              精選幸運物
            </h2>
            <p className="text-muted-foreground text-lg">
              為您精心挑選的神秘商品，每一件都蘊含著獨特的能量
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse bg-card/30">
                  <div className="h-64 bg-muted/20 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted/20 rounded mb-2"></div>
                    <div className="h-6 bg-muted/20 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          }>
            <ProductGrid />
          </Suspense>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">星</span>
                </div>
                <span className="font-heading text-xl text-primary">星語集</span>
              </div>
              <p className="text-muted-foreground text-sm">
                神秘占卜與幸運物的專業電商平台
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-4">服務項目</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/products" className="hover:text-primary transition-colors">商品商城</Link></li>
                <li><Link href="/divination" className="hover:text-primary transition-colors">線上占卜</Link></li>
                <li><Link href="/articles" className="hover:text-primary transition-colors">靈性專欄</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-4">客戶服務</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">關於我們</Link></li>
                <li>常見問題</li>
                <li>服務條款</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-4">聯絡我們</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email客服</li>
                <li>LINE客服</li>
                <li>社群媒體</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 星語集. 版權所有</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
