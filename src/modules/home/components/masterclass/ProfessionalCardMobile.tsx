import Image from 'next/image';
import Link from 'next/link';

const ProfessionalCardMobile = ({ pro }: any) => (
  <Link href={pro.perfilUrl || "#"}>
    <div className="w-[324px] h-[581px] flex-shrink-0 relative overflow-hidden rounded-2xl mr-4 mb-11 cursor-pointer">
      <Image src={pro.imagenMobile} alt={pro.nombre} fill className="object-cover" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute top-6 left-4 z-8">
        <p className="text-[12px] font-[400] bg-white text-black py-[6px] px-3 rounded-full font-medium">
          {pro.especialidad || "Especialidad no disponible"}
        </p>
      </div>

      <div className="absolute bottom-6 w-full flex flex-col items-center gap-6 text-center text-white px-4 z-8">
        <div>
          <p className="font-[lora] text-3xl opacity-80">Masterclass</p>
          <h1 className="text-3xl font-bold leading-tight mt-1">{pro.nombre}</h1>
        </div>

        <div className="h-[7px] w-8 rounded-full bg-white my-2" />

        <h1 className="text-[18px] font-[700] text-center w-[70%]">
          El arte de escuchar los latidos
        </h1>
        <h1 className="text-[14px] font-[lora] mt-2">1 hora 7 minutos</h1>
      </div>
    </div>
  </Link>
);

export default ProfessionalCardMobile;
