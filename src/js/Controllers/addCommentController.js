import addCommentView from "../Views/addCommentView.js";
import * as addCommentModel from "../Models/addCommentModel.js";

async function addCommentController(body) {
  try {
    addCommentView.runderLoader();
    const URLParams = new URLSearchParams(location.search);
    const id = URLParams.get("postId");
    await addCommentModel.addComment(body, id);
    addCommentView.runderAlert(`New Comment Has been Added`, "success");
    setTimeout(() => {
      addCommentView.runderAlert(
        `The page will reload after 3 seconds`,
        "success"
      );
    }, 1000);
    setTimeout(() => {
      location.reload();
    }, 4000);
  } catch (error) {
    const messageError =
      error.response?.data?.message === "Unauthenticated."
        ? "Please login"
        : error.response?.data?.message;
    addCommentView.runderAlert(messageError, "danger");
  } finally {
    addCommentView.removeLoader();
  }
}

export const initAddComment = function () {
  if (location.pathname.includes("postdetails"))
    addCommentView.addHandlerAddComment(addCommentController);
};
