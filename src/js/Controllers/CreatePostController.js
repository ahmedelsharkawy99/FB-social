import PostView from "../Views/PostView.js";
import * as createPostModel from "../Models/createPostModel.js";

async function createPostController(body, image) {
  try {
    PostView.runderLoader();
    if (!body) throw new Error("The Post Text is required");
    await createPostModel.createPost(body, image);
    PostView.runderAlert(`New Post Has been Created`, "success");
    setTimeout(() => {
      PostView.runderAlert(`The page will reload after 3 seconds`, "success");
    }, 1000);
    setTimeout(() => {
      location.reload();
    }, 4000);
  } catch (error) {
    const messageImage = error.response?.data?.errors?.image?.[1];
    const messageError = error.response?.data?.message;
    PostView.runderAlert(
      messageImage ||
        messageError ||
        error.message ||
        "The Image must not be greater than 150 kb",
      "danger"
    );
  } finally {
    PostView.removeLoader();
  }
}

export const initcreatePost = function () {
  if (
    location.pathname.includes("login") ||
    location.pathname.includes("register") ||
    location.pathname.includes("postdetails")
  )
    return;
  PostView.showModal();
  PostView.addHandlerCreatePost(createPostController);
};
