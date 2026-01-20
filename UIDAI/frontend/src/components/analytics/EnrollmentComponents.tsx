'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, Users, Calendar, BarChart3, Activity, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function EnrollmentAnalyticsHero() {
  const [insights, setInsights] = useState({
    growthTrend: '+12.4%',
    nextMonthProjection: 342156,
    confidenceScore: 91,
    trendDirection: 'upward',
    lastUpdated: new Date().toLocaleTimeString()
  })

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] opacity-40" style={{ height: '40%' }}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-[#6B6B6B] mb-2">Aadhaar Enrollment Intelligence</div>
          <h1 className="text-6xl font-bold text-[#1A1A1A] tracking-tight">Enrollment Analytics & Predictions</h1>
          <p className="text-[#6B6B6B] mt-3 text-base">Exploratory insights into enrollment trends and future projections</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">30-Day Growth Projection</div>
              <div className="flex items-baseline space-x-4">
                <div className="text-6xl font-bold text-[#000080] tabular-nums">{insights.growthTrend}</div>
              </div>
              <div className="text-sm text-[#6B6B6B] mt-3">
                Projected enrollments: <span className="font-semibold text-[#1A1A1A]">{insights.nextMonthProjection.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-6 space-y-2 text-sm text-[#6B6B6B]">
              <p>Based on historical enrollment patterns, demographic trends, and seasonal factors:</p>
              <p>→ Urban regions expected to drive 68% of growth</p>
              <p>→ Peak enrollment anticipated in weeks 2-3</p>
              <p>→ Tech corridor districts showing accelerated adoption</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-4">Model Performance</div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-[#6B6B6B]">Prediction Accuracy</span>
                  <span className="font-bold text-[#1A1A1A] tabular-nums">94.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#6B6B6B]">Classification F1</span>
                  <span className="font-bold text-[#1A1A1A] tabular-nums">0.92</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#6B6B6B]">Data Quality</span>
                  <span className="font-semibold text-[#138808]">Excellent</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">Model Confidence</div>
              <div className="text-5xl font-bold text-[#138808] tabular-nums">{insights.confidenceScore}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PredictionsSection() {
  const [predictions, setPredictions] = useState([
    {
      region: 'Maharashtra Urban',
      current: 127543,
      predicted: 143891,
      growth: 12.8,
      confidence: 93,
      factors: ['Tech sector growth', 'Migration influx', 'Campaign effectiveness'],
      implication: 'Increase enrollment center capacity by 15% in urban zones'
    },
    {
      region: 'Karnataka Tech Corridor',
      current: 98234,
      predicted: 115678,
      growth: 17.7,
      confidence: 89,
      factors: ['IT industry expansion', 'Young demographic', 'High digital literacy'],
      implication: 'Deploy additional biometric equipment to handle surge'
    },
    {
      region: 'Gujarat Industrial Belt',
      current: 145677,
      predicted: 158234,
      growth: 8.6,
      confidence: 91,
      factors: ['Steady industrial growth', 'Rural-urban migration', 'Government initiatives'],
      implication: 'Maintain current capacity with minor adjustments'
    },
    {
      region: 'Rural Rajasthan',
      current: 67890,
      predicted: 71234,
      growth: 4.9,
      confidence: 85,
      factors: ['Seasonal agricultural cycle', 'Limited infrastructure', 'Traditional adoption rate'],
      implication: 'Focus on mobile enrollment units for better coverage'
    }
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Regional Enrollment Predictions</h2>
        <p className="text-gray-600">30-day forecasts with contextual interpretation and recommended actions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {predictions.map((pred, idx) => (
          <Card key={idx} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{pred.region}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">Confidence:</span>
                  <span className="text-sm font-semibold text-blue-700">{pred.confidence}%</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-xl font-bold text-green-700">+{pred.growth}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Current (30 days)</div>
                <div className="text-lg font-bold text-gray-900">{pred.current.toLocaleString()}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Predicted (Next 30)</div>
                <div className="text-lg font-bold text-blue-700">{pred.predicted.toLocaleString()}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-semibold text-gray-700 mb-2">Key Growth Factors:</div>
              <div className="flex flex-wrap gap-2">
                {pred.factors.map((factor, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-blue-900 mb-1">Strategic Implication:</div>
              <div className="text-sm text-blue-800">{pred.implication}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ClassificationInsights() {
  const [classificationData, setClassificationData] = useState({
    ageGroups: [
      { group: '18-25', count: 145678, percentage: 28.5, trend: 'increasing', quality: 'high' },
      { group: '26-35', count: 187234, percentage: 36.6, trend: 'stable', quality: 'high' },
      { group: '36-50', count: 112890, percentage: 22.1, trend: 'stable', quality: 'medium' },
      { group: '51+', count: 65432, percentage: 12.8, trend: 'increasing', quality: 'medium' }
    ],
    biometricQuality: {
      excellent: 67.3,
      good: 24.1,
      fair: 7.2,
      poor: 1.4
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enrollment Classification Analysis</h2>
        <p className="text-gray-600">Demographic patterns and biometric quality insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Group Distribution & Trends</h3>
            <div className="space-y-4">
              {classificationData.ageGroups.map((group, idx) => (
                <div key={idx} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-900">{group.group} years</span>
                      <span className={cn(
                        'px-2 py-1 rounded-full text-xs font-semibold',
                        group.trend === 'increasing' && 'bg-green-100 text-green-700',
                        group.trend === 'stable' && 'bg-blue-100 text-blue-700',
                        group.trend === 'decreasing' && 'bg-orange-100 text-orange-700'
                      )}>
                        {group.trend === 'increasing' && '↗ Increasing'}
                        {group.trend === 'stable' && '→ Stable'}
                        {group.trend === 'decreasing' && '↘ Decreasing'}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-blue-700">{group.percentage}%</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${group.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-24">{group.count.toLocaleString()}</span>
                  </div>

                  <div className="mt-2 text-sm text-gray-600">
                    Data Quality: <span className={cn(
                      'font-semibold',
                      group.quality === 'high' && 'text-green-600',
                      group.quality === 'medium' && 'text-yellow-600'
                    )}>{group.quality === 'high' ? 'High' : 'Medium'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm font-semibold text-blue-900 mb-2">Key Insights:</div>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 26-35 age group dominates enrollment (36.6%) - prime working age demographic</li>
                <li>• Youth (18-25) showing increasing trend - driven by first-time employment</li>
                <li>• Senior citizens (51+) enrollment rising - awareness campaign success</li>
              </ul>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Biometric Quality</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Excellent</span>
                <span className="text-lg font-bold text-green-700">{classificationData.biometricQuality.excellent}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${classificationData.biometricQuality.excellent}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Good</span>
                <span className="text-lg font-bold text-blue-700">{classificationData.biometricQuality.good}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${classificationData.biometricQuality.good}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Fair</span>
                <span className="text-lg font-bold text-yellow-700">{classificationData.biometricQuality.fair}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${classificationData.biometricQuality.fair}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Poor</span>
                <span className="text-lg font-bold text-red-700">{classificationData.biometricQuality.poor}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: `${classificationData.biometricQuality.poor}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-green-900 mb-1">Overall Quality Score</div>
            <div className="text-3xl font-bold text-green-700">91.4%</div>
            <div className="text-xs text-green-700 mt-1">Excellent/Good Combined</div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <strong>Implication:</strong> High biometric quality reduces fraud risk and ensures reliable authentication.
          </div>
        </Card>
      </div>
    </div>
  )
}
