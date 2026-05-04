import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

interface AppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function AppModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: AppModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-ocid="modal.dialog" className={className}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
