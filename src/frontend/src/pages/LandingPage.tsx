import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Camera,
  Mail,
  MapPin,
  Music,
  Phone,
  Star,
  Upload,
  Users,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  {
    icon: Camera,
    title: "Photography",
    description:
      "Showcase your photographic vision. Upload unlimited high-resolution images and organize them into stunning project galleries.",
  },
  {
    icon: Video,
    title: "Videography",
    description:
      "Share your motion work with the world. Upload video projects and let your storytelling come alive on your portfolio.",
  },
  {
    icon: Music,
    title: "Audio Projects",
    description:
      "Let your sound be heard. Upload audio tracks, podcasts, and soundscapes with full playback directly in your portfolio.",
  },
  {
    icon: Upload,
    title: "Multi-file Uploads",
    description:
      "Upload dozens of files at once with drag-and-drop. Batch processing means your entire project is live in minutes.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Follow fellow creators, like their work, and leave comments. MediaFolio is built on the connections between artists.",
  },
  {
    icon: Star,
    title: "Public Portfolio",
    description:
      "Your work deserves a permanent home. Share your portfolio link anywhere — no account needed to view your creations.",
  },
];

const team = [
  {
    name: "Elena Vasquez",
    role: "Founder & Creative Director",
    bio: "Documentary photographer with 12 years of experience across 30 countries. Built MediaFolio to give creators the platform they deserve.",
  },
  {
    name: "Marcus Osei",
    role: "Head of Product",
    bio: "Former filmmaker turned product builder. Obsessed with the details that separate good tools from great ones.",
  },
  {
    name: "Yuki Tanaka",
    role: "Lead Engineer",
    bio: "Full-stack engineer with a background in computational photography. Believes software should be invisible and outcomes should speak.",
  },
];

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  if (sent) {
    return (
      <div
        data-ocid="landing.contact.success_state"
        className="flex flex-col items-center justify-center gap-4 p-12 rounded-xl border border-border bg-card text-center"
      >
        <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center">
          <span className="text-background text-xl">✓</span>
        </div>
        <h3 className="font-display font-bold text-xl text-foreground">
          Message received!
        </h3>
        <p className="text-sm text-muted-foreground">
          Thank you for reaching out. We’ll get back to you at {form.email}{" "}
          within 24 hours.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setSent(false)}
          data-ocid="landing.contact.reset_button"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      data-ocid="landing.contact.form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-xs font-display font-semibold text-foreground uppercase tracking-wide"
          >
            Full Name
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Elena Vasquez"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="h-11 px-4 rounded-lg border border-input bg-card text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200 placeholder:text-muted-foreground"
            data-ocid="landing.contact.name_input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="text-xs font-display font-semibold text-foreground uppercase tracking-wide"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="h-11 px-4 rounded-lg border border-input bg-card text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200 placeholder:text-muted-foreground"
            data-ocid="landing.contact.email_input"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-xs font-display font-semibold text-foreground uppercase tracking-wide"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell us what’s on your mind…"
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="px-4 py-3 rounded-lg border border-input bg-card text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200 placeholder:text-muted-foreground resize-none"
          data-ocid="landing.contact.message_textarea"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="h-11 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:opacity-90 transition-smooth"
        data-ocid="landing.contact.submit_button"
      >
        Send Message
        <ArrowRight size={16} className="ml-2" />
      </Button>
    </form>
  );
}

