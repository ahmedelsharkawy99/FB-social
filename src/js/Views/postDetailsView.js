import userPostPic from "../../imgs/profile-pics/undraw_pic_profile_re_7g2h.svg";
import View from "./View";

class PostDetails extends View {
  _parentElements = document.getElementById("post");
  _homePageElements = document.getElementById("posts");
  _generateMarkup(post) {
    const user = JSON.parse(localStorage.getItem("user"));
    const isMyPost = user !== null && post.author.id === user.id;
    const editBtn = `     
    <div class="ms-auto">
    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
    <ul class="dropdown-menu">
      <li><button class="btn btn-outline-secondary dropdown-item edit-post" id="post-${post.id}" >Edit</button></li>
      <li><button class="btn btn-outline-danger dropdown-item delete-post" id="post-${post.id}" > Delete </button></li>
    </ul>
  </div>`;
    return `

      <!-- Post -->
      <div class="card shadow mb-3 pe-auto" id="post-${post.id}">
        <div class="card-header d-flex align-items-center user-data" id="user-${
          post.author.id
        }">
          <img
            src="${
              Object.keys(post.author.profile_image).length !== 0
                ? post.author.profile_image
                : userPostPic
            }"
            alt="${post.author.username} profile picture"
            class="profile-img rounded-circle border border-2 me-2"
            width="40"
            height="40"
          />
          <strong class="text-break">${post.author.username}</strong>
          ${isMyPost ? editBtn : ""}
        </div>
        <div class="card-body">
        ${
          Object.keys(post.image).length === 0
            ? `<small class="text-muted my-2 d-block">${post.created_at}</small>`
            : `     <figure class="figure">
            <img
              src="${post.image}"
              class="figure-img img-fluid rounded"
              alt="${post.body}"
              width="510"
              height="410"
            />
            <figcaption class="figure-caption">${post.created_at}</figcaption>
          </figure>`
        }
          <p class="card-text">
           ${post.body}
          </p>
          <hr />
          <div class="d-flex align-items-center flex-wrap">
            <div class="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chat-dots"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                  />
                  <path
                    d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"
                  />
                </svg>
                <span class="ms-2">(${post.comments_count}) Comments</span>
              </div>
              <div class="d-flex align-items-center flex-wrap ms-xxl-2 ms-md-2 ms-lg-2 ms-xl-2" id="post-tags-${
                post.id
              }">
                ${this._generateTages(post.tags)}
              </div>
          </div>
        </div>
        <div class="comments card-footer">
              ${this._generateComments(post.comments)}
        
      </div>
      <div class="input-group p-2">
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here" id="comment-body"></textarea>
        <label for="comment-body">Comment</label>
       </div>
        <button class="btn btn-outline-success" type="button" id="add-comment">Add</button>
      </div>
      </div>
      <!-- Post -->
      `;
  }

  _generateComments(data) {
    if (Array.isArray(data) && data.length === 0) return "";
    const comments = [];
    for (const comment of data) {
      const markup = `
        <div class="p-2 d-flex align-items-center comment" id="user-${
          comment.author.id
        }">
          <!-- User Image -->
          <img
          src="${
            Object.keys(comment.author.profile_image).length !== 0
              ? comment.author.profile_image
              : userPostPic
          }"
          alt="${comment.author.username} profile picture"
          class="profile-img rounded-circle border border-2 me-2"
          width="40"
          height="40"
          />
          <!-- User Image -->
          <div class="p-3 bg-white rounded">
            <!-- User Name  -->
            <strong class="fs-6 d-block mb-2">${
              comment.author.username
            }</strong>
            <!-- User Name  -->

            <!-- User Comment  -->
            <p class="lh-1 m-0 text-break">
              ${comment.body}
            </p>
            <!-- User Comment  -->
          </div>
        </div>
      `;
      comments.push(markup);
    }
    return comments.join("");
  }

  _generateTages(data) {
    if (Array.isArray(data) && data.length === 0) return "";
    const tags = [];
    for (const tag of data) {
      const markup = `
      <button class="btn btn-sm bg-secondary rounded-5 text-light m-1 text-capitalize fw-bold">
        ${tag.name}
     </button>
      `;
      tags.push(markup);
    }
    return tags.join("");
  }

  runder(data) {
    const markup = this._generateMarkup(data);
    this._parentElements.id = `post-${data.id}`;
    this._parentElements.innerHTML = "";
    this._parentElements.insertAdjacentHTML("beforeend", markup);
  }

  PostDetailsHash() {
    this._homePageElements?.addEventListener("click", e => {
      if (e.target.closest(".card-header")) return;
      const postContainer = e.target.closest(".card");
      const profileDataContainer = e.target.closest(".profile-data-container");
      if (!postContainer || profileDataContainer) return;

      const id = postContainer.id.slice(postContainer.id.indexOf("-") + 1);
      window.location = `postdetails.html?postId=${id}`;
    });
  }

  addHandlerPostDetails(handler) {
    handler();
  }
}

export default new PostDetails();
