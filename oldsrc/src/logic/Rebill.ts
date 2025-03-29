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
	NEXT_PUBLIC_REBILL_REBILL_CL_V3_FREEMIUM_PRD,
	NEXT_PUBLIC_REBILL_REBILL_UY_V3_FREEMIUM_PRD,
	NEXT_PUBLIC_REBILL_REBILL_MX_V3_FREEMIUM_PRD,
	NEXT_PUBLIC_REBILL_REBILL_CL_V3_FREEMIUM_TEST,
	NEXT_PUBLIC_REBILL_REBILL_UY_V3_FREEMIUM_TEST,
	NEXT_PUBLIC_REBILL_REBILL_MX_V3_FREEMIUM_TEST,
	NEXT_PUBLIC_REBILL_REBILL_CO_V3_FREEMIUM_PRD,
	NEXT_PUBLIC_REBILL_REBILL_CO_V3_FREEMIUM_TEST,
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
	API_KEY: PROD ? NEXT_PUBLIC_REBILL_API_KEY_PRD : NEXT_PUBLIC_REBILL_API_KEY_TEST, //getEnv("REBILL_API_KEY")
	URL: NEXT_PUBLIC_REBILL_URL,
	GATEWAYS: {
		ST: ['cr', 'hn', 've', 'ni', 'sv', 'bo', 'py', 'gt', 'pa', 'ec'],
		MP: [], //ar is need it!, rebill is provisional!
		REBILL: ['cl', 'co', 'uy', 'mx'],
		// for old rebill is provisional!
		DEPRECATE_REBILL: ['ar', 'pe', 'cr', 'hn', 've', 'ni', 'sv', 'bo', 'py', 'gt', 'pa', 'ec'],
	},
	PRICES: {
		NEXT_PUBLIC_REBILL_REBILL_CL_FREEMIUM_PRD,
		NEXT_PUBLIC_REBILL_REBILL_UY_FREEMIUM_PRD,
		NEXT_PUBLIC_REBILL_REBILL_CO_FREEMIUM_PRD,
		NEXT_PUBLIC_REBILL_REBILL_CL_FREEMIUM_TEST,
		NEXT_PUBLIC_REBILL_REBILL_UY_FREEMIUM_TEST,
		NEXT_PUBLIC_REBILL_REBILL_CO_FREEMIUM_TEST,
		//V3 PLANS
		NEXT_PUBLIC_REBILL_REBILL_CL_V3_FREEMIUM_PRD,
		NEXT_PUBLIC_REBILL_REBILL_UY_V3_FREEMIUM_PRD,
		NEXT_PUBLIC_REBILL_REBILL_CO_V3_FREEMIUM_PRD,
		NEXT_PUBLIC_REBILL_REBILL_MX_V3_FREEMIUM_PRD,
		NEXT_PUBLIC_REBILL_REBILL_CL_V3_FREEMIUM_TEST,
		NEXT_PUBLIC_REBILL_REBILL_UY_V3_FREEMIUM_TEST,
		NEXT_PUBLIC_REBILL_REBILL_CO_V3_FREEMIUM_TEST,
		NEXT_PUBLIC_REBILL_REBILL_MX_V3_FREEMIUM_TEST,
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
			street: contactZoho.Mailing_Street ?? `${contactZoho.Pais} 1234`,
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
	const gateway = REBILL_CONF.GATEWAYS.REBILL.includes(country) ? 'REBILL' : null;
	const isDeprecateRebill = REBILL_CONF.GATEWAYS.DEPRECATE_REBILL.includes(country) ? 'REBILL' : null;
	const isDeprecateRebillMP = isDeprecateRebill ? (country === 'ar' ? 'MP' : 'STRIPE') : null;
	const countryPrice = rebillCountriesPrices[country];
	const price = getEnv(`REBILL_${gateway ?? isDeprecateRebillMP}_${countryPrice}_FREEMIUM`);

	console.log({ price, countryPrice });

	return {
		id: price,
		quantity: 1,
	};
};

export const initRebill = async (
	user: any,
	country: string,
	product: any,
	RebillSDKCheckout: any,
	setShow: Dispatch<SetStateAction<boolean>>,
	setFaliedMessage: Dispatch<SetStateAction<string>>,
	setPaymentCorrect: Dispatch<SetStateAction<boolean | null>>,
	setMountedInput: Dispatch<SetStateAction<boolean>>,
) => {
	try {
		const contactZoho: ContactCRM = await ssr.getEmailByIdZohoCRM('Contacts', user.email);
		const customerRebill = mappingCheckoutFields(contactZoho);
		//Seteo de customer
		RebillSDKCheckout.setCustomer(customerRebill);

		const cardHolder = {
			name: contactZoho.Full_Name,
			identification: {
				type: translateDocumentType(contactZoho.Tipo_de_Documento),
				value: contactZoho.Identificacion,
			},
		};
		console.log({ cardHolder, RebillSDKCheckout });
		//Seteo de identidicacion del customer
		RebillSDKCheckout.setCardHolder(cardHolder);

		//Seteo metadata de la suscripcio
		RebillSDKCheckout.setMetadata({
			contact_id: 'x' + contactZoho.id,
		});

		//Textos de validaciones con el elemento de la tarjeta
		RebillSDKCheckout.setText({
			card_number: 'Numero de tarjeta',
			pay_button: 'Finalizar',
			error_messages: {
				emptyCardNumber: 'Ingresa el numero de la tarjeta',
				invalidCardNumber: 'El numero de la tarjeta es invalido',
				emptyExpiryDate: 'Enter an expiry date',
				monthOutOfRange: 'Expiry month must be between 01 and 12',
				yearOutOfRange: 'Expiry year cannot be in the past',
				dateOutOfRange: 'Expiry date cannot be in the past',
				invalidExpiryDate: 'Expiry date is invalid',
				emptyCVC: 'Ingresar CVC',
				invalidCVC: 'CVC es invalido',
			},
		});

		RebillSDKCheckout.setStyles({
			fieldWrapper: {
				base: {
					maxWidth: 'auto',
					height: 'auto',
				},
				errored: {},
			},
			inputWrapper: {
				base: {
					maxWidth: 'auto',
					fontFamily: '"Inter"',
					borderColor: '#E4E4E4',
				},
			},
			errorText: {
				base: {},
			},
			button: {
				base: {
					color: '#FFFFFF',
					fontWeight: 'bold',
					fontSize: '14px',
				},
			},
		});

		//Seteo de callbacks en saco de que el pago este correcto o tengo algun fallo
		RebillSDKCheckout.setCallbacks({
			onSuccess: (response: any) => {
				console.log('Rebill success callback');
				sendToZoho(response, contactZoho, country, product, setShow, setPaymentCorrect, setFaliedMessage);
			},
			onError: (error: any) => {
				console.error({ callbackRebillError: error });
			},
		});

		//Seteo de plan para cobrar
		const { id, quantity } = getPlan(country);

		RebillSDKCheckout.setTransaction({
			prices: [
				{
					id,
					quantity,
				},
			],
		})
			.then((res: any) => console.log({ res }))
			.catch((err: any) => console.error({ err }));

		//Aplicar configuracion al DOM
		RebillSDKCheckout.setElements('rebill_elements');
		setMountedInput(true);
	} catch (e: any) {
		console.error({ e });
	}
};
