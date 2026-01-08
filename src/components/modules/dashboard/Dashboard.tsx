import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { useTranslation } from '@/context/i18n/useTranslation'
import { useEffect, useState } from 'react'
import { dashboardApi } from '@/api/dashboard'
import type { DashboardData } from '@/interfaces/dashboard.types'
import { SQSMonitoring } from '@/components/sqs-monitoring/SQSMonitoring'

export default function Dashboard() {
  const { t } = useTranslation()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await dashboardApi.list()
      setDashboardData(response.data)
    }

    fetchDashboardData()
  }, [])

  // Transform weekly contact data for chart display
  const chartData = dashboardData?.weekly_contact_sending.map(item => ({
    name: new Date(item.date).toLocaleDateString('en', { weekday: 'short' }),
    inquiries: item.inquiries
  })) || []

  // KPI data from API
  const kpiData = dashboardData ? [
    { title: t('dashboard.keywords'), value: dashboardData.keyword_count },
    { title: t('dashboard.serpResults'), value: dashboardData.serp_result_count },
    { title: t('dashboard.batchHistory'), value: dashboardData.batch_history_count },
    { title: t('dashboard.weeklyInquiries'), value: dashboardData.weekly_contact_sending.reduce((sum, item) => sum + item.inquiries, 0) }
  ] : []

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)] overflow-hidden">
      {/* Left Section - Existing Dashboard (60%) */}
      <div className="flex-[3] space-y-4 overflow-y-auto pr-2">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {kpiData.map(kpi => (
            <Card key={kpi.title} className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">{kpi.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">{kpi.value}</CardContent>
            </Card>
          ))}
        </div>

        {/* Inquiry Volume Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t('dashboard.weeklyInquiryVolume')}</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="inquiries" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Right Section - SQS Monitoring (40%) */}
      <div className="flex-[2] h-full overflow-hidden">
        <SQSMonitoring />
      </div>
    </div>
  )
}
