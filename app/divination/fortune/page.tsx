'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  Star, 
  Calendar, 
  Heart, 
  Zap, 
  Shield, 
  Coins,
  ArrowLeft,
  User,
  Gift,
  Sun
} from 'lucide-react'
import Link from 'next/link'

interface ZodiacSign {
  sign: string
  name: string
  element: string
  planet: string
  dates: string
  traits: string[]
}

interface Fortune {
  overall: number
  love: number
  career: number
  health: number
  wealth: number
  luckyColor: string
  luckyNumber: number
  advice: string
}

const zodiacSigns: ZodiacSign[] = [
  {
    sign: 'aries',
    name: '牡羊座',
    element: '火',
    planet: '火星',
    dates: '3/21 - 4/19',
    traits: ['勇敢', '熱情', '積極', '直率']
  },
  {
    sign: 'taurus',
    name: '金牛座',
    element: '土',
    planet: '金星',
    dates: '4/20 - 5/20',
    traits: ['穩重', '務實', '堅持', '享受']
  },
  {
    sign: 'gemini',
    name: '雙子座',
    element: '風',
    planet: '水星',
    dates: '5/21 - 6/20',
    traits: ['聰明', '好奇', '善變', '溝通']
  },
  {
    sign: 'cancer',
    name: '巨蟹座',
    element: '水',
    planet: '月亮',
    dates: '6/21 - 7/22',
    traits: ['感性', '家庭', '直覺', '保護']
  },
  {
    sign: 'leo',
    name: '獅子座',
    element: '火',
    planet: '太陽',
    dates: '7/23 - 8/22',
    traits: ['自信', '領導', '創造', '慷慨']
  },
  {
    sign: 'virgo',
    name: '處女座',
    element: '土',
    planet: '水星',
    dates: '8/23 - 9/22',
    traits: ['完美', '分析', '服務', '實用']
  },
  {
    sign: 'libra',
    name: '天秤座',
    element: '風',
    planet: '金星',
    dates: '9/23 - 10/22',
    traits: ['平衡', '美感', '和諧', '公正']
  },
  {
    sign: 'scorpio',
    name: '天蠍座',
    element: '水',
    planet: '冥王星',
    dates: '10/23 - 11/21',
    traits: ['神秘', '深刻', '直覺', '轉化']
  },
  {
    sign: 'sagittarius',
    name: '射手座',
    element: '火',
    planet: '木星',
    dates: '11/22 - 12/21',
    traits: ['自由', '哲學', '冒險', '樂觀']
  },
  {
    sign: 'capricorn',
    name: '魔羯座',
    element: '土',
    planet: '土星',
    dates: '12/22 - 1/19',
    traits: ['野心', '責任', '實際', '毅力']
  },
  {
    sign: 'aquarius',
    name: '水瓶座',
    element: '風',
    planet: '天王星',
    dates: '1/20 - 2/18',
    traits: ['創新', '人道', '獨立', '未來']
  },
  {
    sign: 'pisces',
    name: '雙魚座',
    element: '水',
    planet: '海王星',
    dates: '2/19 - 3/20',
    traits: ['夢幻', '同情', '藝術', '靈性']
  }
]

