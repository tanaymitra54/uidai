'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, TrendingUp, MapPin, Calendar, Shield, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Anomaly {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  district: string
  state: string
  enrollmentCount: number
  expectedRange: string
  deviation: number
  detectedAt: string
  confidence: number
  possibleCauses: string[]
  recommendedActions: string[]
  status: 'active' | 'investigating' | 'resolved'
}

export function AnomalyDetectionHero() {
  const [stats, setStats] = useState({
    totalAnomalies: 23,
    criticalAnomalies: 3,
    averageDeviation: 47.3,
    detectionConfidence: 87,
    lastScan: new Date().toLocaleTimeString()
  })

  return (
    <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center animate-pulse">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Anomaly Detection System</h1>
                <p className="text-red-100">Real-time threat intelligence & pattern analysis</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-900/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-red-500">
            <div className="text-xs text-red-200 mb-1">System Status</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" />
              <span className="text-sm font-bold">MONITORING ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-red-900/30 backdrop-blur-sm rounded-lg p-4 border border-red-500/50">
            <div className="text-3xl font-bold">{stats.totalAnomalies}</div>
            <div className="text-sm text-red-200 mt-1">Active Anomalies</div>
          </div>

          <div className="bg-red-900/30 backdrop-blur-sm rounded-lg p-4 border border-red-500/50">
            <div className="text-3xl font-bold text-red-200">{stats.criticalAnomalies}</div>
            <div className="text-sm text-red-200 mt-1">Critical Threats</div>
            <div className="text-xs text-red-300 mt-1">Requires Immediate Action</div>
          </div>

          <div className="bg-red-900/30 backdrop-blur-sm rounded-lg p-4 border border-red-500/50">
            <div className="text-3xl font-bold">{stats.averageDeviation}%</div>
            <div className="text-sm text-red-200 mt-1">Avg. Deviation</div>
            <div className="text-xs text-red-300 mt-1">From Expected Baseline</div>
          </div>

          <div className="bg-red-900/30 backdrop-blur-sm rounded-lg p-4 border border-red-500/50">
            <div className="text-3xl font-bold text-green-300">{stats.detectionConfidence}%</div>
            <div className="text-sm text-red-200 mt-1">Model Confidence</div>
            <div className="text-xs text-red-300 mt-1">Isolation Forest</div>
          </div>
        </div>

        <div className="mt-6 bg-red-900/50 backdrop-blur-sm rounded-lg p-4 border-l-4 border-yellow-400">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-300 mt-0.5" />
            <div>
              <div className="font-semibold text-yellow-100">Warning: Elevated Anomaly Activity</div>
              <div className="text-sm text-red-200 mt-1">
                Unusual patterns detected across multiple regions. Isolation Forest model has identified irregular enrollment distributions that deviate significantly from historical baselines. Immediate investigation recommended.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AnomalyList() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching anomalies
    setTimeout(() => {
      setAnomalies([
        {
          id: '1',
          severity: 'critical',
          district: 'District 12',
          state: 'Maharashtra',
          enrollmentCount: 4523,
          expectedRange: '1800-2200',
          deviation: 105.7,
          detectedAt: '5 minutes ago',
          confidence: 94,
          possibleCauses: [
            'Enrollment campaign surge in urban areas',
            'Data entry error or system duplication',
            'Demographic shift - migration event',
            'Coordinated fraudulent activity'
          ],
          recommendedActions: [
            'Verify enrollment records for duplicates',
            'Cross-reference with campaign schedules',
            'Investigate biometric quality scores',
            'Alert regional supervisors immediately'
          ],
          status: 'active'
        },
        {
          id: '2',
          severity: 'high',
          district: 'District 7',
          state: 'Gujarat',
          enrollmentCount: 876,
          expectedRange: '1500-1800',
          deviation: -41.8,
          detectedAt: '12 minutes ago',
          confidence: 89,
          possibleCauses: [
            'Equipment failure at enrollment centers',
            'Reduced operational hours',
            'Staff shortage or training issues',
            'Seasonal variation in rural areas'
          ],
          recommendedActions: [
            'Check center operational status',
            'Review staff attendance records',
            'Verify equipment functionality',
            'Compare with previous year data'
          ],
          status: 'investigating'
        },
        {
          id: '3',
          severity: 'high',
          district: 'District 4',
          state: 'Karnataka',
          enrollmentCount: 3245,
          expectedRange: '2000-2400',
          deviation: 35.2,
          detectedAt: '18 minutes ago',
          confidence: 82,
          possibleCauses: [
            'Weekend enrollment drive',
            'Special enrollment event for elderly',
            'Backlog processing from previous week',
            'Population growth in tech corridors'
          ],
          recommendedActions: [
            'Confirm scheduled enrollment events',
            'Analyze enrollment time distribution',
            'Verify demographic composition',
            'Monitor for sustained pattern'
          ],
          status: 'active'
        }
      ])
      setLoading(false)
    }, 500)
  }, [])

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-50 border-red-300',
          badge: 'bg-red-600 text-white',
          icon: 'text-red-600',
          border: 'border-l-red-600'
        }
      case 'high':
        return {
          bg: 'bg-orange-50 border-orange-300',
          badge: 'bg-orange-600 text-white',
          icon: 'text-orange-600',
          border: 'border-l-orange-600'
        }
      case 'medium':
        return {
          bg: 'bg-yellow-50 border-yellow-300',
          badge: 'bg-yellow-600 text-white',
          icon: 'text-yellow-600',
          border: 'border-l-yellow-600'
        }
      default:
        return {
          bg: 'bg-blue-50 border-blue-300',
          badge: 'bg-blue-600 text-white',
          icon: 'text-blue-600',
          border: 'border-l-blue-600'
        }
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">⚠️ ACTIVE</span>
      case 'investigating':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">🔍 INVESTIGATING</span>
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">✓ RESOLVED</span>
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg p-6 h-48" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Detected Anomalies - Immediate Attention Required</h2>
        <p className="text-gray-600">Each anomaly represents a significant deviation from expected enrollment patterns and requires investigation</p>
      </div>

      <div className="space-y-6">
        {anomalies.map((anomaly) => {
          const config = getSeverityConfig(anomaly.severity)
          
          return (
            <Card key={anomaly.id} className={cn('border-l-8 overflow-hidden', config.bg, config.border)}>
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={cn('mt-1', config.icon)}>
                      <AlertTriangle className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={cn('px-3 py-1 rounded-full text-xs font-bold uppercase', config.badge)}>
                          {anomaly.severity}
                        </span>
                        {getStatusBadge(anomaly.status)}
                        <span className="text-sm text-gray-500">{anomaly.detectedAt}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        Irregular Enrollment Pattern: {anomaly.state}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{anomaly.district}, {anomaly.state}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Shield className="w-4 h-4" />
                          <span>Confidence: {anomaly.confidence}%</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 bg-white/50 rounded-lg p-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Actual Enrollments</div>
                    <div className="text-2xl font-bold text-gray-900">{anomaly.enrollmentCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Expected Range</div>
                    <div className="text-2xl font-bold text-gray-900">{anomaly.expectedRange}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Deviation</div>
                    <div className={cn(
                      'text-2xl font-bold',
                      anomaly.deviation > 0 ? 'text-red-600' : 'text-orange-600'
                    )}>
                      {anomaly.deviation > 0 ? '+' : ''}{anomaly.deviation}%
                    </div>
                  </div>
                </div>

                {/* Implications */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <span>What This Means (Implications)</span>
                  </h4>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm text-gray-700">
                    <p className="mb-2">
                      This enrollment pattern deviates <strong>{Math.abs(anomaly.deviation)}%</strong> from the historical baseline, indicating:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Potential data quality issues requiring verification</li>
                      <li>Unusual demographic or operational changes in the region</li>
                      <li>Risk of fraudulent activity or system manipulation</li>
                      <li>Impact on resource allocation and capacity planning</li>
                    </ul>
                  </div>
                </div>

                {/* Analysis */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Possible Causes</h4>
                    <ul className="space-y-2">
                      {anomaly.possibleCauses.map((cause, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm">
                          <span className="text-gray-400 mt-0.5">•</span>
                          <span className="text-gray-700">{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Recommended Actions</h4>
                    <ul className="space-y-2">
                      {anomaly.recommendedActions.map((action, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm">
                          <span className="text-orange-500 mt-0.5">→</span>
                          <span className="text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-6 border-t flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Detected by: Isolation Forest Model (v2.3) | Confidence: {anomaly.confidence}%
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      Mark as Investigating
                    </Button>
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white"
                      size="sm"
                    >
                      Generate Investigation Report
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
