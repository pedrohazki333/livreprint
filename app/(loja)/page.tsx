import Link from "next/link";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { ProductPhoto } from "@/components/product-photo";
import { PRODUTOS } from "@/lib/catalog/data";

const AUDIENCIAS = [
  {
    titulo: "Pessoa física",
    desc: "Quer só uma camiseta, moletom ou polo com a sua estampa? Personalize em minutos direto no mockup.",
  },
  {
    titulo: "Empresas & uniformes",
    desc: "Fardamos equipes inteiras com identidade visual consistente em todas as peças.",
  },
  {
    titulo: "Grupos & eventos",
    desc: "Camisetas de formatura, evento ou grupo — mesma estampa, no volume que você precisar.",
  },
];

const PASSOS_PECA = [
  { num: "1", titulo: "Escolha a peça", desc: "Camiseta (com opções de tecido), moletom ou polo." },
  { num: "2", titulo: "Personalize no mockup", desc: "Posicione sua arte dentro da área segura de impressão." },
  { num: "3", titulo: "Confirme os detalhes", desc: "Tamanho, quantidade e demais informações do pedido." },
  { num: "4", titulo: "Produzimos e entregamos", desc: "Sua peça é feita por nós, do início ao fim." },
];

const PASSOS_DTF = [
  { num: "1", titulo: "Impressão no filme", desc: "Sua arte é impressa em um filme especial (DTF)." },
  { num: "2", titulo: "Aplicação do pó adesivo", desc: "Um pó adesivo é aplicado sobre a tinta ainda fresca." },
  { num: "3", titulo: "Cura em estufa", desc: "O filme passa por uma estufa que ativa o adesivo." },
  { num: "4", titulo: "Prensagem na peça", desc: "A estampa é transferida pra peça com calor e pressão." },
];

