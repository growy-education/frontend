import { ThemeProvider, createTheme } from "@mui/material";
import { jaJP as dataGridJaJp } from "@mui/x-data-grid";
import { jaJP as coreJaJP } from "@mui/material/locale";
import { jaJP } from "@mui/x-date-pickers/locales";
import { ReactNode } from "react";

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
interface ThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
