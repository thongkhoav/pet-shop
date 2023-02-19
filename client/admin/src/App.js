import './global.scss'
import { BrowserRouter } from "react-router-dom";
import AdminRouter from "./routes/AdminRouter";
import AuthContextProvider from './context/authContext';
function App() {
  return (
    <BrowserRouter>
     <AuthContextProvider><AdminRouter/></AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
