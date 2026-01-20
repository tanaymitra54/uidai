'use client'

import { AlertTriangle, RefreshCw, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface ErrorStateProps {
  title?: string
  message?: string
  severity?: 'error' | 'warning' | 'info'
  onRetry?: () => void
  showConfigLink?: boolean
}

export function ErrorState({ 
  title = "System Error",
  message = "An unexpected error occurred",
  severity = 'error',
  onRetry,
  showConfigLink = true
}: ErrorStateProps) {
  const severityConfig = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      icon: 'text-red-600',
      text: 'text-red-900'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      icon: 'text-yellow-600',
      text: 'text-yellow-900'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      icon: 'text-blue-600',
      text: 'text-blue-900'
    }
  }

  const config = severityConfig[severity]

  return (
    <Card className={`p-6 border-l-4 ${config.bg} ${config.border}`}>
      <div className="flex items-start space-x-4">
        <AlertTriangle className={`w-6 h-6 ${config.icon} mt-1`} />
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${config.text} mb-2`}>{title}</h3>
          <p className={`text-sm ${config.text} mb-4`}>{message}</p>
          
          <div className="flex items-center space-x-3">
            {onRetry && (
              <Button 
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="border-gray-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Connection
              </Button>
            )}
            {showConfigLink && (
              <Link href="/configuration">
                <Button variant="outline" size="sm" className="border-gray-300">
                  <Settings className="w-4 h-4 mr-2" />
                  Check Configuration
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

interface BackendErrorProps {
  error: any
  context?: string
  onRetry?: () => void
}

export function BackendError({ error, context = "backend service", onRetry }: BackendErrorProps) {
  const isNetworkError = error?.message?.includes('fetch') || error?.message?.includes('network')
  const isTimeoutError = error?.message?.includes('timeout')
  
  let title = "Backend Service Unavailable"
  let message = `Unable to connect to ${context}. `
  
  if (isNetworkError) {
    message += "Please check your network connection and ensure the backend server is running."
  } else if (isTimeoutError) {
    message += "The request took too long to complete. The server may be overloaded."
  } else {
    message += error?.message || "An unknown error occurred while communicating with the server."
  }

  return (
    <ErrorState
      title={title}
      message={message}
      severity="error"
      onRetry={onRetry}
    />
  )
}

export function DataQualityWarning({ issue, affectedRecords }: { issue: string, affectedRecords?: number }) {
  return (
    <ErrorState
      title="Data Quality Warning"
      message={`${issue}${affectedRecords ? ` (${affectedRecords.toLocaleString()} records affected)` : ''}. Results may have reduced accuracy. Consider reviewing data sources and running validation.`}
      severity="warning"
      showConfigLink={true}
    />
  )
}

export function ModelConfidenceWarning({ confidence, threshold = 85 }: { confidence: number, threshold?: number }) {
  return (
    <ErrorState
      title="Low Model Confidence"
      message={`The current prediction confidence (${confidence}%) is below the recommended threshold (${threshold}%). This may indicate insufficient training data or unusual input patterns. Interpret results with caution.`}
      severity="warning"
      showConfigLink={true}
    />
  )
}
