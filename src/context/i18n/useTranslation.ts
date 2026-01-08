import React, { useContext } from 'react'
import { I18nContext } from './I18nContext'
import { formatLocaleLabel } from '@/utils/helper'

export function useTranslation() {
  return useContext(I18nContext)
}

export function useFormatRoleLabel() {
  const { t } = useTranslation()              // I18nContext provides { t }
  return React.useCallback(
    (roleId: number | string) => formatLocaleLabel(roleId, 'roles', t),
    [t]
  )
}