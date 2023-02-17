import Log from "./log";
class LogoutView extends Log {
  _userDataContainer = document.querySelector("#user-data");
  addHandlerLoguedout(handler) {
    document.addEventListener("click", e => {
      const navLogoutBtn = e.target.closest("#nav-logout");
      if (!navLogoutBtn) return;
      this._logoutContainer = document.querySelector("#logout-container");
      handler();
      this._logoutContainer.removeChild(
        this._logoutContainer.firstElementChild
      );
    });
  }
}

export default new LogoutView();
