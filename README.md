# RAWN PRO V2 🚀

Monorepo para o projeto RAWN PRO V2 — interface de chat AI com design inspirado no WhatsApp.

## 📁 Estrutura

```
RAWNPRO_V2/
├── web/              # Next.js App Router + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── app/      # Rotas e API endpoints
│   │   ├── components/  # Componentes UI (HeaderRAWN, MessageBubble, etc.)
│   │   └── styles/   # Estilos globais
│   └── public/       # Assets estáticos
├── api/              # Backend placeholder
├── infra/            # Infraestrutura e configurações
├── docs/             # Documentação técnica
└── docs_rawn/        # Documentação de negócio e design
```

## 🚀 Desenvolvimento Local

1. **Instalar dependências**

   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**

   ```bash
   cd web
   cp .env.example .env.local
   # Preencha as chaves abaixo no arquivo .env.local
   # OPENAI_API_KEY=...
   # NEXT_PUBLIC_APP_URL=http://localhost:3000
   # STRIPE_SECRET_KEY=sk_live_or_test_...
   # STRIPE_WEBHOOK_SECRET=whsec_...
   # STRIPE_PRICE_MENSAL=price_...   # recorrente (mensal)
   # STRIPE_PRICE_LIFETIME=price_...
   # STRIPE_COUPON_MENSAL_FIRST_MONTH=coupon_...  # amount_off=2000, duration=once
   ```

3. **Iniciar servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

Acesse: **http://localhost:3000**

> Nota: Estamos usando Next.js 15.1.x no diretório `web/` para evitar um bug conhecido do Turbopack no 16.x durante o desenvolvimento local. Se quiser atualizar para o Next 16, recomendamos testar primeiro em um branch separado.

## 📦 Deploy na Vercel

### Passo 1: Importar Projeto

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **Add New Project**
3. Importe o repositório `RAWNPRO_V2` do GitHub

### Passo 2: Configurar Build

- **Framework Preset:** Next.js
- **Root Directory:** `web/`
- **Build Command:** `npm run build` (padrão)
- **Output Directory:** `.next` (padrão)

### Passo 3: Variáveis de Ambiente

Adicione no painel da Vercel:

```
OPENAI_API_KEY=sk-proj-...
NEXT_PUBLIC_APP_URL=https://seu-app.vercel.app
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_MENSAL=price_...
STRIPE_PRICE_LIFETIME=price_...
STRIPE_COUPON_MENSAL_FIRST_MONTH=coupon_...
STRIPE_PROMO_MENSAL_FIRST_MONTH=promo_...
```

STRIPE*COUPON_MENSAL_FIRST_MONTH=coupon*... # amount_off=2000, duration=once

> Stripe:
>
> - IDs de Coupon geralmente são curtos (ex.: `Ah3bms82`) e não precisam começar com `coupon_`. Use o ID exato do Coupon em `STRIPE_COUPON_MENSAL_FIRST_MONTH`.
> - Se você criou um Promotion Code (ID começa com `promo_`) vinculado a esse Coupon, pode usar `STRIPE_PROMO_MENSAL_FIRST_MONTH` e o sistema aplicará `promotion_code` automaticamente.

> Stripe: Crie os produtos e preços no Dashboard da Stripe e cole os IDs de preço nos campos `STRIPE_PRICE_*`. Para a promoção (R$ 29,90 no 1º mês), crie um Coupon com `amount_off = 2000 (R$ 20,00)`, `currency = BRL`, `duration = once` e defina `STRIPE_COUPON_MENSAL_FIRST_MONTH`. Configure o endpoint de webhook em `/api/stripe/webhook`.

> Importante: Atualize a `OPENAI_API_KEY` no painel da Vercel sempre que a chave for rotacionada localmente.

### Passo 4: Deploy

Clique em **Deploy** e aguarde o build finalizar.

## 🛠️ Stack Tecnológica

- **Next.js 15.1.x** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS v3**
- **Framer Motion** (animações)
- **OpenAI API** (gpt-4o-mini)

## 📝 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Verifica linting
```

## 🔐 Segurança

⚠️ **NUNCA** commite arquivos `.env.local` ou exponha sua `OPENAI_API_KEY` publicamente.

## 📄 Licença

Propriedade de RAWN PRO © 2025
