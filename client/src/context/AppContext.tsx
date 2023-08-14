import React, { createContext, useContext, useState } from 'react';
import { CalculationsHistoryStore } from '../lib/browser-local-storage';

interface AppContextProps {
  isLoggedIn: boolean;
  userLoggedIn: string;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<string>>;
  login: () => void;
  logout: () => void;
  calculationsHistory: string[];
  setCalculationsHistory: React.Dispatch<React.SetStateAction<string[]>>;
  calculationStore: CalculationsHistoryStore;
}

const calculationStore = new CalculationsHistoryStore()

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
  const [calculationsHistory, setCalculationsHistory] = useState<string[]>([])

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
    calculationsHistory,
    setCalculationsHistory,
    calculationStore
  };

  return (<AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
