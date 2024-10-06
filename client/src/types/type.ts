export interface IUser {
  id: number;
  email: string;
  token: string;
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IResponseUser {
  email: string;
  id: number;
  created_at: string;
  updated_at: string;
  password: string;
}

export interface IResponseUserData {
  token: string;
  user: IResponseUser;
}

export interface IResponseUserLoginData {
  token: string;
  id: string;
  email: string;
}

export interface ITransaction {
  id: number;
  amount: number;
  title: string;
  created_at: string;
  updated_at: string;
  type: string;
  category: ICategory;
}

export interface ICategory {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  transactions?: [];
}

export interface IResponseTransactionLoader {
  categories: ICategory[];
  transactions: ITransaction[];
  totalIncome: number;
  totalExpense: number;
}
