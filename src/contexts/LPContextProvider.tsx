import { createContext, useEffect, useState } from "react";
import { LandingPage } from "../pages/LandingPage";
import { PendingContextPage } from "../pages/PendingContextPage";

interface LPContextType {
  showLP: boolean;
  toggleLP: () => void;
}

export const LandingPageContext = createContext<LPContextType>({
  showLP: true,
  toggleLP: () => {},
});

export const LPContextProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [showLP, setShowLP] = useState(true);

  useEffect(() => {
    // ページが読み込まれた際に保存されたshowLPを取得
    const savedShowLP = localStorage.getItem("showLP");

    if (savedShowLP) {
      setShowLP(savedShowLP === "true");
    }

    setPending(false);
  }, []);

  const toggleLP = () => {
    if (!showLP) {
      localStorage.setItem("showLP", "true");
    } else {
      localStorage.setItem("showLP", "false");
    }
    setShowLP(!showLP);
  };

  if (pending) {
    return <PendingContextPage message="ブラウザ情報の取得中です" />;
  }

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
