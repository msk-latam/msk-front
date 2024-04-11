import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import currencyMapping from "@/data/jsons/__countryCurrencies.json";
import installmentsMapping from "@/data/jsons/__countryInstallments.json";
import { JsonInstallmentsMapping, JsonMapping } from "@/data/types";
import TextSkeleton from "../Skeleton/TextSkeleton";
import { formatAmount } from "@/utils/formatAmount";


interface TrialInfoProps {
  country: string;
  product: any;
  mountedInputState: { 
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
  };
}

const currencyJSON: JsonMapping = currencyMapping;
const installmentsJSON: JsonInstallmentsMapping = installmentsMapping;

const TrialInfo: FC<TrialInfoProps> = ({ country, product, mountedInputState }) => {
  const currency = currencyJSON[country];
  let installments = 0 as number | null;
  if (installmentsJSON && country && installmentsJSON[country]) {
      installments = installmentsJSON[country].quotes;
  }
  const [totalAmount, setTotalAmount] = useState(0)
  const [installmentAmount, setInstallmentAmount] = useState(0)
  const {state: mountedInput } = mountedInputState

  useEffect(() => {
    if(typeof product !== 'undefined' && installments != null){
      let totalAmount = parseFloat(product.total_price.replace(/\./g, "").replace(",", ".").replaceAll(".",""));
      setTotalAmount(totalAmount)
      setInstallmentAmount(totalAmount / installments)
  
      product.totalAmount = totalAmount 
      product.installmentAmount = installmentAmount
    }
    
  }, [product])

  const [forcedRoundedPrice, cents] = installmentAmount.toFixed(2).split(".")

  return (
    <section className="bg-white rounded-lg drop-shadow-2xl shadow-gray-100 mb-8 text-violet-strong">
      <div className="px-6 pt-6">
        <h2 className="text-3xl font-bold mb-3">
          Finaliza tu inscripción de prueba 
        </h2>
        <p className="mb-3 text-violet-wash">
          ¡Prepárate para la experiencia MSK! Con tu <strong>prueba de 7 días gratis</strong> podrás disfrutar de los contenidos principales del curso elegido. Accederás a ellos dentro de tu perfil personal, donde también podrás cancelar el período de prueba sin costo. 
        </p>
        <p className="text-violet-wash">A partir del octavo día, se confirmará tu inscripción al curso completo.</p>

        <div className="my-5 border p-3 rounded-lg max-w-[350px]">
          <p className="text-violet-strong">¡Ahora!</p>
          <h4 className="text-2xl mb-3 font-bold !font-inter">Prueba gratuita de 7 días</h4>
          <span className="text-violet-wash">
            Luego, {installments} pagos de{" "}
            {!mountedInput ? <TextSkeleton /> : <strong>{formatAmount(Number(forcedRoundedPrice), currency)}</strong>}
          </span>
        {country === 'ec' && 
          <span className="text-violet-wash block">+ impuestos aplicables</span>
        }
        </div>
      </div>

      <div className="border-t border-dashed border-[#e4e4e4] my-4"></div>

      <div className="flex flex-col xl:flex-row justify-between px-6 pb-6">
        <div className="mb-3 xl:mb-0">
          <p className="text-violet-wash">
            Detalle de tu inscripción al finalizar el período de prueba 
          </p>
          {!mountedInput ? <TextSkeleton /> : <span className="text-violet-strong">
            x1{" "}
            <span className="font-bold text-violet-strong">
              {product?.title}
            </span>
          </span>}
        </div>
        
      </div>
    </section>
  );
};

export default TrialInfo;
