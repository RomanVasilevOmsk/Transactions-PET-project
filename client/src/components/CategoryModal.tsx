import { FC, useState } from 'react';
import { Form } from 'react-router-dom';
import { ICategory } from '../types/type';

interface ICategoryModal {
  type: 'post' | 'patch';
  category?: ICategory;
  onClose: () => void;
}

const CategoryModal: FC<ICategoryModal> = ({ type, category, onClose }) => {
  const [title, setTitle] = useState<string>(category?.title || '');

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
      <Form
        action="/categories"
        method={type}
        onSubmit={() => onClose()}
        className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900"
      >
        <label htmlFor="title">
          <small>Category title</small>
          <input
            className="input w-full"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title..."
          />
          <input type="hidden" name="id" value={category?.id} />
        </label>

        <div className="flex items-center gap-2">
          <button className="btn btn-green" type="submit">
            {type === 'patch' ? 'Save' : 'Create'}
          </button>

          <button onClick={onClose} className="btn btn-red">
            Close
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CategoryModal;
