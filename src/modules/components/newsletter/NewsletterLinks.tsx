"use client";

import { usePathname } from "next/navigation";
import useFooter from '@/hooks/useFooter';
import { urlFormat } from '@/utils/urlFormat';
const NewsletterLinks = () => {
  const pathname = usePathname();
  let lang = pathname.split('/')[1] || 'int'; // Detectar idioma
  if(lang.length>2){
    lang = "int";
  }
  if(lang.length==0){
    lang = "int";
  }
  const isDemoMode = true; // ⚡ Habilitar .tech en modo demo
  const { data } = useFooter(lang);

  // Función para construir el dominio correcto
  const buildDomain = () => (isDemoMode ? "https://msklatam.tech" : "https://msklatam.com");
  const replaceUrl = (url:string) => (url.replace('https://msklatam.com',`${buildDomain()}/${lang}}`));
  // Función para construir la URL final agregando idioma
  const buildCourseLink = (path: string) => `${buildDomain()}/${lang}${path}`;

  return (
    <div className="w-full overflow-visible max-w-[1600px] mx-auto md:px-4 py-10 px-5 md:px-0 md:py-16 text-white font-inter translate-x-[-10px] ">
      <div className="w-full overflow-visible max-w-[1600px] mx-auto md:px-4 grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-x-6 text-[14px] ">

        {/* Columna 1 */}
        <div className="max-w-[250px]">
          <h4 className="text-[18px] font-bold mb-4">Cursos más elegidos</h4>
          <ul className="space-y-4 md:font-normal font-[8px] md:whitespace-nowrap opacity-80">
            {
              data?.sections?.cursos_mas_elegidos.map((s)=>{
                  return <li><a href={urlFormat(s.url)} className="hover:underline">{s.title}</a></li>
            })
          }
          </ul>
          {/* <ul className="space-y-4 md:font-normal font-[8px] md:whitespace-nowrap opacity-80">
            <li><a href={buildCourseLink("/tienda/medicina-de-urgencias/")} className="hover:underline">Curso superior de medicina de urgencias</a></li>
            <li><a href={buildCourseLink("/tienda/medicina-familiar-y-comunitaria/")} className="hover:underline">Curso superior de medicina familiar</a></li>
            <li><a href={buildCourseLink("/tienda/medicina-estetica-facial/")} className="hover:underline">Curso medicina estética facial</a></li>
            <li><a href={buildCourseLink("/tienda/accsap/")} className="hover:underline">ACCSAP. Programa de Actualización en <span className="hidden md:block"><br /></span>Cardiología Clínica</a></li>
            <li><a href={buildCourseLink("/tienda/endocrinologia-y-nutricion/")} className="hover:underline">Curso superior de endocrinología y nutrición</a></li>
            <li><a href={buildCourseLink("/tienda/experto-en-diabetes/")} className="hover:underline">Experto en diabetes</a></li>
          </ul> */}
        </div>

        {/* Columna 2 */}
        <div className="max-w-[250px]">
          <h4 className="text-[18px] font-bold mb-4">Cursos más buscados</h4>
          <ul className="space-y-4 font-normal md:whitespace-nowrap opacity-80">
          {
              data?.sections?.cursos_mas_buscados.map((s)=>{
                  return <li><a href={urlFormat(s.url)} className="hover:underline">{s.title}</a></li>
            })
          }
            {/*             
            <li><a href={buildCourseLink("/tienda/medicina-interna/")} className="hover:underline">Curso medicina interna</a></li>
            <li><a href={buildCourseLink("/tienda/hematologia-y-hemoterapia/")} className="hover:underline">Curso superior de hematología y hemoterapia</a></li>
            <li><a href={buildCourseLink("/tienda/neurologia/")} className="hover:underline">Curso superior de neurología</a></li>
            <li><a href={buildCourseLink("/tienda/auditoria-medica/")} className="hover:underline">Auditoría médica</a></li>
            <li><a href={buildCourseLink("/tienda/terapia-intensiva/")} className="hover:underline">Curso superior de terapia intensiva</a></li>
            <li><a href={buildCourseLink("/tienda/administracion-y-gestion-hospitalaria/")} className="hover:underline">Curso superior de administración y gestión hospitalaria</a></li> */}
          </ul>
        </div>

        {/* Columna 3 */}
        <div className="max-w-[250px] md:translate-x-[60px]">
          <h4 className="text-[18px] font-bold mb-4">Especialidades</h4>
          <ul className="space-y-4 font-normal md:whitespace-nowrap opacity-80">
            {/* Todo va a la tienda. No hay redireccion de especialidad */}
            <li><a href={urlFormat("/tienda/?especialidades=medicina-general")} className="hover:underline">Medicina general</a></li>
            <li><a href={urlFormat("/tienda/?especialidades=medicina-familiar")} className="hover:underline">Medicina familiar</a></li>
            <li><a href={urlFormat("/tienda/?especialidades=cardiologia")} className="hover:underline">Cardiología</a></li>
            <li><a href={urlFormat("/tienda/?especialidades=traumatologia")} className="hover:underline">Traumatología</a></li>
            <li><a href={urlFormat("/tienda/?especialidades=pediatria")} className="hover:underline">Pediatría</a></li>
          </ul>
        </div>

        {/* Columna 4 */}
        <div className="max-w-[250px]">
          <h4 className="text-[18px] font-bold mb-4">Contenidos destacados</h4>
          <ul className="space-y-4 font-normal md:whitespace-nowrap opacity-80">
          {
              data?.sections?.contenidos_destacados.map((s)=>{
                  return <li><a href={urlFormat(s.url)} className="hover:underline">{s.title}</a></li>
            })
          }
            {/* <li><a href={buildCourseLink("/tienda/que-es-el-sibo-y-por-que-se-requiere-cautela-al-tratarlo/")} className="hover:underline">Qué es el SIBO y cómo tratarlo correctamente</a></li>
            <li><a href={buildCourseLink("/tienda/como-identificar-autismo-en-adultos/")} className="hover:underline">Cómo identificar el autismo en adultos</a></li>
            <li><a href={buildCourseLink("/tienda/diagnostico-del-shock-en-urgencias/")} className="hover:underline">Diagnóstico del shock en urgencias</a></li>
            <li><a href={buildCourseLink("/tienda/abordaje-diagnostico-del-dolor-abdominal-agudo/")} className="hover:underline">Abordaje diagnóstico del dolor abdominal agudo</a></li>
            <li><a href="https://youtu.be/iWecSpkw8Eo?si=Dk3dmUrcjf4H9RTT" className="hover:underline">Dolor oncológico y fármaco genómica</a></li>
            <li><a href="https://youtu.be/rYNsJbntGSw?si=T_dNhjTHU9xrM2V1" className="hover:underline">3 novedades para mantener tus conocimientos <br />actualizados</a></li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsletterLinks;
