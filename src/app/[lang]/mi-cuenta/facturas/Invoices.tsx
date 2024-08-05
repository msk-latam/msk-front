import React from 'react';
import ButtonPrimary from '@/components/Button/ButtonPrimary';

export interface Invoice {
  Fecha_Cobro: string;
  N_De_Factura: string;
  Monto: number;
  currency: string;
  Comprobante_Factura: string;
}

interface InvoicesProps {
  data: Invoice[];
}

const Invoices: React.FC<InvoicesProps> = ({ data }) => {
  function formatCurrency(
    currency: string | null | undefined,
    amount: number | null | undefined,
  ): string {
    if (!currency || amount == null) {
      return 'Sin Datos';
    }

    // Formatea el número
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Devuelve el formato deseado
    return formatter.format(amount);
  }

  function formatDate(dateString: string | null | undefined): string {
    if (!dateString) {
      return 'Sin Datos';
    }

    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  return (
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
              {data.map((invoice, index) => (
                <tr key={index}>
                  <td className='py-2 px-4 border-b text-left'>
                    {formatDate(invoice.Fecha_Cobro)}
                  </td>
                  <td className='py-2 px-4 border-b text-left'>
                    {/* {invoice.N_De_Factura} */} -
                  </td>
                  <td className='py-2 px-4 border-b text-left font-bold'>
                    {invoice.currency && invoice.Monto != null
                      ? `${invoice.currency} ${formatCurrency(
                          invoice.currency,
                          invoice.Monto,
                        )}`
                      : 'Sin Datos'}
                  </td>
                  <td className='py-2 px-4 border-b text-left'>
                    {invoice.Comprobante_Factura ? (
                      <ButtonPrimary
                        className='!h-8'
                        href={invoice.Comprobante_Factura}
                      >
                        Descargar Factura
                      </ButtonPrimary>
                    ) : (
                      <span className='font-bold'>Sin Factura</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='md:hidden'>
        {data.map((invoice, index) => (
          <div
            key={index}
            className='p-4 border-b bg-white rounded-lg shadow-md mb-4'
          >
            <div className='flex justify-between'>
              <div className='w-1/2'>
                <span className='block font-medium text-[#6474A6] text-left'>
                  Fecha
                </span>
                <span className='block text-left'>
                  {formatDate(invoice.Fecha_Cobro)}
                </span>
              </div>
              <div className='w-1/2 text-right'>
                <span className='block font-medium text-[#6474A6]'>
                  Nº de Factura
                </span>
                <span className='block'>{/* {invoice.N_De_Factura} */} -</span>
              </div>
            </div>
            <div className='mt-2'>
              <span className='block font-medium text-[#6474A6] text-left'>
                Monto
              </span>
              <span className='font-bold block text-left'>
                {invoice.currency}{' '}
                {formatCurrency(invoice.currency, invoice.Monto)}
              </span>
            </div>
            <div className='mt-2'>
              <ButtonPrimary
                className='!h-8 w-full'
                href={invoice.Comprobante_Factura}
              >
                Descargar Factura
              </ButtonPrimary>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Invoices;
