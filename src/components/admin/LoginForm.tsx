"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { login } from "@/app/admin/actions";
import { LogoMark } from "@/components/Logo";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form
      action={action}
      className="mx-auto mt-6 max-w-sm rounded-3xl bg-white p-7 shadow-xl"
    >
      <LogoMark className="mx-auto h-14 w-14" />
      <h1 className="mt-4 text-center font-display text-2xl font-bold uppercase">
        Owner Login
      </h1>
      <p className="mt-1 text-center text-sm text-ink-700/70">
        Manage your before &amp; after photos.
      </p>
      <label className="mt-6 grid gap-1.5">
        <span className="text-sm font-semibold">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="h-13 rounded-2xl border border-black/10 px-4 text-base outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
        />
      </label>
      {state?.message && (
        <p role="alert" className="mt-3 text-sm font-semibold text-brand">
          {state.message}
        </p>
      )}
      <button
        disabled={pending}
        className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-brand font-bold text-white transition hover:bg-brand-600 active:scale-[0.98] disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Lock className="h-5 w-5" />
        )}
        Sign in
      </button>
    </form>
  );
}
