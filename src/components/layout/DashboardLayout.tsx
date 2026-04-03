import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface User {
  username: string;
  id: number;
  description?: string;
  avatar?: string;
  isAdmin?: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
  appName?: string;
  logo?: string;
}

export function DashboardLayout({
  children,
  user,
  appName,
  logo,
}: DashboardLayoutProps) {
  return (
    <div className="h-screen flex">
      <Sidebar user={user} appName={appName} logo={logo} />
      <div className="lg:pl-56 flex-1 flex flex-col min-h-0">
        <TopBar />
        <main
          id="page-content"
          className="flex-1 overflow-y-auto pt-16"
        >
          <div className="px-12 pt-6 pb-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
