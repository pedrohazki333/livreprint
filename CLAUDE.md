# CLAUDE.md — Livreprint

> Instruções para o Claude Code trabalhar neste repositório.
> Marcações `⚠️` indicam o pouco que ainda está em aberto.

---

## 1. O que é este projeto

Sistema da **Livreprint**, estamparia DTF em Guarulhos/SP. Um único projeto com duas faces:

- **Loja** — venda de peças personalizadas e DTF por metro, com configurador de arte
- **Admin** — administração de pedidos e controle de produção

Não são dois sistemas. Mesmo banco, mesmo modelo de pedido, mesmo configurador, com permissões diferentes.

### O que o site vende

1. **Peça personalizada** — camisetas, moletons e polos da própria fábrica. O cliente escolhe peça, cor, posiciona a arte sobre mockup calibrado e define a grade de tamanhos.
2. **DTF por metro** — o cliente monta chapas de 56×100cm no site (até 5), ou envia arquivo já diagramado acima disso.

**Estampagem de peça externa** existe como serviço, mas no site é apenas página institucional de captação. Sem configurador, sem checkout.

### Princípio central

O pedido que sai daqui vai **direto pra produção**, sem interpretação humana no meio. Toda decisão de código preserva isso.

### Contexto histórico

Existe um sistema legado (**TEXKI1**) em uso diário, que este projeto vai substituir gradualmente. Houve uma tentativa anterior (TEXKI2) que ficou complexa demais e foi descartada — **não consulte, não importe, não rode**. A lição vale como regra deste repo: escopo cresce por necessidade real, não por antecipação.

---

## 2. Stack

| Camada | Escolha |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript strict |
| Estilo | Tailwind CSS + shadcn/ui |
| Estado local | Zustand (configurador e carrinho) |
| Validação | Zod — schemas compartilhados client/server |
| Banco | PostgreSQL |
| ORM | Prisma |
| Storage de artes | Cloudflare R2 (S3-compatible), upload via presigned URL |
| Processamento de imagem | `sharp` (server-side) |
| Canvas | `react-konva` |
| Pagamento | Mercado Pago — **apenas Pix e cartão** |
| Frete | API dos Correios |
| E-mail | Resend |
| Auth | ⚠️ definir — sugestão: Auth.js ou better-auth |
| Deploy | Vercel |

### Decisões que não devem ser revertidas sem discussão

- **Não há backend separado.** Lógica de servidor em Route Handlers (`app/api/*`) e Server Actions. Não crie serviço FastAPI.
- **Preço só no servidor.** Ver seção 5.
- **O nesting é implementado aqui**, em TypeScript, em `lib/nesting/`. Empacotamento por prateleiras com rotação 90° basta. Não é chamada de API externa.
- **Validação de arte é server-side** com `sharp`.

---

## 3. Estrutura de pastas

```
app/
  (loja)/                    páginas públicas
  personalizar/[slug]/       configurador de peça
  filme-dtf/montar/          configurador de chapa
  admin/                     painel interno
  api/
components/
  ui/                        shadcn
  configurador/              canvas e controles compartilhados (loja + admin)
lib/
  pricing/                   motor de preço — puro e testado
  nesting/                   arranjo de artes na chapa — puro e testado
  artwork/                   validação e processamento de arte
  frete/                     integração Correios
  schemas/                   Zod compartilhado
prisma/
public/mockups/
```

---

## 4. Constantes de domínio

```ts
// lib/constants.ts

export const FILME = {
  LARGURA_ROLO_CM: 57,
  LARGURA_UTIL_CM: 56,        // 57 menos 1cm de margem lateral
  ALTURA_CHAPA_CM: 100,       // 1 metro linear
  GUTTER_CM: 0.5,             // espaço entre artes
  MAX_CHAPAS: 5,              // acima disso → /filme-dtf/arquivo-pronto
  ROTACAO_90_PERMITIDA: true,
  ENTREGA: 'rolo_continuo',   // não é cortado por chapa nem por peça
}

export const PECA = {
  QTD_MINIMA: 1,
  PILOTO_A_PARTIR_DE: 10,     // abaixo disso não há piloto, nem opcional
  SINAL_PCT: 30,              // pedidos com piloto
  ARTE_ESCALA_COM_TAMANHO: false,  // ver seção 8
}

export const ARTE = {
  FORMATOS_ACEITOS: ['png', 'pdf', 'svg'],  // ⚠️ confirmar se JPG entra com aviso
  TAMANHO_MAX_MB: 50,         // ⚠️ ajustar conforme limite do R2/Vercel
  EXIGE_CANAL_ALFA: true,
  // Sem DPI mínimo. Nada é bloqueado nem avisado ao cliente.
  // O dpi_efetivo é gravado no pedido apenas para a produção consultar.
}

export const PRODUCAO = {
  PRAZO_DIAS_UTEIS_MIN: 5,
  PRAZO_DIAS_UTEIS_MAX: 7,    // conta após aprovação (da piloto, quando houver)
}
```

