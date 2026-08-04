import type { Metadata } from "next";
import Link from "next/link";
import { EmBreveButton } from "@/components/em-breve-button";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "DTF por Metro — Livreprint",
};

const PASSOS_A = [
  { num: "1", titulo: "Envie suas artes", desc: "Uma ou várias, em PNG ou PDF. Fundo transparente ajuda, mas a gente resolve se não tiver." },
  { num: "2", titulo: "Diga o tamanho de cada uma", desc: "Largura x altura em centímetros, e quantas repetições você quer de cada arte." },
  { num: "3", titulo: "A gente encaixa na folha", desc: "Montamos o arranjo aproveitando os 56 cm de largura e te mostramos quantos metros vão dar." },
  { num: "4", titulo: "Você aprova e a gente imprime", desc: "Aprovando o arranjo e o valor, a folha entra na fila de produção." },
];

const PASSOS_B = [
  { num: "1", titulo: "Feche o arquivo em 56 cm de largura", desc: "Altura livre, até 100 cm por folha. Pode mandar mais de uma folha." },
  { num: "2", titulo: "Envie o PDF ou PNG", desc: "300 dpi, cores em CMYK, artes em fundo transparente e espelhadas só se você quiser assim." },
  { num: "3", titulo: "Recebe o retorno da conferência", desc: "Olhamos resolução, margens e cortes. Se algo estiver arriscado, avisamos antes de imprimir." },
  { num: "4", titulo: "Impressão e envio", desc: "Imprimimos exatamente o arranjo que você mandou e despachamos em rolo protegido." },
];

const SPECS = [
  { valor: "56 cm", titulo: "Largura da folha", desc: "Largura fixa. A altura vai de 10 cm até 100 cm por folha." },
  { valor: "300 dpi", titulo: "Resolução", desc: "No tamanho final de impressão. Abaixo disso a estampa perde definição." },
  { valor: "CMYK", titulo: "Cores", desc: "Converta antes de enviar pra cor sair como você espera." },
  { valor: "PNG · PDF", titulo: "Formatos", desc: "Fundo transparente nos elementos, sem camadas de recorte escondidas." },
];

const APLICAR = [
  { num: "1", titulo: "Recorte", desc: "Separe com tesoura ou estilete a arte que vai usar, deixando uma folguinha na borda do filme." },
  { num: "2", titulo: "Prense", desc: "Posicione na peça com o filme pra cima e prense com pressão média, seguindo a etiqueta do pedido." },
  { num: "3", titulo: "Descole a frio", desc: "Espere esfriar e puxe o filme devagar. Uma segunda prensagem rápida fixa e dá acabamento." },
];

const FAQS: FaqItem[] = [
  { pergunta: "Qual a quantidade mínima?", resposta: "Um metro, que equivale a uma folha de 56x100 cm. Acima disso você pede quantos metros quiser." },
  { pergunta: "Vocês montam o arranjo pra mim?", resposta: "Sim — é o caminho A. Você manda as artes e os tamanhos, e a gente encaixa tudo na folha aproveitando o máximo de área." },
  { pergunta: "Preciso espelhar a arte?", resposta: "Não. No DTF a arte é impressa no filme e transferida como está, então mande no sentido de leitura normal." },
  { pergunta: "Serve em qualquer tecido?", resposta: "Funciona em algodão, poliéster e blends, claros ou escuros. Tecidos com muita elasticidade pedem prensagem mais curta." },
  { pergunta: "Em quanto tempo fica pronto?", resposta: "O prazo de produção aparece na hora de fechar o pedido, junto com as opções de envio." },
];

