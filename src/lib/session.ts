import { cookies } from 'next/headers'
import type { SessionUser } from '@/modules/auth/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

/**
 * Server-side: fetch current user from backend using session cookie.
 * Returns null if not authenticated.
 */
export async function getServerUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')
  if (!session?.value) return null

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Cookie: `session=${session.value}` },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.user ?? null
  } catch {
    return null
  }
}
