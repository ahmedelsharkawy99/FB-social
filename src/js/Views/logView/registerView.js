import Log from "./log.js";
class RegisterView extends Log {
  _nameField = document.querySelector("#register-name");
  _userNameField = document.querySelector("#register-username");
  _passwordField = document.querySelector("#register-password");
  _imageField = document.querySelector("#register-image");
  _registerBtn = document.querySelector("#register");

  addHandlerRegister(handler) {
    if (!location.pathname.includes("register")) return;
    this._registerBtn.addEventListener("click", e => {
      e.preventDefault();
      const name = this._nameField.value;
      const username = this._userNameField.value;
      const password = this._passwordField.value;
      const image = this._imageField.files[0];
      handler(name, username, password, image);
      this._userNameField.value = "";
      this._passwordField.value = "";
      this._nameField.value = "";
    });
  }
}

export default new RegisterView();
