import * as config from "../config";
import axios from "axios";

export async function getPost(id) {
  try {
    const response = await axios.get(`${config.BASE_API}posts/${id}`);
    const { data } = response.data;
    config.state.postDetails = data;
    localStorage.setItem(
      "postDetails",
      JSON.stringify(config.state.postDetails)
    );
  } catch (error) {
    throw error;
  }
}
