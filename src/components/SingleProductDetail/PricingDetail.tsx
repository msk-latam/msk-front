import { FC, useContext } from 'react'
import { JsonInstallmentsMapping, JsonMapping } from '@/data/types';
import currencyMapping from "@/data/jsons/__countryCurrencies.json"
import installmentsMapping from "@/data/jsons/__countryInstallments.json"
import { CountryContext } from "@/context/country/CountryContext";
import { formatAmount } from "@/utils/formatAmount";

interface PricingDetailProps {
    isEbook: boolean | undefined;
    product: any;
}

const PricingDetail: FC<PricingDetailProps> = ({ isEbook, product }) => {

    if (isEbook) return null

    // @ts-ignore
    const {state:countryState} = useContext(CountryContext);
    const currencyJSON: JsonMapping = currencyMapping;
    const installmentsJSON: JsonInstallmentsMapping = installmentsMapping;
    const installments = installmentsJSON[countryState.country].quotes;

    if(installments != null){
        const currency = currencyJSON[countryState.country];
        const isSale = product.sale_price !== '0';

        const totalProductPrice = isSale ? Number(product.regular_price.replaceAll(".", "")) : Number(product.total_price.replaceAll(".", ""));
        const [installmentProductPrice, cents] = isSale ? (Number(product.total_price.replaceAll(".", "")) / installments).toFixed(2).split(".") : (totalProductPrice / installments).toFixed(2).split(".")

        return (
            <div className="mb-2">
                <div className={`text-sm font-normal text-violet-strong`}>Total: <strong className={`font-bold ${isSale && 'line-through'}`}>{formatAmount(totalProductPrice, currency)}</strong></div>
                {isSale && <p className="text-red-post font-bold mb-3">Ahora {formatAmount(Number(product.total_price.replaceAll(".", "")), currency)}</p>}
                <div className="text-sm font-normal mb-2 text-violet-strong">{installments} pagos de:</div>
                <span className="text-[32px] font-bold text-violet-dark">{formatAmount(Number(installmentProductPrice), currency)}</span>
            </div>
        )
    }


}

export default PricingDetail