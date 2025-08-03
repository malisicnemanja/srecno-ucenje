'use client'

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Box, Text, Sphere, useTexture, Html } from '@react-three/drei'
import * as THREE from 'three'

// Interactive Desk Component
function Desk({ position, onClick, isActive }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <group position={position}>
      {/* Desk Top */}
      <Box
        ref={meshRef}
        args={[1.2, 0.05, 0.6]}
        position={[0, 0.75, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={isActive ? '#10b981' : '#8b7355'} />
      </Box>
      
      {/* Desk Legs */}
      {[[-0.5, 0, -0.25], [0.5, 0, -0.25], [-0.5, 0, 0.25], [0.5, 0, 0.25]].map((pos, i) => (
        <Box key={i} args={[0.05, 0.75, 0.05]} position={pos as [number, number, number]}>
          <meshStandardMaterial color="#654321" />
        </Box>
      ))}
      
      {/* Chair */}
      <group position={[0, 0.4, -0.5]}>
        <Box args={[0.4, 0.05, 0.4]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#4a5568" />
        </Box>
        <Box args={[0.4, 0.5, 0.05]} position={[0, 0.25, -0.175]}>
          <meshStandardMaterial color="#4a5568" />
        </Box>
      </group>

      {hovered && (
        <Html position={[0, 1.5, 0]} center>
          <div className="bg-white rounded-lg shadow-lg p-2 text-xs">
            <p className="font-semibold">Radno mesto</p>
            <p className="text-gray-600">Klikni za detalje</p>
          </div>
        </Html>
      )}
    </group>
  )
}

// Whiteboard Component
function Whiteboard() {
  return (
    <group position={[0, 2, -4.9]}>
      <Box args={[6, 3, 0.1]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      <Text
        position={[0, 0.5, 0.06]}
        fontSize={0.3}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Srećno učenje
      </Text>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.15}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        Brzо čitanje • Mentalna aritmetika • Kreativne radionice
      </Text>
    </group>
  )
}

// Books on Shelves
function BookShelf({ position }: any) {
  return (
    <group position={position}>
      {/* Shelf */}
      <Box args={[2, 0.05, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b7355" />
      </Box>
      
      {/* Books */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <Box
          key={i}
          args={[0.15, 0.4, 0.25]}
          position={[x, 0.22, 0]}
          rotation={[0, Math.random() * 0.2 - 0.1, 0]}
        >
          <meshStandardMaterial color={`hsl(${i * 60}, 70%, 50%)`} />
        </Box>
      ))}
    </group>
  )
}

// Learning Materials
function LearningMaterials({ position }: any) {
  const [selected, setSelected] = useState<string | null>(null)

  const materials = [
    { name: 'Abakus', color: '#f59e0b', position: [-0.3, 0, 0] },
    { name: 'Karte za učenje', color: '#3b82f6', position: [0, 0, 0] },
    { name: 'Knjige', color: '#10b981', position: [0.3, 0, 0] },
  ]

  return (
    <group position={position}>
      {materials.map((material, i) => (
        <group key={i} position={material.position as [number, number, number]}>
          <Box
            args={[0.2, 0.3, 0.1]}
            onClick={() => setSelected(material.name)}
            onPointerOver={(e) => e.stopPropagation()}
          >
            <meshStandardMaterial color={material.color} />
          </Box>
          
          {selected === material.name && (
            <Html position={[0, 0.5, 0]} center>
              <div className="bg-white rounded-lg shadow-lg p-3 text-sm">
                <p className="font-semibold">{material.name}</p>
                <p className="text-gray-600">Edukativni materijal</p>
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  )
}

// Main Classroom Scene
function ClassroomScene() {
  const [activeDesk, setActiveDesk] = useState<number | null>(null)

  // Desk positions in a classroom layout
  const deskPositions = [
    [-2, 0, -2], [0, 0, -2], [2, 0, -2],
    [-2, 0, 0], [0, 0, 0], [2, 0, 0],
    [-2, 0, 2], [0, 0, 2], [2, 0, 2],
  ]

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-5, 3, -5]} intensity={0.5} />

      {/* Floor */}
      <Box args={[10, 0.1, 10]} position={[0, -0.05, 0]} receiveShadow>
        <meshStandardMaterial color="#f3f4f6" />
      </Box>

      {/* Walls */}
      <Box args={[10, 6, 0.1]} position={[0, 3, -5]}>
        <meshStandardMaterial color="#e5e7eb" />
      </Box>
      <Box args={[0.1, 6, 10]} position={[-5, 3, 0]}>
        <meshStandardMaterial color="#e5e7eb" />
      </Box>
      <Box args={[0.1, 6, 10]} position={[5, 3, 0]}>
        <meshStandardMaterial color="#e5e7eb" />
      </Box>

      {/* Ceiling */}
      <Box args={[10, 0.1, 10]} position={[0, 6, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>

      {/* Desks */}
      {deskPositions.map((pos, i) => (
        <Desk
          key={i}
          position={pos}
          onClick={() => setActiveDesk(i)}
          isActive={activeDesk === i}
        />
      ))}

      {/* Teacher's Desk */}
      <group position={[0, 0, -3.5]}>
        <Box args={[2, 0.05, 1]} position={[0, 0.8, 0]}>
          <meshStandardMaterial color="#6b7280" />
        </Box>
        {/* Desk Legs */}
        {[[-0.9, 0, -0.4], [0.9, 0, -0.4], [-0.9, 0, 0.4], [0.9, 0, 0.4]].map((pos, i) => (
          <Box key={i} args={[0.05, 0.8, 0.05]} position={pos as [number, number, number]}>
            <meshStandardMaterial color="#4b5563" />
          </Box>
        ))}
      </group>

      {/* Whiteboard */}
      <Whiteboard />

      {/* Bookshelves */}
      <BookShelf position={[-4.5, 1.5, -2]} />
      <BookShelf position={[-4.5, 2.5, -2]} />
      <BookShelf position={[4.5, 1.5, -2]} />
      <BookShelf position={[4.5, 2.5, -2]} />

      {/* Learning Materials Table */}
      <group position={[3, 0.8, 3]}>
        <Box args={[1.5, 0.05, 1]}>
          <meshStandardMaterial color="#8b7355" />
        </Box>
        <LearningMaterials position={[0, 0.1, 0]} />
      </group>

      {/* Window Light Effect */}
      <Box args={[2, 3, 0.1]} position={[-5, 3, -2]}>
        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
      </Box>
      <Box args={[2, 3, 0.1]} position={[-5, 3, 2]}>
        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
      </Box>

      {/* Decorative Elements */}
      <group position={[0, 5, 0]}>
        <Sphere args={[0.3, 32, 32]} position={[-2, 0, -2]}>
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.3, 32, 32]} position={[2, 0, -2]}>
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.3, 32, 32]} position={[-2, 0, 2]}>
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.3, 32, 32]} position={[2, 0, 2]}>
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
        </Sphere>
      </group>

      {/* Information Panel */}
      {activeDesk !== null && (
        <Html position={[0, 4, 0]} center>
          <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs">
            <h3 className="font-bold text-lg mb-2">Radno mesto #{activeDesk + 1}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Ergonomski dizajnirano za maksimalnu koncentraciju i udobnost tokom učenja.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Prirodno osvetljenje</li>
              <li>• Prilagodljiva visina</li>
              <li>• Prostor za materijale</li>
            </ul>
          </div>
        </Html>
      )}
    </>
  )
}

// Loading Component
function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Učitavanje 3D učionice...</p>
      </div>
    </div>
  )
}

export default function InteractiveClassroom() {
  return (
    <div className="w-full h-[600px] relative rounded-xl overflow-hidden shadow-2xl">
      <Canvas
        shadows
        camera={{ position: [8, 5, 8], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ClassroomScene />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Suspense>
      </Canvas>
      
      {/* Controls Info */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-sm">
        <p className="font-semibold mb-1">Kontrole:</p>
        <p>🖱️ Levi klik + povuci = rotacija</p>
        <p>🖱️ Desni klik + povuci = pomeranje</p>
        <p>🖱️ Scroll = zum</p>
      </div>

      {/* Title */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <h3 className="text-lg font-bold text-gray-900">3D Interaktivna Učionica</h3>
        <p className="text-sm text-gray-600">Istražite našu modernu učionicu</p>
      </div>
    </div>
  )
}