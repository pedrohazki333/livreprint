import React from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Empresa X",
    quote: "O serviço foi excepcional! Superou todas as nossas expectativas.",
    image: "/testimonial-1.svg",
    socials: {
      facebook: "https://facebook.com/empresa-x",
      instagram: "https://instagram.com/empresa-x",
      twitter: "https://twitter.com/empresa-x",
    },
  },
  {
    id: 2,
    name: "Marca Y",
    quote: "Recomendo fortemente! O resultado foi incrível.",
    image: "/testimonial-2.svg",
    socials: {
      facebook: "https://facebook.com/marca-y",
      instagram: "https://instagram.com/marca-y",
      twitter: "https://twitter.com/marca-y",
    },
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="px-6 py-16 bg-gray-100 md:px-12">
      <h2 className="text-3xl font-bold text-center text-stone-700 mb-12">
        Depoimentos de Nossos Clientes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-stone-700 rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative w-full h-48">
              <Image
                src={testimonial.image}
                alt={`Produto de ${testimonial.name}`}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
            <div className="p-6 text-center">
              <p className="text-lg text-stone-100 italic mb-4">
                &quot;{testimonial.quote}&quot;
              </p>
              <h3 className="text-xl font-semibold text-stone-100 mb-4">
                {testimonial.name}
              </h3>
              <div className="flex justify-center space-x-4">
                <a
                  href={testimonial.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-200 hover:text-stone-400"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href={testimonial.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-200 hover:text-stone-400"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href={testimonial.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-200 hover:text-stone-400"
                >
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
