import View from "../View";
import userPic from "../../../imgs/profile-pics/undraw_pic_profile_re_7g2h.svg";

export default class Log extends View {
  _navLogin = document.querySelector("#nav-login");
  _navRegister = document.querySelector("#nav-register");
  _loginBtn = document.querySelector("#login");
  _navlogout = document.querySelector("#nav-logout");
  _logoutContainer;
  checkLogin(token) {
    if (!token) return false;
    const data = JSON.parse(localStorage.getItem("user"));
    this._steupUI(data);
  }

  clearFeilds() {
    if (!location.pathname.includes("login")) return;
    this._userNameField.focus();
  }

  _steupUI(data) {
    this._logoutContainer = document.querySelector("#logout-container");
    const sidebar = document.querySelector(".sidebar");
    const markup = this._generateUserData(data);
    const addPostBtn = this._generateAddPost();
    sidebar.insertAdjacentHTML("beforeend", addPostBtn);
    this._logoutContainer.insertAdjacentHTML("afterbegin", markup);
  }

  _generateUserData(data) {
    return `
    <div class="d-flex align-items-center flex-column" id="user-data">
      <img
        src="${
          Object.keys(data.profile_image).length !== 0
            ? data.profile_image
            : userPic
        }"
        alt="${data.username} profile picture"
        class="main-profile-image border border-2 my-3"
        width="120"
        height="120"
      />
      <strong>${data.name}</strong>
  </div>
    `;
  }

  _generateAddPost() {
    if (location.href.includes("postDetails")) return "";
    return `
    <button id="add-post" type="button" class="btn btn-primary d-block mt-5 mx-auto" data-bs-toggle="modal"
    data-bs-target="#create-post-model"  role="button" aria-label="Add Post">
    Create Post
  </button>
    `;
  }
}
