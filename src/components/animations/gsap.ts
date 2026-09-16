import gsap from "gsap";

/**
 * GSAP utilities configuration helper
 */
export function initGSAP() {
  if (typeof window !== "undefined") {
    gsap.config({
      autoSleep: 60,
      force3D: true,
    });
  }
}

export { gsap };
