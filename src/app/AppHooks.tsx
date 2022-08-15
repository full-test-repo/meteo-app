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
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Language } from "types/Language";
import config from "../config";

const AppCtx = createContext<any>(null);
const provider = new OpenStreetMapProvider();

export const ContextProvider = ({ children }: any) => {
  const [lang, setLang] = useState<Language>(i18n.language as Language);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [searchLabel, setSearchLabel] = useState<string>("");
  const [searchValues, setSearchValues] = useState<any>([]);
  const [weather, setWeather] = useState<Object>({});
  const [datasViaApi, setDatasViaApi] = useState<Object>({});
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

  useEffect(() => {
    const search = async (label: string) => {
      if (!label) return;
      const results = await provider.search({
        query: label,
      });
      setSearchValues(results);
    };
    search(searchLabel);
  }, [searchLabel]);

  // GET DATA

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${config.API_WEATHER}?q=${city}&appid=${
            config.API_WEATHER_KEY
          }&lang=${lang === Language.FR ? "fr" : "en"}`
        );
        setWeather((data?.weather.length && data.weather[0]) || {});
        setDatasViaApi(data)
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
      value={{
        colorMode,
        mode,
        lang,
        changeLanguage,
        weather,
        datasViaApi,
        setCity,
        setSearchLabel,
        searchValues,
        searchLabel,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppCtx.Provider>
  );
};

export const useCtx = () => useContext(AppCtx);
