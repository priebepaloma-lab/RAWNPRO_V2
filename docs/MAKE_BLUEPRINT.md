# Blueprint Make.com - Integração Kiwify → RAWN PRO

## 📋 Visão Geral

Este cenário automatiza o fluxo de compra da Kiwify para o RAWN PRO:

1. Recebe webhook da Kiwify quando há um pagamento
2. Valida e processa os dados
3. Envia para o webhook do Next.js
4. Redireciona o comprador para a página de sucesso

---

## 🔧 Módulos Necessários

### Módulo 1: Webhook (Trigger)

**Tipo:** Webhooks > Custom webhook  
**Nome:** "Receber Pagamento Kiwify"

**Configuração:**

- **Webhook URL:** `https://hook.us2.make.com/m0nyfkfap2j8fsprumxrqa6qqmkew7um`
- **Método:** POST
- **Data structure:** Determine automatically

**Dados esperados da Kiwify:**

```json
{
  "order_id": "ABC123",
  "order_status": "paid",
  "product_id": "uSs6hgG",
  "customer": {
    "email": "cliente@email.com",
    "name": "Nome Cliente",
    "phone": "+5511999999999"
  },
  "order_date": "2025-10-27T10:00:00Z",
  "approved_date": "2025-10-27T10:05:00Z",
  "product_name": "RAWN PRO - Mensal",
  "product_type": "subscription"
}
```

---

### Módulo 2: Router (Filtro de Status)

**Tipo:** Flow Control > Router  
**Nome:** "Validar Status do Pagamento"

**Rotas:**

#### Rota 1: "Pagamento Aprovado"

**Condição:**

```
{{1.order_status}} equals paid
OR
{{1.order_status}} equals approved
OR
{{1.order_status}} equals completed
```

**Fallback:** Parar execução (ignorar outros status)

---

### Módulo 3: Router (Identificar Plano)

**Tipo:** Flow Control > Router  
**Nome:** "Identificar Produto"

**Rotas:**

#### Rota 1: "Plano Mensal"

**Condição:**

```
{{1.product_id}} contains uSs6hgG
```

**Variável a criar:** `plan` = `mensal`

#### Rota 2: "Plano Lifetime"

**Condição:**

```
{{1.product_id}} contains ocIXXfO
```

**Variável a criar:** `plan` = `lifetime`

**Fallback:** Enviar email de erro para admin

---

### Módulo 4: HTTP Request (Notificar Next.js)

**Tipo:** HTTP > Make a request  
**Nome:** "Enviar para Webhook Next.js"

**Configuração:**

- **URL:** `https://seu-dominio.vercel.app/api/webhooks/kiwify`
- **Método:** POST
- **Headers:**
  - `Content-Type`: `application/json`
- **Body (JSON):**

```json
{
  "order_id": "{{1.order_id}}",
  "order_status": "{{1.order_status}}",
  "product_id": "{{1.product_id}}",
  "customer": {
    "email": "{{1.customer.email}}",
    "name": "{{1.customer.name}}",
    "phone": "{{1.customer.phone}}"
  },
  "order_date": "{{1.order_date}}",
  "approved_date": "{{1.approved_date}}",
  "product_name": "{{1.product_name}}",
  "product_type": "{{1.product_type}}"
}
```

**Parse response:** Yes  
**Timeout:** 30 segundos

---

### Módulo 5: HTTP Response (Redirecionar Cliente)

**Tipo:** Webhooks > Webhook response  
**Nome:** "Redirecionar para Página de Sucesso"

**Configuração:**

- **Status:** 302 (Redirect)
- **Headers:**

```
Location: https://seu-dominio.vercel.app/success?order_id={{1.order_id}}&plan={{3.plan}}&email={{1.customer.email}}
```

**Body (opcional):**

```json
{
  "success": true,
  "message": "Redirecionando para conclusão..."
}
```

---

## 🎯 Fluxo Visual

```
[Webhook Kiwify]
       ↓
[Router: Status?]
       ↓ (paid/approved/completed)
[Router: Produto?]
       ↓ (mensal/lifetime)
[HTTP: Notificar Next.js]
       ↓
[Response: Redirecionar Cliente]
```

---

## 🔐 Variáveis de Ambiente

Crie estas variáveis no Make.com (Settings > Variables):

```
NEXT_WEBHOOK_URL = https://seu-dominio.vercel.app/api/webhooks/kiwify
SUCCESS_PAGE_URL = https://seu-dominio.vercel.app/success
ADMIN_EMAIL = seu-email@empresa.com (para notificações de erro)
```

---

## ✅ Checklist de Configuração

### 1. No Make.com

- [ ] Criar novo cenário
- [ ] Adicionar módulo Webhook (trigger)
- [ ] Copiar URL do webhook
- [ ] Adicionar Router de validação de status
- [ ] Adicionar Router de identificação de produto
- [ ] Adicionar HTTP Request para Next.js
- [ ] Adicionar Webhook Response com redirect
- [ ] Ativar cenário
- [ ] Testar com dados de exemplo

### 2. Na Kiwify (para cada produto)

- [ ] Acessar painel de produto Mensal
  - [ ] Configurar Webhook URL: `https://hook.us2.make.com/m0nyfkfap2j8fsprumxrqa6qqmkew7um`
  - [ ] Ativar eventos: "Pagamento Aprovado", "Assinatura Criada"
  - [ ] Salvar configurações
- [ ] Acessar painel de produto Lifetime
  - [ ] Configurar mesmo Webhook URL
  - [ ] Ativar eventos de pagamento
  - [ ] Salvar configurações

### 3. Testes

- [ ] Fazer compra teste no modo sandbox da Kiwify
- [ ] Verificar logs do Make.com
- [ ] Confirmar que webhook Next.js recebeu dados
- [ ] Verificar redirecionamento para /success
- [ ] Confirmar ativação de assinatura no app

---

## 🐛 Troubleshooting

### Webhook não está recebendo dados

1. Verificar se o cenário está ATIVO no Make.com
2. Confirmar URL do webhook na Kiwify
3. Testar enviando payload manual no Make.com
4. Verificar logs de execução

### Redirecionamento não funciona

1. Confirmar módulo "Webhook Response" está configurado
2. Verificar status code 302
3. Testar URL de sucesso manualmente no navegador

### Next.js não recebe notificação

1. Verificar URL do domínio (dev vs produção)
2. Confirmar endpoint está acessível: `curl https://seu-dominio.vercel.app/api/webhooks/kiwify`
3. Checar logs no Vercel

---

## 📊 Monitoramento

### Métricas importantes

- Taxa de sucesso de webhooks (>98%)
- Tempo médio de processamento (<3s)
- Erros de redirecionamento (0%)

### Alertas a configurar

- Email quando cenário falha 3x seguidas
- Notificação quando produto desconhecido é detectado
- Alerta de timeout no HTTP Request

---

## 🚀 Melhorias Futuras

1. **Adicionar logs estruturados**

   - Salvar cada transação em Google Sheets
   - Enviar para ferramentas de analytics

2. **Email transacional**

   - Enviar boas-vindas via SendGrid/Mailgun
   - Email com instruções de acesso

3. **Integração com CRM**

   - Sincronizar cliente com HubSpot/RD Station
   - Criar eventos de conversão

4. **Retry logic**
   - Tentar reenviar se webhook Next.js falhar
   - Fila de mensagens para resiliência

---

## 📞 Suporte

Problemas com a integração?

- Logs do Make.com: https://www.make.com/en/help/scenarios/scenario-execution-history
- Docs da Kiwify: https://ajuda.kiwify.com.br/
- Suporte RAWN PRO: suporte@rawn.pro
