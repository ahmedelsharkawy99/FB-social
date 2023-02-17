import editPostView from "../Views/editPostView";
import * as postDetailsModel from "../Models/postDetailsModel.js";
import * as editPostModel from "../Models/editPostModel.js";
import { state } from "../config";

async function showEditModel(id) {
  try {
    editPostView.runderLoader();
    await postDetailsModel.getPost(id);
    editPostView.showModel(state.postDetails);
  } catch (error) {
    const errorMessage =
      error.response?.data.message ||
      error.response?.data.error_message ||
      error.message;
    editPostView.runderAlert(errorMessage, "danger");
  } finally {
    editPostView.removeLoader();
  }
}

async function editPostController(body, image) {
  try {
    editPostView.runderLoader();
    await editPostModel.editPost(state.postDetails.id, body, image);
    editPostView.runderAlert(`New Post Has been Updated`, "success");
    setTimeout(() => {
      editPostView.runderAlert(
        `The page will reload after 3 seconds`,
        "success"
      );
    }, 1000);
    setTimeout(() => {
      location.reload();
    }, 4000);
  } catch (error) {
    const errorMessage =
      error.response?.data.message ||
      error.response?.data.error_message ||
      error.message;
    editPostView.runderAlert(errorMessage, "danger");
  } finally {
    editPostView.removeLoader();
  }
}

export const initEditPost = function () {
  if (
    location.pathname.includes("login") ||
    location.pathname.includes("register")
  )
    return;
  editPostView.addHandlerShoweditModel(showEditModel);
  editPostView.addHandlerEditPost(editPostController);
};
