import React, { createContext, useContext, useState } from 'react';

interface AppContextProps {
  isLoggedIn: boolean;
  userLoggedIn: string;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<string>>;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext(): AppContextProps {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userLoggedIn, setUserLoggedIn] = useState<string>('');

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const contextValue: AppContextProps = {
    isLoggedIn,
    login,
    logout,
    userLoggedIn,
    setUserLoggedIn,
  };

  return (<AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}