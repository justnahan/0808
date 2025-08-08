import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Heart, Star, Moon } from 'lucide-react'

export const metadata: Metadata = {
  title: '關於我們 - 星語集',
  description: '了解星語集的品牌故事，我們的使命是將占卜體驗與購物結合，為您帶來神秘而美好的生活體驗',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen particle-bg">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              品牌故事
            </Badge>
            
            <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">關於我們</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              了解星語集的品牌故事與理念，我們致力於將古老的占卜智慧與現代生活完美結合
            </p>
          </header>

          {/* Brand Mission */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card/50 border-border backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Heart className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h2 className="font-heading text-3xl text-primary mb-6">品牌使命</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    將占卜體驗與購物結合，為喜愛星座、塔羅、水晶等靈性元素的您，<br />
                    帶來神秘而美好的生活體驗。我們相信每個人都有屬於自己的幸運物，<br />
                    透過占卜的引導，讓您發現真正適合的心靈寶藏。
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-16">
            <h2 className="font-heading text-3xl text-center text-primary mb-12">核心價值</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="hover-lift bg-card/50 border-border backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Star className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-xl mb-4 text-primary">神秘體驗</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    提供真實而深度的占卜體驗，讓古老的智慧在現代重新綻放光彩。
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift bg-card/50 border-border backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                    <Moon className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-heading text-xl mb-4 text-primary">心靈療癒</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    每件商品都經過精心挑選，承載著正向能量與療癒力量。
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift bg-card/50 border-border backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-heading text-xl mb-4 text-primary">個人化服務</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    透過占卜結果為您推薦最適合的商品，讓購物成為一場心靈之旅。
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Target Audience */}
          <section>
            <div className="max-w-4xl mx-auto text-center">
              <Card className="bg-card/50 border-border backdrop-blur-sm">
                <CardContent className="p-12">
                  <h2 className="font-heading text-3xl text-primary mb-8">我們的用戶</h2>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <div className="text-accent text-3xl mb-2">✨</div>
                      <h4 className="font-semibold text-primary mb-2">靈性愛好者</h4>
                      <p className="text-muted-foreground text-sm">
                        18-40歲喜愛星座、塔羅、水晶的女性用戶
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-secondary text-3xl mb-2">🌙</div>
                      <h4 className="font-semibold text-primary mb-2">心靈療癒者</h4>
                      <p className="text-muted-foreground text-sm">
                        對心靈療癒、生活美學有興趣的消費者
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-primary text-3xl mb-2">💫</div>
                      <h4 className="font-semibold text-primary mb-2">禮物選購者</h4>
                      <p className="text-muted-foreground text-sm">
                        想要送有心意且有故事的禮物的人
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}