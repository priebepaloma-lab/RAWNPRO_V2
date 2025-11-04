export const dynamic = "force-static";
// Endpoint removido: manter arquivo somente para evitar 404 de robots antigos.
// Retorna 410 Gone sem dependências do runtime.
export async function GET() {
  return new Response(
    JSON.stringify({ error: "Kiwify removido. Use Stripe." }),
    { status: 410, headers: { "content-type": "application/json" } }
  );
}

export async function POST() {
  return new Response(
    JSON.stringify({ error: "Kiwify removido. Use Stripe." }),
    { status: 410, headers: { "content-type": "application/json" } }
  );
}
