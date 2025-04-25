import { getMPPublicKeyFromCountry } from '@/logic/MercadoPago';
import { useState, useEffect, useRef } from 'react';

export function useMercadoPagoInstance(
  product: any,
  country: string,
  paymentMethodId?: string,
) {
  const [issuer, setIssuer] = useState<string | null>(null);
  const mpInstance = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Si la instancia de MercadoPago no ha sido creada, la creamos
      const mpKey = getMPPublicKeyFromCountry(country);
      console.log({ mpKey });
      if (!mpInstance.current) {
        mpInstance.current = new window.MercadoPago(mpKey);
        console.log({ mpInstance });
      }

      const mp = mpInstance.current;

      // Obtener emisores (si es necesario)
      if (paymentMethodId) {
        mp.getIssuers(paymentMethodId).then((response: any) => {
          setIssuer(response[0].id); // Asume el primer emisor para simplicidad
        });
      }
    }
  }, [country, product]);

  return {
    issuer,
    mpInstance: mpInstance.current,
  };
}

export default useMercadoPagoInstance;
