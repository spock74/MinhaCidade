import AsyncStorage from '@react-native-async-storage/async-storage';

import { useEffect, useState, createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  Authenticate: (token) => {},
  Logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  function Authenticate(token) {
    setAuthToken(token);
    // persist the token in local storage 
    AsyncStorage.setItem('authToken_st11', token);
  }

  function Logout() {
    setAuthToken(null);
    // remove idToken from local storage
    AsyncStorage.removeItem('authToken_st11');
  }

  const value = {
    isAuthenticated: !!authToken,
    token: authToken,
    Authenticate,
    Logout,
  };
 

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
