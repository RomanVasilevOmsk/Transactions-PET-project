import { FC } from 'react';
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { Form } from 'react-router-dom';
import CategoryModal from '../../../components/CategoryModal';
import { useCategoryContext } from '../context';

const Categories: FC = () => {
  const { categories, selectedCategory, onSelectCategory, visibleModal, onToggleVisibleModal } = useCategoryContext();

  return (
    <>
      <div className="mt-10 p-4 rounded-md bg-slate-800">
        <h1>Your category list</h1>

        <div className="flex mt-2 items-center gap-2 flex-wrap">
          {categories.map((category) => (
            <div key={category.id} className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-8">
              {category.title}
              <div className="hidden absolute px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex">
                <button
                  onClick={() => {
                    onSelectCategory(category);
                  }}
                >
                  <AiFillEdit />
                </button>

                <Form className="flex" method="delete" action="/categories">
                  <input type="hidden" name="id" value={category.id} />
                  <button type="submit">
                    <AiFillCloseCircle />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => onToggleVisibleModal(true)}
          className="max-w-fit flex items-center gap-2 text-white/50 mt-6 hover:text-white"
        >
          <FaPlus />
          <span>Create a new category</span>
        </button>
      </div>
      {visibleModal && <CategoryModal type="post" onClose={() => onToggleVisibleModal(false)} />}

      {selectedCategory && (
        <CategoryModal
          type="patch"
          category={selectedCategory}
          onClose={() => {
            onSelectCategory(undefined);
          }}
        />
      )}
    </>
  );
};

export default Categories;
