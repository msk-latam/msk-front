import Image from 'next/image';

const ProfessionalCardMobile = ({ pro }: any) => (
  <div className="w-[324px] h-[581px] flex-shrink-0 relative overflow-hidden rounded-xl mr-4">
    <Image src={pro.imagenMobile} alt={pro.nombre} fill className="object-cover" />
    <div className="absolute inset-0 bg-black/30" />
    <div className="absolute top-3 left-3 z-10">
      <p className="text-xs bg-white text-black px-3 py-1 rounded-full font-medium">{pro.especialidad}</p>
    </div>
    <div className="absolute bottom-24 w-full flex flex-col items-center text-center text-white px-4 z-10">
      <p className="italic text-3xl opacity-80">Masterclass</p>
      <h1 className="text-3xl font-bold leading-tight mt-1">{pro.nombre}</h1>
      <div className="h-[7px] w-8 rounded-full bg-white my-2" />
      <p className="text-base font-semibold">El arte de escuchar los latidos</p>
      <p className="text-xs opacity-80 mt-2">1 hora 7 minutos</p>
    </div>
  </div>
);

export default ProfessionalCardMobile;
