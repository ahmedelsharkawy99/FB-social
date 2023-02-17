import registerView from "../Views/logView/registerView.js";
import * as registerModel from "../Models/registerModel.js";
import { state } from "../config";

async function registerController(name, username, password, image) {
  try {
    registerView.runderLoader();
    await registerModel.register(name, username, password, image);
    registerView.runderAlert(
      `Wellcome ${state.loginState.userData.name}`,
      "success"
    );
    setTimeout(() => (location.href = location.origin), 2000);
  } catch (error) {
    Object.keys(error.response?.data.errors).length > 0
      ? Object.values(error.response?.data.errors).forEach(value =>
          registerView.runderAlert(value[1] || value[0], "danger")
        )
      : registerView.runderAlert(
          error.response?.data.message || error.message,
          "danger"
        ) ??
        registerView.runderAlert(
          error.response?.data.message || error.message,
          "danger"
        );
  } finally {
    registerView.removeLoader();
  }
}

export const initRegister = function () {
  if (location.pathname.includes("login")) return;
  registerView.clearFeilds();
  registerView.addHandlerRegister(registerController);
};
