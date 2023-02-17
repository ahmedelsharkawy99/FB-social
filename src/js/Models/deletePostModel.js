import * as config from "../config.js";
import { updateUserData } from "../helpers.js";
import axios from "axios";
export async function deletePost(id) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
   await axios.delete(`${config.BASE_API}posts/${id}`, {
      headers,
    });
    const userId = JSON.parse(localStorage.getItem("user")).id;
    await updateUserData(userId);
  } catch (error) {
    throw error;
  }
}
