import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@/context/auth/useAuth'
import { useTranslation } from '@/context/i18n/useTranslation'

export default function Logout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    logout()
      .catch(() => {
        toast.error(t('logout.failed'))
      })
      .finally(() => {
        navigate('/login', { replace: true })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Todo: add UI spinner
  return null
}
