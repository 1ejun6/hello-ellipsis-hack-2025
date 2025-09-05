import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import Flashcard from "@/components/dashboard/flashcard";
import { InfoCard } from "@/components/info-card";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>About us</Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              title="Support them"
              description="Migrant workers make up one-third of Singapore's workforce. But they face challenges with language, social inclusion and access to help. By volunteering, you can bridge this gap and improve their lives. "
              link="https://thesmartlocal.com/read/migrant-workers-in-singapore/"
              linkLabel="Learn more"
            />
            <InfoCard
              title="Be a listening ear"
              description="Connect with them via one to one chat sessions to provide them with essential support. Every conversation matters."
              link=""
              linkLabel="Learn more"
            />
            <InfoCard
              title="Resources"
              description="Access helpful guides, FAQs, and tips to support you in volunteering."
              link="#"
              linkLabel="View resources"
            />
          </div>
        </div>
        <Hero />

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
