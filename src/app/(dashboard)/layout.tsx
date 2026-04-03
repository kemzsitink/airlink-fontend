import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Mock user — replace with real auth session
const mockUser = {
  username: "admin",
  id: 1,
  description: "Administrator",
  isAdmin: true,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout user={mockUser} appName="AirLink">
      {children}
    </DashboardLayout>
  );
}