export default function LandingPage() {
  const { isAuthenticated, isInitializing, login, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="flex flex-col" data-ocid="landing.page">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center">
              <Camera size={15} className="text-background" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              MediaFolio
            </span>
          </div>
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Public navigation"
          >
            {[
              { label: "Home", id: "hero" },
              { label: "About Us", id: "about" },
              { label: "Contact Us", id: "contact" },
            ].map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="text-sm font-display font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-ocid={`landing.nav.${id}_link`}
              >
                {label}
              </button>
            ))}
          </nav>
          <Button
            onClick={login}
            disabled={isLoggingIn || isInitializing}
            data-ocid="landing.nav.signup_button"
            className="bg-foreground text-background hover:opacity-80 font-display font-semibold text-sm px-5"
          >
            {isLoggingIn ? "Signing in…" : "Sign Up / Login"}
            <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background border-b border-border"
        data-ocid="landing.hero.section"
      >
        <div className="max-w-4xl mx-auto px-6 text-center py-24">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Your Creative Portfolio Platform
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-[1.05] mb-8 tracking-tight">
            Share Your
            <br />
            <span className="italic font-light">Creative Work</span>
          </h1>
          <p className="text-lg md:text-xl font-body text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            MediaFolio is a professional platform for photographers,
            videographers, and audio creators. Upload your projects, build your
            portfolio, and connect with a community that appreciates craft.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-12 px-8 bg-primary text-primary-foreground font-display font-semibold text-base rounded-lg hover:opacity-90 transition-smooth"
              onClick={login}
              disabled={isLoggingIn || isInitializing}
              data-ocid="landing.hero.cta_button"
            >
              {isLoggingIn ? "Signing in…" : "Get Started — It's Free"}
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 border-border text-foreground font-display font-semibold text-base rounded-lg hover:bg-muted/50 transition-smooth"
              onClick={() => scrollTo("about")}
              data-ocid="landing.hero.about_button"
            >
              About Us
            </Button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-border">
            {[
              { value: "10K+", label: "Creators" },
              { value: "250K+", label: "Projects" },
              { value: "3M+", label: "Media Files" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-3xl font-bold text-foreground">
                  {value}
                </p>
                <p className="text-sm text-muted-foreground mt-1 font-body">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-24 bg-muted/30 border-b border-border"
        data-ocid="landing.features.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
              What We Offer
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Everything a creator needs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-subtle transition-smooth"
                data-ocid={`landing.feature.${title.toLowerCase().replace(/\s+/g, "_")}.card`}
              >
                <div className="w-10 h-10 rounded-lg bg-foreground/5 border border-border flex items-center justify-center mb-4">
                  <Icon size={18} className="text-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm font-body text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="py-24 bg-background border-b border-border"
        data-ocid="landing.about.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
                About Us
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
                Built by creators,
                <br />
                <span className="italic font-light">for creators</span>
              </h2>
              <p className="text-base font-body text-muted-foreground leading-relaxed mb-6">
                MediaFolio was born out of frustration. Existing portfolio
                platforms were either too generic, too expensive, or too
                limiting. We wanted something that respected the work — where
                the art comes first and the technology stays out of the way.
              </p>
              <p className="text-base font-body text-muted-foreground leading-relaxed">
                Today, thousands of photographers, filmmakers, and sound
                designers trust MediaFolio to represent their best work. We’re
                independent, creator-funded, and fiercely committed to keeping
                this platform a place where real craft thrives.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {team.map(({ name, role, bio }) => (
                <div
                  key={name}
                  className="flex gap-4 p-5 bg-muted/30 rounded-xl border border-border"
                  data-ocid={`landing.team.${name.toLowerCase().split(" ")[0]}.card`}
                >
                  <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center shrink-0">
                    <span className="text-background font-display font-bold text-sm">
                      {name.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-foreground text-sm">
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">{role}</p>
                    <p className="text-sm font-body text-muted-foreground leading-relaxed">
                      {bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground" data-ocid="landing.cta.section">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-background/50 mb-6">
            Get Started
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-background tracking-tight mb-6">
            Start sharing your work today
          </h2>
          <p className="text-base font-body text-background/60 mb-10 leading-relaxed">
            Free to join. No credit card required. Your portfolio goes live the
            moment you upload your first project.
          </p>
          <Button
            size="lg"
            onClick={login}
            disabled={isLoggingIn || isInitializing}
            data-ocid="landing.cta.signup_button"
            className="h-12 px-8 bg-background text-foreground font-display font-semibold text-base rounded-lg hover:opacity-90 transition-smooth"
          >
            {isLoggingIn ? "Signing in…" : "Create Free Account"}
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-24 bg-background"
        data-ocid="landing.contact.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Contact Us
              </p>
              <h2 className="font-display text-4xl font-bold text-foreground tracking-tight mb-6">
                We’d love to
                <br />
                <span className="italic font-light">hear from you</span>
              </h2>
              <p className="text-base font-body text-muted-foreground leading-relaxed mb-10">
                Whether you have a question about features, pricing, or just
                want to say hello — we’re here.
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: Mail, label: "support@mediafolio.app" },
                  { icon: Phone, label: "+1 (555) 000-0000" },
                  { icon: MapPin, label: "San Francisco, CA" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <Icon size={16} className="text-foreground shrink-0" />
                    <span className="text-sm font-body">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-foreground rounded-sm flex items-center justify-center">
              <Camera size={12} className="text-background" />
            </div>
            <span className="font-display font-bold text-base tracking-tight text-foreground">
              MediaFolio
            </span>
          </div>
          <nav
            className="flex items-center gap-6"
            aria-label="Footer navigation"
          >
            {[
              { label: "Home", id: "hero" },
              { label: "About Us", id: "about" },
              { label: "Contact Us", id: "contact" },
            ].map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-display"
                data-ocid={`landing.footer.${id}_link`}
              >
                {label}
              </button>
            ))}
          </nav>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} MediaFolio. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline underline-offset-4"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
