import * as postDetailsModel from "../Models/postDetailsModel.js";
import postDetailsView from "../Views/postDetailsView.js";

async function postDetailsController() {
  try {
    postDetailsView.runderLoader();
    const URLPrams = new URLSearchParams(window.location.search);
    const id = URLPrams.get("postId");
    await postDetailsModel.getPost(id);
    postDetailsView.runder(JSON.parse(localStorage.getItem("postDetails")));
  } catch (error) {
    postDetailsView.runderAlert(
      "No data found for resourse with given identifier",
      "danger"
    );
  } finally {
    postDetailsView.removeLoader();
  }
}

export const initPostDetails = function () {
  postDetailsView.PostDetailsHash();
  if (!location.pathname.includes("postdetails")) return;
  postDetailsView.addHandlerPostDetails(postDetailsController);
};
