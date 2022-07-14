export interface Wallet {
  label: string;
  hide?: boolean;
}

export interface Operation {
  label: string;
  category?: string;
}

export interface Money {
  wallet: string;
  income?: number;
  expense?: number;
}

export interface Record {
  id?: number;
  date: string;
  operation: Operation;
  money: Money[];
  description?: string;
  [key: string]: string | number | Money[] | Operation | undefined;
}

export interface WalletTotal {
  wallet: string;
  total?: number;
}
