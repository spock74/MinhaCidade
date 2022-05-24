import { useState, useContext } from "react";
import { Alert } from "react-native";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/places/UI/LoadingOverlay";
import { login } from "../auth/auth";
import { AuthContext } from "../../store/auth-context";

function LoginScreen() {
  const [isAuthenticanting, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.Authenticate(token.idToken);
    } catch (error) {
      console.log("error:: ", error);
      Alert.alert(
        "Erro",
        "Não foi possível realizar login.\n\nError: " + error
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticanting) {
    return <LoadingOverlay message="Realizando login..." />;
  }

  return <AuthContent isLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
