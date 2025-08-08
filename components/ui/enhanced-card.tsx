'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'product' | 'tarot' | 'floating'
    interactive?: boolean
  }
>(({ className, variant = 'default', interactive = false, ...props }, ref) => {
  const baseClasses = "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300"
  
  const variantClasses = {
    default: "",
    product: "hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-2 bg-gradient-to-br from-card/80 to-card/60 border-border/50 backdrop-blur-sm",
    tarot: "perspective-1000 transform-style-preserve-3d hover:rotate-y-180 cursor-pointer bg-gradient-to-br from-secondary/20 to-accent/20 border-secondary/30",
    floating: "hover:shadow-xl hover:shadow-accent/30 transform hover:scale-105 bg-card/70 backdrop-blur-md border-accent/40"
  }
  
  const interactiveClasses = interactive ? "group cursor-pointer" : ""
  
  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        interactiveClasses,
        variant === 'product' && "product-card-glow",
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// 3D Flip Card Component for Tarot
const FlipCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    front: React.ReactNode
    back: React.ReactNode
    flipped?: boolean
  }
>(({ className, front, back, flipped = false, ...props }, ref) => {
  const [isFlipped, setIsFlipped] = React.useState(flipped)
  
  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full h-full cursor-pointer transform-style-preserve-3d transition-transform duration-700",
        isFlipped && "rotate-y-180",
        className
      )}
      onClick={() => setIsFlipped(!isFlipped)}
      {...props}
    >
      {/* Front */}
      <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 border border-secondary/30 p-6 flex items-center justify-center">
        <div className="text-center">
          {front}
          <div className="mt-4 w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xl">✨</span>
          </div>
        </div>
      </div>
      
      {/* Back */}
      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 p-6">
        {back}
      </div>
    </div>
  )
})
FlipCard.displayName = "FlipCard"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, FlipCard }