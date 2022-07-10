// export interface Todo {
//   id: number;
//   content: string;
// }

// export interface Meta {
//   totalCount: number;
// }

export interface Wallet {
  // value?: string;
  label: string;
  hide?: boolean;
  money?: number;
}

export interface Operation {
  value: number;
  label: string;
  category?: string;
}

export interface Money {
  wallet: string;
  income?: number;
  expense?: number;
}

export interface Record {
  date: string;
  operation: number;
  description?: string;
  money: Money[];
  [key: string]: string | number | Money[] | undefined;
}

export interface WalletTotal {
  wallet: string;
  total?: number;
}
