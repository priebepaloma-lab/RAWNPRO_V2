# 🎯 CHECKPOINT – RAWN PRO V2

**Data:** 27 de outubro de 2025  
**Tag Git:** `checkpoint-2025-10-27`  
**Branch Backup:** `backup/checkpoint-2025-10-27`  
**Commit:** fa2898f (feat: premium hero polish, fixed header structure, centered footer nav)

---

## 📍 ESTADO ATUAL DO PROJETO

### ✅ Implementado e Deploy Realizado

1. **Landing Page Premium (/)**
   - Hero com logo centralizado, badge de autoridade científica, headline/subheadline focada em fitness
   - Animações premium: partículas flutuantes (Framer Motion), glow de fundo, shine nos CTAs
   - Comparação: IAs genéricas vs RAWN PRO (6 dimensões de especialização)
   - Seção de provas sociais, benefícios, garantia de 7 dias
   - Pricing com 2 planos: Mensal (R$ 49,90) e Vitalício (R$ 597,00)
   - Header: logo + botão "Ver Planos"
   - Footer: navegação centralizada, sem logo (balance visual)
   - Branding: fundo preto (#0a0a0a), verde neon (#00FF9C)

2. **Chat App (/chat)**
   - Interface estilo WhatsApp com bolhas de mensagem left/right
   - Integração com OpenAI (GPT-4)
   - Composer com textarea expansível e botão de envio

3. **Sistema de Assinaturas MVP**
   - Tipos: Free (limite 10 msg/dia), Premium Mensal, Premium Vitalício
   - Lógica: `lib/subscription.ts`, hook `useSubscription.ts`
   - localStorage para tracking (mensagens/dia, status, ativação)
   - UpgradeBanner condicional no chat
   - Páginas: `/plans` (exibe planos e links Kiwify), `/success` (ativação pós-compra com Suspense)
   - Webhook Kiwify: `/api/webhooks/kiwify/route.ts` (valida e ativa premium)

4. **Automação Make.com**
   - Documentos criados: `docs/MAKE_BLUEPRINT.md`, `docs/PROMPT_MAKE_BLUEPRINT.md`
   - Cenário: webhook Kiwify → Make.com → ativa premium via API interna

5. **Menu e Navegação**
   - Link "Planos e Assinaturas" no menu flutuante
   - Rotas configuradas: `/`, `/chat`, `/plans`, `/success`, `/profile`, `/settings`, `/about`, etc.

### 🔗 Links de Produção

- **Domínio:** https://rawn-pro.vercel.app
- **GitHub:** https://github.com/priebepaloma-lab/RAWNPRO_V2
- **Kiwify Mensal:** https://pay.kiwify.com.br/uSs6hgG
- **Kiwify Vitalício:** https://pay.kiwify.com.br/ocIXXfO

### 🛠️ Stack Técnica

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Estilo:** Tailwind CSS
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **IA:** OpenAI SDK (GPT-4)
- **Deploy:** Vercel
- **Pagamento Atual:** Kiwify (checkout links + webhook)
- **Controle de Estado:** localStorage (temporário; ideal migrar para DB)

---

## 🚀 PRÓXIMOS PASSOS PLANEJADOS

### 1. Migração para Stripe (Prioridade Alta)

**Por quê?**
- Sem custo fixo mensal (pay-as-you-go)
- Melhor UX de checkout
- Webhooks robustos e Customer Portal nativo
- Suporta múltiplos métodos de pagamento (cartão, Pix)

**O que fazer:**

#### a) Setup no Stripe Dashboard
- Criar conta Stripe (modo teste primeiro)
- Criar 2 produtos:
  - **RAWN PRO – Mensal:** price recorrente mensal (ex.: R$ 49,90)
  - **RAWN PRO – Vitalício:** price único (ex.: R$ 597,00)
- Copiar os `price_id` de cada produto

#### b) Variáveis de Ambiente
Adicionar em `web/.env.local` e no Vercel (Project Settings > Environment Variables):
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### c) Criar Endpoint de Checkout
**Arquivo:** `web/src/app/api/checkout/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();
    
    const session = await stripe.checkout.sessions.create({
      mode: priceId.includes('monthly') ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/plans`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

#### d) Webhook para Ativação
**Arquivo:** `web/src/app/api/webhooks/stripe/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Processar eventos relevantes
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // TODO: Salvar ativação em DB (customer_id, status: 'active', plan)
      console.log('✅ Checkout completo:', session.customer);
      break;
    
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      // TODO: Atualizar status no DB
      console.log('🔄 Subscription atualizada:', subscription.id);
      break;
  }

  return NextResponse.json({ received: true });
}
```

#### e) Atualizar Página de Planos
**Arquivo:** `web/src/app/plans/page.tsx`
- Trocar os links Kiwify por chamadas ao endpoint `/api/checkout`
- Passar os `priceId` apropriados para cada plano

Exemplo de botão:
```typescript
async function handleCheckout(priceId: string) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId }),
  });
  const { url } = await res.json();
  if (url) window.location.href = url;
}
```

#### f) Configurar Webhook no Stripe Dashboard
- Ir em Developers > Webhooks > Add endpoint
- URL: `https://rawn-pro.vercel.app/api/webhooks/stripe`
- Eventos: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- Copiar o `Signing secret` e atualizar `STRIPE_WEBHOOK_SECRET`

#### g) (Opcional) Customer Portal
Criar endpoint para permitir que o cliente gerencie assinatura/cartão:
```typescript
// web/src/app/api/customer-portal/route.ts
const session = await stripe.billingPortal.sessions.create({
  customer: customerId,
  return_url: `${process.env.NEXT_PUBLIC_URL}/profile`,
});
return NextResponse.json({ url: session.url });
```

---

### 2. Persistência de Dados (DB) – Recomendado

**Por quê?**
- localStorage não é confiável para prod (pode ser apagado)
- Webhooks precisam de storage server-side para ativar premium
- Histórico de mensagens, perfil, etc.

**Opções:**
- **Supabase** (PostgreSQL managed, fácil setup, auth integrado)
- **Vercel Postgres** (KV para cache rápido + Postgres para dados principais)
- **Prisma + PlanetScale** (MySQL serverless)

**Schema mínimo:**
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  stripeCustomerId String? @unique
  subscription  Subscription?
  messages      Message[]
  createdAt     DateTime @default(now())
}

