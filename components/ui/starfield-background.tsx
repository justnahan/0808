'use client'

import { useEffect, useRef, useCallback } from 'react'

interface StarfieldBackgroundProps {
  particleCount?: number
  className?: string
}

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
  twinkleSpeed: number
  phase: number
}

export function StarfieldBackground({ 
  particleCount = 100, 
  className = '' 
}: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef({ x: 0, y: 0 })
  
  // 初始化粒子
  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const particles: Particle[] = []
    const colors = ['#F4D29F', '#A78BFA', '#F2A1C1'] // 星辰金、水晶紫、星雲粉
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2
      })
    }
    
    particlesRef.current = particles
  }, [particleCount])

  // 繪製粒子
  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particlesRef.current.forEach((particle) => {
      // 閃爍效果
      const twinkle = Math.sin(particle.phase) * 0.5 + 0.5
      const currentOpacity = particle.opacity * twinkle
      
      // 繪製星星主體
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color + Math.floor(currentOpacity * 255).toString(16).padStart(2, '0')
      ctx.fill()
      
      // 繪製星光效果
      if (particle.size > 1.5) {
        ctx.beginPath()
        ctx.strokeStyle = particle.color + '40'
        ctx.lineWidth = 0.5
        
        // 十字星光
        const glowSize = particle.size * 3
        ctx.moveTo(particle.x - glowSize, particle.y)
        ctx.lineTo(particle.x + glowSize, particle.y)
        ctx.moveTo(particle.x, particle.y - glowSize)
        ctx.lineTo(particle.x, particle.y + glowSize)
        ctx.stroke()
      }
      
      // 更新粒子狀態
      particle.y += particle.speed
      particle.phase += particle.twinkleSpeed
      
      // 重置超出邊界的粒子
      if (particle.y > canvas.height + 10) {
        particle.y = -10
        particle.x = Math.random() * canvas.width
      }
    })
  }, [])

  // 滑鼠光跡效果
  const drawMouseTrail = useCallback((ctx: CanvasRenderingContext2D) => {
    const mouse = mouseRef.current
    
    // 繪製滑鼠周圍的光暈
    ctx.beginPath()
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100)
    gradient.addColorStop(0, 'rgba(244, 210, 159, 0.1)')
    gradient.addColorStop(1, 'rgba(244, 210, 159, 0)')
    ctx.fillStyle = gradient
    ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2)
    ctx.fill()
  }, [])

  // 動畫迴圈
  const animate = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    drawParticles(ctx, canvas)
    drawMouseTrail(ctx)
    animationFrameRef.current = requestAnimationFrame(() => animate(canvas, ctx))
  }, [drawParticles, drawMouseTrail])

  // 處理滑鼠移動
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }, [])

  // 處理視窗大小變化
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles(canvas)
  }, [initParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 設置畫布大小
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    // 初始化粒子
    initParticles(canvas)
    
    // 開始動畫
    animate(canvas, ctx)
    
    // 添加事件監聽器
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [particleCount, animate, handleResize, initParticles, handleMouseMove])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ 
        background: 'transparent'
      }}
    />
  )
}