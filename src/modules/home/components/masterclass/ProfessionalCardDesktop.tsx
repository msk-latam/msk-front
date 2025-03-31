import Image from 'next/image';

const ProfessionalCardDesktop = ({ pro, current, total, onPrev, onNext, className = '' }: any) => (
  <div className={`hidden md:flex flex-col relative bg-white text-black rounded-2xl w-[400px] p-5 shadow-xl border border-gray-200 ${className}`}>
    <div className="text-[10px] text-gray-500 mb-1">NUESTRO EQUIPO</div>
    <div className="relative w-full h-[260px] overflow-hidden rounded-xl mb-4">
      <Image src={pro.imagenDesktop} alt={pro.nombre} fill className="object-cover" />
    </div>
    <p className="text-[11px] text-gray-500 tracking-wide uppercase mb-1">{pro.especialidad}</p>
    <p className="text-[15px] font-semibold mb-3">{pro.nombre}</p>
    <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
      <span>NUESTRO EQUIPO</span>
      <button className="bg-black text-white rounded-full px-3 py-1 text-[10px]">Ver perfil</button>
    </div>
    <div className="absolute top-3 right-4 flex items-center gap-2 text-gray-400">
      <span className="text-[10px]">{current + 1} / {total}</span>
      <div onClick={onPrev} className="hover:text-black">◀</div>
      <button onClick={onNext} className="hover:text-black">▶</button>
    </div>
  </div>
);

export default ProfessionalCardDesktop;
