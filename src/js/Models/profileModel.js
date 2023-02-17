import axios from "axios";
import * as config from "../config.js";

export async function getUserProfile(id) {
  try {
    const response = await axios.get(`${config.BASE_API}users/${id}`);
    const { data } = await response.data;
    config.state.profileData.userData = data;
  } catch (error) {
    throw error;
  }
}

export async function getUserPosts(id) {
  try {
    const response = await axios.get(`${config.BASE_API}users/${id}/posts`);
    const { data } = await response.data;
    config.state.profileData.userPosts = data;
  } catch (error) {
    throw error;
  }
}
