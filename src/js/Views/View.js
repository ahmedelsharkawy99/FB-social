import * as bootstrap from "bootstrap";

export default class View {
  _body = document.body;

  runderAlert(message, type) {
    const alertEL = document.querySelector(".alert-custom");
    if (!alertEL) {
      const markup = `<div class="alert-custom fade show" id="alert"></div>`;
      this._body.insertAdjacentHTML("afterbegin", markup);
    }
    this._generateAlert(message, type);
    this._removeAlert("alert");
  }

  _generateAlert(message, type) {
    const alertEL = document.querySelector(".alert-custom");
    const wrapper = document.createElement("div");
    const success = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi me-2 bi-check-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
  </svg>`;

    const danger = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi me-2 bi-exclamation-triangle" viewBox="0 0 16 16">
    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
  </svg>`;

    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible d-flex align-items-center" role="alert">`,
      type === "success" ? success : danger,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertEL.append(wrapper);
  }

  _removeAlert(id) {
    setTimeout(() => {
      if (!document.querySelector(`#${id}`)) return;
      document.body.removeChild(document.body.firstElementChild);
    }, 3000);
  }

  _closeModel(type) {
    const model = document.getElementById(`${type}-model`);
    const modelInstance = bootstrap.Modal.getInstance(model);
    modelInstance.hide();
  }

  // Runder the loader
  runderLoader() {
    const markup = `
    <div class="loader">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
     </div>
    `;
    this._body.insertAdjacentHTML("beforeend", markup);
  }

  // Remove the loader
  removeLoader() {
    const loaderContainer = document.querySelector(".loader");
    loaderContainer.remove();
  }

  // Runder Error Message If No Posts
  _runderErrorPage() {
    return `
    <div class="mainbox rounded shadow card">
        <div class="msg">
         The User have No Posts Available<p>Let's go <a href="index.html">home</a> and try from there.</p>
        </div>
      </div>
    `;
  }
}
