export const FILME = {
  LARGURA_ROLO_CM: 57,
  LARGURA_UTIL_CM: 56, // 57 menos 1cm de margem lateral
  ALTURA_CHAPA_CM: 100, // 1 metro linear
  GUTTER_CM: 0.5, // espaço entre artes
  MAX_CHAPAS: 5, // acima disso → /filme-dtf/arquivo-pronto
  ROTACAO_90_PERMITIDA: true,
  ENTREGA: "rolo_continuo", // não é cortado por chapa nem por peça
} as const;

export const PECA = {
  QTD_MINIMA: 1,
  PILOTO_A_PARTIR_DE: 10, // abaixo disso não há piloto, nem opcional
  SINAL_PCT: 30, // pedidos com piloto
  ARTE_ESCALA_COM_TAMANHO: false, // ver seção 8 do CLAUDE.md
} as const;

export const ARTE = {
  FORMATOS_ACEITOS: ["png", "pdf", "svg"] as const, // ⚠️ confirmar se JPG entra com aviso
  TAMANHO_MAX_MB: 50, // ⚠️ ajustar conforme limite do R2/Vercel
  EXIGE_CANAL_ALFA: true,
  // Sem DPI mínimo. Nada é bloqueado nem avisado ao cliente.
  // O dpi_efetivo é gravado no pedido apenas para a produção consultar.
} as const;

export const PRODUCAO = {
  PRAZO_DIAS_UTEIS_MIN: 5,
  PRAZO_DIAS_UTEIS_MAX: 7, // conta após aprovação (da piloto, quando houver)
} as const;
