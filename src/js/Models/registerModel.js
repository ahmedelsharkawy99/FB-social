import userPic from "../../imgs/profile-pics/skills-02.jpg";
import { userImagePlaceholders, saveUserData } from "../helpers";
import * as config from "../config";
import axios from "axios";

export async function register(name, username, password, image) {
  try {
    const userImage = await userImagePlaceholders(userPic);
    const dataForm = new FormData();
    dataForm.append("name", name);
    dataForm.append("username", username);
    dataForm.append("password", password);
    dataForm.append("image", image || userImage);
    const response = await axios.post(`${config.BASE_API}register`, dataForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { data } = response;
    config.state.loginState.token = data.token;
    config.state.loginState.userData = data.user;
    saveUserData();
  } catch (error) {
    throw error;
  }
}
