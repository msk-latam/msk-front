export function getMPPublicKeyFromCountry(country: string):string {
    console.log({country})
    let key;

    switch(country.toLowerCase()) {
        case 'ar':
            key = process.env.NEXT_PUBLIC_MP_KEY_ARG;
            return key as string;
        case 'cl':
            key = process.env.NEXT_PUBLIC_MP_KEY_CL;
            return key as string;
        case 'mx':
            key = process.env.NEXT_PUBLIC_MP_KEY_MX;
            return key as string;
        default:
            console.error('Country not supported');
            return '';
    }
}