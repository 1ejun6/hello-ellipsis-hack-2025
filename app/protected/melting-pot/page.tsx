import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Translation } from "@/components/learn-singlish";
import Flashcard from "@/components/dashboard/flashcard";

export default function MeltingPotPage() {
  return (
      // <p>Melting Pot</p>

      <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="flex justify-center p-3 bg-blue-500">
            <p className="text-2xl font-bold [font-family:Georgia,serif]">
              Welcome to Lesson 1: Food [How to order]
            </p>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Translation />
        </div>

        <div className="flex justify-center p-3 font-semibold bg-blue-500">
          <p>Test your knowledge!</p>
        </div>

        <Flashcard />

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
        </footer>
      </div>
    </main>

  );
}