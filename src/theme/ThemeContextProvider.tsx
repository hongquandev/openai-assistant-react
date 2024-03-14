import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC
} from "react";

import {
  ThemeProvider,
  createTheme,
  useMediaQuery,
  type PaletteMode,
} from "@mui/material";
import { darkTheme, lightTheme } from "./theme";

export const ThemeContext = createContext({
  toggleColorMode: () => {},
});
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? "dark" : "light"
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );
  useEffect(() => {
    const systemColorMode = prefersDarkMode ? "dark" : "light";
    if (systemColorMode !== mode) {
      colorMode.toggleColorMode();
    }
  }, [prefersDarkMode]);
  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
