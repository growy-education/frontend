import React from "react";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContextProvider } from "./contexts/AuthContextProvider";
import { UserContextProvider } from "./contexts/UserContextProvider";
import { RolesRouter } from "./RolesRouter";
import { NotificationContextProvider } from "./contexts/NotificationContextProvider";
import { ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { jaJP as dataGridJaJp } from "@mui/x-data-grid";
import { jaJP as coreJaJP } from "@mui/material/locale";
import { jaJP } from "@mui/x-date-pickers/locales";
import { AlertPanelContextProvider } from "./contexts/AlertPanelContextProvider";
import { AxiosContextProvider } from "./contexts/AxiosContextProvider";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#006837",
        light: "#006837",
      },
      secondary: {
        main: "#65bffe",
        light: "#65bffe",
      },
    },
  },
  jaJP,
  dataGridJaJp,
  coreJaJP
);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string}
          >
            <AlertPanelContextProvider>
              <NotificationContextProvider>
                <AuthContextProvider>
                  <AxiosContextProvider>
                    <UserContextProvider>
                      <RolesRouter />
                    </UserContextProvider>
                  </AxiosContextProvider>
                </AuthContextProvider>
              </NotificationContextProvider>
            </AlertPanelContextProvider>
          </GoogleOAuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
