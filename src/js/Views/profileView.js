import Posts from "./Posts.js";
import userPostPic from "../../imgs/profile-pics/undraw_pic_profile_re_7g2h.svg";
class Profile extends Posts {
  _navbarContainer = document.querySelector("nav.navbar");
  _parentElements = document.getElementById("posts");
  _userDataContainer = document.getElementById("user-profile-data");
  changeLocationId() {
    document.addEventListener("click", e => {
      const userDataContainer =
        e.target.closest("#user-data") ||
        e.target.closest(".user-data") ||
        e.target.closest("#profile-link") ||
        e.target.closest(".comment");

      if (
        !userDataContainer ||
        e.target.closest(".ms-auto") ||
        e.target.classList.contains("lh-1")
      )
        return;

      let id;

      if (e.target.closest("#user-data") || e.target.closest("#profile-link"))
        id = JSON.parse(localStorage.getItem("user")).id;
      else
        id = userDataContainer.id.slice(userDataContainer.id.indexOf("-") + 1);

      location = `/profile.html?profileId=${id}`;
    });
  }

  runderPosts(data) {
    const markup = this._generateMarkup(data);
    this._parentElements.insertAdjacentHTML("beforeend", markup);
  }

  runderUserData(data) {
    const markup = this._generateUserData(data);
    this._userDataContainer.insertAdjacentHTML("afterbegin", markup);
  }

  _generateUserData(data) {
    return `
      <div class="card">
        <div
          class="card-body d-flex align-items-center justify-content-evenly flex-column flex-sm-row"
        >
          <div
            class="d-flex align-items-center justify-content-center flex-column"
            id="user-data-info"
          >
            <img
            src="${
              Object.keys(data.profile_image).length !== 0
                ? data.profile_image
                : userPostPic
            }"
              class="main-profile-image border border-2"
              alt="${data.username}'s Profile Picture"
            />
            <div class="data fw-bold mt-2">${data.name}</div>
          </div>
          <div
            class="d-flex align-items-center justify-content-between flex-sm-column mt-2"
            id="user-data-numbers"
          >
            <div class="data"><span class="number-info">${
              data.posts_count
            }</span> Posts</div>
            <div class="data"><span class="number-info">${
              data.comments_count
            }</span> Comments</div>
          </div>
        </div>
    </div>
    `;
  }
}

export default new Profile();
