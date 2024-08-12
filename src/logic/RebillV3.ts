import { ContactCRM, JsonMapping } from '@/data/types';
import rebillCountryPriceMapping from '@/data/jsons/__rebillCurrencyPrices.json';
import translateDocumentType from '@/utils/translateDocumentType';
import { IS_PROD } from '@/contains/constants';
import {
  NEXT_PUBLIC_REBILL_API_KEY_PRD,
  NEXT_PUBLIC_REBILL_API_KEY_TEST,
  NEXT_PUBLIC_REBILL_ORG_ID_PRD,
  NEXT_PUBLIC_REBILL_ORG_ID_TEST,
  NEXT_PUBLIC_REBILL_URL,
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
  NEXT_PUBLIC_REBILL_CL_PK_PRD,
  NEXT_PUBLIC_REBILL_CL_PK_TEST,
  NEXT_PUBLIC_REBILL_COP_PK_PRD,
  NEXT_PUBLIC_REBILL_COP_PK_TEST,
  NEXT_PUBLIC_REBILL_UY_PK_PRD,
  NEXT_PUBLIC_REBILL_UY_PK_TEST,
  NEXT_PUBLIC_REBILL_MX_PK_PRD,
  NEXT_PUBLIC_REBILL_MX_PK_TEST,
  NEXT_PUBLIC_REBILL_DEPRECATED_PK_PRD,
  NEXT_PUBLIC_REBILL_DEPRECATED_PK_TEST,
  NEXT_PUBLIC_REBILL_MP_AR_V3_FREEMIUM_PRD,
  NEXT_PUBLIC_REBILL_MP_AR_V3_FREEMIUM_TEST,
  NEXT_PUBLIC_REBILL_REBILL_CL_V3_FREEMIUM_PRD,
  NEXT_PUBLIC_REBILL_REBILL_CL_V3_FREEMIUM_TEST,
} from '@/logic/constants/rebillPrices';
import ssr from '@/services/ssr';
import { getEnv } from '@/utils/getEnv';
import { sendToZoho, sendToZohoByRebillV3 } from './Zoho';
import { RebillV3Event } from '@/types/RebillV3Types';

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
    NEXT_PUBLIC_REBILL_REBILL_CL_V3_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_REBILL_CL_V3_FREEMIUM_TEST,
    NEXT_PUBLIC_REBILL_REBILL_UY_FREEMIUM_TEST,
    NEXT_PUBLIC_REBILL_REBILL_CO_FREEMIUM_TEST,
    //DEPRECATE REBILL PRICES
    NEXT_PUBLIC_REBILL_MP_AR_V3_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_MP_AR_V3_FREEMIUM_TEST,
    //NEXT_PUBLIC_REBILL_MP_AR_FREEMIUM_TEST,
    //NEXT_PUBLIC_REBILL_MP_AR_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_STRIPE_BO_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_STRIPE_PY_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_STRIPE_PE_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_STRIPE_CR_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_STRIPE_HN_FREEMIUM_PRD,
    NEXT_PUBLIC_REBILL_STRIPE_USD_FREEMIUM_PRD,
  },
};

export const getRebillV3Initialization = (country: string) => {
  console.log(country);

  switch (country) {
    case 'cl':
      return IS_PROD
        ? NEXT_PUBLIC_REBILL_CL_PK_PRD
        : NEXT_PUBLIC_REBILL_CL_PK_TEST;
    case 'co':
      return IS_PROD
        ? NEXT_PUBLIC_REBILL_COP_PK_PRD
        : NEXT_PUBLIC_REBILL_COP_PK_TEST;
    case 'uy':
      return IS_PROD
        ? NEXT_PUBLIC_REBILL_UY_PK_PRD
        : NEXT_PUBLIC_REBILL_UY_PK_TEST;
    case 'mx':
      return IS_PROD
        ? NEXT_PUBLIC_REBILL_MX_PK_PRD
        : NEXT_PUBLIC_REBILL_MX_PK_TEST;
    default:
      //return te old rebill DEPRECATE_REBILL
      return IS_PROD
        ? NEXT_PUBLIC_REBILL_DEPRECATED_PK_PRD
        : NEXT_PUBLIC_REBILL_DEPRECATED_PK_TEST;
  }
};

