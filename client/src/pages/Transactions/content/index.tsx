import { FC } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import { formatToUSD } from '../../../helpers/currency.helper';
import Chart from '../components/Chart';
import { useTransactionsContext } from '../context';

const Transactions: FC = () => {
  const { totalIncome, totalExpense } = useTransactionsContext();

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
        <div className="grid col-span-2">
          <TransactionForm />
        </div>
        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-medium font-bold text-center uppercase">Total Income:</p>
              <p className="bg-green-600 p-1 rounded-sm text-center mt-2">{formatToUSD.format(totalIncome)}</p>
            </div>

            <div>
              <p className="text-medium font-bold text-center uppercase">Total Expense:</p>
              <p className="bg-red-500 p-1 rounded-sm text-center mt-2">{formatToUSD.format(totalExpense)}</p>
            </div>
          </div>
          <div className="pb-6">
            <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
          </div>
        </div>
      </div>

      <TransactionTable />
    </>
  );
};

export default Transactions;
