'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings, Save, RotateCcw, AlertCircle } from 'lucide-react'

export default function ConfigurationPage() {
  const [config, setConfig] = useState({
    state: 'Maharashtra',
    district: 'District 1',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    threshold: '0.5'
  })

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (error) {
      setSaveStatus('error')
    }
  }

  const handleReset = () => {
    setConfig({
      state: 'Maharashtra',
      district: 'District 1',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      threshold: '0.5'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">System Configuration</h1>
              <p className="text-gray-300">Advanced settings and analysis parameters</p>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div className="text-sm text-gray-300">
                Configuration changes affect analysis outputs. Most users should use default settings. Modify only if you understand the implications on model behavior.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Analysis Parameters</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                  State
                </Label>
                <Select value={config.state} onValueChange={(value) => setConfig({ ...config, state: value })}>
                  <SelectTrigger id="state" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                    <SelectItem value="Gujarat">Gujarat</SelectItem>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="district" className="text-sm font-medium text-gray-700">
                  District
                </Label>
                <Select value={config.district} onValueChange={(value) => setConfig({ ...config, district: value })}>
                  <SelectTrigger id="district" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <SelectItem key={num} value={`District ${num}`}>
                        District {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={config.startDate}
                  onChange={(e) => setConfig({ ...config, startDate: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={config.endDate}
                  onChange={(e) => setConfig({ ...config, endDate: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="threshold" className="text-sm font-medium text-gray-700">
                Anomaly Detection Threshold
              </Label>
              <div className="mt-1">
                <Input
                  id="threshold"
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={config.threshold}
                  onChange={(e) => setConfig({ ...config, threshold: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lower values increase sensitivity (more anomalies detected). Range: 0.0 - 1.0
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>

            <Button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              {saveStatus === 'saving' ? (
                <>Saving...</>
              ) : saveStatus === 'saved' ? (
                <>✓ Saved</>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Advanced Settings */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Advanced Model Settings</h2>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-900">
                  <strong>Warning:</strong> These settings control machine learning model behavior. Incorrect configuration may reduce prediction accuracy or increase false positive rates.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Random Forest Trees
                </Label>
                <Input type="number" defaultValue="100" className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">Number of trees in prediction model</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Prediction Confidence Threshold
                </Label>
                <Input type="number" step="0.01" defaultValue="0.85" className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">Minimum confidence for predictions</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Isolation Forest Contamination
                </Label>
                <Input type="number" step="0.01" defaultValue="0.1" className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">Expected proportion of anomalies</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Classification Max Depth
                </Label>
                <Input type="number" defaultValue="10" className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">Maximum tree depth for classifier</p>
              </div>
            </div>
          </div>
        </Card>

        {/* System Information */}
        <Card className="p-6 mt-6 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900 mb-4">System Information</h2>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Backend Version</span>
              <span className="font-semibold text-gray-900">v2.3.1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ML Framework</span>
              <span className="font-semibold text-gray-900">scikit-learn 1.3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Model Training</span>
              <span className="font-semibold text-gray-900">Jan 15, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Database Records</span>
              <span className="font-semibold text-gray-900">2,847,512</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
