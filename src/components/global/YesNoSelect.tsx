import React from "react"
import { useTranslation } from "@/context/i18n/useTranslation"

interface YesNoSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string
  name?: string
  defaultValue?: string
}

export function YesNoSelect({
  id = "yesNo",
  name = "yesNo",
  defaultValue = "no",
  ...props
}: YesNoSelectProps) {
  const { t } = useTranslation()
  return (
    <select
      id={id}
      name={name}
      defaultValue={defaultValue}
      className="border border-input bg-background rounded-md px-3 py-2 text-sm"
      {...props}
    >
      <option value="yes">{t('common.yes')}</option>
      <option value="no">{t('common.no')}</option>
    </select>
  )
}
