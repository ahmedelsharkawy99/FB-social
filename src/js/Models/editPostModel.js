import * as config from "../config.js";
import axios from "axios";
export async function editPost(id, body, image) {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("body", body);
    formData.append("_method", "put");
    if (image) formData.append("image", image);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    await axios.post(`${config.BASE_API}posts/${id}`, formData, {
      headers,
    });
  } catch (error) {
    throw error;
  }
}
