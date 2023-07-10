import { createContext, useState } from "react";
import { LandingPage } from "../pages/LandingPage";

interface LPContextType {
  showLP: boolean;
  toggleLP: () => void;
}

export const LandingPageContext = createContext<LPContextType>({
  showLP: true,
  toggleLP: () => {},
});

export const LandingPageContextProvider = ({ children }) => {
  const [showLP, setShowLP] = useState(true);

  const toggleLP = () => {
    setShowLP(!showLP);
  };

  const contextValue = {
    showLP,
    toggleLP,
  };

  return (
    <LandingPageContext.Provider value={contextValue}>
      {showLP ? <LandingPage /> : children}
    </LandingPageContext.Provider>
  );
};
