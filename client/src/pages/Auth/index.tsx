import React from 'react';
import { AuthContextProvider } from './context';

const Content = React.lazy(() => import('./content'));

const Auth = () => {
  return (
    <AuthContextProvider>
      <Content />
    </AuthContextProvider>
  );
};

export default Auth;
