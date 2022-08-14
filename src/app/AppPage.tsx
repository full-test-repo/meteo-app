import { ContextProvider } from "./AppHooks";
import Header from "./Header";

function AppPage() {
  return (
    <ContextProvider>
      <Header />
    </ContextProvider>
  );
}

export default AppPage;
