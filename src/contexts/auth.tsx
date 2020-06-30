import React, {createContext, useState, useEffect, useContext} from 'react';
import Asyncstorage from '@react-native-community/async-storage';
import {View, ActivityIndicator} from 'react-native';
import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStorageUpdate() {
      const storageUser = await Asyncstorage.getItem('@RNAuth:user');
      const storageToken = await Asyncstorage.getItem('@RNAuth:token');
      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;

        setLoading(false);
        console.log('passiu aqui');
      }
    }
  }, []);
  async function signIn() {
    const response = await auth.signIn();

    setUser(response.user);
    await Asyncstorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await Asyncstorage.setItem('@RNAuth:token', response.token);
  }
  function signOut() {
    Asyncstorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
