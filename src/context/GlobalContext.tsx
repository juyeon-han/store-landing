import React, { createContext, useState } from 'react';

interface GlobalContextContainerProps {
  children?: JSX.Element;
}

interface GlobalConfig {
  bottomSheetOpen: boolean;
  setBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalConfig | undefined>(undefined);

const GlobalContextContainer = ({
  children,
}: React.PropsWithChildren<GlobalContextContainerProps>): React.ReactElement => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const value = {
    bottomSheetOpen,
    setBottomSheetOpen,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      'GlobalContext must be used within a GlobalContextProvider'
    );
  }
  return context;
};

export default GlobalContextContainer;
