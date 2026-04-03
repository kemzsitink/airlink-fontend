import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MOCK_USER } from "@/modules/auth/types";

/**
 * Admin layout — server component.
 * Replace MOCK_USER with real session fetch (e.g. next-auth getServerSession)
 * and redirect non-admins before rendering.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = MOCK_USER; // TODO: replace with getServerSession()

  // TODO: uncomment when auth is wired
  // if (!user.isAdmin) redirect("/");

  return (
    <DashboardLayout user={user} appName="AirLink — Admin">
      {children}
    </DashboardLayout>
  );
}
