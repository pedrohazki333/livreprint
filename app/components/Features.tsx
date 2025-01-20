import React from "react";
import { FaCheckCircle, FaLightbulb, FaRocket } from "react-icons/fa";

const Features = () => {
  return (
    <section className="py-14 px-6 bg-white text-stone-700">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Porque comprar conosco?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-stone-700 shadow-lg rounded-lg">
            <FaCheckCircle className="text-4xl text-gray-100 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-200">
              Alta Qualidade
            </h3>
            <p className="text-sm text-gray-300">
              Nossos produtos são todos trabalhados por profissionais altamente
              capacitados, desde a nossa oficina de costura até nosssa
              estamparia.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-stone-700 shadow-lg rounded-lg">
            <FaLightbulb className="text-4xl text-gray-100 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-200">
              Personalização
            </h3>
            <p className="text-sm text-gray-300">
              O produto é 100% customizável por você. Escolha o molde da peça,
              cor e estampas que nós deixamos tudo do seu jeito!
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-stone-700 shadow-lg rounded-lg">
            <FaRocket className="text-4xl text-gray-100 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-200">
              Entrega Rápida
            </h3>
            <p className="text-sm text-gray-300">
              Produzimos e enviamos seu pedido no menor prazo possível,
              garantindo rapidez e eficiência para seu uso imediato!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
