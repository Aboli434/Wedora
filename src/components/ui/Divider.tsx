import React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "subtle" | "medium" | "gold";
}

export function Divider({
  className,
  orientation = "horizontal",
  variant = "subtle",
  ...props
}: DividerProps) {
  const variantStyles = {
    subtle: "bg-[var(--border-subtle)]",
    medium: "bg-[var(--border-medium)]",
    gold: "bg-[var(--accent-gold)]",
  };

  const orientationStyles = {
    horizontal: "w-full h-[1px]",
    vertical: "h-full w-[1px]",
  };

  return (
    <div
      role="separator"
      className={cn(
        orientationStyles[orientation],
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
