import { createTheme, ThemeProvider } from "@mui/material";
import i18n from "i18n";
import { ChangeEvent, createContext, useContext, useMemo, useState } from "react";
import { Language } from "types/Language";

const AppCtx = createContext<any>(null);

export const ContextProvider = ({ children }: any) => {

  // LANGUAGES

  const [lang, setLang] = useState<Language>(i18n.language as Language);

  let changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    let language = event.target.value;

    switch (language) {
        case Language.EN:
            setLang(Language.EN);
            i18n.changeLanguage(Language.EN);
            break;
        case Language.FR:
        default:
            setLang(Language.FR);
            i18n.changeLanguage(Language.FR);
            break;
    }
}

  // MODE DARK/LIGHT
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
    <AppCtx.Provider value={{ colorMode, lang, changeLanguage }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppCtx.Provider>
  );
};

export const useCtx = () => useContext(AppCtx);
