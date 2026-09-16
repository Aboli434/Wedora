import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
}

export function Container({
  children,
  className,
  size = "lg",
  ...props
}: ContainerProps) {
  const sizeMap = {
    sm: "max-w-4xl",
    md: "max-w-6xl",
    lg: "max-w-7xl",
    full: "max-w-none",
  };

  return (
    <div
      className={cn("w-full mx-auto px-6 md:px-12 lg:px-16", sizeMap[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
