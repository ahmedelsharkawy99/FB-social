import Log from "./log";
class LoginView extends Log {
  _userNameField = document.querySelector("#login-username");
  _passwordField = document.querySelector("#login-password");

  addHandlerLogin(handler) {
    if (!location.pathname.includes("login")) return;
    this._loginBtn.addEventListener("click", () => {
      const username = this._userNameField.value;
      const password = this._passwordField.value;
      handler(username, password);
      this._userNameField.value = "";
      this._passwordField.value = "";
    });
  }
}
export default new LoginView();
