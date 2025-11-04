> DEPRECATED: O projeto não utiliza mais Kiwify. Fluxo oficial: Stripe Checkout + Webhook.

## Contexto do Projeto

Estou vendendo assinaturas do RAWN PRO via Stripe. O fluxo antigo (Kiwify → Make.com) foi removido.

1. Receber notificação de pagamento da Kiwify
2. Validar os dados
3. Notificar meu backend Next.js
4. Redirecionar o cliente para página de sucesso

## Pagamentos (atual)

Stripe: a página `/plans` chama o endpoint interno `/api/stripe/create-checkout-session` que abre o Stripe Checkout.

## Webhook URLs

**Make.com Webhook (entrada):**

```
https://hook.us2.make.com/m0nyfkfap2j8fsprumxrqa6qqmkew7um
```

**Next.js API Webhook (Stripe):**

```
https://seu-dominio.vercel.app/api/stripe/webhook
```

**Página de Sucesso:**

```
https://meu-dominio.vercel.app/success
```

## Referências atuais

```json
{
  "order_id": "string",
  "order_status": "paid|approved|completed|cancelled|refunded",
  "product_id": "string",
  "customer": {
    "email": "string",
    "name": "string",
    "phone": "string"
  },
  "order_date": "ISO 8601 timestamp",
  "approved_date": "ISO 8601 timestamp",
  "product_name": "string",
  "product_type": "subscription|one_time"
}
```

Para integração e deploy com Stripe, consulte:

Processar APENAS estes status:

- `paid` - Pagamento confirmado
- `approved` - Pedido aprovado
- `completed` - Transação completa

Ignorar: `pending`, `cancelled`, `refunded`, `expired`

infra/VERCEL_DEPLOY.md e `web/src/app/api/stripe/*`.

### Observação

Este arquivo foi mantido apenas para histórico, mas não deve ser seguido em produção.

```json
{
  "order_id": "{{order_id}}",
  "order_status": "{{order_status}}",
  "product_id": "{{product_id}}",
  "customer": {...},
  "order_date": "{{order_date}}",
  "approved_date": "{{approved_date}}",
  "product_name": "{{product_name}}",
  "product_type": "{{product_type}}"
}
```

## Módulos Necessários

1. **Webhook (Custom webhook)** - Receber da Kiwify
2. **Router** - Filtrar por status válido
3. **Router** - Identificar produto/plano
4. **HTTP Request** - POST para Next.js
5. **Webhook Response** - Redirecionar cliente

## Tratamento de Erros

- Se status inválido: Parar execução silenciosamente
- Se produto desconhecido: Enviar email para admin@rawn.pro
- Se timeout no Next.js: Retry 2x com 5s de espera
- Se falhar após retries: Salvar em fallback (Google Sheets)

## Configurações Adicionais

- **Timeout HTTP:** 30 segundos
- **Parse Response:** Sim
- **Follow Redirects:** Não
- **Verify SSL:** Sim

## Output Esperado

Por favor, forneça:

1. **Blueprint JSON completo** (código que posso importar no Make.com)
2. **Instruções passo-a-passo** de como configurar cada módulo
3. **Variáveis de ambiente** necessárias
4. **Testes recomendados** antes de colocar em produção
5. **Prints/screenshots** de como deve ficar a configuração (se possível)

## Informações Técnicas

- Make.com plan: Free tier (processar até 1.000 operações/mês)
- Next.js versão: 15.5.6
- Região do servidor: us-east-1 (Vercel)
- Formato de data preferido: ISO 8601

## Casos de Uso Reais

**Cenário 1: Cliente compra Mensal**

```
Kiwify envia webhook → Make valida status "paid" →
Identifica product_id "uSs6hgG" = mensal →
POST para Next.js com dados →
Redireciona para /success?order_id=ABC&plan=mensal&email=cliente@email.com
```

**Cenário 2: Cliente compra Lifetime**

```
Similar, mas identifica "ocIXXfO" = lifetime
```

**Cenário 3: Webhook de cancelamento**

```
Status = "cancelled" → Router ignora → Não processa
```

Por favor, crie o blueprint mais robusto e production-ready possível. Obrigado!
