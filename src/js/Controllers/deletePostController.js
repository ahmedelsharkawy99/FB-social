import deletePostView from "../Views/deletePostView";
import * as deletePostModel from "../Models/deletePostModel.js";

function showDeletePostController() {
  try {
    deletePostView.showModel();
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    deletePostView.runderAlert(errorMessage, "danger");
  }
}

async function deletePostController(id) {
  try {
    deletePostView.runderLoader();
    await deletePostModel.deletePost(id);
    deletePostView.runderAlert(`New Post Has been Deleted`, "success");
    let reload;

    setTimeout(() => {
      if (location.pathname.includes("postdetails")) {
        deletePostView.runderAlert(
          `The page redirect to home after 3 seconds`,
          "success"
        );
        reload = false;
      } else {
        deletePostView.runderAlert(
          `The page will reload after 3 seconds`,
          "success"
        );
        reload = true;
      }
    }, 1000);

    setTimeout(() => {
      if (reload) location.reload();
      else location.href = location.origin;
    }, 4000);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    deletePostView.runderAlert(errorMessage, "danger");
  } finally {
    deletePostView.removeLoader();
  }
}

export const initDeletePost = function () {
  if (
    location.pathname.includes("login") ||
    location.pathname.includes("register")
  )
    return;
  deletePostView.addHandlerShowDeleteModel(showDeletePostController);
  deletePostView.addHandlerDeletePost(deletePostController);
};
