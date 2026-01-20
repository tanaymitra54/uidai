import { ComprehensiveAnalysisHero, ModelSynthesis, ExecutiveSummary } from '@/components/analytics/ComprehensiveComponents'

export default function ComprehensiveAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ComprehensiveAnalysisHero />
      <ExecutiveSummary />
      <ModelSynthesis />
    </div>
  )
}
