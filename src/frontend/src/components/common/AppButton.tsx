// Re-export from shadcn Button with custom variants added
import { Button as ShadButton, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";

// Extended variants on top of shadcn button
export const extendedButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-display font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-subtle",
        hero: "gradient-primary text-primary-foreground shadow-elevated hover:opacity-90 text-base",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-primary/40",
        ghost: "text-foreground hover:bg-secondary hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        upload:
          "gradient-primary text-primary-foreground shadow-card hover:opacity-90 w-full",
        icon: "bg-secondary text-foreground hover:bg-muted border border-border rounded-lg",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-5 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type AppButtonProps = ComponentProps<"button"> &
  VariantProps<typeof extendedButtonVariants> & {
    asChild?: boolean;
  };

export function AppButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: AppButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(extendedButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// Also re-export shadcn primitives for flexibility
export { ShadButton as Button, buttonVariants };
