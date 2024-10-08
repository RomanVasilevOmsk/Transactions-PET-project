import { FC } from 'react';
import { Form } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import CategoryModal from '../../../components/CategoryModal';
import { useTransactionsContext } from '../context';

const TransactionForm: FC = () => {
  const { categories, visibleModal, onToggleVisibleModal } = useTransactionsContext();

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form className="grid gap-2" method="post" action="/transactions">
        <label className="grid" htmlFor="title">
          <span>Title</span>
          <input className="input" type="text" placeholder="Title" name="title" required />
        </label>

        <label className="grid" htmlFor="amount">
          <span>Amount</span>
          <input className="input" type="number" placeholder="Amount" name="amount" required />
        </label>

        <label htmlFor="category" className="grid">
          <span>Category</span>
          {categories.length ? (
            <select name="category" required className="input">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          ) : (
            <h1 className="mt-1 text-red-300">To continue create a category first</h1>
          )}
        </label>

        <button
          className="max-w-fit flex items-center gap-2 text-white/50  hover:text-white"
          onClick={() => onToggleVisibleModal(true)}
        >
          <FaPlus />
          <span>Manage Categories:</span>
        </button>

        <div className="flex gap-4 items-center">
          <label className="cursor pointer flex items-center gap-2">
            <input type="radio" name="type" value="income" className="form-radio text-blue-600" />
            <span>Income</span>
          </label>

          <label className="cursor pointer flex items-center gap-2">
            <input type="radio" name="type" value="expense" className="form-radio text-blue-600" />
            <span>Expense</span>
          </label>
        </div>

        <button className="btn btn-green max-w-fit mt-2">Submit</button>
      </Form>

      {visibleModal && <CategoryModal type="post" onClose={() => onToggleVisibleModal(false)} />}
    </div>
  );
};

export default TransactionForm;
