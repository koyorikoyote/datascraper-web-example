import { createContext } from "react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

export interface AlertOptions {
  title?: string;
  description?: string;
  actionText?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
}

export interface AlertContextValue {
  confirm: (action: () => void, options?: AlertOptions) => void;
}

export const AlertContext = createContext<AlertContextValue | null>(null);
