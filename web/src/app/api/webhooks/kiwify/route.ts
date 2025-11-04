import { NextResponse } from "next/server";

// Kiwify descontinuado: este endpoint retorna 410 (Gone)
export async function POST() {
  return NextResponse.json(
    { error: "Kiwify removido. Use Stripe." },
    { status: 410 }
  );
}

export async function GET() {
  return NextResponse.json(
    { error: "Kiwify removido. Use Stripe." },
    { status: 410 }
  );
}
