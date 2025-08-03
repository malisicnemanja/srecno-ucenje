'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface SpaceZone {
  name: string
  area: number
  color: string
  description: string
  minArea: number
  maxArea: number
}

interface SpaceViewer3DProps {
  zones: SpaceZone[]
  totalArea: number
  shape: 'rectangular' | 'square' | 'l-shaped' | 'irregular'
}

export default function SpaceViewer3D({ zones, totalArea, shape }: SpaceViewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf8fafc)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(10, 10, 10)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Create floor
    const floorWidth = Math.sqrt(totalArea * 0.8)
    const floorHeight = totalArea / floorWidth
    
    const floorGeometry = new THREE.PlaneGeometry(floorWidth, floorHeight)
    const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xf1f5f9 })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)

    // Create walls
    const wallHeight = 3
    const wallThickness = 0.1
    
    // Front and back walls
    const frontWallGeometry = new THREE.BoxGeometry(floorWidth, wallHeight, wallThickness)
    const backWallGeometry = new THREE.BoxGeometry(floorWidth, wallHeight, wallThickness)
    
    // Side walls
    const sideWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, floorHeight)
    
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xe2e8f0 })
    
    const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial)
    frontWall.position.set(0, wallHeight / 2, floorHeight / 2)
    frontWall.castShadow = true
    scene.add(frontWall)
    
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial)
    backWall.position.set(0, wallHeight / 2, -floorHeight / 2)
    backWall.castShadow = true
    scene.add(backWall)
    
    const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial)
    leftWall.position.set(-floorWidth / 2, wallHeight / 2, 0)
    leftWall.castShadow = true
    scene.add(leftWall)
    
    const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial)
    rightWall.position.set(floorWidth / 2, wallHeight / 2, 0)
    rightWall.castShadow = true
    scene.add(rightWall)

    // Create zones as 3D areas with furniture
    zones.forEach((zone, index) => {
      const zoneWidth = Math.sqrt(zone.area * 0.8)
      const zoneDepth = zone.area / zoneWidth
      
      // Zone base
      const zoneGeometry = new THREE.BoxGeometry(zoneWidth, 0.1, zoneDepth)
      const zoneMaterial = new THREE.MeshLambertMaterial({ 
        color: new THREE.Color(zone.color),
        transparent: true,
        opacity: 0.3
      })
      const zoneMesh = new THREE.Mesh(zoneGeometry, zoneMaterial)
      
      // Position zones in a grid
      const cols = Math.ceil(Math.sqrt(zones.length))
      const row = Math.floor(index / cols)
      const col = index % cols
      
      const xPos = (col - cols / 2 + 0.5) * (floorWidth / cols)
      const zPos = (row - Math.ceil(zones.length / cols) / 2 + 0.5) * (floorHeight / Math.ceil(zones.length / cols))
      
      zoneMesh.position.set(xPos, 0.05, zPos)
      scene.add(zoneMesh)
      
      // Add furniture based on zone type
      if (zone.name.includes('Učionica')) {
        // Add desks and chairs
        for (let i = 0; i < 3; i++) {
          const deskGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.6)
          const deskMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 })
          const desk = new THREE.Mesh(deskGeometry, deskMaterial)
          desk.position.set(xPos + (i - 1) * 1.5, 0.4, zPos)
          desk.castShadow = true
          scene.add(desk)
          
          // Chair
          const chairGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.4)
          const chairMaterial = new THREE.MeshLambertMaterial({ color: 0x4a90e2 })
          const chair = new THREE.Mesh(chairGeometry, chairMaterial)
          chair.position.set(xPos + (i - 1) * 1.5, 0.4, zPos + 0.8)
          chair.castShadow = true
          scene.add(chair)
        }
      } else if (zone.name.includes('kreativne')) {
        // Add creative tables
        const tableGeometry = new THREE.CylinderGeometry(1, 1, 0.8, 8)
        const tableMaterial = new THREE.MeshLambertMaterial({ color: 0x10b981 })
        const table = new THREE.Mesh(tableGeometry, tableMaterial)
        table.position.set(xPos, 0.4, zPos)
        table.castShadow = true
        scene.add(table)
      } else if (zone.name.includes('čekanja')) {
        // Add sofas
        const sofaGeometry = new THREE.BoxGeometry(2, 0.8, 0.8)
        const sofaMaterial = new THREE.MeshLambertMaterial({ color: 0x6366f1 })
        const sofa = new THREE.Mesh(sofaGeometry, sofaMaterial)
        sofa.position.set(xPos, 0.4, zPos)
        sofa.castShadow = true
        scene.add(sofa)
      }
      
      // Zone label
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')!
      canvas.width = 256
      canvas.height = 64
      context.fillStyle = zone.color
      context.fillRect(0, 0, 256, 64)
      context.fillStyle = 'white'
      context.font = 'bold 16px Arial'
      context.textAlign = 'center'
      context.fillText(zone.name, 128, 40)
      
      const texture = new THREE.CanvasTexture(canvas)
      const labelMaterial = new THREE.MeshBasicMaterial({ map: texture })
      const labelGeometry = new THREE.PlaneGeometry(2, 0.5)
      const label = new THREE.Mesh(labelGeometry, labelMaterial)
      label.position.set(xPos, 2, zPos)
      label.lookAt(camera.position)
      scene.add(label)
    })

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Rotate camera around the scene
      const time = Date.now() * 0.0005
      camera.position.x = Math.cos(time) * 15
      camera.position.z = Math.sin(time) * 15
      camera.lookAt(0, 0, 0)
      
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (mountRef.current && cameraRef.current && rendererRef.current) {
        const width = mountRef.current.clientWidth
        const height = mountRef.current.clientHeight
        
        cameraRef.current.aspect = width / height
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(width, height)
      }
    }
    
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [zones, totalArea, shape, isClient])

  if (!isClient) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Učitavanje 3D prikaza...</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div 
        ref={mountRef} 
        className="w-full h-96 rounded-lg border border-gray-300 overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)' }}
      />
      <div className="mt-4 text-sm text-gray-600 text-center">
        3D prikaz se automatski rotira. Kamera se kreće oko prostora za bolji pregled.
      </div>
    </div>
  )
}