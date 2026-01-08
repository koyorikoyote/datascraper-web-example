import api from '@/api'
import type { ScoreSetting } from '@/interfaces'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/context/i18n/useTranslation'
import { toast } from 'sonner'

export function useScoreSettings() {
  const [scoreSettings, setScoreSettings] = useState<ScoreSetting | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const res = await api.scoreSetting.list()
    setScoreSettings(res.data)
  }

  const onSaveScoreSetting = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!scoreSettings) {
      toast.error(t('common.error'))
      return
    }

    await api.scoreSetting.update(scoreSettings)
    await loadData()
    toast.success(t('keyword.success'))
  }

  return { t, onSaveScoreSetting, scoreSettings, setScoreSettings }
}
