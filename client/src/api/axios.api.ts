import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper';
import { BASE_URL } from '../constants/urls';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Bearer ' + getTokenFromLocalStorage(),
  },
});
