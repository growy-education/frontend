import React from "react";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContextProvider } from "./AuthContextProvider";
import { General } from "./General";
import AxiosContextProvider from "./AxiosContextProvider";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./UserContextProvider";
import { RolesRouter } from "./Router";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string}
      >
        <AuthContextProvider>
          <AxiosContextProvider>
            <UserContextProvider>
              <RolesRouter />
            </UserContextProvider>
          </AxiosContextProvider>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
