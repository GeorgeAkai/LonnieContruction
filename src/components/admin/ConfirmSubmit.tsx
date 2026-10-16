"use client";

import { useFormStatus } from "react-dom";

/** Submit button that asks for confirmation and shows a pending state. */
export function ConfirmSubmit({
  children,
  message,
  className,
  label,
}: {
  children: React.ReactNode;
  message?: string;
  className?: string;
  label: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      aria-label={label}
      title={label}
      disabled={pending}
      className={`${className} disabled:opacity-50`}
      onClick={(e) => {
        if (message && !confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
