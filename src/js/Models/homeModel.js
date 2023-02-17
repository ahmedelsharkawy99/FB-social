import * as config from "../config";
import axios from "axios";

export async function getPosts(page = 1) {
  try {
    const response = await axios.get(
      `${config.BASE_API}posts?limit=${config.LIMIT}&page=${page}`
    );
    const lastPage = response.data.meta.last_page;
    if (page === lastPage) return;
    const { data } = response.data;
    config.state.homeState.posts = data;
  } catch (error) {
    throw error;
  }
}
