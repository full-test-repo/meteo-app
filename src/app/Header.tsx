import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  IconButton,
  Switch,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTranslation } from "react-i18next";

import { useCtx } from "./AppHooks";
import { Language } from "types/Language";

export default () => {
  const theme = useTheme();
  const { colorMode, lang, changeLanguage } = useCtx();
  const { t } = useTranslation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" style={{ flexGrow: 1 }}>
          Test Nirilanto
        </Typography>
        <Box>
          <div>
            {t("common." + theme.palette.mode + "-mode")}
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode?.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </div>
        </Box>
        <div style={styles.container}>
          <Typography>language: </Typography>
          <div>
            <div>
              <select value={lang} name="language" onChange={changeLanguage}>
                <option value={Language.FR}>FR</option>
                <option value={Language.EN}>EN</option>
              </select>
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
} as const;
