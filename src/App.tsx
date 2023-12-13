import React from "react";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContextProvider } from "./providers/auth.provider";
import { RolesRouter } from "./RolesRouter";
import { NotificationContextProvider } from "./providers/notification.provider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CustomThemeProvider } from "./providers/theme.provider";
import { AlertSnackbarContextProvider } from "./providers/alert-snackbar.provider";

// dayjsの日本語化
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
dayjs.locale("ja");

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string}
            >
              <AlertSnackbarContextProvider>
                <NotificationContextProvider>
                  <AuthContextProvider>
                    <RolesRouter />
                  </AuthContextProvider>
                </NotificationContextProvider>
              </AlertSnackbarContextProvider>
            </GoogleOAuthProvider>
          </LocalizationProvider>
        </CustomThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
