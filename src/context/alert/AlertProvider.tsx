import { useCallback, useRef, useState } from "react";
import { AlertContext, type AlertOptions } from "./AlertContext";
import { AlertComponent } from "@/components/global/AlertComponent";

const defaultOptions: AlertOptions = {
  title: "Are you absolutely sure?",
  description: "This action cannot be undone.",
  actionText: "Delete",
  variant: "destructive",
};

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions>(defaultOptions);
  const actionRef = useRef<() => void>(() => {});

  const confirm = useCallback(
    (action: () => void, opts: AlertOptions = {}) => {
      actionRef.current = action;
      setOptions({ ...defaultOptions, ...opts });
      setOpen(true);
    },
    []
  );

  const handleConfirm = useCallback(() => {
    actionRef.current();
    setOpen(false);
  }, []);

  return (
    <AlertContext.Provider value={{ confirm }}>
      {children}
      <AlertComponent
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleConfirm}
        title={options.title!}
        description={options.description!}
        actionText={options.actionText!}
        variant={options.variant!}
      />
    </AlertContext.Provider>
  );
}
