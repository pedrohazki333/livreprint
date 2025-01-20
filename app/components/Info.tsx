"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const infoSections = [
  {
    id: 1,
    title: "DTF por Metro",
    description:
      "Eleve o nível das suas personalizações com nossas estampas DTF por metro! Oferecemos filmes de alta definição, com cores vibrantes e excelente aderência para diversos tipos de tecidos. Seja para produções pequenas ou grandes volumes, você pode contar com flexibilidade nos tamanhos e descontos progressivos a partir de 10 metros. É a escolha perfeita para quem busca qualidade e eficiência na produção em larga escala, sem abrir mão do acabamento impecável. Tá esperando o quê? Entre em contato e peça o seu agora mesmo!",
    image: "/info-1.svg",
  },
  {
    id: 2,
    title: "Peças Personalizadas",
    description:
      "Presenteie com exclusividade, crie algo especial só pra você ou celebre momentos únicos com quem você ama! Produzimos peças personalizadas para uso pessoal, presentes especiais e até mesmo para casais, com opções que incluem camisetas combinando, acessórios únicos e muito mais. Seja um presente para uma data inesquecível, algo que reflita sua personalidade ou uma lembrança para compartilhar com quem importa, cada peça é feita com cuidado, materiais de alta qualidade e acabamentos impecáveis. Quer criar algo exclusivo para você ou para quem ama? Fale com a gente e comece a personalizar!",
    image: "/info-2.svg",
  },
  {
    id: 3,
    title: "Produção de Peças Sob Demanda",
    description:
      "Aqui, sua produção acontece sob medida! Oferecemos serviços de produção de peças sob demanda com qualidade premium, rapidez e atenção aos detalhes. Seja para revenda, uniformes personalizados ou projetos corporativos, cuidamos de cada etapa para garantir que suas peças sejam entregues exatamente como você imaginou. Nosso compromisso é oferecer soluções que atendam às suas necessidades, sempre com preços justos e entrega no prazo. Pronto para começar a produzir com a gente? Solicite seu orçamento agora e faça acontecer!",
    image: "/info-3.svg",
  },
];

const Info: React.FC = () => {
  return (
    <section className="px-6 py-16 bg-emerald-500 md:px-12">
      <motion.h2
        className="text-3xl font-bold text-center text-white mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Por que Escolher Nossos Serviços?
      </motion.h2>

      <div className="flex flex-col space-y-12">
        {infoSections.map((section, index) => (
          <motion.div
            key={section.id}
            className={`flex flex-col-reverse md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-xl font-semibold text-stone-100 mb-2">
                {section.title}
              </h3>
              <p className="text-stone-200">{section.description}</p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src={section.image}
                alt={section.title}
                width={300}
                height={200}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Info;
