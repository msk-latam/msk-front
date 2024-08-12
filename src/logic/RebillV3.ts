import { sendToZoho } from './Zoho';
import { ContactCRM, JsonMapping } from '@/data/types';
import { Dispatch, SetStateAction } from 'react';
import rebillCountryPriceMapping from '@/data/jsons/__rebillCurrencyPrices.json';
import { getEnv } from '@/utils/getEnv';
import ssr from '@/services/ssr';
import translateDocumentType from '@/utils/translateDocumentType';
import { IS_PROD } from '@/contains/constants';
import {
  NEXT_PUBLIC_REBILL_API_KEY_PRD,
  NEXT_PUBLIC_REBILL_API_KEY_TEST,
  NEXT_PUBLIC_REBILL_CL_API_KEY_PRD,
  NEXT_PUBLIC_REBILL_CL_ORG_ID_PRD,
  NEXT_PUBLIC_REBILL_COP_API_KEY_PRD,
  NEXT_PUBLIC_REBILL_COP_ORG_ID_PRD,
  NEXT_PUBLIC_REBILL_ORG_ID_PRD,
  NEXT_PUBLIC_REBILL_ORG_ID_TEST,
  NEXT_PUBLIC_REBILL_URL,
  NEXT_PUBLIC_REBILL_UY_API_KEY_PRD,
  NEXT_PUBLIC_REBILL_UY_ORG_ID_PRD,
  NEXT_PUBLIC_REBILL_REBILL_CL_FREEMIUM_PRD,
  NEXT_PUBLIC_REBILL_REBILL_UY_FREEMIUM_PRD,
  NEXT_PUBLIC_REBILL_REBILL_CO_FREEMIUM_PRD,
  NEXT_PUBLIC_REBILL_REBILL_CL_FREEMIUM_TEST,
  NEXT_PUBLIC_REBILL_REBILL_UY_FREEMIUM_TEST,
  NEXT_PUBLIC_REBILL_REBILL_CO_FREEMIUM_TEST,
  NEXT_PUBLIC_REBILL_MP_AR_FREEMIUM_TEST,
  //DEPRECATE REBILL PRICES
  NEXT_PUBLIC_REBILL_MP_AR_FREEMIUM_PRD,
  NEXT_PUBLIC_REBILL_STRIPE_BO_FREEMIUM_PRD,
  NEXT_PUBLIC_REBILL_STRIPE_PY_FREEMIUM_PRD,
  NEXT_PUBLIC_REBILL_STRIPE_PE_FREEMIUM_PRD,
  NEXT_PUBLIC_REBILL_STRIPE_CR_FREEMIUM_PRD,
  NEXT_PUBLIC_REBILL_STRIPE_HN_FREEMIUM_PRD,
  NEXT_PUBLIC_REBILL_STRIPE_USD_FREEMIUM_PRD,
} from '@/logic/constants/rebillPrices';

declare global {
  interface Window {
    Rebill: any;
  }
}

let PROD = IS_PROD;

const rebillCountriesPrices: JsonMapping = rebillCountryPriceMapping;

export const REBILL_CONF = {
  ORG_ID: PROD ? NEXT_PUBLIC_REBILL_ORG_ID_PRD : NEXT_PUBLIC_REBILL_ORG_ID_TEST, //getEnv("REBILL_ORG_ID")
  API_KEY: PROD
    ? NEXT_PUBLIC_REBILL_API_KEY_PRD
    : NEXT_PUBLIC_REBILL_API_KEY_TEST, //getEnv("REBILL_API_KEY")
  URL: NEXT_PUBLIC_REBILL_URL,
  GATEWAYS: {
    ST: ['cr', 'hn', 've', 'ni', 'sv', 'bo', 'py', 'gt', 'pa', 'ec'],
    MP: [], //ar is need it!, rebill is provisional!
    REBILL: ['cl', 'co', 'uy', 'mx'],
    // for old rebill is provisional!
    DEPRECATE_REBILL: [
      'ar',
      'pe',
      'cr',
      'hn',
      've',
      'ni',
      'sv',
      'bo',
      'py',
      'gt',
      'pa',
      'ec',
    ],
  },
  PRICES: {
    NEXT_PUBLIC_REBILL_REBILL_CL_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_REBILL_UY_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_REBILL_CO_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_REBILL_CL_FREEMIUM_TEST,
    NEXT_PUBLIC_REBILL_REBILL_UY_FREEMIUM_TEST,
    NEXT_PUBLIC_REBILL_REBILL_CO_FREEMIUM_TEST,
    //DEPRECATE REBILL PRICES
    NEXT_PUBLIC_REBILL_MP_AR_FREEMIUM_TEST,
    NEXT_PUBLIC_REBILL_MP_AR_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_STRIPE_BO_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_STRIPE_PY_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_STRIPE_PE_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_STRIPE_CR_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_STRIPE_HN_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_STRIPE_USD_FREEMIUM_PRD,
  },
};

