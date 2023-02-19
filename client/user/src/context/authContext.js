import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "~/constants";
// import { toast } from "react-toastify";


export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("petUser") || null)
  );
  const location = useLocation();

  // Side Effect
  useEffect(() => {
    // console.log(currentUser);
    localStorage.setItem("petUser", JSON.stringify(currentUser));
  }, [currentUser]);

  // Functions
  const login = async (inputs) => {
      const res = await axios.post(API_URL+"/auth/login", inputs);
      setCurrentUser(res.data);
      // setIsLoading(false);
  };

  const logout = async () => {
    try {
      await axios.post(API_URL+"/auth/logout");
      setCurrentUser(null);
      if(location.pathname === '/profile')
        navigate("/")
    } catch(err) {
      console.log(err);
    }
  };

  //todo
 const update = async (userInfo) => {
  try {
    // check api phải gửi object after changed
    const res =  await axios.put(`${API_URL}/users/${currentUser._id}`, userInfo);
    console.log(res.data);
    setCurrentUser(res.data);
  } catch(err) {
    console.log(err);
  }
 }

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, update }}
    >
      {children}
    </AuthContext.Provider>
  );
}
