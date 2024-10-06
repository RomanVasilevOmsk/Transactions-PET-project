import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Form } from 'react-router-dom';
import { formatDate } from '../../../helpers/date.helper';
import { formatToUSD } from '../../../helpers/currency.helper';
import ReactPaginate from 'react-paginate';
import { useTransactionsContext } from '../context';

const TransactionTable: FC = () => {
  const { transactionsData, totalPages, handlePageChange } = useTransactionsContext();

  return (
    <>
      <ReactPaginate
        className="flex gap-3 justify-end mt-4 items-center"
        activeClassName="bg-blue-600 rounded-md "
        pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
        previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
        nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
        disabledClassName="text-white/50 cursor-not-allowed"
        disabledLinkClassName="text-slate-600 cursor-not-allowed"
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
      />
      <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              <td className="font-bold">№</td>
              <td className="font-bold">Title</td>
              <td className="font-bold">Amount ($)</td>
              <td className="font-bold">Category</td>
              <td className="font-bold">Date</td>
              <td className="text-right">Action</td>
            </tr>
          </thead>

          <tbody>
            {transactionsData.map((transaction, idx) => (
              <tr key={transaction.id}>
                <td>{idx + 1}</td>
                <td>{transaction.title}</td>
                <td className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                  {transaction.type === 'income'
                    ? '+ ' + formatToUSD.format(transaction.amount)
                    : '- ' + formatToUSD.format(transaction.amount)}
                </td>
                <td>{transaction.category?.title || 'Other'}</td>
                <td>{formatDate(transaction.created_at)}</td>
                <td>
                  <Form className="flex" method="delete" action="/transactions">
                    <input type="hidden" name="id" value={transaction.id} />
                    <button className="btn hover:btn-red ml-auto" type="submit">
                      <FaTrash />
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTable;