export default function FortuneService() {
  const [step, setStep] = useState<'profile' | 'fortune'>('profile')
  const [userProfile, setUserProfile] = useState({
    birthDate: '',
    name: '',
    selectedSign: ''
  })
  const [todayFortune, setTodayFortune] = useState<Fortune | null>(null)
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign | null>(null)

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userProfile.birthDate) {
      alert('請選擇您的生日')
      return
    }

    const birthDate = new Date(userProfile.birthDate)
    const zodiacSign = getZodiacSign(birthDate)
    
    setSelectedZodiac(zodiacSign)
    setUserProfile(prev => ({ ...prev, selectedSign: zodiacSign.sign }))
    
    // 生成今日運勢
    const fortune = generateDailyFortune(zodiacSign)
    setTodayFortune(fortune)
    
    // 保存用戶資料到 localStorage
    localStorage.setItem('user_profile', JSON.stringify({
      ...userProfile,
      selectedSign: zodiacSign.sign,
      lastUpdate: new Date().toISOString()
    }))
    
    setStep('fortune')
  }

  const getZodiacSign = (birthDate: Date): ZodiacSign => {
    const month = birthDate.getMonth() + 1
    const day = birthDate.getDate()
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0]
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1]
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2]
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3]
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4]
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5]
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6]
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7]
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8]
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9]
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10]
    return zodiacSigns[11]
  }

  const generateDailyFortune = (zodiac: ZodiacSign): Fortune => {
    // 簡單的隨機運勢生成邏輯
    const today = new Date()
    const seed = today.getDate() + today.getMonth() + zodiac.sign.length
    
    const random = (min: number, max: number) => {
      const pseudoRandom = (seed * 9301 + 49297) % 233280
      return min + (pseudoRandom / 233280) * (max - min)
    }

    const colors = ['金色', '紅色', '藍色', '綠色', '紫色', '橙色', '粉色', '銀色']
    
    return {
      overall: Math.floor(random(60, 95)),
      love: Math.floor(random(50, 90)),
      career: Math.floor(random(55, 92)),
      health: Math.floor(random(65, 88)),
      wealth: Math.floor(random(45, 85)),
      luckyColor: colors[Math.floor(random(0, colors.length))],
      luckyNumber: Math.floor(random(1, 99)),
      advice: generateAdvice(zodiac)
    }
  }

  const generateAdvice = (zodiac: ZodiacSign): string => {
    const advices: Record<string, string[]> = {
      aries: ['今天是展現領導力的好時機', '勇敢面對挑戰會帶來意外收穫', '保持熱情，但記得三思而後行'],
      taurus: ['穩紮穩打會讓您獲得更多成就', '今天適合處理財務相關事宜', '享受生活中的美好事物'],
      gemini: ['多與他人溝通交流會帶來新機會', '保持好奇心，學習新事物', '靈活變通是今天的關鍵'],
      cancer: ['關注家庭關係會帶來溫暖', '相信直覺，它會指引正確方向', '給自己一些獨處時間'],
      leo: ['展現創意會獲得他人讚賞', '今天適合表達自己的想法', '慷慨待人會帶來好運'],
      virgo: ['注重細節會讓工作更完美', '幫助他人會讓您感到滿足', '保持實用主義的態度'],
      libra: ['尋求平衡會帶來內心和諧', '美感品味會為您加分', '公正處理爭議會獲得尊重'],
      scorpio: ['深入思考會發現隱藏真相', '信任直覺做重要決定', '轉化挫折為成長動力'],
      sagittarius: ['保持樂觀會感染身邊的人', '探索新領域會帶來啟發', '自由思考產生創新想法'],
      capricorn: ['設定目標並堅持執行', '承擔責任會獲得他人信任', '實際行動勝過空談'],
      aquarius: ['創新思維會解決難題', '關心社會議題帶來滿足感', '獨立思考產生獨特見解'],
      pisces: ['發揮藝術天賦會獲得成就', '同情心會帶來深度連結', '夢想指引前進方向']
    }
    
    const signAdvices = advices[zodiac.sign] || ['保持積極態度會帶來好運']
    return signAdvices[Math.floor(Math.random() * signAdvices.length)]
  }

  const getStarRating = (score: number) => {
    const stars = Math.floor(score / 20)
    return '★'.repeat(stars) + '☆'.repeat(5 - stars)
  }

  // 檢查是否已有用戶資料
  useEffect(() => {
    const stored = localStorage.getItem('user_profile')
    if (stored) {
      try {
        const profile = JSON.parse(stored)
        const lastUpdate = new Date(profile.lastUpdate)
        const today = new Date()
        
        // 如果是同一天，直接顯示運勢
        if (lastUpdate.toDateString() === today.toDateString()) {
          setUserProfile(profile)
          const zodiac = zodiacSigns.find(z => z.sign === profile.selectedSign)
          if (zodiac) {
            setSelectedZodiac(zodiac)
            setTodayFortune(generateDailyFortune(zodiac))
            setStep('fortune')
          }
        }
      } catch (error) {
        console.error('Failed to parse stored profile:', error)
      }
    }
  }, [])

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
              <Sun className="w-3 h-3 mr-1" />
              個人運勢
            </Badge>
            
            <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              專屬運勢服務
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              建立您的星座檔案，獲得每日個人化運勢指引和幸運建議
            </p>
          </div>

          {step === 'profile' ? (
            // 個人資料填寫
            <div className="max-w-2xl mx-auto">
              <Card className="bg-card/50 border-border backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <User className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-heading text-primary mb-2">
                      建立您的星座檔案
                    </h2>
                    <p className="text-muted-foreground">
                      提供您的生日資訊，我們將為您生成專屬的星座分析
                    </p>
                  </div>

                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-primary">
                        稱呼（選填）
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile(prev => ({ 
                          ...prev, 
                          name: e.target.value 
                        }))}
                        placeholder="您希望我們怎麼稱呼您？"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="birthDate" className="text-primary">
                        生日 *
                      </Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={userProfile.birthDate}
                        onChange={(e) => setUserProfile(prev => ({ 
                          ...prev, 
                          birthDate: e.target.value 
                        }))}
                        required
                        className="mt-2"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        我們將根據您的生日判斷星座
                      </p>
                    </div>

                    <Button type="submit" className="w-full breathing-glow">
                      <Gift className="w-4 h-4 mr-2" />
                      生成我的專屬運勢
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          ) : (
            // 運勢顯示
            selectedZodiac && todayFortune && (
              <div className="max-w-4xl mx-auto space-y-8">
                {/* 星座資訊卡片 */}
                <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Star className="w-10 h-10 text-primary-foreground" />
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-heading text-primary mb-2">
                          {userProfile.name && `${userProfile.name}，`}您是{selectedZodiac.name}
                        </h2>
                        <p className="text-muted-foreground mb-3">
                          {selectedZodiac.dates} | {selectedZodiac.element}元素 | 守護星：{selectedZodiac.planet}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {selectedZodiac.traits.map((trait, index) => (
                            <Badge key={index} variant="outline" className="border-primary/30">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary mb-1">
                          {todayFortune.overall}分
                        </div>
                        <p className="text-sm text-muted-foreground">整體運勢</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 今日運勢 */}
                <Card className="bg-card/50 border-border backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <Calendar className="w-8 h-8 mx-auto text-primary mb-3" />
                      <h3 className="text-2xl font-heading text-primary mb-2">
                        今日運勢 - {new Date().toLocaleDateString('zh-TW')}
                      </h3>
                      <p className="text-muted-foreground">
                        星象為您帶來的專屬指引
                      </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                      <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <Heart className="w-6 h-6 mx-auto text-red-500 mb-2" />
                        <h4 className="font-semibold text-primary mb-1">愛情運</h4>
                        <div className="text-red-500 mb-1">{getStarRating(todayFortune.love)}</div>
                        <div className="text-sm font-bold">{todayFortune.love}分</div>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <Zap className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                        <h4 className="font-semibold text-primary mb-1">事業運</h4>
                        <div className="text-blue-500 mb-1">{getStarRating(todayFortune.career)}</div>
                        <div className="text-sm font-bold">{todayFortune.career}分</div>
                      </div>
                      
                      <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <Shield className="w-6 h-6 mx-auto text-green-500 mb-2" />
                        <h4 className="font-semibold text-primary mb-1">健康運</h4>
                        <div className="text-green-500 mb-1">{getStarRating(todayFortune.health)}</div>
                        <div className="text-sm font-bold">{todayFortune.health}分</div>
                      </div>
                      
                      <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                        <Coins className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
                        <h4 className="font-semibold text-primary mb-1">財運</h4>
                        <div className="text-yellow-500 mb-1">{getStarRating(todayFortune.wealth)}</div>
                        <div className="text-sm font-bold">{todayFortune.wealth}分</div>
                      </div>
                    </div>

                    <Separator className="my-8" />

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-xl font-heading text-primary">幸運元素</h4>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-6 h-6 rounded-full border-2 border-white"
                              style={{ backgroundColor: todayFortune.luckyColor.includes('金') ? '#FFD700' : 
                                       todayFortune.luckyColor.includes('紅') ? '#FF4444' :
                                       todayFortune.luckyColor.includes('藍') ? '#4444FF' :
                                       todayFortune.luckyColor.includes('綠') ? '#44FF44' :
                                       todayFortune.luckyColor.includes('紫') ? '#AA44FF' :
                                       todayFortune.luckyColor.includes('橙') ? '#FF8844' :
                                       todayFortune.luckyColor.includes('粉') ? '#FF44AA' : '#C0C0C0' }}
                            />
                            <span className="text-muted-foreground">
                              幸運色彩：<span className="text-primary font-semibold">{todayFortune.luckyColor}</span>
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-primary-foreground">
                              {todayFortune.luckyNumber}
                            </div>
                            <span className="text-muted-foreground">
                              幸運數字：<span className="text-primary font-semibold">{todayFortune.luckyNumber}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xl font-heading text-primary">今日建議</h4>
                        <div className="p-4 bg-muted/20 rounded-lg border border-border">
                          <p className="text-muted-foreground leading-relaxed">
                            {todayFortune.advice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button 
                    onClick={() => {
                      localStorage.removeItem('user_profile')
                      setStep('profile')
                      setUserProfile({ birthDate: '', name: '', selectedSign: '' })
                      setSelectedZodiac(null)
                      setTodayFortune(null)
                    }}
                    variant="outline"
                    className="hover-lift border-secondary/30"
                  >
                    <User className="w-4 h-4 mr-2" />
                    重新設定個人資料
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}