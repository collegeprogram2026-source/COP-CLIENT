import { NextResponse } from "next/server";

// Always run on each request — never statically cache, otherwise UptimeRobot
// would never actually reach the backend and Render would still spin down.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const TIMEOUT_MS = 10_000;

// GET /api/health
// Pinged by UptimeRobot. Pings the backend's /health to keep the Render
// free-tier dyno awake. Returns 200 only if the backend is reachable, so
// UptimeRobot reports real outages.
export async function GET() {
  const startedAt = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BACKEND_URL}/health`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });

    const latencyMs = Date.now() - startedAt;

    if (!res.ok) {
      return NextResponse.json(
        {
          status: "degraded",
          frontend: "ok",
          backend: { status: "error", httpStatus: res.status },
          latencyMs,
          timestamp: new Date().toISOString(),
        },
        { status: 503, headers: { "Cache-Control": "no-store" } }
      );
    }

    const backendBody = await res.json().catch(() => ({}));

    return NextResponse.json(
      {
        status: "ok",
        frontend: "ok",
        backend: backendBody,
        latencyMs,
        timestamp: new Date().toISOString(),
      },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    const latencyMs = Date.now() - startedAt;
    const isTimeout = (err as Error)?.name === "AbortError";
    return NextResponse.json(
      {
        status: "degraded",
        frontend: "ok",
        backend: {
          status: isTimeout ? "timeout" : "unreachable",
          error: (err as Error)?.message || String(err),
        },
        latencyMs,
        timestamp: new Date().toISOString(),
      },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  } finally {
    clearTimeout(timer);
  }
}

export async function HEAD() {
  // Many uptime checkers default to HEAD; treat it the same.
  const res = await GET();
  return new Response(null, { status: res.status, headers: res.headers });
}
