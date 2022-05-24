import { useState, useContext } from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { createUser } from "../auth/auth";
import LoadingOverlay from "../../components/places/UI/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import { Alert } from "react-native";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    console.log("email passw: ", email, password);
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.Authenticate(token);
      console.log("Sucesso 44444444", token);
    } catch (error) {
      console.log("error:: ", error);
      Alert.alert("Erro", "Não foi possível criar a conta.\n\nError: " + error);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Criando uauário..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
