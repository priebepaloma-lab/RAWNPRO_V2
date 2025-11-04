import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // Expose only non-sensitive deployment metadata (Vercel-provided)
  const data = {
    env: process.env.VERCEL_ENV || "unknown",
    url: process.env.VERCEL_URL || "",
    git: {
      repoOwner: process.env.VERCEL_GIT_REPO_OWNER || "",
      repoSlug: process.env.VERCEL_GIT_REPO_SLUG || "",
      branch: process.env.VERCEL_GIT_COMMIT_REF || "",
      sha: process.env.VERCEL_GIT_COMMIT_SHA || "",
      message: process.env.VERCEL_GIT_COMMIT_MESSAGE || "",
    },
    timestamp: new Date().toISOString(),
  } as const;

  return NextResponse.json({ ok: true, ...data });
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
