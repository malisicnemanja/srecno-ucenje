import React from 'react'

interface ProgramIconProps {
  iconName: string
  className?: string
}

const iconComponents: Record<string, React.ReactElement> = {
  book: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>
  ),
  calculator: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H8v-4h4v4zm6 0h-4v-4h4v4zm-6-6H8V7h4v4zm6 0h-4V7h4v4z"/>
    </svg>
  ),
  target: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-2-8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0-4c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z"/>
    </svg>
  ),
  brain: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.5 2c-1.82 0-3.53.5-5 1.35C2.99 4.07 2 5.84 2 7.5c0 1.12.3 2.17.82 3.07-.52.9-.82 1.95-.82 3.07 0 1.66.99 3.43 2.5 4.15C5.97 18.5 7.68 19 9.5 19c.28 0 .5.22.5.5s-.22.5-.5.5h-1c-.28 0-.5.22-.5.5s.22.5.5.5h7c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5c1.82 0 3.53-.5 5-1.35C21.01 16.93 22 15.16 22 13.5c0-1.12-.3-2.17-.82-3.07.52-.9.82-1.95.82-3.07 0-1.66-.99-3.43-2.5-4.15C18.03 2.5 16.32 2 14.5 2c-1.03 0-2.05.25-3 .72C10.55 2.25 9.53 2 9.5 2z"/>
    </svg>
  ),
  star: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  'graduation-cap': (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
    </svg>
  ),
  'font-size': (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/>
    </svg>
  ),
  hashtag: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"/>
    </svg>
  ),
  key: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm12.78-1.41L13.41 14l-1.41-1.41L16.17 8.42c.39-.39.39-1.02 0-1.41l-3.76-3.76c-.39-.39-1.02-.39-1.41 0L5.83 8.42c-.39.39-.39 1.02 0 1.41L7.24 11.24 8.66 9.83l-1.41-1.41L12.42 3.25l3.76 3.76-4.83 4.83 1.41 1.41 6.02-6.02c.78-.78.78-2.05 0-2.83l-3.76-3.76c-.78-.78-2.05-.78-2.83 0z"/>
    </svg>
  ),
  lightbulb: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
    </svg>
  ),
  'puzzle-piece': (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/>
    </svg>
  ),
  rocket: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33.13zm5.62 11.3c.31-.13 3.6-1.53 5.89-3.57l-1.55-1.55c.13.66-.08 1.34-.55 1.81L14.55 18.1l-2.55-3.62 2.81.17zM12 2l3.91 3.91-2.78 2.78-2.13-2.13L12 2zm-1.06 6.21l2.13 2.13-6.84 6.84c-.78.78-.78 2.05 0 2.83.78.78 2.05.78 2.83 0l6.84-6.84 2.13 2.13L22 12l-3.91-3.91L12 14.06l-1.06-5.85z"/>
    </svg>
  ),
  trophy: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h4v2h-2v11c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6H3V4h4zm2 0h6V2H9v2zm8 2H7v11h10V6z"/>
    </svg>
  ),
  eye: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  ),
  heart: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  'book-open': (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
    </svg>
  )
}

export default function ProgramIcon({ iconName, className = "w-12 h-12" }: ProgramIconProps) {
  const IconComponent = iconComponents[iconName]
  
  if (!IconComponent) {
    // Fallback to a default icon if the specified icon is not found
    return (
      <div className={`${className} text-blue-600`}>
        {iconComponents.book}
      </div>
    )
  }

  return (
    <div className={`${className} text-blue-600`}>
      {IconComponent}
    </div>
  )
}