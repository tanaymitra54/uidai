'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, TrendingUp, Users, Activity, Clock } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SystemMetrics {
  totalEnrollments: number
  anomaliesDetected: number
  predictionAccuracy: number
  systemConfidence: number
  lastUpdate: string
  criticalAlerts: number
}

interface CriticalAlert {
  id: string
  severity: 'critical' | 'high' | 'medium'
  message: string
  location: string
  timestamp: string
  action: string
  href: string
}

export function DashboardHero() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setMetrics({
          totalEnrollments: 2847512,
          anomaliesDetected: 23,
          predictionAccuracy: 94.7,
          systemConfidence: 92,
          lastUpdate: new Date().toLocaleTimeString(),
          criticalAlerts: 3
        })
        
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch metrics:', error)
        setLoading(false)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 30000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] border-b-4 border-[#000080]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-white/50 w-1/3 mb-4"></div>
            <div className="h-4 bg-white/50 w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] opacity-40" style={{ height: '60%' }}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-[#6B6B6B] mb-2">System Intelligence Overview</div>
          <h1 className="text-6xl font-bold text-[#1A1A1A] mb-4 tracking-tight">Aadhaar Analytics</h1>
          <div className="flex items-center space-x-2 text-[#6B6B6B] text-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>Last updated: {metrics?.lastUpdate}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-1">Total Enrollments</div>
            <div className="text-4xl font-bold text-[#1A1A1A] tabular-nums">{metrics?.totalEnrollments.toLocaleString()}</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-1">Active Anomalies</div>
            <div className="text-4xl font-bold text-[#DC2626] tabular-nums">{metrics?.anomaliesDetected}</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-1">Model Accuracy</div>
            <div className="text-4xl font-bold text-[#138808] tabular-nums">{metrics?.predictionAccuracy}%</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-1">System Confidence</div>
            <div className="text-4xl font-bold text-[#000080] tabular-nums">{metrics?.systemConfidence}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CriticalAlertsSection() {
  const [criticalAlerts, setCriticalAlerts] = useState<CriticalAlert[]>([])

  useEffect(() => {
    setCriticalAlerts([
      {
        id: '1',
        severity: 'critical',
        message: 'Unusual enrollment spike detected in Maharashtra region',
        location: 'Maharashtra - District 12',
        timestamp: '5 minutes ago',
        action: 'Investigate Now',
        href: '/anomaly-detection'
      },
      {
        id: '2',
        severity: 'high',
        message: 'Biometric quality degradation pattern identified',
        location: 'Gujarat - District 7',
        timestamp: '12 minutes ago',
        action: 'Review Analytics',
        href: '/enrollment-analytics'
      },
      {
        id: '3',
        severity: 'high',
        message: 'Prediction confidence below threshold',
        location: 'Karnataka - District 4',
        timestamp: '18 minutes ago',
        action: 'Run Analysis',
        href: '/comprehensive-analysis'
      }
    ])
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#DC2626'
      case 'high':
        return '#FF9933'
      default:
        return '#000080'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-[#1A1A1A]">Critical Alerts</h2>
        <p className="text-[#6B6B6B] mt-2">Anomalies and patterns requiring immediate attention</p>
      </div>

      <div className="space-y-0">
        {criticalAlerts.map((alert, index) => {
          const borderColor = getSeverityColor(alert.severity)
          
          return (
            <div key={alert.id}>
              <div className="py-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: borderColor }}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-[#6B6B6B]">{alert.timestamp}</span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">
                      {alert.message}
                    </h3>
                    
                    <div className="text-sm text-[#6B6B6B] mb-4">
                      {alert.location}
                    </div>
                    
                    <div className="text-sm text-[#6B6B6B]">
                      This pattern suggests potential data quality issues, enrollment campaign activity, or system anomalies requiring investigation.
                    </div>
                  </div>
                  
                  <Link 
                    href={alert.href}
                    className="px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ml-8 hover:underline"
                    style={{ color: borderColor }}
                  >
                    {alert.action} →
                  </Link>
                </div>
              </div>
              {index < criticalAlerts.length - 1 && (
                <div className="border-t border-[#E5E5E5]"></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function QuickInsightsGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#FAFAFA]">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-[#1A1A1A]">System Intelligence</h2>
        <p className="text-[#6B6B6B] mt-2">Latest insights and recommendations from the analytics engine</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <Link href="/enrollment-analytics" className="group block">
          <div className="transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#000080] uppercase tracking-wider">
                Exploratory
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4 group-hover:text-[#000080] transition-colors">
              Enrollment Predictions
            </h3>
            <p className="text-[#6B6B6B] text-sm mb-4">
              Next 30 days projected: <span className="font-bold text-[#000080]">+12.4%</span> enrollment growth expected in urban regions
            </p>
            <div className="text-sm text-[#6B6B6B] pt-4 border-t border-[#E5E5E5]">
              Based on historical trends and demographic patterns
            </div>
          </div>
        </Link>

        <Link href="/anomaly-detection" className="group block">
          <div className="transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#DC2626] uppercase tracking-wider">
                Risk-Heavy
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4 group-hover:text-[#DC2626] transition-colors">
              Anomaly Detection
            </h3>
            <p className="text-[#6B6B6B] text-sm mb-4">
              23 irregular patterns detected requiring immediate attention across 7 districts
            </p>
            <div className="text-sm text-[#6B6B6B] pt-4 border-t border-[#E5E5E5]">
              Isolation Forest confidence: 87% - Investigate urgently
            </div>
          </div>
        </Link>

        <Link href="/comprehensive-analysis" className="group block">
          <div className="transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#138808] uppercase tracking-wider">
                Authoritative
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4 group-hover:text-[#138808] transition-colors">
              Full System Analysis
            </h3>
            <p className="text-[#6B6B6B] text-sm mb-4">
              Multi-model synthesis across all enrollment data - comprehensive intelligence report
            </p>
            <div className="text-sm text-[#6B6B6B] pt-4 border-t border-[#E5E5E5]">
              Combines prediction, classification, and anomaly detection
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
