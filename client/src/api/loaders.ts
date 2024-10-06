import { ICategory, ITransaction } from '../types/type';
import { instance } from './axios.api';
import { RestApiUrls } from '../constants/urls';

export const categoryLoader = async () => {
  const { data } = await instance.get<ICategory[]>('/categories');
  return data;
};

export const transactionLoader = async () => {
  const categories = await instance.get<ICategory[]>(RestApiUrls.Categories);
  const transactions = await instance.get<ITransaction[]>(RestApiUrls.Transactions);
  const totalIncome = await instance.get<number>(RestApiUrls.TransactionsIncomeFind);
  const totalExpense = await instance.get<number>(RestApiUrls.TransactionsExpenseFind);

  const data = {
    categories: categories.data,
    transactions: transactions.data,
    totalIncome: totalIncome.data,
    totalExpense: totalExpense.data,
  };
  return data;
};
