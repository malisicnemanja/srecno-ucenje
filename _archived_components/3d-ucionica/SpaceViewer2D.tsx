'use client'

import { useState, useRef, useEffect } from 'react'

interface SpaceZone {
  name: string
  area: number
  color: string
  description: string
  minArea: number
  maxArea: number
  x?: number
  y?: number
  width?: number
  height?: number
}

interface SpaceViewer2DProps {
  zones: SpaceZone[]
  totalArea: number
  shape: 'rectangular' | 'square' | 'l-shaped' | 'irregular'
  onZoneUpdate?: (zones: SpaceZone[]) => void
}

export default function SpaceViewer2D({ zones, totalArea, shape, onZoneUpdate }: SpaceViewer2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [draggedZone, setDraggedZone] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [localZones, setLocalZones] = useState<SpaceZone[]>([])

  // Initialize zones with calculated positions and sizes
  useEffect(() => {
    const canvasWidth = 400
    const canvasHeight = 400
    const scaleFactor = Math.sqrt(totalArea) / Math.min(canvasWidth, canvasHeight) * 20
    
    const initializedZones = zones.map((zone, index) => {
      // Calculate zone dimensions based on area
      const aspectRatio = shape === 'square' ? 1 : shape === 'rectangular' ? 1.5 : 1.2
      const width = Math.sqrt(zone.area / scaleFactor) * aspectRatio
      const height = zone.area / scaleFactor / width
      
      // Position zones in a grid
      const cols = Math.ceil(Math.sqrt(zones.length))
      const row = Math.floor(index / cols)
      const col = index % cols
      
      const cellWidth = canvasWidth / cols
      const cellHeight = canvasHeight / Math.ceil(zones.length / cols)
      
      const x = col * cellWidth + (cellWidth - width * 20) / 2
      const y = row * cellHeight + (cellHeight - height * 20) / 2
      
      return {
        ...zone,
        x: Math.max(10, Math.min(canvasWidth - width * 20 - 10, x)),
        y: Math.max(10, Math.min(canvasHeight - height * 20 - 10, y)),
        width: width * 20,
        height: height * 20
      }
    })
    
    setLocalZones(initializedZones)
  }, [zones, totalArea, shape])

  // Draw the 2D floor plan
  const drawFloorPlan = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw background
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw grid
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1
    const gridSize = 20
    
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    
    // Draw room outline
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 3
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)
    
    // Draw zones
    localZones.forEach((zone, index) => {
      if (!zone.x || !zone.y || !zone.width || !zone.height) return
      
      // Zone background
      ctx.fillStyle = zone.color
      ctx.globalAlpha = draggedZone === index ? 0.8 : 0.6
      ctx.fillRect(zone.x, zone.y, zone.width, zone.height)
      
      // Zone border
      ctx.strokeStyle = zone.color
      ctx.lineWidth = 2
      ctx.globalAlpha = 1
      ctx.strokeRect(zone.x, zone.y, zone.width, zone.height)
      
      // Zone text
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 12px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      const centerX = zone.x + zone.width / 2
      const centerY = zone.y + zone.height / 2
      
      // Zone name (shortened)
      const shortName = zone.name.split(' ').slice(0, 2).join(' ')
      ctx.fillText(shortName, centerX, centerY - 8)
      
      // Zone area
      ctx.font = '10px Arial'
      ctx.fillText(`${zone.area}m²`, centerX, centerY + 6)
      
      // Resize handle
      ctx.fillStyle = '#374151'
      ctx.fillRect(zone.x + zone.width - 8, zone.y + zone.height - 8, 8, 8)
    })
    
    ctx.globalAlpha = 1
  }

  useEffect(() => {
    drawFloorPlan()
  }, [localZones, draggedZone])

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Check if clicking on a zone
    for (let i = localZones.length - 1; i >= 0; i--) {
      const zone = localZones[i]
      if (zone.x && zone.y && zone.width && zone.height &&
          x >= zone.x && x <= zone.x + zone.width &&
          y >= zone.y && y <= zone.y + zone.height) {
        setDraggedZone(i)
        setIsDragging(true)
        setDragOffset({
          x: x - zone.x,
          y: y - zone.y
        })
        break
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || draggedZone === null) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newZones = [...localZones]
    const zone = newZones[draggedZone]
    
    if (zone.width && zone.height) {
      // Snap to grid
      const gridSize = 20
      const newX = Math.round((x - dragOffset.x) / gridSize) * gridSize
      const newY = Math.round((y - dragOffset.y) / gridSize) * gridSize
      
      // Keep zone within bounds
      zone.x = Math.max(10, Math.min(canvas.width - zone.width - 10, newX))
      zone.y = Math.max(10, Math.min(canvas.height - zone.height - 10, newY))
    }
    
    setLocalZones(newZones)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggedZone(null)
    setDragOffset({ x: 0, y: 0 })
    
    // Notify parent component of changes
    if (onZoneUpdate) {
      onZoneUpdate(localZones)
    }
  }

  const resetLayout = () => {
    const canvasWidth = 400
    const canvasHeight = 400
    const scaleFactor = Math.sqrt(totalArea) / Math.min(canvasWidth, canvasHeight) * 20
    
    const resetZones = zones.map((zone, index) => {
      const aspectRatio = shape === 'square' ? 1 : shape === 'rectangular' ? 1.5 : 1.2
      const width = Math.sqrt(zone.area / scaleFactor) * aspectRatio
      const height = zone.area / scaleFactor / width
      
      const cols = Math.ceil(Math.sqrt(zones.length))
      const row = Math.floor(index / cols)
      const col = index % cols
      
      const cellWidth = canvasWidth / cols
      const cellHeight = canvasHeight / Math.ceil(zones.length / cols)
      
      const x = col * cellWidth + (cellWidth - width * 20) / 2
      const y = row * cellHeight + (cellHeight - height * 20) / 2
      
      return {
        ...zone,
        x: Math.max(10, Math.min(canvasWidth - width * 20 - 10, x)),
        y: Math.max(10, Math.min(canvasHeight - height * 20 - 10, y)),
        width: width * 20,
        height: height * 20
      }
    })
    
    setLocalZones(resetZones)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">Interaktivni 2D Plan</h4>
        <button
          onClick={resetLayout}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Resetuj Layout
        </button>
      </div>
      
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-2 border-gray-300 rounded-lg cursor-move bg-white"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      <div className="text-sm text-gray-600 space-y-1">
        <p>• Prevucite zone da reorganizujete prostor</p>
        <p>• Zone se automatski poravnavaju sa mrežom (20px grid)</p>
        <p>• Klonite na "Resetuj Layout" da vratite na početnu poziciju</p>
      </div>
      
      {draggedZone !== null && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm font-medium text-blue-900">
            Pomerajte: {localZones[draggedZone]?.name}
          </p>
          <p className="text-xs text-blue-700">
            Pozicija: ({Math.round(localZones[draggedZone]?.x || 0)}, {Math.round(localZones[draggedZone]?.y || 0)})
          </p>
        </div>
      )}
    </div>
  )
}