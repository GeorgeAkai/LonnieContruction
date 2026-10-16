import { Suspense } from "react";
import { AdminFallback, AdminGate } from "@/components/admin/AdminGate";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <>
      <h1 className="mb-6 font-display text-3xl font-bold uppercase">
        New project
      </h1>
      <Suspense fallback={<AdminFallback />}>
        <AdminGate>
          <ProjectForm />
        </AdminGate>
      </Suspense>
    </>
  );
}
