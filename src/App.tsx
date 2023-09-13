import React from "react";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LPContextProvider } from "./contexts/LPContextProvider";
import { AuthContextProvider } from "./contexts/AuthContextProvider";
import { UserContextProvider } from "./contexts/UserContextProvider";
import { RolesRouter } from "./RolesRouter";
import { NotificationContextProvider } from "./contexts/NotificationContextProvider";
import { Theme, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { jaJP as dataGridJaJp } from "@mui/x-data-grid";
import { jaJP as coreJaJP } from "@mui/material/locale";
import { jaJP } from "@mui/x-date-pickers/locales";
import { AlertSnackbarContextProvider } from "./contexts/AlertSnackbarContext";
import { AxiosContextProvider } from "./contexts/AxiosContextProvider";

// dayjsの日本語化
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { QuestionContextProvider } from "./contexts/QuestionContextProvider";
import { TeacherContextProvider } from "./contexts/TeacherContextProvider";
import { CustomerContextProvider } from "./contexts/CustomerContextProvider";
import { StudentContextProvider } from "./contexts/StudentContextProvider";
dayjs.locale("ja");

const theme = createTheme(
  {
    palette: {
      common: {
        black: "#25372F",
        white: "#fff",
      },
      primary: {
        main: "#006837",
        light: "#006837",
      },
      secondary: {
        main: "#65bffe",
        light: "#65bffe",
      },
    },
    typography: {
      fontFamily:
        "'Roboto', 'Noto Sans JP', 'M PLUS 2', 'Kosugi', 'IBM Plex Sans JP'",
      h1: {
        fontSize: "2.0rem",
        fontWeight: 400,
      },
      h2: {
        fontSize: "1.8rem",
        fontWeight: "bold",
        lineHeight: 1.2,
      },
      h3: {
        fontSize: "1.4rem",
        fontWeight: 400,
      },
      h4: {
        fontSize: "1.4rem",
        fontWeight: "bold",
        lineHeight: 1.5,
      },
      h5: {
        fontSize: "1.2rem",
        fontWeight: 400,
        lineHeight: 1.5,
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
          <LPContextProvider>
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string}
            >
              <AlertSnackbarContextProvider>
                <NotificationContextProvider>
                  <AuthContextProvider>
                    <AxiosContextProvider>
                      <UserContextProvider>
                        <QuestionContextProvider>
                          <CustomerContextProvider>
                            <TeacherContextProvider>
                              <StudentContextProvider>
                                <RolesRouter />
                              </StudentContextProvider>
                            </TeacherContextProvider>
                          </CustomerContextProvider>
                        </QuestionContextProvider>
                      </UserContextProvider>
                    </AxiosContextProvider>
                  </AuthContextProvider>
                </NotificationContextProvider>
              </AlertSnackbarContextProvider>
            </GoogleOAuthProvider>
          </LPContextProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
