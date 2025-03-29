import countryAreaCodes from '@/data/jsons/__countryAreaCodes.json';
import { JsonMapping } from '@/data/types';
interface SeparatedPhoneNumber {
  area_code: string | null;
  number: string | null;
}

const codesMapping: JsonMapping = countryAreaCodes;

export function separatePhoneNumber(phoneNumber: string): SeparatedPhoneNumber {
  for (const code of Object.values(codesMapping)) {
    if (phoneNumber.startsWith(code)) {
      const areaCode: string = code.replace('+', ''); // Eliminar el '+'
      const number: string = phoneNumber.slice(code.length);

      return { area_code: areaCode, number: number };
    }
  }

  return { area_code: null, number: null };
}
