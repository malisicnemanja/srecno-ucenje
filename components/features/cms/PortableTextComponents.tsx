import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableTextComponents } from '@portabletext/react'
import { BrushStrokeText } from '@/components/animations/BrushUnderline'

/**
 * Portable Text Components for consistent rendering across the app
 */
export const portableTextComponents: PortableTextComponents = {
  // Handle the default block type properly
  types: {
    block: ({ value, children }) => {
      const style = value?.style || 'normal'
      
      switch (style) {
        case 'h1':
          const h1Text = extractTextFromChildren(children)
          const h1Words = h1Text.split(' ').filter(Boolean)
          const h1LastWord = h1Words.length > 0 ? h1Words[h1Words.length - 1] : ''
          
          return (
            <h1 className="text-3xl font-bold text-[#1E293B] mb-6 mt-12 relative">
              <BrushStrokeText 
                wordsToHighlight={h1LastWord ? [h1LastWord] : []}
                brushColor="#91C733"
                brushVariant="underline"
              >
                {h1Text}
              </BrushStrokeText>
            </h1>
          )
          
        case 'h2':
          const h2Text = extractTextFromChildren(children)
          const h2Words = h2Text.split(' ').filter(Boolean)
          const h2LastWord = h2Words.length > 0 ? h2Words[h2Words.length - 1] : ''
          
          return (
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4 mt-10 relative">
              <BrushStrokeText 
                wordsToHighlight={h2LastWord ? [h2LastWord] : []}
                brushColor="#F4C950"
                brushVariant="underline"
              >
                {h2Text}
              </BrushStrokeText>
            </h2>
          )
          
        case 'h3':
          const h3Text = extractTextFromChildren(children)
          const h3Words = h3Text.split(' ').filter(Boolean)
          const h3LastWord = h3Words.length > 0 ? h3Words[h3Words.length - 1] : ''
          
          return (
            <h3 className="text-xl font-bold text-[#1E293B] mb-4 mt-8 relative">
              <BrushStrokeText 
                wordsToHighlight={h3LastWord ? [h3LastWord] : []}
                brushColor="#5DBFDB"
                brushVariant="underline"
              >
                {h3Text}
              </BrushStrokeText>
            </h3>
          )
          
        case 'h4':
          return <h4 className="text-lg font-semibold text-[#1E293B] mb-3 mt-6">{children}</h4>
          
        case 'h5':
          return <h5 className="text-base font-semibold text-[#1E293B] mb-2 mt-4">{children}</h5>
          
        case 'h6':
          return <h6 className="text-sm font-semibold text-[#1E293B] mb-2 mt-4">{children}</h6>
          
        case 'blockquote':
          return (
            <blockquote className="border-l-4 border-[#5DBFDB] pl-6 ml-4 my-6 italic text-gray-600">
              {children}
            </blockquote>
          )
          
        case 'normal':
        default:
          return <p className="text-gray-700 leading-relaxed mb-6 text-lg">{children}</p>
      }
    },
    
    image: ({ value }) => {
      if (!value?.asset) return null
      
      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            <Image
              src={value.asset.url}
              alt={value.alt || ''}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={value.asset.metadata?.lqip || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLZ4aQbvLD2wCNIV5g2WaKGFqhKgRoqBUEbz5tLfQjXH2mjHNDMGzLEy4uGx2lT/wA7/RNv9QpXsssH3/9k='}
            />
          </div>
          {value.alt && (
            <figcaption className="text-center text-sm text-gray-600 mt-2">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
    
    // Custom callout/highlight box
    callout: ({ value }) => (
      <div className={`
        p-6 rounded-lg my-6 border-l-4
        ${value.type === 'info' ? 'bg-blue-50 border-[#5DBFDB] text-blue-900' : ''}
        ${value.type === 'warning' ? 'bg-yellow-50 border-[#F4C950] text-yellow-900' : ''}
        ${value.type === 'success' ? 'bg-green-50 border-[#91C733] text-green-900' : ''}
        ${value.type === 'error' ? 'bg-red-50 border-[#E53935] text-red-900' : ''}
      `}>
        {value.title && (
          <h4 className="font-semibold mb-2">{value.title}</h4>
        )}
        {value.content && (
          <div className="prose prose-sm max-w-none">
            {value.content}
          </div>
        )}
      </div>
    ),
    
    // Code blocks
    code: ({ value }) => (
      <pre className="bg-[#1E293B] text-white p-4 rounded-lg overflow-x-auto my-6 text-sm">
        <code className={`language-${value.language || 'text'}`}>
          {value.code}
        </code>
      </pre>
    ),
  },
  
  // List handling
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
        {children}
      </ol>
    ),
  },
  
  listItem: {
    bullet: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
  },
  
  // Text formatting marks
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#1E293B]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-[#5DBFDB]">{children}</em>
    ),
    underline: ({ children }) => (
      <u className="underline decoration-[#F4C950] decoration-2">{children}</u>
    ),
    strike: ({ children }) => (
      <s className="line-through text-gray-500">{children}</s>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm text-[#E53935]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || '#'
      
      // Check if it's an internal link
      const isInternal = href.startsWith('/') || href.startsWith('#')
      
      if (isInternal) {
        return (
          <Link 
            href={href} 
            className="text-[#5DBFDB] hover:text-[#0D7377] underline decoration-2 underline-offset-2 transition-colors"
          >
            {children}
          </Link>
        )
      }
      
      return (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5DBFDB] hover:text-[#0D7377] underline decoration-2 underline-offset-2 transition-colors"
        >
          {children}
        </a>
      )
    },
  },
  
  // Handle blocks that are not in types (legacy structure)
  block: {
    h1: ({ children }) => {
      const text = extractTextFromChildren(children)
      const words = text.split(' ').filter(Boolean)
      const lastWord = words.length > 0 ? words[words.length - 1] : ''
      
      return (
        <h1 className="text-3xl font-bold text-[#1E293B] mb-6 mt-12 relative">
          <BrushStrokeText 
            wordsToHighlight={lastWord ? [lastWord] : []}
            brushColor="#91C733"
            brushVariant="underline"
          >
            {text}
          </BrushStrokeText>
        </h1>
      )
    },
    
    h2: ({ children }) => {
      const text = extractTextFromChildren(children)
      const words = text.split(' ').filter(Boolean)
      const lastWord = words.length > 0 ? words[words.length - 1] : ''
      
      return (
        <h2 className="text-2xl font-bold text-[#1E293B] mb-4 mt-10 relative">
          <BrushStrokeText 
            wordsToHighlight={lastWord ? [lastWord] : []}
            brushColor="#F4C950"
            brushVariant="underline"
          >
            {text}
          </BrushStrokeText>
        </h2>
      )
    },
    
    h3: ({ children }) => {
      const text = extractTextFromChildren(children)
      const words = text.split(' ').filter(Boolean)
      const lastWord = words.length > 0 ? words[words.length - 1] : ''
      
      return (
        <h3 className="text-xl font-bold text-[#1E293B] mb-4 mt-8 relative">
          <BrushStrokeText 
            wordsToHighlight={lastWord ? [lastWord] : []}
            brushColor="#5DBFDB"
            brushVariant="underline"
          >
            {text}
          </BrushStrokeText>
        </h3>
      )
    },
    
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-[#1E293B] mb-3 mt-6">
        {children}
      </h4>
    ),
    
    h5: ({ children }) => (
      <h5 className="text-base font-semibold text-[#1E293B] mb-2 mt-4">
        {children}
      </h5>
    ),
    
    h6: ({ children }) => (
      <h6 className="text-sm font-semibold text-[#1E293B] mb-2 mt-4">
        {children}
      </h6>
    ),
    
    // Normal paragraph
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-6 text-lg">
        {children}
      </p>
    ),
    
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#5DBFDB] pl-6 ml-4 my-6 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  
  // Unknown blocks fallback
  unknownType: ({ value, children }) => {
    console.warn('Unknown Portable Text type:', value._type, value)
    return (
      <div className="border border-yellow-300 bg-yellow-50 p-4 rounded my-4">
        <p className="text-sm text-yellow-800">Unknown content type: {value._type}</p>
        <div>{children}</div>
      </div>
    )
  },
}

/**
 * Utility function to extract text content from Portable Text children
 */
function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children
  }
  
  if (Array.isArray(children)) {
    return children
      .map(child => {
        if (typeof child === 'string') {
          return child
        }
        if (React.isValidElement(child) && child.props.children) {
          return extractTextFromChildren(child.props.children)
        }
        return ''
      })
      .join('')
  }
  
  if (React.isValidElement(children) && children.props.children) {
    return extractTextFromChildren(children.props.children)
  }
  
  return ''
}

