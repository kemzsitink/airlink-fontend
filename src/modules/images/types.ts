export interface Image {
  id: number;
  name: string;
  author?: string;
  authorName?: string;
  description?: string;
  startup: string;
  dockerImages: { [key: string]: string }[];
  variables: ImageVariable[];
  createdAt: string;
}

export interface ImageVariable {
  name: string;
  env: string;
  env_variable?: string;
  description?: string;
  value: string;
  default_value?: string;
  field_type?: "text" | "number";
  rules?: string;
}

export interface StoreImage {
  slug: string;
  name: string;
  author: string;
  description: string;
  tags: string[];
  installed: boolean;
}

// ── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_IMAGES: Image[] = [
  {
    id: 1,
    name: "Minecraft Java",
    author: "AirlinkLabs",
    description: "Minecraft Java Edition server",
    startup: "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar server.jar nogui",
    dockerImages: [{ "ghcr.io/airlinklabs/java:21": "Java 21" }, { "ghcr.io/airlinklabs/java:17": "Java 17" }],
    variables: [
      { name: "SERVER_MEMORY", env: "SERVER_MEMORY", description: "Max memory in MB", value: "1024" },
      { name: "SERVER_JARFILE", env: "SERVER_JARFILE", description: "Server jar filename", value: "server.jar" },
    ],
    createdAt: "2025-01-01",
  },
  {
    id: 2,
    name: "Velocity Proxy",
    author: "AirlinkLabs",
    description: "High-performance Minecraft proxy",
    startup: "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar velocity.jar",
    dockerImages: [{ "ghcr.io/airlinklabs/java:21": "Java 21" }],
    variables: [
      { name: "SERVER_MEMORY", env: "SERVER_MEMORY", description: "Max memory in MB", value: "512" },
    ],
    createdAt: "2025-01-05",
  },
];

export const MOCK_STORE_IMAGES: StoreImage[] = [
  { slug: "minecraft-java", name: "Minecraft Java", author: "AirlinkLabs", description: "Minecraft Java Edition server", tags: ["minecraft", "java"], installed: true },
  { slug: "velocity", name: "Velocity Proxy", author: "AirlinkLabs", description: "High-performance Minecraft proxy", tags: ["minecraft", "proxy"], installed: false },
  { slug: "paper", name: "Paper MC", author: "community", description: "High-performance Paper server", tags: ["minecraft", "paper"], installed: false },
  { slug: "nodejs", name: "Node.js", author: "AirlinkLabs", description: "Node.js application server", tags: ["nodejs", "web"], installed: false },
];
