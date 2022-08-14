import { ContextProvider } from "./AppHooks";
import Body from "./Body";
import Header from "./Header";

function AppPage() {
  return (
    <ContextProvider>
      <Header />
      <Body/>
    </ContextProvider>
  );
}

export default AppPage;
