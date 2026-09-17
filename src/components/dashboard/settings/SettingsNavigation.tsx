"use client";

import React, { useState, useEffect } from "react";
import { User, Heart, Bell, MessageSquare, Shield, Lock } from "lucide-react";

interface NavSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SETTINGS_SECTIONS: NavSection[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "wedding-preferences", label: "Wedding Preferences", icon: Heart },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "communication", label: "Communication", icon: MessageSquare },
  { id: "privacy", label: "Privacy & Consent", icon: Shield },
  { id: "account", label: "Account & Security", icon: Lock },
];

export function SettingsNavigation() {
  const [activeSection, setActiveSection] = useState("profile");

  // ScrollSpy listener to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of SETTINGS_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Desktop Vertical Section Navigation */}
      <nav aria-label="Settings navigation" className="hidden lg:block space-y-1">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#5A5650] font-semibold block mb-3 px-3">
          SETTINGS SECTIONS
        </span>

        <ul className="space-y-1">
          {SETTINGS_SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;

            return (
              <li key={sec.id}>
                <button
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-sans uppercase tracking-wider transition-all relative group text-left ${
                    isActive
                      ? "text-[#161514] font-semibold bg-[#161514]/5 border-r-2 border-[#C5A880]"
                      : "text-[#5A5650] hover:text-[#161514] hover:bg-[#161514]/[0.02]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-[#C5A880]" : "text-[#5A5650] group-hover:text-[#161514]"
                    }`}
                  />
                  <span>{sec.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Horizontal Scrollable Pill Navigation */}
      <div className="lg:hidden border-b border-[#161514]/15 pb-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max px-1">
          {SETTINGS_SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;

            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-sans uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-[#161514] text-[#FAF8F5]"
                    : "bg-white border border-[#161514]/15 text-[#5A5650]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#C5A880]" : "text-[#5A5650]"}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
