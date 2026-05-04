import { AppAvatar } from "@/components/common/AppAvatar";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useProjects";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Aperture,
  FolderOpen,
  Globe,
  LayoutGrid,
  LogIn,
  LogOut,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid, exact: true },
  { to: "/projects", label: "Projects", icon: FolderOpen, exact: false },
] as const;

export function Sidebar() {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    logout,
    principalText,
  } = useAuth();
  const { data: profile } = useUserProfile();

  return (
    <aside className="flex flex-col h-full bg-sidebar border-r border-sidebar-border w-64 shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="rounded-lg bg-primary p-1.5">
          <Aperture size={18} className="text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-lg text-sidebar-foreground tracking-tight">
          MediaFolio
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            data-ocid={`nav.${label.toLowerCase()}.link`}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-display font-medium transition-smooth",
              "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
            activeProps={{
              className:
                "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
            }}
          >
            <Icon size={17} />
            {label}
          </Link>
        ))}

        {isAuthenticated && (
          <Link
            to="/portfolio/$principal"
            params={{ principal: principalText }}
            data-ocid="nav.portfolio.link"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-display font-medium transition-smooth text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Globe size={17} />
            My Portfolio
          </Link>
        )}
      </nav>

      {/* User section */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <AppAvatar
              name={profile?.name}
              src={profile?.avatar?.getDirectURL()}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-display font-semibold text-sidebar-foreground truncate">
                {profile?.name ?? "Artist"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {principalText.slice(0, 14)}...
              </p>
            </div>
            <button
              type="button"
              onClick={logout}
              title="Sign out"
              data-ocid="nav.logout.button"
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-smooth"
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="w-full bg-primary text-primary-foreground rounded-lg h-10 px-5 text-sm font-display font-semibold transition-smooth hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            onClick={login}
            disabled={isInitializing || isLoggingIn}
            data-ocid="nav.login.button"
          >
            <LogIn size={16} />
            {isInitializing
              ? "Loading..."
              : isLoggingIn
                ? "Signing in..."
                : "Sign In"}
          </button>
        )}
      </div>
    </aside>
  );
}
