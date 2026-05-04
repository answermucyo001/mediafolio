import { useAuth } from "@/hooks/useAuth";
import { Link, Outlet } from "@tanstack/react-router";
import { Aperture, Menu, X } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";
import { Sidebar } from "./Sidebar";

function PublicNav() {
  const { login, isInitializing, isLoggingIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="public.nav.logo.link"
        >
          <div className="rounded-lg bg-primary p-1.5">
            <Aperture size={16} className="text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            MediaFolio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/#hero"
            className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
            data-ocid="public.nav.home.link"
          >
            Home
          </a>
          <a
            href="/#about"
            className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
            data-ocid="public.nav.about.link"
          >
            About Us
          </a>
          <a
            href="/#contact"
            className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
            data-ocid="public.nav.contact.link"
          >
            Contact Us
          </a>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={login}
            disabled={isInitializing || isLoggingIn}
            data-ocid="public.nav.login.button"
            className="h-9 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-display font-semibold transition-smooth hover:opacity-90 disabled:opacity-50"
          >
            {isInitializing
              ? "Loading..."
              : isLoggingIn
                ? "Signing in..."
                : "Sign In"}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
          data-ocid="public.nav.mobile_toggle.button"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-6 py-4 flex flex-col gap-4">
          <button
            type="button"
            className="text-sm font-body text-foreground text-left hover:text-foreground/70 transition-colors duration-200"
            onClick={() => {
              setMobileOpen(false);
              document
                .getElementById("hero")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            data-ocid="public.nav.mobile.home.link"
          >
            Home
          </button>
          <button
            type="button"
            className="text-sm font-body text-foreground text-left hover:text-foreground/70 transition-colors duration-200"
            onClick={() => {
              setMobileOpen(false);
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            data-ocid="public.nav.mobile.about.link"
          >
            About Us
          </button>
          <button
            type="button"
            className="text-sm font-body text-foreground text-left hover:text-foreground/70 transition-colors duration-200"
            onClick={() => {
              setMobileOpen(false);
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            data-ocid="public.nav.mobile.contact.link"
          >
            Contact Us
          </button>
          <button
            type="button"
            onClick={login}
            disabled={isInitializing || isLoggingIn}
            data-ocid="public.nav.mobile.login.button"
            className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-display font-semibold transition-smooth hover:opacity-90 disabled:opacity-50"
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}

export function Layout() {
  const { isAuthenticated } = useAuth();

  // Show sidebar layout for authenticated users
  if (isAuthenticated) {
    return (
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
          <footer className="shrink-0 bg-card border-t border-border px-6 py-3">
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
              >
                caffeine.ai
              </a>
            </p>
          </footer>
        </div>
        <Toaster position="top-right" />
      </div>
    );
  }

  // Public layout with top nav
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-card border-t border-border px-6 py-4">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
}
