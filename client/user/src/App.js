import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authContext";
import StoreContextProvider from "./context/storeContext";
import UserRouter from "./routes/UserRouter";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <StoreContextProvider>
          <UserRouter />
        </StoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
