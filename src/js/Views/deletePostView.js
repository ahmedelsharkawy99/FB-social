import Veiw from "./View.js";
import * as bootstrap from "bootstrap";
class DeletePost extends Veiw {
  _parentElements = document.getElementById("post");
  _homePageElements = document.getElementById("posts");
  _deletePostModel = document.getElementById("delete-post-model");
  addHandlerShowDeleteModel(handler) {
    (this._homePageElements || this._parentElements).addEventListener(
      "click",
      e => {
        this._deleteBtn = e.target.closest(".delete-post");
        if (!this._deleteBtn) return;
        handler();
      }
    );
  }

  showModel() {
    this._deletePostModel = document.getElementById("delete-post-model");
    const deleteModel = new bootstrap.Modal(this._deletePostModel);
    deleteModel.toggle();
  }

  addHandlerDeletePost(handler) {
    document.addEventListener("click", e => {
      const deletePostBtn = e.target.closest("#delets-post-btn");
      if (!deletePostBtn) return;
      const postId = this._deleteBtn.id.slice(
        this._deleteBtn.id.indexOf("-") + 1
      );
      handler(postId);
      this._closeModel("delete-post");
    });
  }
}
export default new DeletePost();