model Subscription {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  plan      String   // 'free' | 'monthly' | 'lifetime'
  status    String   // 'active' | 'canceled' | 'past_due'
  stripeSubscriptionId String? @unique
  updatedAt DateTime @updatedAt
}

model Message {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  role      String   // 'user' | 'assistant'
  content   String   @db.Text
  createdAt DateTime @default(now())
}
```

---

### 3. Melhorias de UX/UI

- **Loading states** nos CTAs (spinner durante checkout redirect)
- **Toast notifications** (sucesso/erro em ações críticas)
- **Skeleton screens** no chat enquanto carrega histórico
- **Dark mode toggle** (opcional, já tem dark padrão)
- **Animações de entrada** nas seções da landing (scroll-triggered)

---

### 4. SEO e Performance

- Adicionar meta tags OpenGraph em `layout.tsx`
- Sitemap.xml e robots.txt
- Lazy load de imagens/vídeos
- Otimizar fontes (usar next/font)
- Analytics (Vercel Analytics ou Google Analytics)

---

### 5. Testes e Qualidade

- Testes E2E (Playwright) para fluxo de checkout
- Testes de integração para webhook Stripe
- Lint/Prettier configs padronizados
- CI/CD: validar build/lint/typecheck antes de merge

---

## 🔄 COMO RETOMAR O TRABALHO

### Gatilho de Retorno
Quando quiser voltar, diga:
> **"Voltei, vamos trabalhar"**

O assistente deverá:
1. Confirmar que está no repositório RAWNPRO_V2
2. Fazer checkout da branch `main` (ou `backup/checkpoint-2025-10-27`)
3. Verificar se há mudanças remotas (`git pull`)
4. Ler este arquivo `CHECKPOINT.md` para restaurar contexto
5. Perguntar qual próximo passo você quer priorizar (ex.: "Quer que eu implemente o Stripe agora?")

### Comandos Úteis para Retomar

```powershell
# Abrir o projeto
cd C:\Users\maniq\RAWNPRO_V2