const mappingCheckoutFields = (contactZoho: ContactCRM) => {
  //console.log({contactZoho}){

  return {
    customerInformation: {
      firstName: contactZoho.First_Name,
      lastName: contactZoho.Last_Name,
      email: contactZoho.Email,
      phoneNumber: {
        countryCode: '54',
        number: '1155011250',
      },
      identification: {
        type: translateDocumentType(contactZoho.Tipo_de_Documento),
        id: contactZoho.Identificacion,
      },
    },
    billing: {
      city: contactZoho.Mailing_City ?? contactZoho.Pais,
      country: contactZoho.Pais,
      line1: contactZoho.Mailing_Street ?? `${contactZoho.Pais} 1234`,
      zipCode: contactZoho.Mailing_Zip ?? contactZoho.Pais,
      state: contactZoho.Mailing_State ?? contactZoho.Pais,
    },
    cardHolderDetails: {
      identification: {
        type: translateDocumentType(contactZoho.Tipo_de_Documento),
        id: contactZoho.Identificacion,
      },
      name: `${contactZoho.First_Name} ${contactZoho.Last_Name}`,
    },
    metadata: {
      contact_id: `x${contactZoho.id}`,
    },
  };
};

const getPlanV3 = (country: string) => {
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
    `REBILL_${gateway ?? isDeprecateRebillMP}_${countryPrice}_V3_FREEMIUM`,
  );

  console.log({ price, countryPrice });

  return {
    id: price,
  };
};

export const initRebillV3 = async (
  email: string | null,
  country: string,
  product: any,
  setShow: any,
  setFaliedMessage: any,
  setPaymentCorrect: any,
) => {
  if (email === null || email === '') {
    throw new Error(`El email no esta disponible, email: ${email}`);
  }

  const contactZoho: ContactCRM = await ssr.getEmailByIdZohoCRM(
    'Contacts',
    email,
  );
  const rebillPk = getRebillV3Initialization(country);
  console.log({ country, rebillPk });
  let RebillSDKCheckout = new window.Rebill(rebillPk);

  const rebillPlan = getPlanV3(country);

  const checkoutForm = RebillSDKCheckout.checkout.create(rebillPlan);

  const customerDataMapping = mappingCheckoutFields(contactZoho);
  console.log({ customerDataMapping });

  //checkoutForm.reset();
  checkoutForm.set(customerDataMapping);

  checkoutForm.custom({
    css: `
      h2#checkout-payment-title{
        display: none;
      }

      #rebill-footer{
        display: none;
      }
      
      #title-coupon-container{
        display: none;
      }
      
      #checkout-form-container > form{
        margin: 0 auto;
      }
    `,
  });

  //Hide elements of checkout
  checkoutForm.display({
    userLogin: false,
    billing: false,
    customerInformation: false,
    cardholderDetails: false,
    discountCode: false,
    resetButton: false,
    checkoutSummary: false,
    excludePaymentMethods: ['CASH', 'REBILL_PIX', 'TRANSFER'],
  });

  checkoutForm.on('formStatus', (form: any) => {
    console.log(form);
  });

  const user = {
    id: contactZoho.id,
    Usuario: contactZoho.Usuario,
  };

  checkoutForm.on('approved', (event: RebillV3Event) => {
    console.log('approved!', { event });
    sendToZohoByRebillV3(
      event,
      user,
      country,
      product,
      setShow,
      setPaymentCorrect,
      setFaliedMessage,
    );
  });

  checkoutForm.on('rejected', (event: any) => {
    console.log('rejected!', { event });
  });

  checkoutForm.on('error', (event: any) => {
    console.log('error', { event });
  });

  checkoutForm.mount('rebill');
};
