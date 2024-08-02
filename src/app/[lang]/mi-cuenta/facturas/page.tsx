'use client';

import { CountryContext } from '@/context/country/CountryContext';
import { AuthContext } from '@/context/user/AuthContext';
import { User, UserCourseProgress } from '@/data/types';
import ssr from '@/services/ssr';
import { getUserCourses } from '@/services/user';
import { FC, useContext, useEffect, useState } from 'react';
import data from '@/data/jsons/__countryCurrencies.json';
import ButtonPrimary from '@/components/Button/ButtonPrimary';

const pageFacturas: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState<User>({} as User);
  const { countryState: countryState } = useContext(CountryContext);

  const [courses, setCourses] = useState<UserCourseProgress[]>([]);
  const [isLoading, setLoading] = useState(true);

  const getCurrency = (countryCode: string) => {
    return data[countryCode] || 'USD';
  };
  const currency = getCurrency(countryState.country);

  const fetchUser = async () => {
    setLoading(true);
    const res = await ssr.getUserData();
    const coursesList = await ssr.getAllCourses(countryState.country);
    if (!res.message) {
      if (!res.contact.state) res.contact.state = '';
      setUser(res);
      dispatch({
        type: 'FRESH',
        payload: {
          user: { name: res.name, speciality: res.contact.speciality },
        },
      });
      let userCoursesList = getUserCourses(res, coursesList);
      setCourses(userCoursesList);
      setLoading(false);
    } else {
      // history.push("/iniciar-sesion");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [state?.profile]);

  const dummyData: any = [
    {
      date: '2023-07-01',
      invoiceNumber: 'INV-001',
      amount: '$100.00',
      downloadLink: '#',
    },
    {
      date: '2023-07-15',
      invoiceNumber: 'INV-002',
      amount: '$200.00',
      downloadLink: '#',
    },
    {
      date: '2023-08-01',
      invoiceNumber: 'INV-003',
      amount: '$150.00',
      downloadLink: '#',
    },
    {
      date: '2023-08-15',
      invoiceNumber: 'INV-004',
      amount: '$250.00',
      downloadLink: '#',
    },
  ];

  return (
    <>
      <div>
        {isLoading ? (
          <div className='border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center h-full min-h-[50vh]'>
            <p
              className='font-raleway text-[#6474A6] text-center w-[85%] mb-2'
              style={{ fontSize: 24, fontWeight: 100 }}
            >
              Cargando Facturas...
            </p>
          </div>
        ) : (
          <div className=''>
            {dummyData.length === 0 ? (
              <div className='border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center h-full min-h-[50vh]'>
                <p
                  className='font-raleway text-[#6474A6] text-center w-[85%] mb-2'
                  style={{ fontSize: 24, fontWeight: 100 }}
                >
                  Aún puedes descubrir mucho más en Medical & Scientific
                  Knowledge
                </p>
                <ButtonPrimary href='/tienda/?profesion=medicos&recurso=curso'>
                  Comienza un Curso
                </ButtonPrimary>
              </div>
            ) : (
              <>
                <div className='overflow-x-auto rounded-xl bg-white border'>
                  <div className='hidden md:block'>
                    <table className='min-w-full bg-white border border-gray-200'>
                      <thead className='bg-gray-100'>
                        <tr>
                          <th className='py-2 px-4 border-b text-[#6474A6] font-medium text-left'>
                            Fecha
                          </th>
                          <th className='py-2 px-4 border-b text-[#6474A6] font-medium text-left'>
                            Nº de Factura
                          </th>
                          <th className='py-2 px-4 border-b text-[#6474A6] font-medium text-left'>
                            Monto
                          </th>
                          <th className='py-2 px-4 border-b text-[#6474A6]'></th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyData.map((data: any, index: number) => (
                          <tr key={index}>
                            <td className='py-2 px-4 border-b text-left'>
                              {data.date}
                            </td>
                            <td className='py-2 px-4 border-b text-left'>
                              {data.invoiceNumber}
                            </td>
                            <td className='py-2 px-4 border-b text-left font-bold'>
                              {currency} {data.amount}
                            </td>
                            <td className='py-2 px-4 border-b text-left'>
                              <ButtonPrimary className='!h-8'>
                                Descargar Factura
                              </ButtonPrimary>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='md:hidden'>
                  {dummyData.map((data: any, index: number) => (
                    <div
                      key={index}
                      className='p-4 border-b bg-white rounded-lg shadow-md mb-4'
                    >
                      <div className='flex justify-between'>
                        <div className='w-1/2'>
                          <span className='block font-medium text-[#6474A6] text-left'>
                            Fecha
                          </span>
                          <span className='block text-left'>{data.date}</span>
                        </div>
                        <div className='w-1/2 text-right'>
                          <span className='block font-medium text-[#6474A6]'>
                            Nº de Factura
                          </span>
                          <span className='block'>{data.invoiceNumber}</span>
                        </div>
                      </div>
                      <div className='mt-2'>
                        <span className='block font-medium text-[#6474A6] text-left'>
                          Monto
                        </span>
                        <span className='font-bold block text-left'>
                          {currency} {data.amount}
                        </span>
                      </div>
                      <div className='mt-2'>
                        <ButtonPrimary className='!h-8 w-full'>
                          Descargar Factura
                        </ButtonPrimary>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default pageFacturas;
