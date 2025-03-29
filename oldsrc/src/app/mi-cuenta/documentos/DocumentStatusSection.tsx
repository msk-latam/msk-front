import ButtonPrimary from '@/components/Button/ButtonPrimary';
import StatusCard, { StatusCardProps } from './StatusCard';
import DNIIcon from '@/public/images/icons/DNI.svg';
import BirreteIcon from '@/public/images/icons/birrete.svg';
import AnaliticoIcon from '@/public/images/icons/analitico.svg';
import MatriculaIcon from '@/public/images/icons/matricula.svg';
import CertificadoIcon from '@/public/images/icons/certificado.svg';
import Image from 'next/image';
import { FC } from 'react';

const statusData: StatusCardProps[] = [
  {
    text: 'Frente de tu DNI u otro documento de identidad',
    icon: <Image src={DNIIcon} alt='DNI Icon' width={24} height={24} />,
    status: 'error',
  },
  {
    text: 'Dorso de tu DNI u otro documento de identidad',
    icon: <Image src={DNIIcon} alt='DNI Icon' width={24} height={24} />,
    status: 'correct',
  },
  {
    text: 'Frente de tu título universitario',
    icon: <Image src={BirreteIcon} alt='Hat Icon' width={24} height={24} />,
    status: 'pending',
  },
  {
    text: 'Dorso de tu título universitario',
    icon: <Image src={BirreteIcon} alt='Hat Icon' width={24} height={24} />,
    status: 'pending',
  },
  {
    text: 'Analítico del curso',
    icon: <Image src={AnaliticoIcon} alt='DNI Icon' width={24} height={24} />,
    status: 'pending',
  },
  {
    text: 'Matrícula profesional',
    icon: <Image src={MatriculaIcon} alt='DNI Icon' width={22} height={22} />,
    status: 'pending',
  },
  {
    text: 'Certificado de ética vigente',
    icon: <Image src={CertificadoIcon} alt='DNI Icon' width={24} height={24} />,
    status: 'pending',
  },
];

const DocumentStatusSection: FC = () => {
  const approvedDocs = statusData.filter(item => item.status === 'correct');
  const pendingDocs = statusData.filter(item => item.status === 'pending');
  const errorDocs = statusData.filter(item => item.status === 'error');

  return (
    <div>
      {approvedDocs.length > 0 && (
        <div className='mb-6'>
          <h2 className='text-lg mb-4'>Documentación Aprobada</h2>
          <div className='space-y-4'>
            {approvedDocs.map((item, index) => (
              <StatusCard
                key={index}
                text={item.text}
                icon={item.icon}
                status={item.status}
              />
            ))}
          </div>
        </div>
      )}

      {pendingDocs.length > 0 && (
        <div>
          <h2 className='text-lg mb-4'>Documentación Pendiente</h2>
          <div className='space-y-4'>
            {pendingDocs.map((item, index) => (
              <StatusCard
                key={index}
                text={item.text}
                icon={item.icon}
                status={item.status}
              />
            ))}
          </div>
        </div>
      )}
      {errorDocs.length > 0 && (
        <div>
          <h2 className='text-lg my-4'>Documentación Rechazada</h2>
          <div className='space-y-4'>
            {errorDocs.map((item, index) => (
              <StatusCard
                key={index}
                text={item.text}
                icon={item.icon}
                status={item.status}
              />
            ))}
          </div>
        </div>
      )}
      <div className='flex lg:justify-end mt-8 md:justify-center md:w-full'>
        <div className='w-full md:w-auto'>
          <ButtonPrimary className='w-full md:w-auto'>
            Completar Documentación
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default DocumentStatusSection;
