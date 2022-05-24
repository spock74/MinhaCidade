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

  const token = response.data;

  console.log("----- token -----", token);
  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
