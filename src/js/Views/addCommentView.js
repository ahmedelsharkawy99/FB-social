import View from "./View.js";

class AddComment extends View {
  addHandlerAddComment(handler) {
    document.addEventListener("click", e => {
      if (e.target.id !== "add-comment") return;
      const comment = document.querySelector("#comment-body").value;
      handler(comment);
      document.querySelector("#comment-body").value = "";
    });
  }
}
export default new AddComment();
