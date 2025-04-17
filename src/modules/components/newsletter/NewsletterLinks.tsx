const NewsletterLinks = () => {
  return (
    <div className="w-full px-6 py-10 md:py-16 text-white font-inter translate-x-[-10px] ">
      <div className="w-full md:w-[1439px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-x-[150px] text-[14px] ">
        {/* Columna 1 */}
        <div className="max-w-[250px] md:translate-x-[-150px] ">
          <h4 className="text-[18px] font-bold mb-4 ">Cursos más elegidos</h4>
          <ul className="space-y-4  md:font-normal font-[8px] [&_a]:whitespace-nowrap opacity-80">
            <li><a href="#" className="hover:underline">Curso superior de medicina de urgencias</a></li>
            <li><a href="#" className="hover:underline">Curso superior de medicina familiar</a></li>
            <li><a href="#" className="hover:underline">Curso medicina estética facial</a></li>
            <li><a href="#" className="hover:underline">ACCSAP. Programa de Actualización en Cardiología <br /> Clínica</a></li>
            <li><a href="#" className="hover:underline">Curso superior de endocrinología y nutrición</a></li>
            <li><a href="#" className="hover:underline">Experto en diabetes</a></li>
          </ul>
        </div>

        {/* Columna 2 */}
        <div className="max-w-[250px]">
          <h4 className="text-[18px] font-bold mb-4">Cursos más buscados</h4>
          <ul className="space-y-4 font-normal [&_a]:whitespace-nowrap opacity-80">
            <li><a href="#" className="hover:underline">Curso medicina interna</a></li>
            <li><a href="#" className="hover:underline">Curso superior de hematología y hemoterapia</a></li>
            <li><a href="#" className="hover:underline">Curso superior de neurología</a></li>
            <li><a href="#" className="hover:underline">Auditoría médica</a></li>
            <li><a href="#" className="hover:underline">Curso superior de terapia intensiva</a></li>
            <li><a href="#" className="hover:underline">Curso superior de administración y gestión hospitalaria</a></li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div className="max-w-[250px] md:translate-x-[60px]">
          <h4 className="text-[18px] font-bold mb-4 ">Especialidades</h4>
          <ul className="space-y-4 font-normal [&_a]:whitespace-nowrap opacity-80">
            <li><a href="#" className="hover:underline">Medicina general</a></li>
            <li><a href="#" className="hover:underline">Medicina familiar</a></li>
            <li><a href="#" className="hover:underline">Cardiología</a></li>
            <li><a href="#" className="hover:underline">Nutrición</a></li>
            <li><a href="#" className="hover:underline">Traumatología</a></li>
            <li><a href="#" className="hover:underline">Pediatría</a></li>
          </ul>
        </div>

        {/* Columna 4 */}
        <div className="max-w-[250px]">
          <h4 className="text-[18px] font-bold mb-4">Contenidos destacados</h4>
          <ul className="space-y-4 font-normal [&_a]:whitespace-nowrap opacity-80">
            <li><a href="#" className="hover:underline">Qué es el SIBO y cómo tratarlo correctamente</a></li>
            <li><a href="#" className="hover:underline">Cómo identificar el autismo en adultos</a></li>
            <li><a href="#" className="hover:underline">Diagnóstico del shock en urgencias</a></li>
            <li><a href="#" className="hover:underline">Abordaje diagnóstico del dolor abdominal agudo</a></li>
            <li><a href="#" className="hover:underline">Dolor oncológico y fármaco genómica</a></li>
            <li><a href="#" className="hover:underline">3 novedades para mantener tus conocimientos <br />actualizados</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsletterLinks;