export default function FilmeDtfPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-8 py-16 md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:py-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary-foreground/20 bg-secondary px-4 py-2 text-[13px] font-bold tracking-wide text-secondary-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            DTF POR METRO
          </div>
          <h1 className="mb-6 font-heading text-[32px] leading-[1.05] tracking-tight text-balance text-foreground md:text-[54px]">
            Sua arte impressa por metro, pronta pra prensar.
          </h1>
          <p className="mb-9 max-w-[520px] text-base leading-relaxed text-muted-foreground md:text-lg">
            Você recebe a folha de DTF já impressa e com pó aplicado, do
            jeito que montou. Prensou, estampou. Monte sua arte aqui no
            site ou envie o arquivo de impressão que já está pronto.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/filme-dtf/montar"
              className="rounded-[10px] bg-primary px-7 py-4 text-center text-[15px] font-bold text-primary-foreground hover:bg-primary/90 sm:text-base"
            >
              Arranjar minha arte agora
            </Link>
            <EmBreveButton
              etapa="envio do arquivo de impressão"
              className="rounded-[10px] border-2 border-foreground px-7 py-4 text-center text-[15px] font-bold text-foreground hover:border-primary hover:text-primary sm:text-base"
            >
              Já tenho o arquivo de impressão
            </EmBreveButton>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <b className="text-primary">✓</b> Folha de 56 cm de largura
            </div>
            <div className="flex items-center gap-2">
              <b className="text-primary">✓</b> Compra a partir de 1 metro
            </div>
            <div className="flex items-center gap-2">
              <b className="text-primary">✓</b> Produção própria
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[280px] rounded-3xl border border-border bg-card p-7">
          <div className="mb-3.5 text-center text-[11px] tracking-wide text-muted-2">
            FOLHA PADRÃO DE DTF
          </div>
          <div
            className="relative flex aspect-[56/100] items-center justify-center rounded-lg border-2 border-dashed border-primary"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--muted), var(--muted) 12px, var(--background) 12px, var(--background) 24px)",
            }}
          >
            <div className="font-heading text-xl text-primary">
              56 × 100 cm
            </div>
          </div>
          <div className="mt-2.5 flex justify-between text-xs font-bold text-secondary-foreground">
            <span>largura fixa 56 cm</span>
            <span>1 metro = 1 folha</span>
          </div>
        </div>
      </section>

      {/* DOIS CAMINHOS */}
      <section id="caminhos" className="bg-secondary px-8 py-14 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-xl text-center md:mb-14">
            <div className="mb-3 text-[13px] font-bold tracking-[2px] text-primary">
              DOIS CAMINHOS
            </div>
            <h2 className="mb-4 font-heading text-[26px] text-foreground md:text-[36px]">
              Do jeito que for melhor pra você
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Não precisa saber nada de pré-impressão pra pedir. Se você já
              sabe, o caminho curto também está aqui.
            </p>
          </div>
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
            <div className="rounded-[20px] border-2 border-primary bg-background p-8">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-primary font-heading text-primary-foreground">
                  A
                </div>
                <div className="text-[19px] font-bold text-foreground">
                  Arranjar minha arte agora
                </div>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                Pra quem tem as artes soltas e quer que a gente encaixe tudo
                na folha, aproveitando cada centímetro.
              </p>
              <div className="mb-6 flex flex-col gap-4">
                {PASSOS_A.map((s) => (
                  <div key={s.num} className="flex gap-3.5">
                    <div className="min-w-5 font-heading text-sm text-primary">
                      {s.num}
                    </div>
                    <div className="text-sm leading-relaxed text-foreground/80">
                      <b className="text-foreground">{s.titulo}</b>
                      <br />
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/filme-dtf/montar"
                className="block w-full rounded-[10px] bg-primary py-4 text-center text-[15px] font-bold text-primary-foreground"
              >
                Arranjar minha arte agora
              </Link>
              <div className="mt-2.5 text-center text-xs text-muted-2">
                Você vê o preço antes de fechar o pedido.
              </div>
            </div>

            <div className="rounded-[20px] border border-secondary-foreground/20 bg-background p-8">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-foreground font-heading text-background">
                  B
                </div>
                <div className="text-[19px] font-bold text-foreground">
                  Já tenho o arquivo de impressão
                </div>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                Pra quem já fechou a folha no seu editor. A gente imprime
                exatamente como você mandou.
              </p>
              <div className="mb-6 flex flex-col gap-4">
                {PASSOS_B.map((s) => (
                  <div key={s.num} className="flex gap-3.5">
                    <div className="min-w-5 font-heading text-sm text-primary">
                      {s.num}
                    </div>
                    <div className="text-sm leading-relaxed text-foreground/80">
                      <b className="text-foreground">{s.titulo}</b>
                      <br />
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>
              <EmBreveButton
                etapa="envio do arquivo de impressão"
                className="block w-full rounded-[10px] bg-foreground py-4 text-center text-[15px] font-bold text-background"
              >
                Enviar meu arquivo
              </EmBreveButton>
              <div className="mt-2.5 text-center text-xs text-muted-2">
                Conferimos o arquivo antes de imprimir e avisamos se algo
                não fechar.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESPECIFICAÇÕES */}
      <section className="mx-auto max-w-6xl px-8 py-14 md:py-24">
        <div className="mx-auto mb-10 max-w-xl text-center md:mb-14">
          <div className="mb-3 text-[13px] font-bold tracking-[2px] text-primary">
            ESPECIFICAÇÕES
          </div>
          <h2 className="mb-4 font-heading text-[26px] text-foreground md:text-[36px]">
            O que o arquivo precisa ter
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Vale pros dois caminhos. No caminho A, a gente ajusta o que
            der pra ajustar junto com você.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">
          {SPECS.map((s) => (
            <div
              key={s.titulo}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-2.5 font-heading text-xl text-primary">
                {s.valor}
              </div>
              <div className="mb-1.5 text-sm font-bold text-foreground">
                {s.titulo}
              </div>
              <div className="text-[13px] leading-relaxed text-muted-foreground">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMO APLICAR */}
      <section id="aplicar" className="bg-dark px-8 py-14 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-xl text-center md:mb-14">
            <div className="mb-3 text-[13px] font-bold tracking-[2px] text-dark-accent">
              COMO APLICAR
            </div>
            <h2 className="mb-4 font-heading text-[26px] text-dark-foreground md:text-[36px]">
              Chegou a folha. E agora?
            </h2>
            <p className="text-[15px] leading-relaxed text-dark-foreground/70 md:text-base">
              Três passos com prensa térmica. Cada pedido vai com a
              recomendação de tempo e temperatura na etiqueta.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {APLICAR.map((s) => (
              <div
                key={s.num}
                className="rounded-2xl border border-dark-border bg-dark-soft p-7"
              >
                <div className="mb-2.5 font-heading text-lg text-dark-accent">
                  {s.num} · {s.titulo}
                </div>
                <div className="text-sm leading-relaxed text-dark-foreground/70">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dark-border bg-dark-soft px-6 py-5 text-sm text-dark-foreground/70">
            <b className="text-dark-foreground">Referência de prensagem:</b>{" "}
            cerca de 150 °C por 15 segundos com pressão média — confirme
            sempre na etiqueta do seu pedido, porque muda conforme o
            tecido.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-8 py-14 md:py-24">
        <div className="mb-12 text-center">
          <div className="mb-3 text-[13px] font-bold tracking-[2px] text-primary">
            FAQ
          </div>
          <h2 className="font-heading text-[26px] text-foreground md:text-[36px]">
            Dúvidas de DTF por metro
          </h2>
        </div>
        <FaqAccordion itens={FAQS} />
      </section>

      {/* CTA FINAL */}
      <section className="bg-primary px-8 py-20">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="mb-4 font-heading text-[28px] text-primary-foreground md:text-[38px]">
            Pronto pra fechar sua folha?
          </h2>
          <p className="mb-8 text-[17px] text-primary-foreground/90">
            Monte com a gente ou envie o arquivo pronto — o resultado sai
            da mesma impressora.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/filme-dtf/montar"
              className="rounded-[10px] bg-dark px-7 py-4 text-[15px] font-bold text-primary-foreground sm:text-base"
            >
              Arranjar minha arte agora
            </Link>
            <EmBreveButton
              etapa="envio do arquivo de impressão"
              className="rounded-[10px] border-2 border-primary-foreground px-7 py-4 text-[15px] font-bold text-primary-foreground sm:text-base"
            >
              Já tenho o arquivo de impressão
            </EmBreveButton>
          </div>
        </div>
      </section>
    </>
  );
}
