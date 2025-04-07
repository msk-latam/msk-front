import Image from "next/image";

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
      NUESTRO EQUIPO
      <div className="flex items-center gap-2 text-black">
        <span className="text-xs">
          {current + 1} / {total}
        </span>
        <div onClick={onPrev} className="hover:text-gray-400">
          ◀
        </div>
        <button onClick={onNext} className="hover:text-gray-400">
          ▶
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
