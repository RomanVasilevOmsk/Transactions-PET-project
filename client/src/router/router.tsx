import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Transactions from '../pages/Transactions';
import Categories from '../pages/Categories';
import Auth from '../pages/Auth';
import ProtectedRoute from '../components/ProtectedRoute';
import { categoriesAction, transactionAction } from '../api/actions';
import { categoryLoader, transactionLoader } from '../api/loaders';
import { PAGES } from '../constants/urls';

export const router = createBrowserRouter([
  {
    path: PAGES.ROOT,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: PAGES.TRANSACTIONS,
        loader: transactionLoader,
        action: transactionAction,
        element: (
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        ),
      },
      {
        path: PAGES.CATEGORIES,
        action: categoriesAction,
        loader: categoryLoader,
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: PAGES.AUTH,
        element: <Auth />,
      },
    ],
  },
]);
