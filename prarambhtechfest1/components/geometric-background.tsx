"use client"

import { useEffect, useRef } from "react"

export default function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Animation variables - define time as an object to avoid initialization issues
    let animationFrameId: number
    const time = { current: 0 }

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawBackground()
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Draw the geometric background
    function drawBackground() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#0F172A") // Dark blue
      gradient.addColorStop(1, "#1E1B4B") // Dark purple
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid pattern
      ctx.globalAlpha = 0.05
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 1

      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw animated geometric shapes
      const shapes = 30

      for (let i = 0; i < shapes; i++) {
        // Position based on time
        const angle = (i / shapes) * Math.PI * 2
        const radius = Math.min(canvas.width, canvas.height) * 0.3
        const x = canvas.width / 2 + Math.cos(angle + time.current * 0.05) * radius
        const y = canvas.height / 2 + Math.sin(angle + time.current * 0.05) * radius

        // Random size
        const size = Math.random() * 100 + 50

        // Random opacity
        const opacity = Math.random() * 0.1 + 0.05

        // Shape type based on index
        const shapeType = i % 3

        // Color based on position
        const colors = ["#9333EA", "#7E22CE", "#6B21A8", "#DB2777", "#BE185D"]
        const colorIndex = Math.floor((angle / (Math.PI * 2)) * colors.length)
        const color = colors[colorIndex]

        ctx.globalAlpha = opacity
        ctx.fillStyle = color

        if (shapeType === 0) {
          // Circle
          ctx.beginPath()
          ctx.arc(x, y, size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else if (shapeType === 1) {
          // Square with rounded corners
          ctx.beginPath()
          ctx.roundRect(x - size / 2, y - size / 2, size, size, 20)
          ctx.fill()
        } else {
          // Hexagon
          ctx.beginPath()
          for (let j = 0; j < 6; j++) {
            const hexAngle = (Math.PI / 3) * j
            const hx = x + (size / 2) * Math.cos(hexAngle)
            const hy = y + (size / 2) * Math.sin(hexAngle)
            if (j === 0) {
              ctx.moveTo(hx, hy)
            } else {
              ctx.lineTo(hx, hy)
            }
          }
          ctx.closePath()
          ctx.fill()
        }
      }

      // Draw floating particles
      const particles = 100
      ctx.globalAlpha = 0.3

      for (let i = 0; i < particles; i++) {
        const x = (Math.sin(i * 0.1 + time.current * 0.01) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(i * 0.1 + time.current * 0.02) * 0.5 + 0.5) * canvas.height
        const size = Math.random() * 3 + 1

        ctx.fillStyle = "#FFFFFF"
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw digital circuit lines
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = "#9333EA"
      ctx.lineWidth = 2

      const lines = 10
      for (let i = 0; i < lines; i++) {
        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height
        const endX = startX + (Math.random() - 0.5) * canvas.width * 0.5
        const endY = startY + (Math.random() - 0.5) * canvas.height * 0.5

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // Add circuit nodes
        ctx.fillStyle = "#9333EA"
        ctx.beginPath()
        ctx.arc(startX, startY, 3, 0, Math.PI * 2)
        ctx.arc(endX, endY, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1.0

      // Increment time for animation
      time.current += 1
      animationFrameId = requestAnimationFrame(drawBackground)
    }

    drawBackground()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
}

