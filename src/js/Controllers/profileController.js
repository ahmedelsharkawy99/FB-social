import profileView from "../Views/profileView";
import * as profileModel from "../Models/profileModel";
import { state } from "../config";

async function showProfileUserData() {
  try {
    profileView.runderLoader();
    const URLparams = new URLSearchParams(window.location.search);
    let userId = URLparams.get("profileId");
    if (!userId) userId = JSON.parse(localStorage.getItem("user")).id;
    await profileModel.getUserProfile(userId);
    profileView.runderUserData(state.profileData.userData);
  } catch (error) {
    profileView.runderAlert(error.message, "danger");
  } finally {
    profileView.removeLoader();
  }
}

async function showProfileUserPosts() {
  try {
    profileView.runderLoader();
    const URLparams = new URLSearchParams(window.location.search);
    let userId = URLparams.get("profileId");
    if (!userId) userId = JSON.parse(localStorage.getItem("user")).id;
    await profileModel.getUserPosts(userId);
    profileView.runderPosts(state.profileData.userPosts);
  } catch (error) {
    profileView.runderAlert(error.message, "danger");
  } finally {
    profileView.removeLoader();
  }
}

export function initProfile() {
  profileView.changeLocationId();
  if (!location.pathname.includes("profile")) return;
  showProfileUserData();
  showProfileUserPosts();
}
