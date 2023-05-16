import React from "react";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContextProvider } from "./AuthContextProvider";
import { General } from "./General";
import AxiosContextProvider from "./AxiosContextProvider";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="892433517348-ldkieko7692c89ud3mut1q7mu7k2q1qr.apps.googleusercontent.com">
        <AuthContextProvider>
          <AxiosContextProvider>
            <BrowserRouter>
              <General />
            </BrowserRouter>
          </AxiosContextProvider>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
