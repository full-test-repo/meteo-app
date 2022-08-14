import { Box, IconButton, useTheme } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      <div>
        {theme.palette.mode} mode
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
      <p>{t("common.translated-text")}</p>
      <div>
        <div>
          <select value={lang} name="language" onChange={changeLanguage}>
            <option value={Language.FR}>FR</option>
            <option value={Language.EN}>EN</option>
          </select>
        </div>
      </div>
    </Box>
  );
};
