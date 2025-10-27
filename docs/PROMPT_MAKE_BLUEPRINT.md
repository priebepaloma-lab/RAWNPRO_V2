# Prompt para ChatGPT - Criação de Blueprint Make.com

Olá! Preciso que você crie um blueprint completo e funcional para o Make.com (Integromat) que automatize o fluxo de pagamentos da Kiwify para minha aplicação Next.js.

## Contexto do Projeto

Estou vendendo assinaturas de um app SaaS chamado RAWN PRO através da Kiwify. Preciso automatizar o processo de:
1. Receber notificação de pagamento da Kiwify
2. Validar os dados
3. Notificar meu backend Next.js
4. Redirecionar o cliente para página de sucesso

## Produtos na Kiwify

**Plano Mensal:**
- Product ID: `uSs6hgG`
- Checkout URL: https://pay.kiwify.com.br/uSs6hgG
- Preço: R$ 49,90/mês (primeira cobrança R$ 19,90)
- Tipo: Assinatura recorrente

**Plano Lifetime:**
- Product ID: `ocIXXfO`
- Checkout URL: https://pay.kiwify.com.br/ocIXXfO
- Preço: R$ 299,00
- Tipo: Pagamento único

## Webhook URLs

**Make.com Webhook (entrada):**
```
https://hook.us2.make.com/m0nyfkfap2j8fsprumxrqa6qqmkew7um
```

**Next.js API Webhook (saída):**
```
https://meu-dominio.vercel.app/api/webhooks/kiwify
```

**Página de Sucesso:**
```
https://meu-dominio.vercel.app/success
```

## Dados que a Kiwify Envia

A Kiwify envia webhooks no seguinte formato:

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

## Requisitos do Blueprint

### 1. Validação de Status
Processar APENAS estes status:
- `paid` - Pagamento confirmado
- `approved` - Pedido aprovado
- `completed` - Transação completa

Ignorar: `pending`, `cancelled`, `refunded`, `expired`

### 2. Identificação de Plano
Baseado no `product_id`:
- Se contém `uSs6hgG` → plan = "mensal"
- Se contém `ocIXXfO` → plan = "lifetime"
- Caso contrário → Enviar alerta de erro

### 3. Notificação ao Next.js
Fazer POST para `/api/webhooks/kiwify` com:
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

### 4. Redirecionamento do Cliente
Após processar, redirecionar (HTTP 302) para:
```
/success?order_id={{order_id}}&plan={{plan}}&email={{customer.email}}
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
