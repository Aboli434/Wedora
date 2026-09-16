/**
 * Common Types for Wedora Platform Foundation
 */

export type ThemeMode = "light" | "dark" | "system";

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ComponentPropsWithChildren {
  children?: React.ReactNode;
  className?: string;
}
