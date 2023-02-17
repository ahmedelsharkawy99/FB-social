import View from "./View";
import * as bootstrap from "bootstrap";
class PostView extends View {
  _postBodyField;
  _postImageField;
  _formModal = document.querySelector(".show-modal");
  addHandlerCreatePost(handler) {
    document.addEventListener("click", e => {
      this._postBodyField = document.querySelector("#post-body-model");
      this._postImageField = document.querySelector("#post-img-model");
      const createPostBtn = e.target.closest("#create-post");
      if (!createPostBtn) return;
      const body = this._postBodyField.value;
      const image = this._postImageField.files[0];
      handler(body, image);
      this._closeModel("create-post");
      this._postBodyField.value = "";
      this._postImageField.value = "";
      this._postBodyField.blur();
    });
  }

  showModal() {
    this._formModal.addEventListener("click", e => {
      e.preventDefault();
      const inputFields =
        e.target.closest("#post-body-main") ||
        e.target.closest("#post-img-main") ||
        e.target.closest(".upload-pic");
      if (!inputFields) return;
      const createPostModal = new bootstrap.Modal("#create-post-model", {
        keyboard: true,
      });
      createPostModal.show();
    });
  }
}

export default new PostView();
