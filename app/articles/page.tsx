import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Star, Moon, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: '靈性專欄 - 星語集',
  description: '閱讀月運勢、靈性知識、開運方法，提升您的心靈能量與智慧',
}

export default function ArticlesPage() {
  return (
    <div className="min-h-screen particle-bg">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
              <BookOpen className="w-3 h-3 mr-1" />
              心靈智慧分享
            </Badge>
            
            <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">靈性專欄</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              閱讀月運勢、靈性知識、開運方法，在文字的智慧中提升您的心靈能量
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <Card className="hover-lift bg-card/50 border-border backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Moon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl mb-2 text-primary">月運勢</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  每月為您解讀星象變化，指引人生方向
                </p>
                <Badge variant="outline" className="text-xs">
                  即將更新
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-card/50 border-border backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Star className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="font-heading text-xl mb-2 text-primary">靈性知識</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  探索占卜、水晶、冥想等靈性修行智慧
                </p>
                <Badge variant="outline" className="text-xs">
                  即將更新
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-card/50 border-border backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-heading text-xl mb-2 text-primary">開運方法</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  分享實用的開運技巧與儀式指南
                </p>
                <Badge variant="outline" className="text-xs">
                  即將更新
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="inline-block p-8 bg-card/50 rounded-lg border border-border backdrop-blur-sm">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-heading text-xl text-primary mb-2">
                精彩內容即將發布
              </h3>
              <p className="text-muted-foreground mb-6">
                我們正在為您準備豐富的靈性知識與智慧分享<br />
                包含月運勢解析、開運指南、冥想練習等內容
              </p>
              <Button variant="outline">
                <Star className="w-4 h-4 mr-2" />
                訂閱更新通知
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}