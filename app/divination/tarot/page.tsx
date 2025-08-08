'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Moon, Star, Sparkles, RotateCcw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { 
  divinationMethods, 
  drawCards, 
  generateReading, 
  saveReading,
  type DivinationMethod,
  type TarotReading 
} from '@/lib/tarot'
import { TarotCard } from '@/components/tarot-card'
import { ReadingResult } from '@/components/reading-result'

enum GameState {
  SELECT_METHOD = 'SELECT_METHOD',
  SHUFFLING = 'SHUFFLING',
  DRAWING = 'DRAWING',
  RESULT = 'RESULT'
}

export default function TarotPage() {
  const [gameState, setGameState] = useState<GameState>(GameState.SELECT_METHOD)
  const [selectedMethod, setSelectedMethod] = useState<DivinationMethod | null>(null)
  const [currentReading, setCurrentReading] = useState<TarotReading | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleMethodSelect = (method: DivinationMethod) => {
    setSelectedMethod(method)
    setGameState(GameState.SHUFFLING)
    
    // 洗牌動畫
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      setGameState(GameState.DRAWING)
    }, 2000)
  }

  const handleDrawCards = () => {
    if (!selectedMethod) return
    
    setIsAnimating(true)
    
    setTimeout(() => {
      const drawnCards = drawCards(selectedMethod.cardCount)
      const reading = generateReading(selectedMethod, drawnCards)
      
      setCurrentReading(reading)
      saveReading(reading)
      setIsAnimating(false)
      setGameState(GameState.RESULT)
    }, 1500)
  }

  const handleRestart = () => {
    setGameState(GameState.SELECT_METHOD)
    setSelectedMethod(null)
    setCurrentReading(null)
    setIsAnimating(false)
  }

  return (
    <div className="min-h-screen particle-bg">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <Link 
              href="/divination" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              回到占卜選擇
            </Link>
            
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              塔羅占卜
            </Badge>
            
            <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              神秘塔羅
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              在星光的指引下，讓古老的塔羅牌為您揭示心靈深處的答案
            </p>
          </div>

          {/* Method Selection */}
          {gameState === GameState.SELECT_METHOD && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-heading text-primary text-center mb-8">
                選擇您的占卜方式
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {divinationMethods.map((method) => (
                  <Card 
                    key={method.id} 
                    className="hover-lift cursor-pointer bg-card/50 border-border backdrop-blur-sm group"
                    onClick={() => handleMethodSelect(method)}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Moon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="font-heading text-2xl mb-4 text-primary">
                        {method.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {method.description}
                      </p>
                      <Badge variant="outline" className="border-secondary/30">
                        {method.cardCount} 張牌
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Shuffling State */}
          {gameState === GameState.SHUFFLING && (
            <div className="text-center max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-spin">
                  <Sparkles className="w-16 h-16 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-heading text-primary mb-4">
                  正在洗牌...
                </h2>
                <p className="text-muted-foreground text-lg">
                  星辰正在排列，請靜心等待神秘的指引
                </p>
              </div>
            </div>
          )}

          {/* Drawing State */}
          {gameState === GameState.DRAWING && selectedMethod && (
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading text-primary mb-8">
                {selectedMethod.name}
              </h2>
              
              <div className="mb-8">
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedMethod.cardCount}, 1fr)` }}>
                  {Array.from({ length: selectedMethod.cardCount }, (_, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <TarotCard isRevealed={false} />
                      <p className="text-sm text-muted-foreground mt-2">
                        {selectedMethod.positions[index]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground text-lg">
                  請專注於您想要詢問的問題，然後點擊下方按鈕開始抽牌
                </p>
                <Button 
                  onClick={handleDrawCards}
                  disabled={isAnimating}
                  className="breathing-glow text-lg px-8 py-3"
                >
                  <Star className="w-5 h-5 mr-2" />
                  {isAnimating ? '抽牌中...' : '開始抽牌'}
                </Button>
              </div>
            </div>
          )}

          {/* Result State */}
          {gameState === GameState.RESULT && currentReading && (
            <div className="max-w-6xl mx-auto">
              <ReadingResult reading={currentReading} />
              
              <div className="text-center mt-12">
                <Button 
                  onClick={handleRestart}
                  variant="outline"
                  className="hover-lift border-secondary/30"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  再次占卜
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}