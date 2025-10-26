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
   # Adicione sua OPENAI_API_KEY no arquivo .env.local
   ```

3. **Iniciar servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

Acesse: **http://localhost:3000**

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
```

### Passo 4: Deploy
Clique em **Deploy** e aguarde o build finalizar.

## 🛠️ Stack Tecnológica

- **Next.js 16** (App Router + Turbopack)
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
