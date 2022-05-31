import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  email: null,
  Authenticate: (token) => {},
  Logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [email, setEmail] = useState();

  function Authenticate(token) {
    setAuthToken(token);
    setEmail(token.email);
    // persist the token in local storage 
    AsyncStorage.setItem('authToken_st11', token.id);
    //
    AsyncStorage.setItem('email_st11', token.email);
  }

  function Logout() {
    setAuthToken(null);
    // remove idToken from local storage
    AsyncStorage.removeItem('authToken_st11');
    AsyncStorage.removeItem('email_st11');
    AsyncStorage.removeItem('em_st11');
  }

  const value = {
    isAuthenticated: !!authToken,
    token: authToken,
    email: email,
    Authenticate,
    Logout,
  };
 

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
