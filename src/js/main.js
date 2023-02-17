import * as homeController from "./Controllers/homeController.js";
import * as logController from "./Controllers/logController.js";
import * as registerController from "./Controllers/registerController.js";
import * as createPostController from "./Controllers/CreatePostController.js";
import * as postDetailsController from "./Controllers/postDetailsController.js";
import * as addCommentController from "./Controllers/addCommentController.js";
import * as editPostController from "./Controllers/editPostController.js";
import * as deletePostController from "./Controllers/deletePostController.js";
import * as profileController from "./Controllers/profileController.js";

const mainContainer = document.querySelector(" main.d-flex");
const modalsContainer = document.querySelector(".modals");
const init = async function () {
  if (
    !(
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    )
  ) {
    const modalsResponse = await fetch("/modals.html");
    const modalsData = await modalsResponse.text();
    modalsContainer.insertAdjacentHTML("afterbegin", modalsData);
    const sidebarResponse = await fetch("/sidebar.html");
    const sidebarData = await sidebarResponse.text();
    mainContainer.insertAdjacentHTML("afterbegin", sidebarData);
  }
  logController.initLogin();
  registerController.initRegister();
  deletePostController.initDeletePost();
  editPostController.initEditPost();
  homeController.initHome();
  createPostController.initcreatePost();
  addCommentController.initAddComment();
  postDetailsController.initPostDetails();
  profileController.initProfile();
};

if (
  location.pathname.includes("login") ||
  location.pathname.includes("register")
)
  return init();
if (!localStorage.getItem("token")) location = "login.html";

init();
