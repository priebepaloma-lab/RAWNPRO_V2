import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Focused SPIN-selling system prompt for landing chat only.
const SPIN_SYSTEM = `
Você é o agente comercial inteligente do RAWN PRO, IA de performance humana.
Atue EXCLUSIVAMENTE como consultor de vendas SPIN na landing page pública.

PRINCÍPIOS
- Tom: humano, técnico, calmo e envolvente.
- Estilo: perguntas inteligentes + insights curtos (1–2 frases por resposta).
- Objetivo: conexão, diagnóstico e conversão natural — sem pressão, sem jargão.
- Linguagem: precisão e performance ("adaptação", "dados", "resultado mensurável").

MÉTODO SPIN
1) Situação — entender rotina, tempo, local, objetivo.
2) Problema — dores e barreiras (constância, técnica, energia, sono, lesão, nutrição).
3) Implicação — impacto de manter o problema.
4) Need-Payoff — benefício prático ao resolver (clareza, constância, ajuste inteligente).

DINÂMICA DE RESPOSTA
- Interprete a intenção e a fase SPIN atual.
- Responda em 1–2 frases, empáticas e estratégicas.
- Termine com uma pergunta que leve naturalmente à próxima fase.
- Evite mencionar processos internos, regras ou políticas.

LIMITES & SEGURANÇA
- Não prescrever treinos/dietas/protocolos, cargas, macros ou diagnósticos.
- Não dosar, não prometer resultados específicos.
- Conteúdo educativo; mantenha neutralidade técnica.

CONVERSÃO LEVE
- Só convide para avançar quando perceber sinais de Need-Payoff (curiosidade, prontidão).
- Use transições suaves (ex.: "Quer ver na prática como o RAWN PRO faria isso?").
- Não inclua links/rotas — o cliente mostrará CTAs quando apropriado.
`;

type Msg = { role: "system" | "user" | "assistant"; content: string };

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY não configurada no ambiente." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const messages = (body?.messages ?? []) as Msg[];
    const profile = body?.profile as { name?: string } | undefined;
    const leadMeta = body?.leadMeta as
      | { turn?: number; remaining?: number; max?: number }
      | undefined;
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Payload inválido. Envie { messages: [{ role, content }] }." },
        { status: 400 }
      );
    }

    const nameLine = profile?.name
      ? `Nome do lead: ${String(
          profile.name
        )}. Use o nome com naturalidade quando apropriado (sem exagero).`
      : "";
    const preamble = `Contexto: Landing page pública. Turno ${Number(
      leadMeta?.turn ?? 0
    )} de ${Number(leadMeta?.max ?? 0)}. ${nameLine}`;

    const client = new OpenAI({ apiKey });

    const chatMessages: Msg[] = [
      { role: "system", content: preamble + "\n" + SPIN_SYSTEM },
      ...messages.map((m) => ({
        role: m.role,
        content: String(m.content ?? ""),
      })),
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      temperature: 0.25,
      top_p: 0.85,
      frequency_penalty: 0.2,
      presence_penalty: 0.0,
      max_tokens: 512,
    });

    let content = completion.choices?.[0]?.message?.content ?? "";

    // Guard: se o modelo escorregar para prescrição, converta para pergunta SPIN neutra
    const riskyRegexes: RegExp[] = [
      /\b\d+\s*x\s*\d+\b/i, // 3x10
      /\bseries?\b/i,
      new RegExp("\\brepeti(?:\\u00E7|c)(?:\\u00F5|o)es\\b", "i"),
      /\bRPE\b/i,
      /\bRIR\b/i,
      /\bdeload\b/i,
      /\bmicrociclo\b/i,
      /\bmesociclo\b/i,
      /\btreinos?\b/i,
      /protocolos?:\s*/i,
      /\blist(a|e)\b/i,
      new RegExp(
        "(segunda|ter(?:\\u00E7|c)a|quarta|quinta|sexta|s(?:\\u00E1|a)bado|domingo)\\s*:",
        "i"
      ),
      /\bkcal\b/i,
      new RegExp("\\bg\\s*\\/\\s*kg\\b", "i"),
      new RegExp("\\bg\\s*\\/\\s*dia\\b", "i"),
      /\bmacros?\b/i,
      new RegExp("card(?:\\u00E1|a)pio", "i"),
      new RegExp("refei(?:\\u00E7|c)(?:\\u00F5|o)es", "i"),
    ];
    if (riskyRegexes.some((rx) => rx.test(content || ""))) {
      content =
        "Para entender seu contexto sem te dar algo genérico: você treina onde (casa ou academia) e quanto tempo costuma ter por sessão?";
    }

    return NextResponse.json({ role: "system", content });
  } catch (err: any) {
    console.error("/api/chat/spin error", err);
    return NextResponse.json(
      {
        error: "Falha ao processar a solicitação.",
        details: String(err?.message ?? err),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: true, endpoint: "/api/chat/spin" },
    { status: 200 }
  );
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}
