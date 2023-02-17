import loginView from "../Views/logView/loginView.js";
import logoutView from "../Views/logView/logoutView.js";
import * as logoutModel from "../Models/logoutModel.js";
import * as loginModel from "../Models/loginModel.js";

async function loginController(username, password) {
  try {
    loginView.runderLoader();
    await loginModel.login(username, password);
    setTimeout(() => (location.href = location.origin), 1000);
  } catch (error) {
    loginView.runderAlert(error.response?.data.message, "danger");
  } finally {
    loginView.removeLoader();
  }
}

function logoutController() {
  try {
    logoutView.runderLoader();
    logoutModel.logout();
    location.href = location.origin;
  } catch (error) {
    logoutView.runderAlert(error.message, "danger");
  } finally {
    logoutView.removeLoader();
  }
}

export const initLogin = function () {
  loginView.clearFeilds();
  loginView.checkLogin(localStorage.getItem("token"));
  loginView.addHandlerLogin(loginController);
  logoutView.addHandlerLoguedout(logoutController);
};
