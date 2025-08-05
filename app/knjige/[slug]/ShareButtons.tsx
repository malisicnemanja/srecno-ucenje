'use client'

import { PulseButton } from '@/components/animations'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  return (
    <div className="flex gap-3">
      <PulseButton
        variant="accent"
        size="sm"
        intensity="subtle"
        onClick={() => {
          const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          window.open(shareUrl, '_blank', 'width=600,height=400')
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 10.061C20 4.505 15.523 0 10 0S0 4.505 0 10.061c0 5.022 3.657 9.184 8.438 9.939v-7.03h-2.54v-2.91h2.54V7.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.91h-2.33V20C16.343 19.245 20 15.083 20 10.061z"/>
          </svg>
          Podeli
        </span>
      </PulseButton>

      <PulseButton
        variant="accent"
        size="sm"
        intensity="subtle"
        onClick={() => {
          const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
          window.open(shareUrl, '_blank', 'width=600,height=400')
        }}
        className="bg-sky-500 hover:bg-sky-600 text-white"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
          </svg>
          Tweet
        </span>
      </PulseButton>
    </div>
  )
}