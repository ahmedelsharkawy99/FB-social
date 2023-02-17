import * as config from "../config";
import axios from "axios";
import { saveUserData } from "../helpers.js";
export async function login(username, password) {
  try {
    const param = {
      username: username,
      password: password,
    };
    const response = await axios.post(`${config.BASE_API}login`, param);
    const { data } = response;
    config.state.loginState.token = data.token;
    config.state.loginState.userData = data.user;
    localStorage.setItem("sayHello", JSON.stringify({ sayHello: false }));
    saveUserData();
  } catch (error) {
    throw error;
  }
}
