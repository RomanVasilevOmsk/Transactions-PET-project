import { useCallback, useMemo, useState, useContext, createContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ICategory, IResponseTransactionLoader, ITransaction } from '../../../types/type';
import { instance } from '../../../api/axios.api';
import { DEFAULT_PAGINATION_LIMIT } from '../../../constants';

interface TransactionsContextProps {
  totalExpense: number;
  totalIncome: number;
  categories: ICategory[];
  transactions: ITransaction[];
  visibleModal: boolean;
  transactionsData: ITransaction[];
  totalPages: number;
  limit: number;
  onToggleVisibleModal: (val: boolean) => void;
  handlePageChange: (selectedItem: { selected: number }) => void;
}

const Context = createContext<TransactionsContextProps | undefined>(undefined);

export const TransactionsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { totalExpense, totalIncome, categories, transactions } = useLoaderData() as IResponseTransactionLoader;
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [transactionsData, setTransactionsData] = useState<ITransaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const onToggleVisibleModal = useCallback((val: boolean) => setVisibleModal(val), []);
  const limit = DEFAULT_PAGINATION_LIMIT;

  const fetchTransactions = useCallback(
    async (page: number) => {
      const response = await instance(`transactions/pagination?page=${page}&limit=${limit}`);
      setTransactionsData(response.data);
      setTotalPages(Math.ceil(transactions.length / limit));
    },
    [limit, transactions.length],
  );

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, fetchTransactions, transactions]);

  const value = useMemo((): TransactionsContextProps => {
    return {
      totalExpense,
      totalIncome,
      categories,
      visibleModal,
      onToggleVisibleModal,
      transactions,
      transactionsData,
      totalPages,
      handlePageChange,
      limit,
    };
  }, [
    totalExpense,
    totalIncome,
    categories,
    visibleModal,
    onToggleVisibleModal,
    transactions,
    transactionsData,
    totalPages,
    limit,
  ]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useTransactionsContext = () => useContext(Context) as TransactionsContextProps;
