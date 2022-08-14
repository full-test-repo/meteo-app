import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";

const AppCtx = createContext<any>(null);

export const ContextProvider = ({ children }: any) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  return (
    <AppCtx.Provider value={{ colorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppCtx.Provider>
  );
};

export const useCtx = () => useContext(AppCtx);
