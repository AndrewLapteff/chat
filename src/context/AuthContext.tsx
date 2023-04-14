import { onAuthStateChanged, User } from 'firebase/auth';
import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext({});

export const AuthContextProvider = (props: PropsWithChildren) => {
  const [authedUser, setUser] = useState<User | null>();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      return () => {
        unsub();
      };
    });
  }, []);
  return (
    <AuthContext.Provider value={{ authedUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
