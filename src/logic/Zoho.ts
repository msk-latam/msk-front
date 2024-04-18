import { Dispatch, SetStateAction } from "react";
import installmentsMapping from '@/data/jsons/__countryInstallments.json'
import currencyMapping from "@/data/jsons/__countryCurrencies.json";
import { JsonInstallmentsMapping, RebillTransaction } from "@/data/types";
import { countries } from "@/data/countries";
import api from "@Services/api";

interface RebillCheckoutPayment{
  invoice: RebillTransaction | null,
  pendingTransaction: RebillTransaction | null,
  failedTransaction: RebillTransaction | null
}

export const sendToZoho = async (
  response: RebillCheckoutPayment,
  user: any,
  country: string,
  product:any, 
  setShow: Dispatch<SetStateAction<boolean>>, 
  setPaymentCorrect: Dispatch<SetStateAction<boolean|null>>,
  setFaliedMessage: Dispatch<SetStateAction<string>>
  ) => {
  const installmentsJSON: JsonInstallmentsMapping = installmentsMapping;
  const currencyJSON: any = currencyMapping;
  
  console.log({response,user,country,product})
   const { invoice, failedTransaction, pendingTransaction } = response;

  if (failedTransaction != null) {
    const { payment } = failedTransaction.paidBags[0];
    const { errorMessage } = payment;
    setFaliedMessage(errorMessage)
    setPaymentCorrect(false)
    setShow(true)
    return;
  }

  if(invoice != null){
    const { paidBags, buyer } = invoice;
    const { payment, schedules } = paidBags[0];
    const { customer } = buyer;
    const [subscriptionId] = schedules;
    const [countrie] = countries.filter(c => c.id === country)
    
    const installmentAmount = parseFloat(product.total_price.replace(/\./g, "").replace(",", ".").replaceAll(".",""));
    
    const [amount, cents] = (installmentAmount / installmentsJSON[country]?.quotes).toFixed(2).split(".")
    const discountPrice = (Number(cents) / 100) * installmentsJSON[country]?.quotes;
   
    const contractData = {
      contactEntityId: user.id,
      email: user.Usuario,
      subId: subscriptionId,
      paymentId: payment.id,
      currency: currencyJSON[country],
      country: countrie.name,
      installments: installmentsJSON[country],
      installmentAmount: Number(amount),
      discount: discountPrice.toFixed(2),
      product
    };

   /* const currentProduct = product.slug === window.location.href.split("/").pop()

    if(currentProduct){*/
     await api.createContactTrialZoho(contractData, country); 
   /* }*/

    setPaymentCorrect(true)
    setShow(true)
  }
};
