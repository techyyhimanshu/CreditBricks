import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  allowedRoute: string[];
  setAllowedRoute: (routes: string[]) => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [allowedRoute, setAllowedRoute] = useState<string[]>([]);
  useEffect(() => {
    const data = localStorage.getItem('allowedRoute');
    if (data) {
      setAllowedRoute(JSON.parse(data));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ allowedRoute, setAllowedRoute }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
