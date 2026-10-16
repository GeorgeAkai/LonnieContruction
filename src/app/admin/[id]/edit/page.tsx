import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AdminFallback, AdminGate } from "@/components/admin/AdminGate";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjects } from "@/lib/projects";

export default function EditProjectPage({
  params,
}: PageProps<"/admin/[id]/edit">) {
  return (
    <>
      <h1 className="mb-6 font-display text-3xl font-bold uppercase">
        Edit project
      </h1>
      <Suspense fallback={<AdminFallback />}>
        <AdminGate>
          <EditForm params={params} />
        </AdminGate>
      </Suspense>
    </>
  );
}

async function EditForm({
  params,
}: {
  params: PageProps<"/admin/[id]/edit">["params"];
}) {
  const { id } = await params;
  const project = (await getProjects()).find((p) => p.id === id);
  if (!project) notFound();
  return <ProjectForm project={project} />;
}
