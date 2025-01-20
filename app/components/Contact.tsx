import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="px-6 py-16 bg-emerald-500 md:px-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Entre em Contato Conosco
        </h2>
        <p className="text-lg text-stone-100 mb-8">
          Estamos aqui para ajudar! Fale conosco pelo WhatsApp para mais
          informações.
        </p>
        <a
          href="https://wa.me/+5511915121935" // Substitua pelo número correto
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 transition duration-300"
        >
          <FaWhatsapp size={24} className="mr-2" />
          Fale Conosco no WhatsApp
        </a>
      </div>
    </section>
  );
};

export default Contact;
