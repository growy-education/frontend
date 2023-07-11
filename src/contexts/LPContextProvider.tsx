import { createContext, useEffect, useState } from "react";
import { LandingPage } from "../pages/LandingPage";

interface LPContextType {
  showLP: boolean;
  toggleLP: () => void;
}

export const LandingPageContext = createContext<LPContextType>({
  showLP: true,
  toggleLP: () => {},
});

export const LPContextProvider = ({ children }) => {
  const [showLP, setShowLP] = useState(true);

  useEffect(() => {
    // ページが読み込まれた際に保存されたshowLPを取得
    const savedShowLP = !!localStorage.getItem("showLP");

    if (savedShowLP) {
      setShowLP(savedShowLP);
    }
  }, []);

  const toggleLP = () => {
    if (!showLP) {
      localStorage.setItem("showLP", "true");
    } else {
      localStorage.removeItem("showLP");
    }
    setShowLP(!showLP);
  };

  return (
    <LandingPageContext.Provider
      value={{
        showLP,
        toggleLP,
      }}
    >
      {showLP ? <LandingPage toggleLP={toggleLP} /> : children}
    </LandingPageContext.Provider>
  );
};