---

## 5. Precificação

> **Regra inviolável:** todo preço é calculado em `lib/pricing/`, no servidor.
> O front recebe valores prontos e apenas exibe. Nenhuma fórmula, tabela ou
> valor monetário em código que roda no navegador.
> O protótipo HTML tem essa lógica no client — **não reaproveite.**

Valores em **centavos**, inteiros. Nunca float.

### Peça personalizada

A personalização **já está embutida** no preço da peça. O cliente pode usar quantas posições de estampa quiser sem alterar o valor — as margens de personalização já estão precificadas. O preço varia **só pela quantidade**.

A faixa é calculada **por produto separado**, não pelo total do pedido. 10 camisetas + 10 moletons = duas faixas de 10–19, não uma faixa de 20.

| Quantidade | Preço unitário |
|---|---|
| 1 a 9 | R$ 59,90 |
| 10 a 19 | R$ 49,90 |
| 20 a 29 | R$ 39,90 |
| 30 a 99 | R$ 36,90 |
| 100 ou mais | R$ 29,90 |

Essa tabela vale provisoriamente para **todos os produtos** e deve ser editável por produto no admin — ela será ajustada, porque moletom e polo não vão manter esses valores. Modele preço como dado, não como constante em código.

### DTF por metro

- **R$ 69,90 por metro**
- Metragem mínima: **30 cm**
- Arredondamento **para cima em passos de 5 cm**
- Cobrança proporcional acima do mínimo
- Sem desconto por volume

Exemplo: 42cm de arte → cobra 45cm → R$ 31,46.

### Frete

- **Retirada na fábrica** — sem custo
- **Correios** — calculado por CEP via API

Embalagem para o cálculo:

| Item | Caixa | Peso |
|---|---|---|
| DTF por metro | 11 × 8 × 60 cm | 0,5 kg |
| Peças | varia com a quantidade | varia |

⚠️ Falta definir: peso unitário por produto (camiseta, moletom, polo) e a regra de escolha de caixa por faixa de quantidade. Modele como tabela de embalagem editável, não como `if` no código.

---

## 6. Fluxo do pedido

Dois fluxos de checkout, decididos pela quantidade:

### Abaixo de 10 unidades — sem piloto
Fecha → paga 100% → produção → entrega. Prazo conta do pagamento.

### 10 unidades ou mais — piloto obrigatória
Fecha → **paga 30% de sinal** → produção da piloto → aprovação do cliente → **paga os 70%** → produção → entrega.

**O prazo de 5–7 dias úteis só começa a contar após a aprovação da piloto.** Isso precisa estar visível no checkout, não escondido nos termos.

Aprovação da piloto, duas formas:
- **Por foto** — exige aceite explícito declarando ciência de que a foto não é referência confiável de cor
- **Piloto física** — enviada ao cliente; é a única referência de cor válida

O aceite fica registrado no pedido com data e hora.

### Login
Obrigatório para fechar pedido. O configurador é livre antes disso — o cliente monta a arte e só loga na hora de fechar, **sem perder o trabalho**. Persista o rascunho antes de redirecionar pro login.

---

## 7. Contrato de dados do pedido

Este objeto **é a ordem de produção**. É a peça mais importante do sistema.

```ts
type Arte = {
  id: string
  arquivo_url: string
  largura_px: number
  altura_px: number
  bbox_cm: { w: number; h: number }   // bounding box real da tinta, após trim
  tem_alfa: boolean
}

type Posicionamento = {
  arte_id: string
  largura_cm: number
  altura_cm: number
  x_cm: number
  y_cm: number
  rotacao: 0 | 90 | 180 | 270
  dpi_efetivo: number                 // registro interno, nunca exibido ao cliente
}

type ItemPecaPersonalizada = {
  tipo: 'peca_personalizada'
  produto_slug: string
  malha: string
  cor: { nome: string; hex: string; base: 'clara' | 'escura' }
  grade: Array<{ tamanho: string; qtd: number }>
  posicoes: Array<{
    nome: 'frente' | 'costas' | 'peito_esquerdo' | 'manga_e' | 'manga_d' | 'nuca'
    ancora: string
    posicionamento: Posicionamento    // mesmas medidas para toda a grade
  }>
}

type ItemFilmeDtf = {
  tipo: 'filme_dtf'
  modo: 'montado_no_site' | 'arquivo_pronto'
  chapas: Array<{ indice: number; ocupacao_pct: number; pecas: Posicionamento[] }>
  metragem_total_cm: number
  metragem_cobrada_cm: number         // após arredondamento
  arquivo_pronto_url?: string
}

type Pedido = {
  codigo: string
  origem: 'site' | 'whatsapp' | 'presencial'
  cliente_id: string
  itens: Array<ItemPecaPersonalizada | ItemFilmeDtf>
  exige_piloto: boolean               // derivado: qtd total de peças >= 10
  status: StatusPedido                // ver seção 9
  observacoes?: string
  pagamentos: Array<{
    tipo: 'sinal' | 'saldo' | 'integral'
    valor_centavos: number
    metodo: 'pix' | 'cartao'
    pago_em?: Date
  }>
  entrega: {
    modo: 'retirada' | 'correios'
    cep?: string
    endereco?: Endereco
    valor_centavos: number
    codigo_rastreio?: string
  }
  aprovacao_piloto?: {
    modo: 'foto' | 'fisica'
    aceite_em: Date
    aceite_ip?: string
  }
}
```

