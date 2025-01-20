"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between py-16 px-6 bg-gradient-to-t from-emerald-500 to-emerald-600 text-gray-100">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between">
        {/* Texto */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            Nós produzimos suas peças, você só precisa vender!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-lg text-stone-100"
          >
            Tá precisando de camisetas personalizadas pra um evento, time,
            empresa ou até pra revender? A gente faz pra você! Trabalhamos com
            pedidos a partir de 10 unidades, garantindo aquele preço justo e uma
            qualidade que impressiona.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex items-center justify-center md:justify-start md:space-x-4"
          >
            <Link
              href={"#contact"}
              className="px-6 py-3 bg-stone-700 text-white font-semibold rounded-lg hover:bg-stone-200 hover:text-stone-600 focus:outline-none transition duration-500"
            >
              Entre em contato agora!
            </Link>
            <span className="text-sm text-stone-300 ml-4 flex items-center">
              A partir de R$24,99
            </span>
          </motion.div>
        </div>

        {/* Imagem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 flex justify-center"
        >
          <Image
            src="/hero.svg"
            alt="Illustration showing creativity"
            width={500}
            height={500}
            className="object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
