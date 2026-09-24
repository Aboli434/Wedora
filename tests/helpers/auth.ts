import { vi } from 'vitest';
import { NextRequest } from 'next/server';

let currentMockAuthUserId: string | null = null;

export function setAuthUser(userOrId: unknown | string | null) {
  if (!userOrId) {
    currentMockAuthUserId = null;
  } else if (typeof userOrId === 'string') {
    currentMockAuthUserId = userOrId;
  } else if (typeof userOrId === 'object') {
    currentMockAuthUserId = userOrId.supabaseAuthUserId || userOrId.id;
  }
}

export function getAuthUser() {
  return currentMockAuthUserId;
}

vi.mock('@/lib/supabase/server', () => ({
  createClient: async () => ({
    auth: {
      getUser: async () => {
        if (!currentMockAuthUserId) {
          return { data: { user: null }, error: new Error('Unauthenticated') };
        }
        return { data: { user: { id: currentMockAuthUserId } }, error: null };
      },
    },
  }),
  createAdminClient: () => ({
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
    },
  }),
}));

export function createMockNextRequest(url: string, options?: RequestInit & { json?: unknown }): NextRequest {
  const { json, headers: initHeaders, ...restOptions } = options || {};
  const headers = new Headers(initHeaders);

  let body: string | undefined = undefined;
  if (json !== undefined) {
    body = JSON.stringify(json);
    headers.set('content-type', 'application/json');
  }

  const fullUrl = url.startsWith('http') ? url : `http://localhost:3000${url.startsWith('/') ? '' : '/'}${url}`;

  return new NextRequest(fullUrl, {
    ...restOptions,
    headers,
    body,
  });
}
