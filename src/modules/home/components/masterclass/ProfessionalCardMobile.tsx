'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Professional } from '@/modules/home/types';
import { usePathname } from 'next/navigation';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';

{/*const ProfessionalCardMobile = ({ pro }: { pro: Professional }) => (
  <Link href={pro.perfilUrl || "#"} target="_blank" rel="noopener noreferrer">
    <div className="w-[320px] h-[581px] flex-shrink-0 relative overflow-hidden rounded-2xl mr-4 mb-11 cursor-pointer transition-transform">
      <Image src={pro.imagenMobile} alt={pro.nombre} fill className="object-cover" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute top-6 left-4 z-8">
        <p className="text-[12px] bg-white text-black py-[6px] px-3 rounded-full font-medium">
          {pro.especialidad || "Especialidad no disponible"}
        </p>
      </div>

      <div className="absolute bottom-6 w-full flex flex-col items-center gap-6 text-center text-white px-4 z-8">
        <div>
          <p className="font-[lora] text-[400] text-white text-[24px] opacity-90">Masterclass</p>
          <h1 className="text-3xl font-bold leading-tight mt-1">{pro.nombre}</h1>
        </div>

        <div className="h-[7px] w-[30px] rounded-full  bg-white my-2" />

         Podés poner acá una frase personalizada si la tenés para cada pro 
        <h1 className="text-[20px] font-[700] text-center w-[70%]">
        El arte de escuchar <br />
        los latidos
        </h1>
        <h1 className="text-[14px] font-Raleway font-500 mt-2">1 hora 7 minutos</h1>
      </div>
    </div>
  </Link>
);

export default ProfessionalCardMobile;*/}







const ProfessionalCardMobile = ({ pro }: { pro: Professional }) => {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'ar';

  return (
    <Link
      href={getLocalizedUrl(lang, '/tienda/medicina-intensiva-amir/#equipo-docente')}
      /*
        DEMO TEMPORAL:
        Scroll suave al equipo docente si el ID existe.
        ⚠️ Quitar después de la demo.
      */
      onClick={(e) => {
        const target = document.getElementById('equipo-docente');
        if (target) {
          e.preventDefault(); // SOLO evitamos la navegación si podemos hacer scroll manual
          target.scrollIntoView({ behavior: 'smooth' });
        }
        // Si NO hay target, dejamos que el Link navegue normal al href
      }}
      className="w-[320px] h-[581px] flex-shrink-0 relative overflow-hidden rounded-2xl mr-4 mb-11 cursor-pointer transition-transform"
    >
      <Image src={pro.imagenMobile} alt={pro.nombre} fill className="object-cover" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute top-6 left-4 z-8">
        <p className="text-[12px] bg-white text-black py-[6px] px-3 rounded-full font-medium">
          {pro.especialidad || "Especialidad no disponible"}
        </p>
      </div>
      <div className="absolute bottom-6 w-full flex flex-col items-center gap-6 text-center text-white px-4 z-8">
        <div>
          <p className="font-[lora] text-[400] text-white text-[24px] opacity-90">Masterclass</p>
          <h1 className="text-3xl font-bold leading-tight mt-1">{pro.nombre}</h1>
        </div>
        <div className="h-[7px] w-[30px] rounded-full bg-white my-2" />
        <h1 className="text-[20px] font-[700] text-center w-[70%]">
          El arte de escuchar <br />
          los latidos
        </h1>
        <h1 className="text-[14px] font-Raleway font-500 mt-2">1 hora 7 minutos</h1>
      </div>
    </Link>
  );
}; 

export default ProfessionalCardMobile;
