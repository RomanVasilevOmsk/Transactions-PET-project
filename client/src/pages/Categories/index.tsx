import React from 'react';
import { CategoriesContextProvider } from './context';

const Content = React.lazy(() => import('./content'));

const Categories = () => {
  return (
    <CategoriesContextProvider>
      <Content />
    </CategoriesContextProvider>
  );
};

export default Categories;
