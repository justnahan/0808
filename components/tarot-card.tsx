'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Star, Moon, Sparkles } from 'lucide-react'
import type { TarotCard as TarotCardType } from '@/lib/tarot'

interface TarotCardProps {
  card?: TarotCardType
  isRevealed?: boolean
  isReversed?: boolean
  position?: string
  onClick?: () => void
  className?: string
  showDetailButton?: boolean
}

export function TarotCard({ 
  card, 
  isRevealed = false, 
  isReversed = false, 
  position,
  onClick,
  className = "",
  showDetailButton = true
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

  const CardDetailDialog = ({ card, isReversed, children }: { card: TarotCardType; isReversed: boolean; children: React.ReactNode }) => (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Star className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <span className="text-primary">{card.name}</span>
              <span className="text-muted-foreground ml-2">({card.nameEn})</span>
              {isReversed && (
                <Badge variant="destructive" className="ml-2">逆位</Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 pr-4">
            {/* 基本資訊 */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
              <div>
                <h4 className="font-semibold text-primary mb-2">元素</h4>
                <p className="text-muted-foreground">{card.element}</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">編號</h4>
                <p className="text-muted-foreground">#{card.id}</p>
              </div>
            </div>

            {/* 牌義 */}
            <div>
              <h4 className="font-semibold text-primary mb-3">牌義詳解</h4>
              <div className="p-4 bg-muted/10 rounded-lg">
                <p className="text-muted-foreground leading-relaxed">
                  {isReversed ? card.meaning.reversed : card.meaning.upright}
                </p>
              </div>
            </div>

            {/* 完整關鍵字 */}
            <div>
              <h4 className="font-semibold text-primary mb-3">
                關鍵字 {isReversed && '(逆位)'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(isReversed ? card.keywords.reversed : card.keywords.upright)
                  .map((keyword, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="border-secondary/30"
                    >
                      {keyword}
                    </Badge>
                  ))
                }
              </div>
            </div>

            {/* 詳細描述 */}
            {card.description && (
              <div>
                <h4 className="font-semibold text-primary mb-3">詳細描述</h4>
                <div className="p-4 bg-muted/10 rounded-lg">
                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            )}

            {/* 建議 */}
            {card.advice && (
              <div>
                <h4 className="font-semibold text-primary mb-3">指引建議</h4>
                <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
                  <p className="text-muted-foreground leading-relaxed">
                    {card.advice}
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )

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
          <Card className="w-full h-full bg-gradient-to-br from-primary to-secondary border-0 cursor-pointer hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out hover:rotate-1">
            <CardContent className="p-0 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary-foreground animate-pulse hover:animate-spin" />
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
          {card && isRevealed && showDetailButton ? (
            <CardDetailDialog card={card} isReversed={isReversed}>
              <Card className="w-full h-full bg-card/90 border-border backdrop-blur-sm group/card relative hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] hover:border-primary/30 transition-all duration-300 ease-out cursor-pointer">
                <CardContent className="p-4 md:p-6 h-full flex flex-col">
                  {card && (
                    <>
                      <div className="text-center mb-3 md:mb-4">
                        <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg hover:shadow-primary/30 transition-shadow duration-300 ${isReversed ? 'rotate-180' : ''}`}>
                          <Star className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                        </div>
                        <h3 className="font-heading text-lg md:text-xl text-primary line-clamp-1">
                          {card.name}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
                          {card.nameEn}
                        </p>
                        {isReversed && (
                          <Badge variant="destructive" className="mt-1 md:mt-2 text-xs">
                            逆位
                          </Badge>
                        )}
                      </div>

                      <div className="flex-1 space-y-2 md:space-y-3 min-h-0">
                        <div className="flex-1">
                          <h4 className="text-xs md:text-sm font-semibold text-primary mb-1">牌義</h4>
                          <div className="text-xs md:text-sm text-muted-foreground leading-relaxed overflow-hidden">
                            <p className="line-clamp-3 md:line-clamp-4">
                              {isReversed ? card.meaning.reversed : card.meaning.upright}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs md:text-sm font-semibold text-primary mb-1">關鍵字</h4>
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
                            {(isReversed ? card.keywords.reversed : card.keywords.upright).length > 3 && (
                              <Badge variant="secondary" className="text-xs text-primary/70">
                                +{(isReversed ? card.keywords.reversed : card.keywords.upright).length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="pt-1 md:pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground">
                            {card.element} 元素
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </CardDetailDialog>
          ) : (
            <Card className="w-full h-full bg-card/90 border-border backdrop-blur-sm group/card relative hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] hover:border-primary/30 transition-all duration-300 ease-out">
              <CardContent className="p-4 md:p-6 h-full flex flex-col">
              {card && (
                <>
                  <div className="text-center mb-3 md:mb-4">
                    <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg hover:shadow-primary/30 transition-shadow duration-300 ${isReversed ? 'rotate-180' : ''}`}>
                      <Star className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-lg md:text-xl text-primary line-clamp-1">
                      {card.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
                      {card.nameEn}
                    </p>
                    {isReversed && (
                      <Badge variant="destructive" className="mt-1 md:mt-2 text-xs">
                        逆位
                      </Badge>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 md:space-y-3 min-h-0">
                    <div className="flex-1">
                      <h4 className="text-xs md:text-sm font-semibold text-primary mb-1">牌義</h4>
                      <div className="text-xs md:text-sm text-muted-foreground leading-relaxed overflow-hidden">
                        <p className="line-clamp-3 md:line-clamp-4">
                          {isReversed ? card.meaning.reversed : card.meaning.upright}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs md:text-sm font-semibold text-primary mb-1">關鍵字</h4>
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
                        {(isReversed ? card.keywords.reversed : card.keywords.upright).length > 3 && (
                          <Badge variant="secondary" className="text-xs text-primary/70">
                            +{(isReversed ? card.keywords.reversed : card.keywords.upright).length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="pt-1 md:pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        {card.element} 元素
                      </p>
                    </div>
                  </div>
                </>
              )}
              </CardContent>
            </Card>
          )}
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
        
        /* 文字截斷樣式 */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}