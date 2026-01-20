'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  AlertTriangle, 
  TrendingUp, 
  Activity,
  Settings
} from 'lucide-react'

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'System Overview',
  },
  {
    title: 'Anomaly Detection',
    href: '/anomaly-detection',
    icon: AlertTriangle,
    description: 'Critical Alerts',
    critical: true
  },
  {
    title: 'Enrollment Analytics',
    href: '/enrollment-analytics',
    icon: TrendingUp,
    description: 'Predictions & Trends',
  },
  {
    title: 'Comprehensive Analysis',
    href: '/comprehensive-analysis',
    icon: Activity,
    description: 'Full System Analysis',
  },
  {
    title: 'Configuration',
    href: '/configuration',
    icon: Settings,
    description: 'System Settings',
  }
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-[#E5E5E5] bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div>
                <h1 className="text-xl font-semibold text-[#1A1A1A] tracking-tight">UIDAI Analytics</h1>
                <p className="text-xs text-[#6B6B6B]">Decision Support Platform</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all relative',
                    isActive 
                      ? 'text-[#FF9933]' 
                      : 'text-[#6B6B6B] hover:text-[#1A1A1A]',
                    item.critical && !isActive && 'text-[#DC2626] hover:text-[#DC2626]'
                  )}
                >
                  <Icon className={cn(
                    'w-4 h-4',
                    item.critical && !isActive && 'animate-pulse'
                  )} />
                  <span>{item.title}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF9933]"></div>
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs text-[#6B6B6B]">System Status</div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-[#138808] rounded-full"></div>
                <span className="text-sm font-medium text-[#138808]">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center py-2 px-1 text-xs relative',
                  isActive 
                    ? 'text-[#FF9933]' 
                    : 'text-[#6B6B6B]',
                  item.critical && !isActive && 'text-[#DC2626]'
                )}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#FF9933]"></div>
                )}
                <Icon className="w-5 h-5 mb-1" />
                <span className="truncate max-w-full">{item.title.split(' ')[0]}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
