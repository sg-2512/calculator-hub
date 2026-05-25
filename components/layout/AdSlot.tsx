'use client'
import { useEffect } from 'react'

interface AdSlotProps {
  slot: string
  className?: string
  format?: 'auto' | 'rectangle' | 'horizontal'
}

declare global {
  interface Window { adsbygoogle: unknown[] }
}

export default function AdSlot({ slot, className = '', format = 'auto' }: AdSlotProps) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}) }
    catch {}
  }, [])

  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center h-20 ${className}`}>
        <span className="text-xs text-gray-400 font-mono">Ad · {slot}</span>
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
