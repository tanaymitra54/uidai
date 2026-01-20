import { AnomalyDetectionHero, AnomalyList } from '@/components/anomaly/AnomalyComponents'

export default function AnomalyDetectionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AnomalyDetectionHero />
      <AnomalyList />
    </div>
  )
}
