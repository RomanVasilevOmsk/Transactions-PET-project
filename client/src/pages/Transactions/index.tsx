import React from 'react';
import { TransactionsContextProvider } from './context';

const Content = React.lazy(() => import('./content'));

const Transactions = () => {
  return (
    <TransactionsContextProvider>
      <Content />
    </TransactionsContextProvider>
  );
};

export default Transactions;
