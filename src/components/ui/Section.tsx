import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  as?: React.ElementType;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      className,
      padding = "lg",
      as: Component = "section",
      ...props
    },
    ref
  ) => {
    const paddingMap = {
      none: "py-0",
      sm: "py-8 md:py-12",
      md: "py-12 md:py-20",
      lg: "py-16 md:py-24 lg:py-32",
      xl: "py-24 md:py-36 lg:py-48",
    };

    return (
      <Component
        ref={ref}
        className={cn("relative w-full", paddingMap[padding], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = "Section";
