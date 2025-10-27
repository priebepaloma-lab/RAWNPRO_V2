# Sistema de Assinaturas - RAWN PRO

Integração com Kiwify para gerenciar assinaturas e pagamentos.

## 📋 Estrutura

```
src/
├── types/subscription.ts          # Tipos TypeScript
├── lib/subscription.ts            # Lógica de assinatura (localStorage)
├── hooks/useSubscription.ts       # Hook React para gerenciar estado
├── app/
│   ├── plans/page.tsx            # Página de planos
│   ├── success/page.tsx          # Página de sucesso pós-compra
│   └── api/webhooks/kiwify/      # Webhook da Kiwify
└── components/
    └── UpgradeBanner.tsx         # Banner de upgrade no chat
```

## 🔐 Planos Disponíveis

| Plano    | Preço     | Link de Checkout                  | Product ID |
| -------- | --------- | --------------------------------- | ---------- |
| Mensal   | R$ 49,90  | https://pay.kiwify.com.br/uSs6hgG | uSs6hgG    |
| Lifetime | R$ 299,00 | https://pay.kiwify.com.br/ocIXXfO | ocIXXfO    |

**Primeira cobrança Mensal**: R$ 19,90 (configurado na Kiwify)

## 🔗 Configuração da Kiwify

### 1. Webhook URL

Configure o webhook da Kiwify para enviar eventos para Make.com:

```
https://hook.us2.make.com/m0nyfkfap2j8fsprumxrqa6qqmkew7um
```

**Eventos importantes:**

- `paid` - Pagamento aprovado
- `approved` - Compra aprovada
- `completed` - Transação completa
- `cancelled` - Assinatura cancelada
- `expired` - Assinatura expirada

### 2. Configurar Make.com (Automação)

O webhook do Make.com deve:

1. **Receber evento da Kiwify**
2. **Validar status** (`paid`, `approved`, `completed`)
3. **Identificar produto** (mensal ou lifetime)
4. **Enviar para nosso webhook** (Next.js):
   ```
   POST https://seu-dominio.com/api/webhooks/kiwify
   ```
5. **Redirecionar usuário** para página de sucesso:
   ```
   https://seu-dominio.com/success?order_id=XXX&plan=mensal&email=usuario@email.com
   ```

### 3. URL de Redirecionamento (Kiwify)

Configure nas configurações de cada produto na Kiwify:

**URL de Sucesso:**

```
https://seu-dominio.com/success?order_id={order_id}&plan={plan}&email={customer_email}
```

**URL de Cancelamento:**

```
https://seu-dominio.com/plans
```

## 🚀 Fluxo de Compra

```
1. Usuário clica em "Assinar" → Redireciona para Kiwify
2. Usuário paga na Kiwify
3. Kiwify envia webhook → Make.com
4. Make.com processa e envia → Next.js /api/webhooks/kiwify
5. Make.com redireciona usuário → /success com parâmetros
6. Página /success ativa assinatura no localStorage
7. Usuário começa a usar premium imediatamente
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

```tsx
activateSubscription(
  plan: "mensal" | "lifetime",
  kiwifyOrderId: string,
  kiwifyCustomerId: string
)
```

Ativa assinatura após pagamento aprovado.

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

```bash
# Use ngrok para expor localhost
ngrok http 3000

# Configure webhook da Kiwify para:
# https://your-ngrok-url.ngrok.io/api/webhooks/kiwify
```

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
