import { DataTable } from '@/components/global/DataTable'
import { useBatchHistoryDetails } from './useBatchHistoryDetails'
import { Breadcrumb } from '@/components/global/BreadcrumbComponent'
import type { BatchResponse } from '@/interfaces/batch.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExecutionIdConst } from '@/constants/execution-type'
import StatusBadge from '@/components/global/StatusBadge'
import { DateCell } from '@/components/global/DateCell'

interface BatchHistoryDetailsProps {
  batchData: BatchResponse;
}

export default function BatchHistoryDetails({ batchData }: BatchHistoryDetailsProps) {
  const { t, details, columns } = useBatchHistoryDetails(batchData)

  const getExecutionTypeLabel = (executionTypeId: number) => {
    switch (executionTypeId) {
      case ExecutionIdConst.URL_FETCH:
        return t('batch.executionTypes.urlFetch')
      case ExecutionIdConst.RANK_FETCH:
        return t('batch.executionTypes.rankFetch')
      case ExecutionIdConst.CSV_EXPORT:
        return t('batch.executionTypes.csvExport')
      case ExecutionIdConst.PARTIAL_RANK_FETCH:
        return t('batch.executionTypes.partialRankFetch')
      default:
        return executionTypeId
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb
          items={[
            { label: t('batch.title'), to: '/batch-history' },
            { label: batchData.id.toString() }
          ]}
        />
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <Card className="shadow-sm">
          <CardHeader className="pb-1 pt-3">
            <CardTitle className="text-sm font-medium">
              {t('batch.executionType')}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-lg font-bold">
              {getExecutionTypeLabel(batchData.execution_type_id)}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-1 pt-3">
            <CardTitle className="text-sm font-medium">
              {t('batch.status')}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <StatusBadge status={batchData.status} />
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-1 pt-3">
            <CardTitle className="text-sm font-medium">
              {t('batch.date')}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <DateCell date={batchData.created_at} />
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-1 pt-3">
            <CardTitle className="text-sm font-medium">
              {t('batch.user')}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-lg font-bold">
              {batchData.user.full_name}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-1 pt-3">
            <CardTitle className="text-sm font-medium">
              {t('batch.duration')}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-lg font-bold">
              {batchData.duration || '-'}
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-6">{t('batch.details.title')}</h2>
      <DataTable columns={columns} data={details} enableRowSelection={false} />
    </div>
  )
}
