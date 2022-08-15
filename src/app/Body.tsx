import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCtx } from "./AppHooks";

export default () => {
  const { searchValues, setSearchLabel, setCity, searchLabel, datasViaApi } =
    useCtx();

  const { weather } = useCtx();
  const { t } = useTranslation();

  return (
    <div style={styles.body}>
      <div style={styles.searchSection}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={searchValues}
          loading={true}
          style={{ width: "50vw" }}
          fullWidth
          onInputChange={(event, newInputValue) => {
            setSearchLabel(newInputValue);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="City..." />}
        />
        <div style={{ width: 10 }} />
        <Button variant="contained" onClick={() => setCity(searchLabel)}>
          {t("search")}
        </Button>
      </div>
      <Typography variant="h2">{datasViaApi.name}</Typography>
      <div style={styles.container}>
        <img
          style={styles.iconWeather}
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt="ion"
        />
        <Typography variant="h4">
          {Math.round(datasViaApi?.main?.temp - 273.15)}°C
        </Typography>
        <Typography variant="h4">{weather.description}</Typography>
      </div>
      <div style={styles.containerDetail}>
        {datasViaApi?.main &&
          Object.keys(datasViaApi?.main).map((elem: string, key: number) => (
            <div key={"_main_" + key} style={styles.containerDetailItem}>
              <Typography>{t(elem)}</Typography>
              <Typography>{datasViaApi?.main[elem]}</Typography>
            </div>
          ))}
      </div>
    </div>
  );
};

const styles = {
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "bold",
    padding: 50,
  },
  container: {
    textAlign: "center",
    width: "30%",
    minWidth: 200,
    borderRadius: 20,
    padding: 30,
    borderStyle: "solid",
  },
  containerDetail: {
    display: "flex",
    flexDirection: "row",
  },
  containerDetailItem: {
    margin: 12,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    borderStyle: "solid",
  },
  searchSection: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
  },
  iconWeather: {
    width: 120,
  },
} as const;
