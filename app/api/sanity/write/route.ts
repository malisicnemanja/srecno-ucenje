import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// Server-side only Sanity client with write permissions
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Server-side only!
  useCdn: false,
})

// Rate limiting map (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Simple rate limiting
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return true
  }
  
  if (limit.count >= 10) { // 10 requests per minute
    return false
  }
  
  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    // Validate request
    const body = await request.json()
    const { _type, data, action = 'create', documentId, operations } = body

    // Handle different actions
    if (action === 'patch') {
      if (!documentId || !operations) {
        return NextResponse.json(
          { error: 'Missing documentId or operations for patch' },
          { status: 400 }
        )
      }

      // Patch document
      let patch = writeClient.patch(documentId)
      
      // Apply operations
      if (operations.inc) {
        Object.entries(operations.inc).forEach(([field, value]) => {
          patch = patch.inc({ [field]: value as number })
        })
      }
      if (operations.set) {
        patch = patch.set(operations.set)
      }
      
      const result = await patch.commit()
      
      return NextResponse.json({
        success: true,
        id: result._id,
      })
    } else {
      // Default to create action
      if (!_type || !data) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        )
      }

      // Validate document type (whitelist approach)
      const allowedTypes = ['calculatorResult', 'booking', 'quizResult', 'newsletterSubscriber']
      if (!allowedTypes.includes(_type)) {
        return NextResponse.json(
          { error: 'Invalid document type' },
          { status: 400 }
        )
      }

      // Create document in Sanity
      const result = await writeClient.create({
        _type,
        ...data,
        createdAt: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        id: result._id,
      })
    }
  } catch (error) {
    console.error('Sanity write error:', error)
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    )
  }
}