import { cn } from "@/lib/utils";

interface AppProgressBarProps {
  value: number; // 0-100
  className?: string;
  label?: string;
  showLabel?: boolean;
}

export function AppProgressBar({
  value,
  className,
  label,
  showLabel = false,
}: AppProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between mb-1.5">
          {label && (
            <span className="text-xs text-muted-foreground">{label}</span>
          )}
          {showLabel && (
            <span className="text-xs font-mono text-primary">{clamped}%</span>
          )}
        </div>
      )}
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full gradient-primary transition-all duration-300 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
