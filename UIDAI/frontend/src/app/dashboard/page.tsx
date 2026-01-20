import { DashboardHero, CriticalAlertsSection, QuickInsightsGrid } from '@/components/dashboard/DashboardComponents'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHero />
      <CriticalAlertsSection />
      <QuickInsightsGrid />
    </div>
  )
}
