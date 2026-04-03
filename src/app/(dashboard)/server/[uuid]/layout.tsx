import { ServerLayout } from "@/components/layout/ServerLayout";

// Mock — replace with real data fetch
const mockServer = {
  name: "Minecraft SMP",
  description: "Main survival server",
  status: "running" as const,
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  return (
    <ServerLayout
      serverUUID={uuid}
      serverName={mockServer.name}
      serverDescription={mockServer.description}
      status={mockServer.status}
    >
      {children}
    </ServerLayout>
  );
}
