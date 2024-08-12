export interface RebillV3Event {
  data: Data;
  paymentType: string;
}

export interface Data {
  payment: Payment;
  customer: Customer;
  card: Card;
}

export interface Payment {
  id: string;
  status: string;
  amount: number;
  currency: string;
  createdAt: string;
  subscriptionId: string;
}

export interface Customer {
  id: string;
  email: string;
}

export interface Card {
  id: string;
  lastFour: string;
  expiration: Expiration;
}

export interface Expiration {
  month: number;
  year: number;
}
