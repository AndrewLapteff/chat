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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ authedUser }}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
