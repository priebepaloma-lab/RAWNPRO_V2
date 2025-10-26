import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `Você é o assistente do RAWN PRO V2. Responda de forma clara, objetiva e amigável, seguindo o tom profissional dos documentos do projeto. Quando útil, seja sucinto e estruturado com tópicos curtos. Evite respostas muito longas e mantenha foco na tarefa do usuário.`;

type Msg = { role: "system" | "user"; content: string };

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
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Payload inválido. Envie { messages: [{ role, content }] }." },
        { status: 400 }
      );
    }

    const client = new OpenAI({ apiKey });

    const chatMessages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role,
        content: String(m.content ?? ""),
      })),
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      temperature: 0.2,
    });

    const content = completion.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ role: "system", content });
  } catch (err: any) {
    console.error("/api/chat error", err);
    return NextResponse.json(
      {
        error: "Falha ao obter resposta da OpenAI.",
        details: String(err?.message ?? err),
      },
      { status: 500 }
    );
  }
}
