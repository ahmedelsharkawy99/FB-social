import * as config from "../config";
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("sayHello");
  config.state.loginState.token = "";
  config.state.loginState.userData = "";
}