---

## 8. Configuradores

### Mockup calibrado (peça personalizada)

Cada mockup carrega a calibração que converte pixels em centímetros:

```ts
type Mockup = {
  produto_slug: string
  vista: 'frente' | 'costas'
  base: 'clara' | 'escura'      // duas fotos por peça/vista
  imagem_url: string
  area_util_px: { x: number; y: number; w: number; h: number }
  area_util_cm: { w: number; h: number }
  ancora: string
  offset_ancora_cm: number
}
```

Comportamento:
- Auto-fit na largura da área segura ao soltar a arte
- Medidas em cm exibidas ao vivo
- Cor da peça aplicada por `mix-blend-mode: multiply` sobre a base clara ou escura, conforme `cor.base`
- **A arte fica fixa em cm para toda a grade de tamanhos.** As peças são unissex e a margem de estampa é bem definida, então a mesma medida funciona de P a XG. Não implemente escala por tamanho.

### Chapa livre (DTF por metro)

- Área fixa 56×100cm em escala real, até 5 chapas
- Largura da arte definida por **digitação em cm**, não só por arrasto
- Duplicar com quantidade ("quero 12 desta")
- Botão "organizar automaticamente" → `lib/nesting/`
- Indicador de ocupação da chapa
- Bloqueia arraste fora da área útil e sobreposição
- Ao bater no limite de 5 chapas, direciona para `/filme-dtf/arquivo-pronto`

### Modo interno

O mesmo configurador é usado pela equipe para lançar pedido de WhatsApp e presencial: cria pedido em nome de um cliente, sem pagamento online e sem login do cliente. **Não duplique o componente — parametrize.**

---

## 9. Admin

Entra junto com a v1. Escopo mínimo:

- Lista de pedidos com filtro por status e origem
- Detalhe do pedido com **preview visual** e todas as medidas em cm
- Lançamento manual de pedido (WhatsApp e presencial)
- Avanço de status
- Registro da aprovação de piloto e do pagamento de saldo
- Edição da tabela de preços e da tabela de embalagem
- Download dos arquivos de arte prontos para o RIP

### Status

Ainda **não definidos de propósito.** Serão desenhados observando um pedido real percorrer a produção. Até lá, use um enum mínimo (`rascunho`, `aguardando_pagamento`, `em_producao`, `concluido`, `cancelado`) e trate-o como provisório — não construa telas, relatórios ou automações em cima dele.

**O admin cresce a partir de pedido real, não de planejamento.** Não construa tela para fluxo que ainda não aconteceu. Substituir o TEXKI1 é consequência, não requisito de lançamento.

---

## 10. Convenções de código

- TypeScript strict, sem `any`
- Server Components por padrão; `'use client'` só onde há interatividade
- Schemas Zod em `lib/schemas/`, compartilhados entre formulário e API
- Dinheiro em **centavos**, inteiros
- Medidas sempre em **centímetros**, explícito no nome (`largura_cm`)
- Formatação `pt-BR`, vírgula decimal, `R$`
- Domínio em português (`metragem`, `chapa`, `grade`, `piloto`); técnico em inglês

---

## 11. Como trabalhar neste repo

- **Plano antes de código.** Proponha e espere aprovação.
- **Uma tarefa por sessão.** Não refatore o que não foi pedido.
- **`lib/pricing/` e `lib/nesting/` exigem testes.** Sem teste, não entra.
- **O protótipo HTML do Claude Design é referência visual, não código a ser portado.** Não copie marcação nem lógica dele.
- Não instale dependência nova sem justificar.
- Não crie documentação não solicitada.

---

## 12. Glossário

| Termo | Significado |
|---|---|
| DTF | Direct to Film — impressão em filme aplicada por prensa térmica |
| Chapa | Unidade de 56×100cm = 1 metro linear de filme |
| Nesting | Arranjo das artes na chapa para minimizar desperdício |
| Área útil / segura | Região do mockup onde a estampa pode ser aplicada |
| Grade | Distribuição de quantidades por tamanho |
| Piloto | Peça de amostra produzida antes do lote, obrigatória a partir de 10 unidades |
| Ripagem | Preparo do arquivo no software RIP antes da impressão |
| TEXKI1 | Sistema legado em uso; será substituído por este projeto |
