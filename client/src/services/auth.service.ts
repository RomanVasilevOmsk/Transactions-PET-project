import { instance } from '../api/axios.api';
import { RestApiUrls } from '../constants/urls';
import { IResponseUserData, IUser, IUserData } from '../types/type';

export const AuthService = {
  async registration(userData: IUserData): Promise<IResponseUserData | undefined> {
    const { data } = await instance.post<IResponseUserData>(RestApiUrls.User, userData);
    return data;
  },
  async login(userData: IUserData): Promise<IUser> {
    const { data } = await instance.post<IUser>(RestApiUrls.AuthLogin, userData);
    return data;
  },
  async getProfile(): Promise<IUser | undefined> {
    const { data } = await instance.get<IUser>(RestApiUrls.AuthProfile);
    if (data) return data;
  },
};
