import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 bg-emerald-500 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-6 md:space-y-0">
          {/* Nome da Empresa */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">livreprint</h3>
          </div>

          {/* Coluna de Links */}
          {/* <div className="flex flex-col space-y-2">
            <a href="\" className="text-sm text-stone-100 hover:text-stone-300">
              Home
            </a>
            <a
              href="\about"
              className="text-sm text-stone-100 hover:text-stone-300"
            >
              Sobre
            </a>
            <a
              href="\services"
              className="text-sm text-stone-100 hover:text-stone-300"
            >
              Serviços
            </a>
            <a
              href="\contact"
              className="text-sm text-stone-100 hover:text-stone-300"
            >
              Contato
            </a>
          </div> */}
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-sm text-stone-300">
            &copy; {new Date().getFullYear()} livreprint. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
