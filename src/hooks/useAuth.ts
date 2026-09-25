"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getCurrentUserApi } from '@/lib/api/endpoints';
import { CurrentUserResponse } from '@/lib/api/types';

export function useAuth() {
  const [user, setUser] = useState<CurrentUserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const currentUser = await getCurrentUserApi();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
      setError(err instanceof Error ? err.message : 'Not authenticated');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const currentUser = await getCurrentUserApi();
        if (isMounted) setUser(currentUser);
      } catch (err) {
        if (isMounted) {
          setUser(null);
          setError(err instanceof Error ? err.message : 'Not authenticated');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const logout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      router.push('/login');
    } catch {
      router.push('/login');
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isClient: user?.role === 'CLIENT',
    isVendor: user?.role === 'VENDOR',
    refetchUser: fetchUser,
    logout,
  };
}
