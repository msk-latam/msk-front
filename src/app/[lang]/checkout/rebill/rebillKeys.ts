export const selectCountryKey = (country: string | undefined) => {
	return countryMap[country || 'test'];
};

const countryMap: any = {
	cl: {
		API_KEY: process.env.NEXT_PUBLIC_REBILL_CL_API_KEY_PRD,
		ORG_ID: process.env.NEXT_PUBLIC_REBILL_CL_ORG_ID_PRD,
	},
	test: {
		API_KEY: process.env.NEXT_PUBLIC_REBILL_PUBLIC_KEY_TEST,
		ORG_ID: process.env.NEXT_PUBLIC_REBILL_ORG_ID_TEST,
	},
	uy: {
		API_KEY: process.env.NEXT_PUBLIC_REBILL_UY_API_KEY_PRD,
		ORG_ID: process.env.NEXT_PUBLIC_REBILL_UY_ORG_ID_PRD,
	},

	co: {
		API_KEY: process.env.NEXT_PUBLIC_REBILL_COP_API_KEY_PRD,
		ORG_ID: process.env.NEXT_PUBLIC_REBILL_COP_ORG_ID_PRD,
	},
	// co: {
	// 	API_KEY: process.env,
	// 	ORG_ID: process.env,
	// },
};
