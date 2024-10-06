import { FC } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col">
      <h1 className="text-4xl mb-10">Page not found</h1>
      <Link to="/" className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600">
        Back
      </Link>
    </div>
  );
};

export default ErrorPage;
