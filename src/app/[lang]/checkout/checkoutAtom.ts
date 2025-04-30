import { atom } from 'recoil';

export const rebillIdState = atom<string>({
	key: 'rebillIdState', // Debe ser único
	default: '', // Valor inicial vacío
});

export const transactionAmountWithDiscountState = atom<number>({
	key: 'transactionAmountWithDiscountState', // Debe ser único
	default: 0, // Valor inicial
});
