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
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string}
      >
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
