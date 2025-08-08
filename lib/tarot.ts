export interface TarotCard {
  id: number
  name: string
  nameEn: string
  meaning: {
    upright: string
    reversed: string
  }
  description: string
  keywords: {
    upright: string[]
    reversed: string[]
  }
  element: string
  advice: string
  productTags: string[] // 用於商品推薦的標籤
}

export interface TarotReading {
  id: string
  cards: {
    card: TarotCard
    position: string
    isReversed: boolean
  }[]
  interpretation: string
  recommendedProducts: string[] // 推薦商品ID
  timestamp: Date
}

export interface DivinationMethod {
  id: string
  name: string
  description: string
  cardCount: number
  positions: string[]
}

// 12張塔羅牌數據庫（簡化版大阿爾卡那）
export const tarotCards: TarotCard[] = [
  {
    id: 0,
    name: "愚者",
    nameEn: "The Fool",
    meaning: {
      upright: "新的開始、冒險、自由、純真",
      reversed: "魯莽、缺乏計劃、不負責任"
    },
    description: "愚者代表新的開始和無限的可能性，象徵著純真與冒險精神。",
    keywords: {
      upright: ["新開始", "冒險", "自由", "純真", "潛力"],
      reversed: ["魯莽", "缺乏方向", "不成熟", "冒險過度"]
    },
    element: "風",
    advice: "相信直覺，勇於嘗試新事物，但要保持謹慎。",
    productTags: ["新開始", "冒險", "自由", "創意"]
  },
  {
    id: 1,
    name: "魔術師",
    nameEn: "The Magician",
    meaning: {
      upright: "意志力、創造力、技能、資源運用",
      reversed: "濫用力量、缺乏專注、操控"
    },
    description: "魔術師象徵將想法化為現實的力量，代表技能和創造力的展現。",
    keywords: {
      upright: ["創造力", "技能", "意志力", "資源", "實現"],
      reversed: ["濫用", "缺乏專注", "操控", "欺騙"]
    },
    element: "火",
    advice: "運用你的技能和資源，專注於目標的實現。",
    productTags: ["創造力", "技能", "實現", "力量"]
  },
  {
    id: 2,
    name: "女祭司",
    nameEn: "The High Priestess",
    meaning: {
      upright: "直覺、內在智慧、神秘、潛意識",
      reversed: "忽視直覺、缺乏內在指引、隱藏秘密"
    },
    description: "女祭司代表內在的智慧和直覺，象徵神秘知識和精神成長。",
    keywords: {
      upright: ["直覺", "智慧", "神秘", "潛意識", "靈性"],
      reversed: ["忽視直覺", "缺乏指引", "秘密", "困惑"]
    },
    element: "水",
    advice: "相信你的直覺，深入探索內在的智慧。",
    productTags: ["直覺", "智慧", "神秘", "靈性", "療癒"]
  },
  {
    id: 3,
    name: "皇后",
    nameEn: "The Empress",
    meaning: {
      upright: "豐盛、母性、創造力、自然、滋養",
      reversed: "過度依賴、創造力阻塞、缺乏成長"
    },
    description: "皇后象徵豐盛和母性能量，代表創造力和滋養的力量。",
    keywords: {
      upright: ["豐盛", "母性", "創造", "滋養", "自然"],
      reversed: ["依賴", "阻塞", "缺乏成長", "過度保護"]
    },
    element: "土",
    advice: "擁抱你的創造力，關注滋養和成長。",
    productTags: ["豐盛", "創造", "滋養", "美麗", "自然"]
  },
  {
    id: 4,
    name: "皇帝",
    nameEn: "The Emperor",
    meaning: {
      upright: "權威、結構、控制、領導力、穩定",
      reversed: "濫用權力、缺乏紀律、專制"
    },
    description: "皇帝代表權威和秩序，象徵領導力和結構化思維。",
    keywords: {
      upright: ["權威", "領導", "結構", "穩定", "紀律"],
      reversed: ["專制", "缺乏紀律", "濫用權力", "僵化"]
    },
    element: "火",
    advice: "建立秩序和結構，發揮你的領導能力。",
    productTags: ["領導", "穩定", "權威", "成功", "目標"]
  },
  {
    id: 5,
    name: "教皇",
    nameEn: "The Hierophant",
    meaning: {
      upright: "傳統、靈性指導、學習、宗教、道德",
      reversed: "反叛、非傳統、個人信仰、創新"
    },
    description: "教皇象徵傳統智慧和精神指導，代表學習和道德價值觀。",
    keywords: {
      upright: ["傳統", "指導", "學習", "道德", "靈性"],
      reversed: ["反叛", "創新", "個人信仰", "非傳統"]
    },
    element: "土",
    advice: "尋求智慧的指導，保持對傳統的尊重。",
    productTags: ["智慧", "指導", "學習", "傳統", "靈性"]
  },
  {
    id: 6,
    name: "戀人",
    nameEn: "The Lovers",
    meaning: {
      upright: "愛情、關係、選擇、和諧、結合",
      reversed: "關係問題、錯誤選擇、不和諧、分離"
    },
    description: "戀人代表愛情和深刻的連結，象徵重要的選擇和和諧。",
    keywords: {
      upright: ["愛情", "關係", "選擇", "和諧", "結合"],
      reversed: ["分離", "錯誤選擇", "不和諧", "關係問題"]
    },
    element: "風",
    advice: "做出符合你價值觀的選擇，珍惜重要的關係。",
    productTags: ["愛情", "關係", "和諧", "選擇", "連結"]
  },
  {
    id: 7,
    name: "戰車",
    nameEn: "The Chariot",
    meaning: {
      upright: "勝利、決心、控制、前進、成功",
      reversed: "缺乏控制、失敗、方向不明、內在衝突"
    },
    description: "戰車象徵勝利和前進的動力，代表透過意志力克服障礙。",
    keywords: {
      upright: ["勝利", "決心", "控制", "前進", "成功"],
      reversed: ["失控", "失敗", "衝突", "缺乏方向"]
    },
    element: "水",
    advice: "保持決心和專注，克服前方的挑戰。",
    productTags: ["勝利", "成功", "決心", "前進", "力量"]
  },
  {
    id: 8,
    name: "力量",
    nameEn: "Strength",
    meaning: {
      upright: "內在力量、勇氣、耐心、自控、慈悲",
      reversed: "自我懷疑、缺乏信心、失控、軟弱"
    },
    description: "力量象徵內在的勇氣和慈悲，代表透過愛和耐心征服困難。",
    keywords: {
      upright: ["內在力量", "勇氣", "耐心", "慈悲", "自控"],
      reversed: ["自我懷疑", "軟弱", "失控", "缺乏信心"]
    },
    element: "火",
    advice: "相信你的內在力量，用愛和耐心面對挑戰。",
    productTags: ["力量", "勇氣", "信心", "內在", "療癒"]
  },
  {
    id: 9,
    name: "隱士",
    nameEn: "The Hermit",
    meaning: {
      upright: "內省、尋求真理、指導、孤獨、智慧",
      reversed: "孤立、拒絕幫助、迷失方向"
    },
    description: "隱士代表內在的尋求和智慧的獲得，象徵透過反省找到真理。",
    keywords: {
      upright: ["內省", "智慧", "指導", "真理", "靈性成長"],
      reversed: ["孤立", "迷失", "拒絕幫助", "缺乏指引"]
    },
    element: "土",
    advice: "花時間內省和自我反思，尋求內在的答案。",
    productTags: ["智慧", "內省", "指導", "真理", "靈性"]
  },
  {
    id: 10,
    name: "命運之輪",
    nameEn: "The Wheel of Fortune",
    meaning: {
      upright: "命運、機會、轉變、循環、好運",
      reversed: "厄運、缺乏控制、阻力、停滯"
    },
    description: "命運之輪象徵生命的循環和變化，代表機會和轉折點。",
    keywords: {
      upright: ["命運", "機會", "轉變", "好運", "循環"],
      reversed: ["厄運", "停滯", "阻力", "缺乏控制"]
    },
    element: "火",
    advice: "接受變化，把握出現的機會。",
    productTags: ["機會", "轉變", "好運", "命運", "變化"]
  },
  {
    id: 11,
    name: "星星",
    nameEn: "The Star",
    meaning: {
      upright: "希望、靈感、治癒、指引、信心",
      reversed: "絕望、缺乏信心、失去方向"
    },
    description: "星星象徵希望和治癒，代表在黑暗中的指引之光。",
    keywords: {
      upright: ["希望", "靈感", "治癒", "指引", "信心"],
      reversed: ["絕望", "失望", "缺乏指引", "失去信心"]
    },
    element: "風",
    advice: "保持希望和信心，相信美好的未來。",
    productTags: ["希望", "治癒", "靈感", "指引", "信心", "美好"]
  }
]

