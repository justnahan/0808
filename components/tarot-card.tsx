'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Moon, Sparkles } from 'lucide-react'
import type { TarotCard as TarotCardType } from '@/lib/tarot'

interface TarotCardProps {
  card?: TarotCardType
  isRevealed?: boolean
  isReversed?: boolean
  position?: string
  onClick?: () => void
  className?: string
}

export function TarotCard({ 
  card, 
  isRevealed = false, 
  isReversed = false, 
  position,
  onClick,
  className = ""
}: TarotCardProps) {
  const [isFlipping, setIsFlipping] = useState(false)
  
  const handleClick = () => {
    if (onClick && !isRevealed) {
      setIsFlipping(true)
      setTimeout(() => {
        onClick()
        setIsFlipping(false)
      }, 600)
    }
  }

  return (
    <div className={`tarot-card-container ${className}`}>
      {position && (
        <div className="text-center mb-2">
          <Badge variant="outline" className="border-secondary/30 text-secondary">
            {position}
          </Badge>
        </div>
      )}
      
      <div 
        className={`tarot-card ${isFlipping ? 'flipping' : ''} ${isRevealed ? 'revealed' : 'hidden'} ${isReversed ? 'reversed' : ''}`}
        onClick={handleClick}
      >
        <div className="card-face card-back">
          <Card className="w-full h-full bg-gradient-to-br from-primary to-secondary border-0 cursor-pointer hover:scale-105 transition-transform">
            <CardContent className="p-0 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary-foreground animate-pulse" />
                </div>
                <div className="space-y-2">
                  <Star className="w-6 h-6 text-primary-foreground mx-auto" />
                  <Moon className="w-4 h-4 text-primary-foreground/70 mx-auto" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="card-face card-front">
          <Card className="w-full h-full bg-card/90 border-border backdrop-blur-sm">
            <CardContent className="p-6 h-full flex flex-col">
              {card && (
                <>
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ${isReversed ? 'rotate-180' : ''}`}>
                      <Star className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-xl text-primary">
                      {card.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {card.nameEn}
                    </p>
                    {isReversed && (
                      <Badge variant="destructive" className="mt-2">
                        逆位
                      </Badge>
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-1">牌義</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {isReversed ? card.meaning.reversed : card.meaning.upright}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-1">關鍵字</h4>
                      <div className="flex flex-wrap gap-1">
                        {(isReversed ? card.keywords.reversed : card.keywords.upright)
                          .slice(0, 3)
                          .map((keyword, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="text-xs border-secondary/30"
                            >
                              {keyword}
                            </Badge>
                          ))
                        }
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        {card.element} 元素
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .tarot-card-container {
          width: 180px;
          height: 280px;
          margin: 0 auto;
        }
        
        .tarot-card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }
        
        .tarot-card.flipping {
          transform: rotateY(180deg);
        }
        
        .tarot-card.revealed {
          transform: rotateY(180deg);
        }
        
        .tarot-card.reversed .card-front {
          transform: rotateY(180deg) rotateZ(180deg);
        }
        
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .card-front {
          transform: rotateY(180deg);
        }
        
        .card-back {
          transform: rotateY(0deg);
        }

        @media (max-width: 768px) {
          .tarot-card-container {
            width: 140px;
            height: 220px;
          }
        }
      `}</style>
    </div>
  )
}