const FAQS: FaqItem[] = [
  {
    pergunta: "O que é DTF?",
    resposta:
      "DTF (Direct to Film) é uma técnica de estampagem onde a arte é impressa em um filme especial, recebe um pó adesivo e depois é prensada na peça com calor. O resultado é uma estampa durável e colorida em qualquer tecido.",
  },
  {
    pergunta: "Funciona em qualquer tecido?",
    resposta:
      "Sim! O DTF funciona bem em algodão, poliéster e blends, o que cobre camisetas, moletons e polos do nosso catálogo.",
  },
  {
    pergunta: "Existe quantidade mínima de pedido?",
    resposta:
      "Não. Você pode pedir uma peça personalizada avulsa ou ajustar as medidas do DTF por metro conforme a sua necessidade.",
  },
  {
    pergunta: "Quanto tempo demora a produção?",
    resposta:
      "O prazo varia conforme o volume do pedido, mas você recebe uma estimativa assim que confirma os detalhes no fechamento do pedido.",
  },
  {
    pergunta: "Recebo uma prova antes da produção?",
    resposta:
      "Sim, você visualiza sua arte posicionada no mockup (peça personalizada) ou na folha 56x100cm (DTF por metro) antes de confirmar.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-8 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:py-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary-foreground/20 bg-secondary px-4 py-2 text-[13px] font-bold tracking-wide text-secondary-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            ESTAMPARIA DTF PONTA A PONTA
          </div>
          <h1 className="mb-6 font-heading text-[34px] leading-[1.05] tracking-tight text-balance text-foreground md:text-[56px]">
            Sua estampa, do seu jeito, na sua peça.
          </h1>
          <p className="mb-9 max-w-[520px] text-base leading-relaxed text-muted-foreground md:text-lg">
            Personalize camisetas, moletons e polos em um mockup simples, ou
            peça seu DTF por metro do jeito que preferir. A gente cuida da
            impressão, do corte e da entrega.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/catalogo"
              className="rounded-[10px] bg-primary px-7 py-4 text-center text-[15px] font-bold text-primary-foreground hover:bg-primary/90 sm:text-base"
            >
              Personalizar minha peça
            </Link>
            <Link
              href="/filme-dtf"
              className="rounded-[10px] border-2 border-foreground px-7 py-4 text-center text-[15px] font-bold text-foreground hover:border-primary hover:text-primary sm:text-base"
            >
              Pedir DTF por metro
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3.5 sm:flex sm:gap-8">
            <div>
              <div className="font-heading text-[22px] text-primary md:text-[26px]">2</div>
              <div className="text-xs leading-snug text-muted-foreground md:text-sm">
                formas de pedir DTF por metro
              </div>
            </div>
            <div>
              <div className="font-heading text-[22px] text-primary md:text-[26px]">3</div>
              <div className="text-xs leading-snug text-muted-foreground md:text-sm">
                peças prontas pra personalizar
              </div>
            </div>
            <div>
              <div className="font-heading text-[22px] text-primary md:text-[26px]">100%</div>
              <div className="text-xs leading-snug text-muted-foreground md:text-sm">
                produção própria
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[1/1.05] overflow-hidden rounded-3xl border border-secondary-foreground/20">
            <ProductPhoto
              src="/mockups/hero-mockup.png"
              alt="Modelo vestindo camiseta estampada ao lado do mockup de personalização"
            />
          </div>
          <div className="mt-3.5 rounded-2xl border border-border bg-background px-5 py-4 shadow-lg md:absolute md:-bottom-5 md:-left-5 md:mt-0">
            <div className="text-[13px] font-bold text-foreground">
              Área segura de impressão
            </div>
            <div className="text-xs text-muted-foreground">
              já configurada no mockup
            </div>
          </div>
        </div>
      </section>

      {/* AUDIÊNCIA */}
      <section className="bg-dark px-8 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-heading text-[26px] text-dark-foreground md:text-[28px]">
              Pra quem é a Livreprint
            </h2>
            <p className="max-w-[380px] text-[15px] text-dark-foreground/60">
              De quem quer só uma peça até quem precisa fardar um evento
              inteiro.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-5">
            {AUDIENCIAS.map((a) => (
              <div
                key={a.titulo}
                className="rounded-2xl border border-dark-border bg-dark-soft p-6"
              >
                <div className="mb-2.5 font-heading text-lg text-dark-accent">
                  {a.titulo}
                </div>
                <div className="text-sm leading-relaxed text-dark-foreground/70">
                  {a.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA - PEÇA PERSONALIZADA */}
      <section id="pecas" className="mx-auto max-w-6xl px-8 py-14 md:py-24">
        <div className="mx-auto mb-10 max-w-xl text-center md:mb-14">
          <div className="mb-3 text-[13px] font-bold tracking-[2px] text-primary">
            PEÇA PERSONALIZADA
          </div>
          <h2 className="mb-4 font-heading text-[26px] text-foreground md:text-[36px]">
            Do catálogo até a sua porta
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Escolha entre camisetas (com opções de tecido), moletons e polos.
            Você personaliza em cima de um mockup pronto, com área segura de
            estampa já marcada.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {PASSOS_PECA.map((s) => (
            <div
              key={s.num}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <div className="absolute top-5 right-5 font-heading text-3xl text-secondary">
                {s.num}
              </div>
              <div className="mb-2.5 text-base font-bold text-foreground">
                {s.titulo}
              </div>
              <div className="text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DTF POR METRO */}
      <section id="dtf-metro" className="bg-secondary px-8 py-14 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-xl text-center md:mb-14">
            <div className="mb-3 text-[13px] font-bold tracking-[2px] text-primary">
              DTF POR METRO
            </div>
            <h2 className="mb-4 font-heading text-[26px] text-foreground md:text-[36px]">
              Só a folha impressa, do seu jeito
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Folha de 56 cm de largura, a partir de 1 metro. Escolha por
              onde começar — o resto está na página do DTF por metro.
            </p>
          </div>
          <div className="mx-auto grid max-w-[460px] grid-cols-1 gap-5 md:max-w-none md:grid-cols-2">
            <Link
              href="/filme-dtf"
              className="flex items-center gap-4 rounded-[20px] border-2 border-primary bg-background p-7 hover:border-primary/70"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-primary font-heading text-primary-foreground">
                A
              </div>
              <div className="flex-1">
                <div className="mb-1 text-[17px] font-bold text-foreground">
                  Arranjar minha arte agora
                </div>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  Você manda as artes e os tamanhos, a gente encaixa na
                  folha.
                </div>
              </div>
              <div className="text-xl text-primary">→</div>
            </Link>
            <Link
              href="/filme-dtf"
              className="flex items-center gap-4 rounded-[20px] border border-secondary-foreground/20 bg-background p-7 hover:border-primary"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-foreground font-heading text-background">
                B
              </div>
              <div className="flex-1">
                <div className="mb-1 text-[17px] font-bold text-foreground">
                  Já tenho o arquivo de impressão
                </div>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  Folha fechada em 56 cm, 300 dpi e CMYK — a gente imprime
                  como veio.
                </div>
              </div>
              <div className="text-xl text-primary">→</div>
            </Link>
          </div>
          <div className="mt-5 text-center">
            <Link
              href="/filme-dtf"
              className="text-[15px] font-bold text-secondary-foreground"
            >
              Ver tudo sobre DTF por metro: especificações, prazos e como
              aplicar →
            </Link>
          </div>
        </div>
      </section>

      {/* TECNOLOGIA DTF */}
      <section id="tecnologia" className="mx-auto max-w-6xl px-8 py-14 md:py-24">
        <div className="mx-auto mb-10 max-w-xl text-center md:mb-14">
          <div className="mb-3 text-[13px] font-bold tracking-[2px] text-primary">
            ENTENDA A TÉCNICA
          </div>
          <h2 className="mb-4 font-heading text-[26px] text-foreground md:text-[36px]">
            Como o DTF chega até a peça
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Sabemos que DTF pode soar complicado. Aqui vai o passo a passo,
            sem enrolação.
          </p>
        </div>
        <div className="mb-8 grid grid-cols-2 gap-7 gap-x-3.5 sm:gap-5 lg:grid-cols-4">
          {PASSOS_DTF.map((s) => (
            <div key={s.num} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-secondary-foreground/20 bg-secondary font-heading text-xl text-primary">
                {s.num}
              </div>
              <div className="mb-2 text-[15px] font-bold text-foreground">
                {s.titulo}
              </div>
              <div className="text-[13px] leading-relaxed text-muted-foreground">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-secondary px-7 py-6 text-center text-sm text-secondary-foreground">
          Funciona em algodão, poliéster e blends — de camisetas a
          moletons, sem perder qualidade na estampa.
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="bg-dark px-8 py-14 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-3 text-[13px] font-bold tracking-[2px] text-dark-accent">
                CATÁLOGO
              </div>
              <h2 className="font-heading text-[26px] text-dark-foreground md:text-[36px]">
                Peças prontas pra receber sua arte
              </h2>
            </div>
            <p className="max-w-[380px] text-[15px] text-dark-foreground/60">
              Cada peça já vem com mockup e área segura de impressão
              configurados.
            </p>
          </div>
          <div className="mx-auto grid max-w-[460px] grid-cols-1 gap-4 md:max-w-none md:grid-cols-3 md:gap-6">
            {PRODUTOS.map((p) => (
              <div
                key={p.slug}
                className="overflow-hidden rounded-[20px] border border-dark-border bg-dark-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ProductPhoto src={p.imagemCatalogo} alt={p.nome} />
                </div>
                <div className="p-6">
                  <div className="mb-2 text-lg font-bold text-dark-foreground">
                    {p.nome}
                  </div>
                  <div className="mb-4 text-sm leading-relaxed text-dark-foreground/70">
                    {p.tagline}
                  </div>
                  <Link
                    href={`/produto/${p.slug}`}
                    className="text-sm font-bold text-dark-accent"
                  >
                    Ver opções →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-8 py-14 md:py-24">
        <div className="mb-12 text-center">
          <div className="mb-3 text-[13px] font-bold tracking-[2px] text-primary">
            FAQ
          </div>
          <h2 className="font-heading text-[26px] text-foreground md:text-[36px]">
            Perguntas rápidas
          </h2>
        </div>
        <FaqAccordion itens={FAQS} />
      </section>

      {/* CTA FINAL */}
      <section className="bg-primary px-8 py-20">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="mb-4 font-heading text-[28px] text-primary-foreground md:text-[38px]">
            Pronto pra estampar sua ideia?
          </h2>
          <p className="mb-8 text-[17px] text-primary-foreground/90">
            Escolha uma peça do catálogo ou monte seu DTF por metro agora
            mesmo.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/catalogo"
              className="rounded-[10px] bg-dark px-7 py-4 text-[15px] font-bold text-primary-foreground sm:text-base"
            >
              Ver catálogo
            </Link>
            <Link
              href="/filme-dtf"
              className="rounded-[10px] border-2 border-primary-foreground px-7 py-4 text-[15px] font-bold text-primary-foreground sm:text-base"
            >
              Pedir DTF por metro
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
