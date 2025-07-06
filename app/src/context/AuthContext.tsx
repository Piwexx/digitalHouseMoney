'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { User } from '@/types/user'; // Assuming User type is available
// We might need Account type if we include accountId or full account object
// import { Account } from '@/types/account';

interface AuthContextType {
  user: User | null;
  token: string | null;
  accountId: number | null;
  // Potentially add login/logout functions here in a more complete setup
  // setUser: React.Dispatch<React.SetStateAction<User | null>>;
  // setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  initialUser: User | null;
  initialToken: string | null;
  initialAccountId: number | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initialUser,
  initialToken,
  initialAccountId,
}) => {
  // Use state if these values can change on the client-side (e.g., after a token refresh, or profile update)
  // For now, assuming they are set once by the server layout for the duration of the session on client.
  // If they were to be updated client-side, useState would be appropriate here.
  // const [user, setUser] = useState<User | null>(initialUser);
  // const [token, setToken] = useState<string | null>(initialToken);
  // const [accountId, setAccountId] = useState<number | null>(initialAccountId);

  // useEffect(() => {
  //   setUser(initialUser);
  //   setToken(initialToken);
  //   setAccountId(initialAccountId);
  // }, [initialUser, initialToken, initialAccountId]);

  // If data is only from server and won't change client-side for this context's purpose:
  const contextValue = {
    user: initialUser,
    token: initialToken,
    accountId: initialAccountId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // If we used useState, we'd return the state values:
  // return { user, token, accountId, setUser, setToken };
  return context;
};
