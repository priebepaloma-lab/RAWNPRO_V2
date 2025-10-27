# 🚀 Deploy RAWN PRO na Vercel

Este guia detalha os passos para fazer deploy do RAWN PRO na Vercel.

## 📋 Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Repositório GitHub conectado
- OpenAI API Key

## 🔧 Configuração

### 1. Importar Projeto na Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique em **"Add New..."** → **"Project"**
3. Selecione o repositório `priebepaloma-lab/RAWNPRO_V2`
4. Clique em **"Import"**

### 2. Configurar Build Settings

A Vercel detectará automaticamente as configurações do `vercel.json`:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (monorepo configurado via vercel.json)
- **Build Command**: `cd web && npm install && npm run build`
- **Output Directory**: `web/.next`
- **Install Command**: `cd web && npm install`

⚠️ **Importante**: NÃO altere essas configurações manualmente. O `vercel.json` já está otimizado.

### 3. Adicionar Variáveis de Ambiente

Na seção **"Environment Variables"**:

| Name             | Value         | Environment                      |
| ---------------- | ------------- | -------------------------------- |
| `OPENAI_API_KEY` | `sk-proj-...` | Production, Preview, Development |

**Como obter a OpenAI API Key:**

1. Acesse [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Clique em **"Create new secret key"**
3. Copie a chave e cole na Vercel
4. ⚠️ **Nunca** commite a chave no código

### 4. Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (~2-3 minutos)
3. ✅ Deploy concluído! Acesse a URL fornecida

## 🌍 Região

- **Primary Region**: `gru1` (São Paulo, Brasil)
- Configurado para melhor latência em usuários brasileiros

## 📦 Estrutura do Monorepo

```
RAWNPRO_V2/
├── web/              → Deploy principal (Next.js app)
├── api/              → Ignorado no deploy
├── docs/             → Ignorado no deploy
├── docs_rawn/        → Ignorado no deploy
├── infra/            → Ignorado no deploy
├── vercel.json       → Configurações de build
└── .vercelignore     → Arquivos ignorados
```

## 🔍 Verificação Pós-Deploy

Após o deploy, verifique:

### ✅ Checklist de Funcionalidade

- [ ] Homepage carrega corretamente
- [ ] Onboarding flow funciona (/welcome → /consent → /profile)
- [ ] Chat responde (testa com "me ajude a criar um treino")
- [ ] API `/api/chat` retorna 200 (não 500)
- [ ] Perfil salva corretamente em /profile
- [ ] Configurações em /settings funciona
- [ ] Botão "Apagar Dados" limpa localStorage
- [ ] Páginas legais acessíveis (/about, /terms, /privacy, /lgpd, /disclaimer)

### 🐛 Troubleshooting

**Erro: "OPENAI_API_KEY não configurada"**

- Verifique se a variável foi adicionada corretamente
- Redeploye o projeto após adicionar a variável

**Erro: Build falhou**

- Verifique os logs no Vercel Dashboard
- Teste `npm run build` localmente no diretório `/web`

**Chat não responde / Timeout**

- Verifique quota da OpenAI API
- Veja logs da API em Vercel → Functions → /api/chat

## 🔄 CI/CD Automático

✅ **Deploy automático** configurado:

- Push para `main` → Deploy em Production
- Pull Request → Deploy em Preview
- Commit em branches → Deploy em Preview

## 📊 Monitoramento

Acesse métricas no Vercel Dashboard:

- **Analytics**: Pageviews, visitors, performance
- **Speed Insights**: Core Web Vitals
- **Functions**: Logs e performance de /api/chat

## 🔐 Segurança

✅ **Medidas implementadas:**

- Headers de segurança automáticos (Vercel)
- HTTPS forçado
- Environment variables seguras
- Dados do usuário apenas no localStorage (client-side)
- Sem cookies de terceiros

## 📝 Domínio Customizado (Opcional)

Para adicionar domínio próprio:

1. Vercel Dashboard → **Settings** → **Domains**
2. Adicione seu domínio (ex: `rawnpro.com`)
3. Configure DNS conforme instruções
4. SSL automático via Let's Encrypt

## 🚀 Performance

**Otimizações ativas:**

- Next.js App Router (RSC)
- Edge Runtime para páginas estáticas
- Compressão Brotli/Gzip automática
- CDN global (Vercel Edge Network)
- Image Optimization (se adicionar imagens)

---

**Versão**: 1.0.0  
**Última atualização**: 26/10/2025
