"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, CheckCheck } from "lucide-react";
import { NotificationResponse } from "@/lib/api/types";
import { getNotificationsApi, markNotificationReadApi, markAllNotificationsReadApi } from "@/lib/api/endpoints";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadNotifications() {
      try {
        setLoading(true);
        const res = await getNotificationsApi(1, 10);
        if (isMounted) {
          setNotifications(res.notifications || []);
          setUnreadCount(res.unreadCount || 0);
        }
      } catch {
        // Ignore fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadNotifications();

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      isMounted = false;
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMarkRead = async (notification: NotificationResponse) => {
    try {
      if (!notification.isRead) {
        await markNotificationReadApi(notification.id);
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      if (notification.linkUrl) {
        router.push(notification.linkUrl);
      }
    } catch {
      // Ignore fallback
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsReadApi();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {
      // Ignore fallback
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
        className="relative p-2.5 bg-[#F3EFEA] border border-[#161514]/15 text-[#161514] hover:border-[#C5A880] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-full"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-bold text-white bg-[#C5A880] rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl shadow-xl p-4 space-y-3 z-50 text-xs">
          <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
            <span className="font-serif text-sm text-[#2C2A29] font-medium">Notifications</span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="flex items-center gap-1 text-[11px] text-[#C5A880] hover:text-[#9A7D56] font-sans font-medium"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {loading ? (
            <p className="py-4 text-center text-[#8C857B] font-sans">Loading alerts...</p>
          ) : notifications.length === 0 ? (
            <p className="py-4 text-center text-[#8C857B] font-sans">No notifications yet.</p>
          ) : (
            <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  onClick={() => handleMarkRead(n)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    n.isRead
                      ? "bg-white/60 border-[#E8E2D9] opacity-75"
                      : "bg-white border-[#C5A880]/40 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-sans font-medium text-[#2C2A29] ${!n.isRead ? "text-black font-semibold" : ""}`}>
                      {n.title}
                    </p>
                    <span className="text-[9px] text-[#8C857B] font-mono whitespace-nowrap">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6E6B65] mt-1 font-sans line-clamp-2">
                    {n.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
