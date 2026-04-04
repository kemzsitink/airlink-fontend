import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { getServerUser } from '@/lib/session'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser()
  if (!user) redirect('/login')
  if (!user.isAdmin) redirect('/')

  return (
    <DashboardLayout user={user} appName="AirLink — Admin">
      {children}
    </DashboardLayout>
  )
}
