import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppLanding from "@/components/app-landing/AppLanding";
import { apps, appSlugs } from "@/lib/apps";

export const dynamicParams = false;

export function generateStaticParams() {
  return appSlugs.map((app) => ({ app }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> {
  const { app } = await params;
  const config = apps[app];
  return { title: config?.fullName };
}

export default async function Page({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app } = await params;
  const config = apps[app];
  if (!config) notFound();
  return <AppLanding app={config} />;
}
