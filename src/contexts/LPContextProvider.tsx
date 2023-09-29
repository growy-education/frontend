import { createContext, useContext, useEffect, useState } from "react";
import { LandingPage } from "../pages/LandingPage";
import { PendingContextPage } from "../pages/PendingContextPage";
import { AuthContext } from "./AuthContextProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignInScreen } from "../SignIn";

interface LPContextType {
  showLP: boolean;
  toggleLP: () => void;
}

export const LandingPageContext = createContext<LPContextType>({
  showLP: true,
  toggleLP: () => {},
});

export const LPContextProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
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

  if (isLoggedIn) {
    return children;
  }

  return (
    <LandingPageContext.Provider
      value={{
        showLP,
        toggleLP,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index path="" element={<LandingPage />} />
          <Route path="*" element={<SignInScreen />} />
        </Routes>
      </BrowserRouter>
    </LandingPageContext.Provider>
  );
};
