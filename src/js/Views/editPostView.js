import Veiw from "./View.js";
import * as bootstrap from "bootstrap";
class EditPost extends Veiw {
  _parentElements = document.getElementById("post");
  _homePageElements = document.getElementById("posts");
  _parentElement = document.querySelector(".ms-auto");
  _editPostModel;
  _editPostTitle;
  _editPostBody;
  _editPostImage;
  addHandlerShoweditModel(handler) {
    (this._homePageElements || this._parentElements).addEventListener(
      "click",
      e => {
        const editBtn = e.target.closest(".edit-post");

        if (!editBtn) return;
        const postId = editBtn.id.slice(editBtn.id.indexOf("-") + 1);
        handler(postId);
      }
    );
  }

  showModel(post) {
    this._editPostModel = document.getElementById("edit-post-model");
    this._editPostBody = document.getElementById("edit-post-body");
    const editModel = new bootstrap.Modal(this._editPostModel);
    editModel.show();
    this._editPostBody.value = post.body;
  }

  addHandlerEditPost(handler) {
    document.addEventListener("click", e => {
      const editPostBtn = e.target.closest("#edit-post-btn");
      if (!editPostBtn) return;
      this._editPostImage = document.getElementById("edit-post-img");
      const body = this._editPostBody.value;
      const image = this._editPostImage.files[0];
      handler(body, image);
      this._closeModel("edit-post");
      this._editPostBody.value = "";
    });
  }
}
export default new EditPost();
