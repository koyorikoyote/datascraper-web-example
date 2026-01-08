import { StatusConst } from '@/constants/status'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/context/i18n/useTranslation'

interface KeywordStatusBadgeProps {
  status?: StatusConst
}

export default function KeywordStatusBadge({ status }: KeywordStatusBadgeProps) {
  const { t } = useTranslation()

  const getVariant = () => {
    switch (status) {
      case StatusConst.Pending:
        return 'outline'
      case StatusConst.Processing:
        return 'secondary'
      case StatusConst.Failed:
        return 'destructive'
      case StatusConst.Success:
        return 'default'
      case StatusConst.Partial:
        return 'default'
      case StatusConst.Waiting:
        return 'secondary'
      default:
        return 'default'
    }
  }

  return (
    <Badge variant={getVariant()}>
      {t(`status.${status}`)}
    </Badge>
  )
}