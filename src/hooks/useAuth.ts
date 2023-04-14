import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IAuthedUser } from '../types/types';

export const useAuth = () => {
  const { authedUser }: IAuthedUser = useContext<any>(AuthContext);
  return authedUser;
};