export const getRebillInitialization = (country: string) => {
  switch (country) {
    case 'cl':
      return {
        organization_id: NEXT_PUBLIC_REBILL_CL_ORG_ID_PRD,
        api_key: NEXT_PUBLIC_REBILL_CL_API_KEY_PRD,
        api_url: REBILL_CONF.URL,
      };
    case 'co':
      return {
        organization_id: NEXT_PUBLIC_REBILL_COP_ORG_ID_PRD,
        api_key: NEXT_PUBLIC_REBILL_COP_API_KEY_PRD,
        api_url: REBILL_CONF.URL,
      };
    case 'uy':
      return {
        organization_id: NEXT_PUBLIC_REBILL_UY_ORG_ID_PRD,
        api_key: NEXT_PUBLIC_REBILL_UY_API_KEY_PRD,
        api_url: REBILL_CONF.URL,
      };
    default:
      //return te old rebill DEPRECATE_REBILL
      return {
        organization_id: REBILL_CONF.ORG_ID,
        api_key: REBILL_CONF.API_KEY,
        api_url: REBILL_CONF.URL,
      };
  }
};

const mappingCheckoutFields = (contactZoho: ContactCRM) => {
  //console.log({contactZoho})

  return {
    firstName: contactZoho.First_Name,
    lastName: contactZoho.Last_Name,
    email: contactZoho.Email,
    phone: {
      countryCode: '54',
      areaCode: '11',
      phoneNumber: contactZoho.Phone,
    },
    birthday: contactZoho.Date_of_Birth ?? '99-99-9999',
    taxId: {
      type: 'CUIT',
      value: '20' + contactZoho.Identificacion + '9',
    },
    personalId: {
      type: translateDocumentType(contactZoho.Tipo_de_Documento),
      value: contactZoho.Identificacion,
    },
    address: {
      street: contactZoho.Mailing_Street ?? contactZoho.Pais,
      number: '0',
      floor: '0',
      apt: '0',
      city: contactZoho.Mailing_City ?? contactZoho.Pais,
      state: contactZoho.Mailing_State ?? contactZoho.Pais,
      zipCode: contactZoho.Mailing_Zip ?? contactZoho.Pais,
      country: contactZoho.Pais,
      description: 'Pago en el sitio de MSK',
    },
  };
};

const getPlan = (country: string) => {
  const gateway = REBILL_CONF.GATEWAYS.REBILL.includes(country)
    ? 'REBILL'
    : null;
  const isDeprecateRebill = REBILL_CONF.GATEWAYS.DEPRECATE_REBILL.includes(
    country,
  )
    ? 'REBILL'
    : null;
  const isDeprecateRebillMP = isDeprecateRebill
    ? country === 'ar'
      ? 'MP'
      : 'STRIPE'
    : null;
  const countryPrice = rebillCountriesPrices[country];
  const price = getEnv(
    `REBILL_${gateway ?? isDeprecateRebillMP}_${countryPrice}_FREEMIUM`,
  );

  console.log({ price, countryPrice });

  return {
    id: price,
    quantity: 1,
  };
};

export const initRebillV3 = async (
  user: any,
  country: string,
  product: any,
  RebillSDKCheckout: any,
  setShow: Dispatch<SetStateAction<boolean>>,
  setFaliedMessage: Dispatch<SetStateAction<string>>,
  setPaymentCorrect: Dispatch<SetStateAction<boolean | null>>,
  setMountedInput: Dispatch<SetStateAction<boolean>>,
) => {
  const rebill = new Rebill('pk_test_eee4f877-6b08-4b35-8cc1-b283f97f6578');
};
