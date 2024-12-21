import { createContext, useState } from 'react';

interface ContextValue {
  offset: number;
  setOffset?;
}

const AppContext = createContext<ContextValue>({ offset: 0 });

const ContextProvider = ({ children }) => {
  const [offset, setOffset] = useState(0);

  const value = {
    offset,
    setOffset,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, ContextProvider };
