import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import i18n from "i18n";
import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Language } from "types/Language";
import config from "../config";

const AppCtx = createContext<any>(null);

export const ContextProvider = ({ children }: any) => {
  const [lang, setLang] = useState<Language>(i18n.language as Language);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [weather, setWeather] = useState<Object>({});
  const [city, setCity] = useState<string>("London");

  // LANGUAGES
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
  };

  // GET DATA

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${config.API_WEATHER}?q=${city}&appid=${
            config.API_WEATHER_KEY
          }&lang=${lang === Language.FR ? "fr" : "en"}`
        );
        console.log(" _____::: ", data?.weather.length && data.weather[0]);

        setWeather((data?.weather.length && data.weather[0]) || {});
      } catch (error) {}
    };
    getData();
  }, [lang, city]);

  // MODE DARK/LIGHT
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
    <AppCtx.Provider
      value={{ colorMode, mode, lang, changeLanguage, weather, setCity }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppCtx.Provider>
  );
};

export const useCtx = () => useContext(AppCtx);
