'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity, CheckCircle, AlertTriangle, TrendingUp, Shield, FileText, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ComprehensiveAnalysisHero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] opacity-40" style={{ height: '50%' }}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-[#6B6B6B] mb-2">Aadhaar Enrollment Intelligence</div>
          <h1 className="text-6xl font-bold text-[#1A1A1A] tracking-tight">Comprehensive System Analysis</h1>
          <p className="text-[#6B6B6B] mt-3 text-base">Multi-model intelligence synthesis & strategic insights</p>
        </div>

        <div className="grid grid-cols-4 gap-8 mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-1">Analysis Scope</div>
            <div className="text-2xl font-bold text-[#1A1A1A]">Full System</div>
            <div className="text-xs text-[#6B6B6B]">All Models Active</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-1">Data Points</div>
            <div className="text-2xl font-bold text-[#1A1A1A] tabular-nums">2.8M+</div>
            <div className="text-xs text-[#6B6B6B]">Enrollments Analyzed</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-1">Confidence</div>
            <div className="text-2xl font-bold text-[#138808] tabular-nums">92%</div>
            <div className="text-xs text-[#6B6B6B]">Aggregate Score</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-1">Last Updated</div>
            <div className="text-2xl font-bold text-[#1A1A1A] tabular-nums">{new Date().toLocaleTimeString()}</div>
            <div className="text-xs text-[#6B6B6B]">Real-time Analysis</div>
          </div>
        </div>

        <div className="text-sm text-[#6B6B6B]">
          This analysis combines predictive modeling, classification algorithms, and anomaly detection to provide a holistic view of enrollment system performance, data quality, and operational insights.
        </div>
      </div>
    </div>
  )
}

export function ModelSynthesis() {
  const models = [
    {
      name: 'Enrollment Prediction Model',
      type: 'Random Forest Regressor',
      status: 'operational',
      accuracy: 94.7,
      findings: 'Projected 12.4% growth over next 30 days with high confidence in urban regions',
      impact: 'high',
      recommendations: [
        'Increase enrollment center capacity in Maharashtra and Karnataka',
        'Deploy additional staff during projected peak weeks (2-3)',
        'Prepare for 15% increase in biometric processing load'
      ]
    },
    {
      name: 'Classification Model',
      type: 'Gradient Boosting Classifier',
      status: 'operational',
      accuracy: 92.3,
      findings: '26-35 age group dominates (36.6%), biometric quality at 91.4% excellent/good',
      impact: 'medium',
      recommendations: [
        'Target youth awareness campaigns (18-25 showing growth)',
        'Maintain current quality control protocols',
        'Focus on senior citizen enrollment drives'
      ]
    },
    {
      name: 'Anomaly Detection System',
      type: 'Isolation Forest',
      status: 'operational',
      accuracy: 87.0,
      findings: '23 active anomalies detected, 3 critical requiring immediate investigation',
      impact: 'critical',
      recommendations: [
        'Investigate Maharashtra District 12 enrollment spike immediately',
        'Review Gujarat District 7 for equipment/staffing issues',
        'Implement enhanced monitoring in Karnataka District 4'
      ]
    }
  ]

  const getStatusBadge = (status: string) => {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-sm font-semibold text-green-700">Operational</span>
      </div>
    )
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'critical':
        return <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-bold">CRITICAL IMPACT</span>
      case 'high':
        return <span className="px-2 py-1 bg-orange-600 text-white rounded-full text-xs font-bold">HIGH IMPACT</span>
      case 'medium':
        return <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">MEDIUM IMPACT</span>
      default:
        return <span className="px-2 py-1 bg-gray-600 text-white rounded-full text-xs font-bold">LOW IMPACT</span>
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Multi-Model Intelligence Synthesis</h2>
        <p className="text-gray-600">Comprehensive insights from all analytical models working in concert</p>
      </div>

      <div className="space-y-6">
        {models.map((model, idx) => (
          <Card key={idx} className="p-6 border-l-4 border-l-purple-600">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{model.name}</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{model.type}</span>
                  <span className="text-gray-300">•</span>
                  {getStatusBadge(model.status)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Accuracy</div>
                <div className="text-3xl font-bold text-green-700">{model.accuracy}%</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              {getImpactBadge(model.impact)}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="text-sm font-semibold text-gray-700 mb-2">Key Findings:</div>
              <div className="text-gray-800">{model.findings}</div>
            </div>

            <div>
              <div className="text-sm font-semibold text-gray-700 mb-3">Strategic Recommendations:</div>
              <ul className="space-y-2">
                {model.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-purple-600 mt-1">→</span>
                    <span className="text-sm text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ExecutiveSummary() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="p-8 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-8 h-8 text-purple-700" />
          <h2 className="text-2xl font-bold text-gray-900">Executive Intelligence Summary</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-900">System Health</span>
            </div>
            <div className="text-2xl font-bold text-green-700 mb-1">Excellent</div>
            <div className="text-sm text-gray-600">All models operational, 92% aggregate confidence</div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Growth Outlook</span>
            </div>
            <div className="text-2xl font-bold text-blue-700 mb-1">Positive</div>
            <div className="text-sm text-gray-600">12.4% projected growth, strong urban momentum</div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-900">Risk Level</span>
            </div>
            <div className="text-2xl font-bold text-orange-700 mb-1">Moderate</div>
            <div className="text-sm text-gray-600">3 critical anomalies requiring attention</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-purple-200">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Strategic Priorities (Next 30 Days)</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-700 font-bold text-sm">1</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Address Critical Anomalies</div>
                <div className="text-sm text-gray-600 mt-1">
                  Investigate Maharashtra District 12 enrollment spike (105.7% deviation) and Gujarat District 7 enrollment drop (-41.8%)
                </div>
                <div className="text-xs text-red-600 font-semibold mt-1">URGENT - Within 24 hours</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-700 font-bold text-sm">2</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Scale Capacity for Growth</div>
                <div className="text-sm text-gray-600 mt-1">
                  Prepare for 12.4% enrollment increase - deploy resources to Maharashtra, Karnataka tech corridors
                </div>
                <div className="text-xs text-orange-600 font-semibold mt-1">HIGH PRIORITY - Within 7 days</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-700 font-bold text-sm">3</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Optimize Youth Enrollment</div>
                <div className="text-sm text-gray-600 mt-1">
                  18-25 age group showing growth trend - enhance digital campaigns and campus outreach
                </div>
                <div className="text-xs text-blue-600 font-semibold mt-1">MEDIUM PRIORITY - Within 14 days</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-purple-100 border border-purple-300 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Activity className="w-5 h-5 text-purple-700 mt-0.5" />
            <div className="text-sm text-purple-900">
              <strong>Overall Assessment:</strong> The enrollment system demonstrates strong operational health with high model accuracy and excellent biometric quality. While growth projections are positive, immediate attention to anomalous patterns is critical to maintain system integrity. Recommended actions are prioritized by urgency and impact.
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
