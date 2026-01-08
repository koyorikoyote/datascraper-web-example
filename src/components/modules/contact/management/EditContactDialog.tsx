import type { FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ContactTemplateUpdate } from "@/interfaces";
import { ContactFormFields } from "./ContactFormFields";


interface EditContactDialogProps {
  open: boolean;
  contact: ContactTemplateUpdate | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  t: (key: string) => string;
}

const EditContactDialog: React.FC<EditContactDialogProps> = ({
  open,
  contact,
  onOpenChange,
  onSubmit,
  t,
}) => {
  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{t("contact.contactUpdate")}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 my-4">
            <ContactFormFields t={t} data={contact} />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                {t("common.cancel")}
              </Button>
            </DialogClose>
            <Button type="submit">{t("common.save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditContactDialog;
