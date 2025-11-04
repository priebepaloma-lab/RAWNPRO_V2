# Sistema de Assinaturas - RAWN PRO (Stripe)

Kiwify foi removido. O sistema atual usa Stripe (Checkout + Webhook) para assinaturas e pagamento vitalício.

## 📋 Estrutura

```
src/
├── types/subscription.ts          # Tipos TypeScript (Stripe-only)
├── lib/subscription.ts            # Lógica de assinatura (localStorage)
├── hooks/useSubscription.ts       # Hook React para gerenciar estado
├── app/
│   ├── plans/page.tsx            # Página de planos (inicia Stripe Checkout)
│   ├── success/page.tsx          # Página de sucesso (lê session_id)
│   └── api/stripe/               # Endpoints Stripe (checkout + webhook)
└── components/
  └── UpgradeBanner.tsx         # Banner de upgrade no chat
```

## 🔐 Planos Disponíveis

| Plano    | Preço     | Como funciona                           |
| -------- | --------- | --------------------------------------- |
| Mensal   | R$ 49,90  | Stripe Checkout (primeiro mês R$ 29,90) |
| Lifetime | R$ 449,90 | Stripe Checkout (pagamento único)       |

**Primeira cobrança Mensal**: R$ 19,90 (configurado na Kiwify)

## 🔗 Configuração do Stripe (resumo)

1. Crie produtos/preços no Dashboard (Mensal recorrente, Lifetime único).
2. Configure o Webhook em `https://seu-dominio.com/api/stripe/webhook`.
3. Defina as variáveis de ambiente (ver `web/.env.example`).
4. `/plans` chama `POST /api/stripe/create-checkout-session` e redireciona para o Checkout.

## 🚀 Fluxo de Compra

```
1. Usuário clica em "Assinar" → Cria sessão via /api/stripe/create-checkout-session
2. Stripe Checkout processa o pagamento
3. Stripe envia webhook → /api/stripe/webhook (registra evento)
4. Stripe redireciona usuário → /success?session_id=...
5. Página /success registra localmente a assinatura (MVP)
```

## 📊 Limites por Plano

| Plano    | Mensagens/dia | Recursos                       |
| -------- | ------------- | ------------------------------ |
| Free     | 10            | Acesso básico                  |
| Mensal   | Ilimitadas    | Acesso completo, renovação 30d |
| Lifetime | Ilimitadas    | Acesso vitalício               |

## 🔧 Funções Principais

### `useSubscription()` Hook

```tsx
const {
  subscription, // Dados da assinatura atual
  isPremium, // true se tem acesso premium
  remainingMessages, // Mensagens restantes (free) ou -1 (premium)
  canSendMessage, // Verifica se pode enviar mensagem
  trackMessage, // Incrementa contador (free only)
  refreshSubscription, // Recarrega dados
} = useSubscription();
```

### `activateSubscription()`

Registra localmente a assinatura após o retorno do Checkout (MVP). No projeto atual, aceita `stripeSessionId` como metadado de referência.

## 🎨 Componentes

### `<UpgradeBanner />`

Banner no topo do chat quando:

- Usuário tem ≤3 mensagens restantes (free)
- Usuário atingiu limite de mensagens

### `<LayoutChat />`

Integrado com:

- Verificação de limites antes de enviar mensagem
- Tracking de mensagens enviadas
- Banner de upgrade

## 🐛 Debug

### Verificar assinatura no localStorage

```javascript
// Console do navegador
const sub = JSON.parse(localStorage.getItem("rawn_subscription"));
console.log(sub);
```

### Ver contador de mensagens (free)

```javascript
const today = new Date().toDateString();
const used = localStorage.getItem(`messages_${today}`);
console.log("Mensagens usadas hoje:", used);
```

### Testar webhook localmente

Exponha `http://localhost:3000` via ngrok e aponte o endpoint do Stripe Webhook para `https://<ngrok>/api/stripe/webhook`.

## 📝 TODO / Melhorias Futuras

- [ ] Backend com banco de dados (Supabase/PostgreSQL)
- [ ] Autenticação (NextAuth.js)
- [ ] Sincronizar assinatura entre dispositivos
- [ ] Dashboard de admin
- [ ] Email transacional (boas-vindas, renovação, cancelamento)
- [ ] Analytics de conversão
- [ ] Teste A/B de preços
- [ ] Cupons de desconto

## 🔒 Segurança

**Atenção**: A implementação atual usa `localStorage`, adequada para MVP mas **não é segura** para produção.

**Para produção, implemente:**

- Backend com autenticação
- Validação de webhook com assinatura
- Rate limiting
- Criptografia de dados sensíveis

## 📞 Suporte

Problemas com assinatura? Contate: suporte@rawn.pro
