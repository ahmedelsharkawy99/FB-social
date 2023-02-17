import homeView from "../Views/homeView.js";
import * as homeModel from "../Models/homeModel.js";
import { state } from "../config";

const postsController = async function (currentPage = 1, reload) {
  try {
    homeView.runderLoader();
    await homeModel.getPosts(currentPage);
    homeView.runder(state.homeState.posts, reload);
  } catch (error) {
    homeView.runderAlert(error.response.message || error.message, "danger");
  } finally {
    homeView.removeLoader();
  }
};

function sayHello() {
  const wellcome = JSON.parse(localStorage.getItem("sayHello"));
  const user = JSON.parse(localStorage.getItem("user"));
  if (!sayHello || wellcome.sayHello === true) return;
  setTimeout(
    () => homeView.runderAlert(`Wellcome ${user.name}`, "success"),
    500
  );
  localStorage.setItem("sayHello", JSON.stringify({ sayHello: true }));
}
const condition =
  location.pathname.includes("profile") ||
  location.pathname.includes("postdetails");

const nonLoggedIn =
  location.pathname.includes("login") || location.pathname.includes("register");

export const initHome = function () {
  if (nonLoggedIn) return;
  homeView.addHandlerToggleSidebar();
  if (condition) return;
  sayHello();
  postsController();
  homeView.addHandlerPagenation(postsController, false);
};
