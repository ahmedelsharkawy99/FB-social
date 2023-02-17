import * as config from "../config";
import { updateUserData } from "../helpers";
import axios from "axios";

export async function createPost(body, img) {
  try {
    const formData = new FormData();
    formData.append("body", body);
    if (img) formData.append("image", img);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    await axios.post(`${config.BASE_API}posts`, formData, {
      headers,
    });
    const id = JSON.parse(localStorage.getItem("user")).id;
    await updateUserData(id);
  } catch (error) {
    throw error;
  }
}
