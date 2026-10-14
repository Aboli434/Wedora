import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { getCurrentUserApi } from "@/lib/api/endpoints";
import { CurrentUserResponse } from "@/lib/api/types";
import { UserRole } from "@prisma/client";

const STORAGE_KEY = "wedora_auth_user";

function getCachedUser(): CurrentUserResponse | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore parse errors
  }
  return null;
}

function setCachedUser(user: CurrentUserResponse | null) {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

interface AuthState {
  user: CurrentUserResponse | null;
  loading: boolean;
  isInitialized: boolean;
  setUser: (user: CurrentUserResponse | null) => void;
  initialize: () => Promise<void>;
  refetchUser: () => Promise<CurrentUserResponse | null>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  return {
    user: null,
    loading: true,
    isInitialized: false,

    setUser: (user) => {
      setCachedUser(user);
      set({ user, loading: false });
    },

    refetchUser: async (): Promise<CurrentUserResponse | null> => {
      try {
        // 1. Fetch fresh profile from /api/v1/me
        let apiUser: CurrentUserResponse | null = null;
        try {
          apiUser = await getCurrentUserApi();
        } catch (err) {
          console.warn("[AuthStore] getCurrentUserApi failed:", err);
        }

        // 2. Synchronize vendor verification status directly with DB endpoint
        const targetUser = apiUser || get().user;
        if (targetUser?.email && (targetUser.role === "VENDOR" || targetUser.profile)) {
          try {
            const res = await fetch(
              `/api/v1/auth/check-vendor?email=${encodeURIComponent(targetUser.email)}&_t=${Date.now()}`,
              { cache: "no-store", headers: { "Cache-Control": "no-cache" } }
            );
            const json = await res.json();
            if (json.success && json.data) {
              const vendorData = json.data;
              if (apiUser?.profile && "verified" in apiUser.profile) {
                (apiUser.profile as any).verified = vendorData.verified;
                if (vendorData.businessName) (apiUser.profile as any).businessName = vendorData.businessName;
                if (vendorData.city) (apiUser.profile as any).city = vendorData.city;
                if (vendorData.category) (apiUser.profile as any).category = vendorData.category;
              }
              if (targetUser.profile && "verified" in targetUser.profile) {
                (targetUser.profile as any).verified = vendorData.verified;
                if (vendorData.businessName) (targetUser.profile as any).businessName = vendorData.businessName;
                if (vendorData.city) (targetUser.profile as any).city = vendorData.city;
                if (vendorData.category) (targetUser.profile as any).category = vendorData.category;
              }
            }
          } catch (checkErr) {
            console.warn("[AuthStore] check-vendor verification sync failed:", checkErr);
          }
        }

        const finalUser = apiUser || targetUser;
        if (finalUser) {
          get().setUser(finalUser);
          return finalUser;
        }
        return null;
      } catch (err) {
        console.error("[AuthStore] refetchUser failed:", err);
        return null;
      }
    },

    initialize: async () => {
      if (typeof window === "undefined") return;
      if (get().isInitialized) return;

      // Restore from localStorage immediately on client mount
      const cached = getCachedUser();
      if (cached && !get().user) {
        set({ user: cached, loading: false });
      }

      const supabase = createClient();

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          get().setUser(null);
          set({ loading: false, isInitialized: true });
          return;
        }

        // Active session found! Populate basic user immediately
        const rawRole = (session.user.user_metadata?.role as UserRole) || "CLIENT";
        const fullName =
          (session.user.user_metadata?.fullName as string) ||
          (session.user.user_metadata?.name as string) ||
          session.user.email?.split("@")[0] ||
          "User";

        const initialProfile =
          rawRole === "VENDOR"
            ? ({
                id: session.user.id,
                businessName:
                  (session.user.user_metadata?.businessName as string) ||
                  `${fullName} Studio`,
                category:
                  (session.user.user_metadata?.category as any) ||
                  "CHOREOGRAPHY",
                city:
                  (session.user.user_metadata?.city as string) || "Mumbai",
                rating: 0,
                reviewCount: 0,
                startingPrice: "50000",
                verified: false,
                featured: false,
                description: null,
                coverImage: null,
                experienceYears: null,
                teamSize: null,
                createdAt: new Date(),
                updatedAt: new Date(),
              } as any)
            : null;

        const current = get().user || {
          id: session.user.id,
          email: session.user.email || "",
          role: rawRole,
          fullName,
          phoneNumber: session.user.phone || null,
          avatarUrl: (session.user.user_metadata?.avatar_url as string) || null,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          profile: initialProfile,
        };

        get().setUser(current);

        // Fetch fresh profile & DB verification status from server
        await get().refetchUser();
      } catch {
        get().setUser(null);
      } finally {
        set({ loading: false, isInitialized: true });
      }

      // Subscribe to Supabase auth events
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_OUT" || !session?.user) {
          get().setUser(null);
        } else if (session?.user) {
          await get().refetchUser();
        }
      });
    },

    logout: async () => {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch {
        // Ignore signout errors
      }
      get().setUser(null);
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
  };
});
