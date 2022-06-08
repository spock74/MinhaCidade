import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//signUp
// signInWithPassword

async function authenticate(model, email, password) {
  const URL_ = "https://identitytoolkit.googleapis.com/v1/accounts:";
  const WEB_API = "AIzaSyCxUTGjEQhpjYMCHucMHe29I-pu7VyuLvA";
  const url = URL_ + model + "?key=" + WEB_API;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  AsyncStorage.setItem("em_st11", email)
    .then(() => {
      // console.log("----- token -----", token);
    })
    .catch((e) => {
      console.log("----- erro -----", e);
    });

  const token = response.data;

  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
