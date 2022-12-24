import LoginData from './LoginData';
import SignupData from './SignupData';
import User from '../../users/models/User';

export interface IUser {
  _id: string;
  email: string;
  userName: string;
  lastName: string;
  password: string;
  accessToken: string;
  roles: string;
}

export type UserContextType = {
  user: IUser | null;
  login: (loginData: LoginData) => Promise<any>;
  signup: (signupData: SignupData) => Promise<any>;
  saveUser: (user: User) => Promise<any>;
  logout: () => void;
};
