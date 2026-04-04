import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { getServerUser } from '@/lib/session'

export default async function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser()
  if (!user) redirect('/login')

  return (
    <DashboardLayout user={user} appName="AirLink">
      {children}
    </DashboardLayout>
  )
}
