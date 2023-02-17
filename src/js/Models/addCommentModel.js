import * as config from "../config";
import { updateUserData } from "../helpers";
import axios from "axios";

export async function addComment(body, id) {
  try {
    const param = {
      body,
    };

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    await axios.post(`${config.BASE_API}posts/${id}/comments`, param, {
      headers,
    });
    const userId = JSON.parse(localStorage.getItem("user")).id;
    await updateUserData(userId);
  } catch (error) {
    throw error;
  }
}
