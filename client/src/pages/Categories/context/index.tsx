import { useCallback, useMemo, useState, useContext, createContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ICategory } from '../../../types/type';

interface CategoriesContextProps {
  categories: ICategory[];
  selectedCategory: ICategory | undefined;
  visibleModal: boolean;
  onSelectCategory: (category: ICategory | undefined) => void;
  onToggleVisibleModal: (val: boolean) => void;
}

const Context = createContext<CategoriesContextProps | undefined>(undefined);

export const CategoriesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const categories = useLoaderData() as ICategory[];
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(undefined);

  const onSelectCategory = useCallback((category: ICategory | undefined) => setSelectedCategory(category), []);
  const onToggleVisibleModal = useCallback((val: boolean) => setVisibleModal(val), []);

  const value = useMemo((): CategoriesContextProps => {
    return {
      categories,
      visibleModal,
      onSelectCategory,
      selectedCategory,
      onToggleVisibleModal,
    };
  }, [categories, visibleModal, onSelectCategory, selectedCategory, onToggleVisibleModal]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCategoryContext = () => useContext(Context) as CategoriesContextProps;
