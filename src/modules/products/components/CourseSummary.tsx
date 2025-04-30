'use client';

import Image from 'next/image';
import { useCourseSummary } from '../hooks/useCourseSummary';
import { Phone } from 'lucide-react';
import SkeletonCourseSummaryCard from '../skeletons/SkeletonCourseSummaryCard';
import { usePathname } from 'next/navigation';
import { getCountryFromUrl } from '@/utils/getCountryFromUrl';
import countryCurrencies from '@/data/_countryCurrencies.json';
import countryInstallments from '@/data/_countryInstallments.json';
import { useContext } from 'react';
import { CountryContext } from '@/context/country/CountryContext';

interface CourseSummaryProps {
  slug: string;
}

export default function CourseSummary({ slug }: CourseSummaryProps) {
  const pathname = usePathname();
  const country = getCountryFromUrl(pathname);
  const { countryState } = useContext(CountryContext);
 

  

  const currency = (countryCurrencies as Record<string, string>)[country] || 'ARS';
  const installmentsConfig = (countryInstallments as unknown as Record<string, { quotes: number }>)[country];

  const { data, loading } = useCourseSummary(slug);

  const enrolledFormatted = data?.enrolled?.toLocaleString() || '0';
  const modules = data?.modules || 0;
  const duration = data?.duration ? `${data.duration} horas estimadas` : '0 horas estimadas';
  const certification = data?.certification;
  const max_installments = data?.max_installments || installmentsConfig?.quotes || 1;

  const totalPrice = Number(data?.total_price || 0);
  const priceInstallments = Number(data?.price_installments || totalPrice / max_installments);

  const formatter = new Intl.NumberFormat('es', {
    style: 'currency',
    currency,
  });

  const price = formatter.format(priceInstallments);
  const total_price = formatter.format(totalPrice);
  const cedente = data?.cedente;

  if (loading) return <SkeletonCourseSummaryCard />;

  return (
    <div className="bg-white rounded-[38px] p-6 md:p-8 sticky top-10 w-full">
      <Image
        src={data?.featured_images.medium || '/images/fallback.jpg'}
        alt="Curso"
        className="rounded-xl w-full object-cover mb-6"
        width={420}
        height={300}
      />

      <p className="text-[#1A1A1A] text-[20px] font-inter font-medium">Total: {total_price}</p>
      <p className="text-[#4F5D89] font-inter font-medium text-base">{max_installments} pagos de:</p>
      <p className="text-2xl font-bold text-[#1A1A1A] mb-4">{price}</p>

      <ul className="text-sm text-[#4F5D89] font-inter font-medium space-y-3 mb-6">
        <li className="flex items-center gap-2">
          <img src="/icons/course/summary/world.svg" alt="" className="w-4 h-4" />
          Modalidad 100% a distancia
        </li>
        <li className="flex items-center gap-2">
          <img src="/icons/course/summary/modules.svg" alt="" className="w-4 h-4" />
          {modules} módulos actualizados
        </li>
        <li className="flex items-center gap-2">
          <img src="/icons/course/summary/hourglass.svg" alt="" className="w-4 h-4" />
          {duration}
        </li>
        <li className="flex items-center gap-2">
          <img src="/icons/course/summary/person.svg" alt="" className="w-4 h-4" />
          {enrolledFormatted} profesionales inscriptos
        </li>
        <li className="flex items-center gap-2">
          <img src="/icons/course/summary/download.svg" alt="" className="w-4 h-4" />
          {certification ? 'Incluye material descargable' : 'Sin material adicional'}
        </li>
      </ul>

      {cedente && (
        <>
          <p className="text-xs text-[#4F5D89] font-inter font-medium mb-2">
            Cedente<br />
            <strong className="text-[#4F5D89] font-inter font-medium">{cedente.name}</strong>
          </p>
          <div className="flex flex-col items-center justify-center mb-6 bg-[#F7F9FF] rounded-[30px] p-4 relative">
            <Image
              src={cedente.image || '/images/fallback.jpg'}
              alt="Institución"
              width={200}
              height={80}
              className="object-contain mix-blend-multiply max-h-[80px]"
            />
          </div>
        </>
      )}

      <div className="space-y-3">
        <button className="bg-[#9200AD] hover:bg-[#6b1679] text-white w-full py-3 rounded-full font-inter font-medium text-base transition">
          Inscríbete ahora
        </button>

        <button className="w-full border border-gray-300 text-[#1A1A1A] hover:bg-gray-100 flex items-center justify-center py-3 rounded-full font-inter font-bold text-base gap-2 transition">
          Contáctanos
          <Phone size={16} />
        </button>
      </div>
    </div>
  );
}
