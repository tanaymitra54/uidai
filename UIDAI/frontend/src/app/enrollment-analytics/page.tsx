import { EnrollmentAnalyticsHero, PredictionsSection, ClassificationInsights } from '@/components/analytics/EnrollmentComponents'

export default function EnrollmentAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EnrollmentAnalyticsHero />
      <PredictionsSection />
      <ClassificationInsights />
    </div>
  )
}
