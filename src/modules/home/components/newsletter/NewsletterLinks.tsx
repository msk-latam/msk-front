const NewsletterLinks = () => {
  return (
    <div className="w-full max-w-screen-2xl px-6 md:px-10 mt-16 text-white  md:h-[400px] h-[1200px]">
      <div className="flex flex-col md:flex-row justify-between gap-y-10 md:gap-x-28 text-[14px]">
        {/* Columna 1 */}
        <div className="flex-1 min-w-[300px]">
          <h4 className="text-[18px] font-bold mb-4">Cursos más elegidos</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:underline">Curso superior de medicina de urgencias</a></li>
            <li><a href="#" className="hover:underline">Curso superior de medicina familiar</a></li>
            <li><a href="#" className="hover:underline">Curso medicina estética facial</a></li>
            <li><a href="#" className="hover:underline">ACCSAP. Programa de Actualización en Cardiología Clínica</a></li>
            <li><a href="#" className="hover:underline">Curso superior de endocrinología y nutrición</a></li>
            <li><a href="#" className="hover:underline">Experto en diabetes</a></li>
          </ul>
        </div>

        {/* Columna 2 */}
        <div className="flex-1 min-w-[300px]">
          <h4 className="text-[18px] font-bold mb-4">Cursos más buscados</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:underline">Curso medicina interna</a></li>
            <li><a href="#" className="hover:underline">Curso superior de hematología y hemoterapia</a></li>
            <li><a href="#" className="hover:underline">Curso superior de neurología</a></li>
            <li><a href="#" className="hover:underline">Auditoría médica</a></li>
            <li><a href="#" className="hover:underline">Curso superior de terapia intensiva</a></li>
            <li><a href="#" className="hover:underline">Curso superior de administración y gestión hospitalaria</a></li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div className="flex-1 min-w-[300px]">
          <h4 className="text-[18px] font-bold mb-4">Especialidades</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:underline">Medicina general</a></li>
            <li><a href="#" className="hover:underline">Medicina familiar</a></li>
            <li><a href="#" className="hover:underline">Cardiología</a></li>
            <li><a href="#" className="hover:underline">Nutrición</a></li>
            <li><a href="#" className="hover:underline">Traumatología</a></li>
            <li><a href="#" className="hover:underline">Pediatría</a></li>
          </ul>
        </div>

        {/* Columna 4 */}
        <div className="flex-1 min-w-[300px]">
          <h4 className="text-[18px] font-bold mb-4">Contenidos destacados</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:underline">Qué es el SIBO y cómo tratarlo correctamente</a></li>
            <li><a href="#" className="hover:underline">Cómo identificar el autismo en adultos</a></li>
            <li><a href="#" className="hover:underline">Diagnóstico del shock en urgencias</a></li>
            <li><a href="#" className="hover:underline">Abordaje diagnóstico del dolor abdominal agudo</a></li>
            <li><a href="#" className="hover:underline">Dolor oncológico y fármaco genómica</a></li>
            <li><a href="#" className="hover:underline">3 novedades para mantener tus conocimientos actualizados</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsletterLinks;
