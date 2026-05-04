import { cn } from "@/lib/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { User } from "lucide-react";

interface AppAvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "size-7 text-xs",
  md: "size-9 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-xl",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function AppAvatar({
  src,
  name,
  size = "md",
  className,
}: AppAvatarProps) {
  const sizeClass = sizeMap[size];

  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        sizeClass,
        className,
      )}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={name ?? "avatar"}
          className="h-full w-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-semibold">
        {name ? getInitials(name) : <User size={14} />}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
