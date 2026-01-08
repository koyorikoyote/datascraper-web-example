import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import type { ReactNode } from "react"
import { useState } from "react"
import { useTranslation } from "@/context/i18n/useTranslation"

interface ModalProps {
  children: ReactNode
  title?: string
  description?: string
  trigger?: ReactNode
  footer?: ReactNode
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>
}

export function FormModal({
  children,
  title = "Edit",
  description = "",
  trigger,
  footer,
  onSubmit,
}: ModalProps) {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (onSubmit) await onSubmit(event)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">{trigger ?? t("common.new")}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={handleSubmit}
          className="max-h-[80vh] overflow-y-auto p-4"
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 my-4">{children}</div>

          <DialogFooter>
            {footer ?? (
              <>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    {t("common.cancel")}
                  </Button>
                </DialogClose>
                <Button type="submit">{t("common.save")}</Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
