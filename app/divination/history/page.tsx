'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  History, 
  Star, 
  Calendar, 
  Eye, 
  ArrowLeft,
  Trash2,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { getReadingHistory, type TarotReading } from '@/lib/tarot'
import { TarotCard } from '@/components/tarot-card'

export default function DivinationHistoryPage() {
  const [readings, setReadings] = useState<TarotReading[]>([])
  const [selectedReading, setSelectedReading] = useState<TarotReading | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const history = getReadingHistory()
    setReadings(history)
    setLoading(false)
  }, [])

  const handleViewReading = (reading: TarotReading) => {
    setSelectedReading(reading)
  }

  const handleClearHistory = () => {
    if (confirm('確定要清除所有占卜紀錄嗎？此操作無法復原。')) {
      localStorage.removeItem('tarot_readings')
      setReadings([])
      setSelectedReading(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen particle-bg">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-pulse">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full mb-4"></div>
              <div className="w-32 h-4 mx-auto bg-primary/20 rounded mb-2"></div>
              <div className="w-48 h-3 mx-auto bg-primary/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen particle-bg">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Link 
              href="/divination" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              回到占卜選擇
            </Link>
            
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
              <History className="w-3 h-3 mr-1" />
              占卜紀錄
            </Badge>
            
            <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              占卜歷史
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              回顧您過去的占卜體驗，重新感受塔羅的智慧指引
            </p>
          </div>

          {selectedReading ? (
            // 詳細檢視模式
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <Button 
                  onClick={() => setSelectedReading(null)}
                  variant="outline"
                  className="hover-lift border-secondary/30"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回列表
                </Button>
              </div>

              <Card className="bg-card/50 border-border backdrop-blur-sm mb-8">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">
                        {new Date(selectedReading.timestamp).toLocaleString('zh-TW')}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: `repeat(${selectedReading.cards.length}, 1fr)` }}>
                    {selectedReading.cards.map((cardReading, index) => (
                      <TarotCard
                        key={index}
                        card={cardReading.card}
                        isRevealed={true}
                        isReversed={cardReading.isReversed}
                        position={cardReading.position}
                      />
                    ))}
                  </div>

                  <Separator className="my-8" />

                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-xl font-heading text-primary mb-4">占卜解讀</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {selectedReading.interpretation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // 列表模式
            <div className="max-w-4xl mx-auto">
              {readings.length === 0 ? (
                <Card className="bg-card/50 border-border backdrop-blur-sm">
                  <CardContent className="p-12 text-center">
                    <History className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-heading text-primary mb-2">
                      尚無占卜記錄
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      您還沒有進行過任何占卜，快去體驗神秘的塔羅占卜吧！
                    </p>
                    <Button asChild className="breathing-glow">
                      <Link href="/divination/tarot">
                        <Star className="w-4 h-4 mr-2" />
                        開始占卜
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-heading text-primary">
                        您的占卜紀錄 ({readings.length})
                      </h2>
                      <p className="text-muted-foreground">
                        點擊任一紀錄查看詳細內容
                      </p>
                    </div>
                    
                    {readings.length > 0 && (
                      <Button 
                        onClick={handleClearHistory}
                        variant="outline"
                        className="hover-lift border-destructive/30 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        清除紀錄
                      </Button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {readings.map((reading) => (
                      <Card 
                        key={reading.id} 
                        className="hover-lift cursor-pointer bg-card/50 border-border backdrop-blur-sm transition-all hover:bg-card/70"
                        onClick={() => handleViewReading(reading)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <Star className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-primary">
                                  {reading.cards.length === 1 ? '單張牌占卜' : '三張牌陣'}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  {new Date(reading.timestamp).toLocaleString('zh-TW')}
                                </div>
                              </div>
                            </div>
                            
                            <Button size="sm" variant="ghost" className="hover-lift">
                              <Eye className="w-4 h-4 mr-2" />
                              查看詳情
                            </Button>
                          </div>

                          <div className="flex gap-2 mb-4">
                            {reading.cards.map((cardReading, index) => (
                              <Badge key={index} variant="outline" className="border-secondary/30">
                                {cardReading.position}: {cardReading.card.name}
                                {cardReading.isReversed && ' (逆位)'}
                              </Badge>
                            ))}
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {reading.interpretation}
                          </p>

                          {reading.recommendedProducts.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Star className="w-3 h-3" />
                                推薦了 {reading.recommendedProducts.length} 個幸運物
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}