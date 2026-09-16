import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class name composition utility merging clsx conditional classes and tailwind-merge optimization.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
