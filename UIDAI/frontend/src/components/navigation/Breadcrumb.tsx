'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Breadcrumb() {
  const pathname = usePathname()
  
  const pathSegments = pathname.split('/').filter(Boolean)
  
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/')
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    return { href, label }
  })

  if (breadcrumbs.length === 0) return null

  return (
    <div className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center space-x-2 text-sm">
          <Link 
            href="/dashboard" 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
          
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1
            
            return (
              <div key={crumb.href} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {isLast ? (
                  <span className="font-semibold text-gray-900">{crumb.label}</span>
                ) : (
                  <Link 
                    href={crumb.href}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