// 占卜方式配置
export const divinationMethods: DivinationMethod[] = [
  {
    id: "single",
    name: "單張牌占卜",
    description: "抽取一張牌來解答當下最重要的問題",
    cardCount: 1,
    positions: ["現況"]
  },
  {
    id: "three",
    name: "三張牌陣",
    description: "過去、現在、未來的完整時間軸解讀",
    cardCount: 3,
    positions: ["過去", "現在", "未來"]
  }
]

// 工具函數
export function shuffleCards(): TarotCard[] {
  const shuffled = [...tarotCards]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function drawCards(count: number): { card: TarotCard; isReversed: boolean }[] {
  const shuffled = shuffleCards()
  const drawn = shuffled.slice(0, count)
  
  return drawn.map(card => ({
    card,
    isReversed: Math.random() > 0.7 // 30% 機率逆位
  }))
}

export function generateReading(
  method: DivinationMethod,
  drawnCards: { card: TarotCard; isReversed: boolean }[]
): TarotReading {
  const reading: TarotReading = {
    id: Date.now().toString(),
    cards: drawnCards.map((drawn, index) => ({
      ...drawn,
      position: method.positions[index] || `位置${index + 1}`
    })),
    interpretation: generateInterpretation(method, drawnCards),
    recommendedProducts: generateProductRecommendations(drawnCards),
    timestamp: new Date()
  }
  
  return reading
}

function generateInterpretation(
  method: DivinationMethod,
  drawnCards: { card: TarotCard; isReversed: boolean }[]
): string {
  if (method.id === "single") {
    const { card, isReversed } = drawnCards[0]
    return `${card.name}${isReversed ? '（逆位）' : ''}出現在您的占卜中。${
      isReversed ? card.meaning.reversed : card.meaning.upright
    }。${card.advice}這張牌建議您${isReversed ? '需要重新審視當前的方向' : '可以信任自己的直覺前進'}。`
  }
  
  if (method.id === "three") {
    const interpretations = drawnCards.map(({ card, isReversed }, index) => {
      const position = method.positions[index]
      const meaning = isReversed ? card.meaning.reversed : card.meaning.upright
      return `${position}：${card.name}${isReversed ? '（逆位）' : ''} - ${meaning}`
    }).join('\n\n')
    
    return `您的三張牌陣顯示：\n\n${interpretations}\n\n整體而言，這個牌陣建議您要平衡過去的經驗、現在的行動和對未來的期望。每張牌都為您的人生旅程提供了重要的指引。`
  }
  
  return "占卜完成，請仔細思考每張牌帶來的訊息。"
}

function generateProductRecommendations(
  drawnCards: { card: TarotCard; isReversed: boolean }[]
): string[] {
  // 根據抽到的牌的標籤來推薦商品
  // 這裡先返回固定的商品ID，實際項目中可以根據商品標籤進行匹配
  const allTags = drawnCards.flatMap(({ card }) => card.productTags)
  
  // 簡單的推薦邏輯：根據牌的特性推薦商品
  if (allTags.some(tag => ["愛情", "和諧", "美麗", "治癒"].includes(tag))) {
    return ["PROD_UF001", "PROD_UF002"] // 水瓶和環保袋都適合愛情和治癒主題
  }
  
  if (allTags.some(tag => ["力量", "成功", "勝利", "領導"].includes(tag))) {
    return ["PROD_UF001"] // 水瓶適合力量主題
  }
  
  if (allTags.some(tag => ["創造", "靈感", "智慧", "指導"].includes(tag))) {
    return ["PROD_UF002"] // 環保袋適合創造和智慧主題
  }
  
  // 默認推薦
  return ["PROD_UF001", "PROD_UF002"]
}

// 保存占卜記錄到本地存儲
export function saveReading(reading: TarotReading): void {
  if (typeof window === 'undefined') return
  
  const existing = getReadingHistory()
  const updated = [reading, ...existing.slice(0, 9)] // 只保留最近10次
  localStorage.setItem('tarot_readings', JSON.stringify(updated))
}

// 獲取占卜歷史
export function getReadingHistory(): TarotReading[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem('tarot_readings')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}