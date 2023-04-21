import  { AxiosError } from 'axios';
import { api } from './axiosClient';


export class AuthClient {
  static async login(username: string, password: string) {
      const result = await api.post('/auth/login', { username, password });
      return result;
  }

  // static async registration(username: string, password: string) {
  //   try {
  //     const result = await api.post('/auth/registration', { username, password });
  //     console.log(result)
  //     if (result.status === 201) {
  //     //   setAuth(false);
  //       return true;
  //     }

  //     return false;
  //   } catch (error) {
  //     // handleAxiosError(error);
  //     const err = error as AxiosError;
  //     console.log(err.response?.data)
  //   }
  // }
}
