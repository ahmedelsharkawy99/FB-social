import Posts from "./Posts.js";
class HomeView extends Posts {
  _parentElements = document.getElementById("posts");
  runder(data, reload = true) {
    if (reload) this._parentElements.innerHTML = "";
    const markup = this._generateMarkup(data);
    this._parentElements.insertAdjacentHTML("beforeend", markup);
  }

  addHandlerPagenation(handeler, reload) {
    let currentPage = 2;
    window.addEventListener("scroll", function () {
      const endOfPage =
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 1;
      if (!endOfPage) return;
      handeler(currentPage, reload);
      currentPage++;
    });
  }
}

export default new HomeView();
