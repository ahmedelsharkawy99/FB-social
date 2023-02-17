import axios from "axios";
import * as config from "./config";

export const timer = function (s) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    });
  }, s);
};

export function saveUserData() {
  if (localStorage.getItem("token")) return;
  localStorage.setItem("token", config.state.loginState.token);
  localStorage.setItem(
    "user",
    JSON.stringify(config.state.loginState.userData)
  );
}

export const updateUserData = async function (id) {
  const response = await axios.get(`${config.BASE_API}users/${id}`);
  const { data } = await response.data;
  config.state.loginState.userData = data;
  localStorage.removeItem("user");
  localStorage.setItem(
    "user",
    JSON.stringify(config.state.loginState.userData)
  );
};

const toDataURL = url =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

// ***Here is code for converting "Base64" to javascript "File Object".***

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// *** Calling both function ***
export const userImagePlaceholders = async function (url) {
  try {
    const dataUrl = await toDataURL(url);
    const dataFile = dataURLtoFile(dataUrl, "UserPlaceholders.jpg");
    return dataFile;
  } catch (error) {
    throw error;
  }
};
