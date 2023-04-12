import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext({});

export interface PropsWithJSX {
  children: React.ReactNode;
}

export const AuthContextProvider = (props: PropsWithJSX) => {
  const [authedUser, setUser] = useState<User | null>();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // setUser(null);
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
