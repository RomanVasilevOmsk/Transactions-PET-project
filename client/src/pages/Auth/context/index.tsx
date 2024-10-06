/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState, useContext, createContext } from 'react';
import { AuthService } from '../../../services/auth.service';
import { toast } from 'react-toastify';
import { setTokenToLocalStorage } from '../../../helpers/localstorage.helper';
import { useAppDispatch } from '../../../store/hooks';
import { login } from '../../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../../../constants/urls';

interface AuthContextProps {
  email: string;
  onChangeEmail: (val: string) => void;
  password: string;
  onChangePassword: (val: string) => void;
  isLogin: boolean;
  onChangeLogin: (val: boolean) => void;
  loginHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  registrationHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Context = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChangeEmail = (val: string) => {
    setEmail(val);
  };

  const onChangePassword = (val: string) => {
    setPassword(val);
  };

  const onChangeLogin = (val: boolean) => {
    setIsLogin(val);
  };

  const registrationHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        const data = await AuthService.registration({ email, password });
        if (data) {
          toast.success('Account has been created.');
          setIsLogin(!isLogin);
        }
      } catch (err: any) {
        const error = err.response?.data.message;
        toast.error(error.toString(error));
      }
    },
    [email, isLogin, password],
  );

  const loginHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        const data = await AuthService.login({ email, password });
        if (data) {
          setTokenToLocalStorage('token', data.token);
          dispatch(login(data));
          toast.success('You log in');
          navigate(PAGES.ROOT);
        }
      } catch (err: any) {
        const error = err.response?.data.message;
        toast.error(error.toString(error));
      }
    },
    [dispatch, email, navigate, password],
  );

  const value = useMemo((): AuthContextProps => {
    return {
      email,
      onChangeEmail,
      password,
      onChangePassword,
      isLogin,
      onChangeLogin,
      loginHandler,
      registrationHandler,
    };
  }, [email, password, isLogin, loginHandler, registrationHandler]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => useContext(Context) as AuthContextProps;
