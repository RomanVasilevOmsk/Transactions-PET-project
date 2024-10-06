import { FC } from 'react';
import { useAuthContext } from '../context';

const Auth: FC = () => {
  const {
    isLogin,
    email,
    onChangeEmail,
    password,
    onChangePassword,
    onChangeLogin,
    loginHandler,
    registrationHandler,
  } = useAuthContext();

  return (
    <div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
      <h1 className="text-center text-xl mb-10">{isLogin ? 'Login' : 'Registration'}</h1>

      <form className="flex w-1/3 flex-col mx-auto gap-5" onSubmit={isLogin ? loginHandler : registrationHandler}>
        <input className="input" placeholder="Email" value={email} onChange={(e) => onChangeEmail(e.target.value)} />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
        />
        <button className="btn btn-green mx-auto">Submit</button>
      </form>

      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button onClick={() => onChangeLogin(!isLogin)} className="text-slate-300 hover:text-white">
            You don't have an account
          </button>
        ) : (
          <button onClick={() => onChangeLogin(!isLogin)} className="text-slate-300 hover:text-white">
            Already have an account
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
