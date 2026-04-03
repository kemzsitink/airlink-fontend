import { ServerLayout } from "@/components/layout/ServerLayout";

// Mock — replace with real data fetch
const mockServer = {
  name: "Minecraft SMP",
  description: "Main survival server",
  status: "running" as const,
};

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { uuid: string };
}) {
  return (
    <ServerLayout
      serverUUID={params.uuid}
      serverName={mockServer.name}
      serverDescription={mockServer.description}
      status={mockServer.status}
    >
      {children}
    </ServerLayout>
  );
}