# Atualizar código
git pull

# Instalar dependências (se necessário)
npm install

# Rodar dev server
npm run dev
# Acesse: http://localhost:3000

# Ver branches e tags
git branch -a
git tag -l

# Checkout do checkpoint (se preferir)
git checkout backup/checkpoint-2025-10-27
```

---

## 📝 NOTAS TÉCNICAS

### Estrutura de Pastas (Resumo)
```
web/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Landing (/)
│   │   ├── chat/page.tsx          # Chat (/chat)
│   │   ├── plans/page.tsx         # Planos (/plans)
│   │   ├── success/page.tsx       # Sucesso (/success)
│   │   ├── api/
│   │   │   ├── chat/route.ts      # Endpoint OpenAI
│   │   │   └── webhooks/
│   │   │       └── kiwify/route.ts  # Webhook Kiwify
│   │   └── ...
│   ├── components/
│   │   ├── ChatComposer.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── UpgradeBanner.tsx
│   │   └── ...
│   ├── lib/
│   │   └── subscription.ts        # Lógica de assinatura
│   ├── hooks/
│   │   └── useSubscription.ts
│   └── types/
│       └── subscription.ts
├── public/
│   └── brand/                     # Logo e assets
├── package.json
└── ...
```

### Dependências Principais
```json
{
  "framer-motion": "^12.23.0",
  "lucide-react": "^0.548.0",
  "next": "15.5.6",
  "openai": "^6.7.0",
  "react": "^19.0.0",
  "typescript": "^5.5.0"
}
```

### Variáveis de Ambiente Atuais (web/.env.local)
```env
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_URL=https://rawn-pro.vercel.app
# (Kiwify webhook secret, se houver)
```

**Adicionar quando migrar para Stripe:**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 🎯 DECISÕES DE ARQUITETURA

1. **Por que localStorage para subscriptions?**
   - MVP rápido para validar fluxo
   - Fácil de testar localmente sem DB
   - **Limitação:** não persiste entre dispositivos, não é seguro para prod longa
   - **Plano:** migrar para DB quando integrar Stripe

2. **Por que Framer Motion?**
   - Animações declarativas e performáticas
   - Bem integrado com React/Next.js
   - Pequeno bundle size

3. **Por que Vercel?**
   - Deploy automático via Git
   - Edge Functions para APIs
   - Analytics e logs integrados
   - Zero-config para Next.js

4. **Por que Kiwify primeiro?**
   - Solução brasileira, setup rápido
   - Permite validar produto antes de investir em integrações complexas
   - **Migração para Stripe:** recomendada para escalar (melhor UX, webhooks, portal)

---

## ⚠️ PONTOS DE ATENÇÃO

1. **Segurança:**
   - Nunca commitar `.env.local` (já está no `.gitignore`)
   - Validar sempre assinaturas de webhook (Stripe/Kiwify)
   - Rate limiting no endpoint `/api/chat` (TODO)

2. **Performance:**
   - Chat pode ficar lento com muitas mensagens no estado
   - Considerar paginação/virtualização
   - Cachear respostas comuns da IA (Redis/Vercel KV)

3. **Custos:**
   - OpenAI cobra por token (monitorar uso)
   - Stripe cobra por transação (sem mensalidade)
   - Vercel Free Tier tem limites (bandwidth, edge requests)

4. **UX:**
   - Feedback visual claro quando limite diário for atingido
   - Loading states em todas as ações assíncronas
   - Mensagens de erro amigáveis

---

## 📞 CONTATO E SUPORTE

- **Repo GitHub:** https://github.com/priebepaloma-lab/RAWNPRO_V2
- **Deploy Vercel:** https://rawn-pro.vercel.app
- **Documentação Make.com:** `docs/MAKE_BLUEPRINT.md`

---

**Última atualização:** 27/10/2025 por GitHub Copilot  
**Próxima ação sugerida:** Implementar Stripe (checkout + webhook) e migrar de localStorage para DB.
