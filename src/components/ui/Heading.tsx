import React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?:
    | "display-xl"
    | "display-lg"
    | "display-md"
    | "heading-xl"
    | "heading-lg"
    | "heading-md";
}

export function Heading({
  children,
  className,
  as: Component = "h2",
  size = "heading-lg",
  ...props
}: HeadingProps) {
  return (
    <Component className={cn(size, className)} {...props}>
      {children}
    </Component>
  );
}
