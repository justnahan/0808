import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { EnhancedButton } from '@/components/ui/enhanced-button'
import { Card, CardContent } from '@/components/ui/enhanced-card'
import { Badge } from '@/components/ui/badge'
import { StarfieldBackground } from '@/components/ui/starfield-background'
import { Moon, Star, Heart, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: '線上占卜 - 星語集',
  description: '體驗塔羅牌占卜、星盤解析、AI智能推薦，探索您的命運奧秘',
}

export default function DivinationPage() {
  return (
    <div className="min-h-screen relative">
      <StarfieldBackground particleCount={120} />
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              神秘占卜體驗
            </Badge>
            
            <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">線上占卜</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              體驗塔羅牌占卜、星盤解析、AI智能推薦，在神秘的儀式中探索您的命運奧秘
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card variant="floating" interactive className="group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-2xl mb-4 text-primary">塔羅占卜</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  透過古老的塔羅牌，解讀當下的心境與未來的可能性。每張牌都承載著宇宙的智慧。
                </p>
                <div className="w-full">
                  <EnhancedButton asChild variant="mystic" className="w-full particle-burst">
                    <a href="/divination/tarot">
                      <Moon className="w-4 h-4 mr-2" />
                      開始塔羅占卜
                    </a>
                  </EnhancedButton>
                </div>
              </CardContent>
            </Card>

            <Card variant="floating" interactive className="group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Moon className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="font-heading text-2xl mb-4 text-primary">星盤解析</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  根據您的出生時間與地點，深度解讀您的星座密碼與天賦潛能。
                </p>
                <div className="w-full">
                  <EnhancedButton asChild variant="outline" className="w-full hover-lift golden-border">
                    <a href="/divination/fortune">
                      <Star className="w-4 h-4 mr-2" />
                      個人化運勢
                    </a>
                  </EnhancedButton>
                </div>
              </CardContent>
            </Card>

            <Card variant="floating" interactive className="group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-heading text-2xl mb-4 text-primary">AI推薦</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  結合現代科技與古老智慧，為您智能匹配最適合的幸運物與開運建議。
                </p>
                <div className="w-full">
                  <EnhancedButton asChild variant="outline" className="w-full hover-lift golden-border">
                    <a href="/divination/history">
                      <Sparkles className="w-4 h-4 mr-2" />
                      占卜歷史
                    </a>
                  </EnhancedButton>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <div className="inline-block p-8 bg-card/50 rounded-lg border border-border backdrop-blur-sm">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
              <h3 className="font-heading text-xl text-primary mb-2">
                ✨ 占卜功能已全面上線！
              </h3>
              <p className="text-muted-foreground">
                體驗完整的塔羅占卜、個人化運勢服務<br />
                讓神秘的力量指引您的人生之路
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}