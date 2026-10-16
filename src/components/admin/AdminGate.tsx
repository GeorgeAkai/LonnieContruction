import { KeyRound } from "lucide-react";
import { isAdminConfigured, isAuthenticated } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

/** Renders children only for a signed-in admin; otherwise the login screen. */
export async function AdminGate({ children }: { children: React.ReactNode }) {
  if (!isAdminConfigured()) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <KeyRound className="mx-auto mb-4 h-10 w-10 text-brand" />
        <h1 className="font-display text-2xl font-bold uppercase">
          Admin not set up
        </h1>
        <p className="mt-3 text-ink-700/80">
          Add an <code className="rounded bg-mist px-1.5">ADMIN_PASSWORD</code>{" "}
          environment variable (in Vercel: Project → Settings → Environment
          Variables), then redeploy.
        </p>
      </div>
    );
  }
  if (!(await isAuthenticated())) return <LoginForm />;
  return <>{children}</>;
}

export function AdminFallback() {
  return (
    <div className="grid gap-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-24 animate-pulse rounded-3xl bg-black/5" />
      ))}
    </div>
  );
}
