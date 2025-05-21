import { useInstitutions } from '@/modules/home/hooks/useInstitution';
import InstitutionsSkeleton from '@/modules/home/skeletons/InstitutionsSkeleton';
import BrandSlider from './BrandSlider';

const Institutions = () => {
	const { institutions, title, loading, error } = useInstitutions();

	// const scrollRef = useRef<HTMLDivElement>(null);
	// const [isDragging, setIsDragging] = useState(false);
	// const [startX, setStartX] = useState(0);
	// const [scrollLeft, setScrollLeft] = useState(0);
	// const [isHovered, setIsHovered] = useState(false);
	// // Estado para controlar la dirección del scroll
	// const [scrollDirection, setScrollDirection] = useState(1); // 1 = derecha, -1 = izquierda

	// const handleMouseDown = (e: React.MouseEvent) => {
	//   setIsDragging(true);
	//   setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
	//   setScrollLeft(scrollRef.current?.scrollLeft || 0);
	// };

	// const handleMouseLeave = () => setIsDragging(false);
	// const handleMouseUp = () => setIsDragging(false);

	// const handleMouseMove = (e: React.MouseEvent) => {
	//   if (!isDragging || !scrollRef.current) return;
	//   e.preventDefault();
	//   const x = e.pageX - scrollRef.current.offsetLeft;
	//   const walk = (x - startX) * 1.5;
	//   scrollRef.current.scrollLeft = scrollLeft - walk;
	// };

	// const handleTouchStart = (e: React.TouchEvent) => {
	//   setIsDragging(true);
	//   setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
	//   setScrollLeft(scrollRef.current?.scrollLeft || 0);
	// };

	// const handleTouchMove = (e: React.TouchEvent) => {
	//   if (!isDragging || !scrollRef.current) return;
	//   const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
	//   const walk = (x - startX) * 1.5;
	//   scrollRef.current.scrollLeft = scrollLeft - walk;
	// };

	// const handleTouchEnd = () => setIsDragging(false);

	// // 🔁 Inicializar scroll en el centro
	// useEffect(() => {
	//   const scrollEl = scrollRef.current;
	//   if (!scrollEl) return;

	//   const handleInitialScroll = () => {
	//     scrollEl.scrollLeft = scrollEl.scrollWidth / 3;
	//   };

	//   handleInitialScroll();
	// }, []);

	// // 🚗 Scroll automático con efecto ida y vuelta
	// useEffect(() => {
	//   const scrollEl = scrollRef.current;
	//   if (!scrollEl) return;

	//   let frame: number;
	//   const scrollSpeed = 0.4; // velocidad ajustable

	//   const autoScroll = () => {
	//     if (!scrollEl) return;

	//     if (!isDragging && !isHovered) {
	//       // Añadir velocidad con dirección
	//       scrollEl.scrollLeft += scrollSpeed * scrollDirection;

	//       const scrollWidth = scrollEl.scrollWidth;
	//       const scrollLeft = scrollEl.scrollLeft;
	//       const visibleWidth = scrollEl.offsetWidth;

	//       // Si llega al final, cambiar dirección a izquierda
	//       if (scrollLeft + visibleWidth >= scrollWidth - 10) {
	//         setScrollDirection(-1);
	//       }
	//       // Si llega al inicio, cambiar dirección a derecha
	//       else if (scrollLeft <= 10) {
	//         setScrollDirection(1);
	//       }
	//     }

	//     frame = requestAnimationFrame(autoScroll);
	//   };

	//   frame = requestAnimationFrame(autoScroll);

	//   return () => cancelAnimationFrame(frame);
	// }, [isDragging, isHovered, scrollDirection]);
	// const loopedInstitutions = [
	//   ...institutions,
	//   ...institutions,
	//   ...institutions,
	// ];

	// Los datos ya vienen del API, no necesitamos filtrar por país para esta sección

	if (loading) return <InstitutionsSkeleton />;
	if (error) return <div className='text-center text-[#f5006d]'>Error: {error}</div>;

	return (
		<section className='relative bg-white h-fit rounded-[40px] overflow-visible max-w-[1600px] mx-auto md:px-[104px] z-10 pt-10 pb-6 md:gap-4 shadow-lg select-none mb-10'>
			<h2 className='text-center md:text-left font-raleway font-[500] md:text-[27px] text-[22px] px-5 mb-7'>
				{title || 'Instituciones que respaldan nuestras certificaciones'}
			</h2>
			{/*
      <div
        className={`overflow-x-auto scrollbar-hide w-full ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={(e) => {
          handleMouseLeave();
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex whitespace-nowrap">
          {loopedInstitutions.map((institution, idx) => (
            <div
              key={idx}
              className="bg-[#F7F9FF] rounded-[30px] px-9 py-6 flex justify-center items-center hover:scale-105 transition min-w-[180px] mx-2"
            >
              <div className="flex items-center justify-center w-32 h-20 bg-transparent">
                <Image
                  src={institution.image}
                  alt={institution.title}
                  width={100}
                  height={100}
                  className="object-contain mix-blend-multiply"
                  loading="lazy"
                  sizes="(max-width: 768px) 50px, 100px"
                />
              </div>
            </div>
          ))}
        </div>
      </div> */}
			<BrandSlider
				brands={institutions.map((inst) => ({
					imgDefault: inst.image,
					imgHover: inst.image,
					url: '#',
					width: 130,
				}))}
			/>
		</section>
	);
};

export default Institutions;
