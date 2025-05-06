'use client';
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';

interface CourseSummaryProps {
  slug: string;
  lang: string;
}

export default function Inscription({ slug, lang }: CourseSummaryProps) {
  const router = useRouter();

  const getLocale = (lang: string) => {
    const localeMap: Record<string, string> = {
      ar: "es-AR",
      bo: "es-BO",
      cl: "es-CL",
      co: "es-CO",
      cr: "es-CR",
      ec: "es-EC",
      sv: "es-SV",
      gt: "es-GT",
      hn: "es-HN",
      mx: "es-MX",
      pa: "es-PA",
      py: "es-PY",
      pe: "es-PE",
      es: "es-ES",
      uy: "es-UY",
      ve: "es-VE",
      ni: "es-NI",
    };
    return localeMap[lang] || "en-US";
  };
	return (
		<div className='w-full px-4 md:px-12 flex flex-col items-center z-10 justify-center bg-black text-white'>
			<div className='bg-white text-black w-full -mt-8 md:-mt-14 px-6 py-9 md:py-14 md:px-16 rounded-[38px] z-[9] flex flex-col md:flex-row justify-between gap-4 md:gap-8 overflow-visible max-w-[1400px] mx-auto items-center'>
				{/* Texto principal */}
				<div className='flex flex-col items-center md:items-start gap-2 md:gap-3 flex-wrap text-center md:text-left'>
					<h2 className='text-[24px] font-raleway md:text-[32px] font-medium'>
						¿Qué esperas para{' '}
						<span className='bg-[#F6C5FF] px-2 py-1 rounded-full font-bold'>potenciar</span> tu carrera?
					</h2> 
					<p className='text-base md:text-[20px] font-raleway font-medium text-[#1A1A1A]'>
						Forma parte de una red que te inspira a crecer.
					</p>
				</div>

				{/* Botón CTA */}

        <Link href={getLocalizedUrl(lang, lang=="es"?"#course-support-form":`/checkout/${slug}`)}  				
					className='mt-4 md:w-auto w-full justify-center font-inter text-base whitespace-nowrap md:mt-0 bg-[#9200ad] hover:bg-[#7A008E] text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors'
					onClick={() => router.push(`${lang}/checkout/${slug}`)}>
					{lang=="es"?"Contáctanos":"Inscríbete ahora"}
					<FaArrowRight className="text-white" />
				</Link>
			</div>
		</div>
	);
};


