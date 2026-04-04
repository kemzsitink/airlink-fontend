"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Settings,
  Server,
  Users,
  Network,
  Package,
  Key,
  Puzzle,
  LogOut,
  Box,
} from "lucide-react";
import { authApi } from "@/modules/auth/api";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  matchPrefix?: string;
}

const userNavItems: NavItem[] = [
  {
    label: "Servers",
    href: "/",
    icon: <Box className="w-5 h-5 mt-0.5" />,
    matchPrefix: "/server",
  },
];

const adminNavItems: NavItem[] = [
  {
    label: "Overview",
    href: "/admin/overview",
    icon: <LayoutGrid className="w-5 h-5 mt-0.5" />,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: <Settings className="w-5 h-5 mt-0.5" />,
  },
  {
    label: "Servers",
    href: "/admin/servers",
    icon: <Server className="w-5 h-5 mt-0.5" />,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: <Users className="w-5 h-5 mt-0.5" />,
  },
  {
    label: "Nodes",
    href: "/admin/nodes",
    icon: <Network className="w-5 h-5 mt-0.5" />,
  },
  {
    label: "Images",
    href: "/admin/images",
    icon: <Package className="w-5 h-5 mt-0.5" />,
  },
  {
    label: "Addons",
    href: "/admin/addons",
    icon: <Puzzle className="w-5 h-5 mt-0.5" />,
  },
  {
    label: "API Keys",
    href: "/admin/apikeys",
    icon: <Key className="w-5 h-5 mt-0.5" />,
  },
];

interface SidebarProps {
  user: {
    username: string;
    id: number;
    description?: string;
    avatar?: string;
    isAdmin?: boolean;
  };
  appName?: string;
  logo?: string;
}

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = item.matchPrefix
    ? pathname === item.href || pathname.startsWith(item.matchPrefix)
    : pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "nav-link mt-1 px-4 mx-4 group flex gap-x-3 py-1.5 rounded-xl text-sm leading-6 font-normal transition-all duration-200",
          isActive
            ? "text-neutral-950 dark:text-white"
            : "text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
        )}
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    </li>
  );
}

export function Sidebar({ user, appName = "Airlink", logo }: SidebarProps) {
  const router = useRouter();
  const avatarUrl = user.avatar
    ? user.avatar
    : `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(user.username)}`;

  async function handleLogout() {
    try {
      await authApi.logout();
    } catch { /* ignore */ }
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 lg:flex-col left-0">
      <div className="flex flex-col h-full bg-white/8 dark:bg-[#141414]/8 backdrop-blur-xl border-r border-neutral-200/30 dark:border-white/5">
        {/* Logo */}
        <div className="pl-6 pt-4 pb-4 flex min-w-0 shrink-0">
          <Link href="/" className="flex items-center min-w-0">
            {logo && (
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-10 rounded-xl mr-3 shrink-0"
              />
            )}
            <h1 className="text-neutral-700 dark:text-white font-medium tracking-tight text-lg truncate min-w-0">
              {appName}
            </h1>
          </Link>
        </div>

        {/* User info */}
        <Link
          href="/account"
          className="flex items-center space-x-4 py-4 px-4 border-y border-neutral-800/10 dark:border-white/5 shrink-0 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-colors group"
        >
          <img
            className="h-8 w-8 rounded-xl border border-neutral-700/10 shrink-0"
            src={avatarUrl}
            alt="User avatar"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-neutral-700 dark:text-white truncate group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
              {user.username}
              <span className="text-xs text-neutral-500">
                <sup className="mt-1">#{String(user.id).padStart(4, "0")}</sup>
              </span>
            </p>
            {user.description && (
              <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                {user.description}
              </p>
            )}
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto">
          <ul role="list" className="py-2">
            <li>
              <ul role="list" className="-mx-2 space-y-1 relative">
                {userNavItems.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}

                {user.isAdmin && (
                  <>
                    <p className="pl-8 text-neutral-600 dark:text-neutral-400 text-xs font-medium pt-6 pb-2">
                      Admin Panel
                    </p>
                    {adminNavItems.map((item) => (
                      <NavLink key={item.href} item={item} />
                    ))}
                  </>
                )}
              </ul>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-neutral-800/10 dark:border-white/5">
          <button
            onClick={handleLogout}
            className="group flex gap-x-3 pl-6 py-4 w-full text-sm font-medium leading-6 text-neutral-500 hover:text-red-700 dark:hover:text-red-500/80 hover:bg-red-500/5 dark:hover:bg-neutral-700/10 transition-colors duration-300"
          >
            <LogOut className="w-5 h-5 mt-0.5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
