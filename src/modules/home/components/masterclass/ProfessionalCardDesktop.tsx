import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProfessionalCardDesktop = ({
  pro,
  current,
  total,
  onPrev,
  onNext,
  className = "",
}: any) => (
  <div
    className={`hidden md:flex flex-col relative bg-white text-black rounded-[30px] w-[430px] h-[556px] py-5 px-6 gap-5 shadow-xl border border-gray-200 ${className}`}
  >
<div className="text-sm text-black flex flex-row justify-between">
  <p className="my-auto">NUESTRO EQUIPO</p>
  <div className="flex items-center gap-4 text-black bg-white">
    <button
      onClick={onPrev}
      className="p-1 rounded-full hover:bg-gray-100 transition"
    >
      <ChevronLeft size={18} />
    </button>
    <span className="text-sm font-medium">
      {current + 1} / {total}
    </span>
    <button
      onClick={onNext}
      className="p-1 rounded-full hover:bg-gray-100 transition"
    >
      <ChevronRight size={18} />
    </button>
  </div>
</div>
    <div className="relative w-full h-[360px] overflow-hidden rounded-xl">
      <Image
        src={pro.imagenDesktop}
        alt={pro.nombre}
        fill
        className="object-cover"
      />
    </div>
    <div className="flex flex-col gap-[6px]">
      <p className="text-lg text-black tracking-wide uppercase">
        {pro.especialidad}
      </p>
      <p className="text-2xl font-semibold">{pro.nombre}</p>
    </div>
    <div className="flex justify-between items-center text-sm text-black">
      <span>NUESTRO EQUIPO</span>
      <button className="bg-black text-white rounded-full py-[14px] px-6 text-base">
        Ver perfil
      </button>
    </div>
  </div>
);

export default ProfessionalCardDesktop;
