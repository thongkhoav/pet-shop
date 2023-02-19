import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";
import { API_URL } from "~/constants";

export const StoreContext = createContext();

export default function StoreContextProvider({ children }) {
  const [routingHistory, setRoutingHistory] = useState({
    beforeLogin: "",
  });
  const {currentUser} = useContext(AuthContext);
  const [cart, setCart] = useState();
  // const navigate = useNavigate();

  // Side Effects
  useEffect(() => {
    const fetchCart = async () => {
       try {
           const res = await axios.get(`${API_URL}/cart/${currentUser._id}`);
           console.log(res.data);
           setCart(res.data)
       } catch(err) {
        console.log(err);
       }
    };
    // currentUser && fetchCart();
  },[currentUser?._id]);

  // Functions

  return (
    <StoreContext.Provider value={{ routingHistory, setRoutingHistory, cart }}>
      {children}
    </StoreContext.Provider>
  );
}
