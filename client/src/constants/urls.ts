export const PAGES = {
  ROOT: '/',
  AUTH: 'auth',
  TRANSACTIONS: 'transactions',
  CATEGORIES: 'categories',
};

export const BASE_URL = 'http://localhost:3000/api';

export enum RestApiUrls {
  User = 'user',
  AuthLogin = 'auth/login',
  AuthProfile = 'auth/profile',
  Categories = '/categories',
  Category = '/categories/category',
  Transactions = '/transactions',
  Transaction = '/transactions/transaction',
  TransactionsIncomeFind = '/transactions/income/find',
  TransactionsExpenseFind = '/transactions/expense/find',
}
