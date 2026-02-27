import type { LucideIcon } from "lucide-react";

export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  color: string; // tailwind gradient: "from-... to-..."
};

export type EcosystemTool = {
  name: string;
  image: string;
  description: string;
};