/**
 * Simple Portable Text renderer for basic content
 */
export const SimplePortableTextRenderer: React.FC<{ content: any }> = ({ content }) => {
  // Handle null/undefined content
  if (!content) {
    return null
  }
  
  // Handle string content
  if (typeof content === 'string') {
    return <p className="text-gray-700 leading-relaxed">{content}</p>
  }
  
  // Handle array of blocks
  if (Array.isArray(content)) {
    return (
      <div className="space-y-4">
        {content.map((block, index) => {
          if (!block || typeof block !== 'object') {
            return null
          }
          
          // Handle different block types
          if (block._type === 'block') {
            if (!block.children || !Array.isArray(block.children)) {
              return null
            }
            
            const text = block.children
              .filter((child: any) => child && typeof child === 'object' && child.text)
              .map((child: any) => child.text)
              .join('')
            
            if (!text.trim()) {
              return null
            }
            
            // Handle different block styles
            switch (block.style) {
              case 'h1':
                return <h1 key={index} className="text-3xl font-bold text-[#1E293B] mb-6 mt-12">{text}</h1>
              case 'h2':
                return <h2 key={index} className="text-2xl font-bold text-[#1E293B] mb-4 mt-10">{text}</h2>
              case 'h3':
                return <h3 key={index} className="text-xl font-bold text-[#1E293B] mb-4 mt-8">{text}</h3>
              case 'h4':
                return <h4 key={index} className="text-lg font-semibold text-[#1E293B] mb-3 mt-6">{text}</h4>
              case 'blockquote':
                return (
                  <blockquote key={index} className="border-l-4 border-[#5DBFDB] pl-6 ml-4 my-6 italic text-gray-600">
                    {text}
                  </blockquote>
                )
              default:
                return <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">{text}</p>
            }
          }
          
          // Handle other block types (images, etc.)
          if (block._type === 'image' && block.asset) {
            return (
              <figure key={index} className="my-8">
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={block.asset.url}
                    alt={block.alt || ''}
                    fill
                    className="object-cover"
                  />
                </div>
                {block.alt && (
                  <figcaption className="text-center text-sm text-gray-600 mt-2">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            )
          }
          
          return null
        }).filter(Boolean)}
      </div>
    )
  }
  
  // Fallback for single block object
  if (content._type === 'block' && content.children) {
    const text = content.children
      .filter((child: any) => child && typeof child === 'object' && child.text)
      .map((child: any) => child.text)
      .join('')
    
    return <p className="text-gray-700 leading-relaxed">{text}</p>
  }
  
  return null
}

export default portableTextComponents