import { Box } from "@mui/material";
import { ContextProvider } from "./AppHooks";
import Body from "./Body";
import Header from "./Header";

function AppPage() {
  return (
    <ContextProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary"
        }}
      >
        <Header />
        <Body />
      </Box>
    </ContextProvider>
  );
}

export default AppPage;
