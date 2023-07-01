import { IngObj } from "../types/ingredient";
import { RefubrishedUserObj, UserCred, UserObj } from "../types/user";
import { storageService } from "./async-storage.service";
import { httpService } from "./http.service";
// import { store } from '../store/store'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
// import { showSuccessMsg } from './event-bus.service'

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  // updatePantry,
  updateUser,
  // addIngToPantry,
  getGuestUser,
};

function getUsers(): Promise<RefubrishedUserObj[]> {
  // return storageService.query("user");
  return httpService.get(`user`);
}

async function getById(userId: string): Promise<any> {
  // const user = storageService.get("user", userId);

  const user = await httpService.get(`user/${userId}`);
  return user;
}
function getGuestUser() {
  return {
    username: "guest",
    fullname: "guest",
    password: "guest",
    imgUrl:
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    _id: "0000",
    pantry: [],
    favourites: [],
  };
}
function remove(userId: string) {
  // return storageService.remove("user", userId);
  return httpService.delete(`user/${userId}`);
}

async function login(userCred: UserCred) {
  // const users = await getUsers();
  // const user = users.find(
  //   (user: UserObj) =>
  //     user.username === userCred.username && user.password === userCred.password
  // );
  const user = await httpService.post("auth/login", userCred);
  if (user) {
    return saveLocalUser(user);
  } else return null;
}

async function signup(userCred: UserCred) {
  if (!userCred.imgUrl)
    userCred.imgUrl =
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";
  userCred.pantry = [];
  userCred.favourites = [];
  // const user = await storageService.post("user", userCred);
  const user = await httpService.post("auth/signup", userCred);
  return saveLocalUser(user);
}

async function logout() {
  // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  return await httpService.post("auth/logout");
}

async function updateUser(updatedUser: RefubrishedUserObj) {

  // await storageService.put("user", updatedUser);
  
  updatedUser = await httpService.put(`user/${updatedUser._id}`, updatedUser);
  const loggedinUser = getLoggedinUser();

  if (loggedinUser._id === updatedUser._id) saveLocalUser(updatedUser);
  return updatedUser;
}
function saveLocalUser(user: RefubrishedUserObj) {
  
  const { _id, fullname, imgUrl, pantry, favourites } = user;
  const newUser = {
    _id,
    fullname,
    imgUrl,
    pantry,
    favourites,
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(newUser));
  return newUser;
}

function getLoggedinUser(): RefubrishedUserObj {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}
