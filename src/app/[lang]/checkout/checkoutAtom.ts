import { atom } from 'recoil';

export const rebillIdState = atom<string>({
	key: 'rebillIdState', // Debe ser único
	default: '', // Valor inicial vacío
});
