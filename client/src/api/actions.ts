import { ActionFunction } from 'react-router-dom';
import { instance } from './axios.api';
import { toast } from 'react-toastify';
import { RestApiUrls } from '../constants/urls';

export const categoriesAction: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData();
      const title = {
        title: formData.get('title'),
      };
      await instance.post(RestApiUrls.Categories, title);
      return null;
    }
    case 'PATCH': {
      const formData = await request.formData();
      const category = {
        id: formData.get('id'),
        title: formData.get('title'),
      };
      await instance.patch(`${RestApiUrls.Category}/${category.id}`, category);
      return null;
    }
    case 'DELETE': {
      const formData = await request.formData();
      const categoryId = formData.get('id');
      await instance.delete(`${RestApiUrls.Category}/${categoryId}`);
      return null;
    }
  }
};

export const transactionAction: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData();
      const amount = formData.get('amount');
      const newTransaction = {
        title: formData.get('title'),
        amount: amount && +amount,
        category: formData.get('category'),
        type: formData.get('type'),
      };
      await instance.post(RestApiUrls.Transactions, newTransaction);
      toast.success('Transaction added.');
      return null;
    }
    case 'DELETE': {
      const formData = await request.formData();
      const transactionId = formData.get('id');
      await instance.delete(`${RestApiUrls.Transaction}/${transactionId}`);
      toast.success('Transaction deleted.');
      return null;
    }
  }
};
