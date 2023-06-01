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
  updatePantry,
};

function getUsers() {
  return storageService.query("user");
  // return httpService.get(`user`);
}

async function getById(userId: string): Promise<any> {
  const user = storageService.get("user", userId);
  // const user = await httpService.get(`user/${userId}`)
  return user;
}
function remove(userId: string) {
  return storageService.remove("user", userId);
  // return httpService.delete(`user/${userId}`)
}

async function login(userCred: UserCred) {
  const users = await storageService.query("user");
  const user = users.find(
    (user: UserObj) => user.username === userCred.username
  );
  // const user = await httpService.post('auth/login', userCred)
  if (user) {
    return saveLocalUser(user);
  }
}

async function signup(userCred: UserCred) {
  if (!userCred.imgUrl)
    userCred.imgUrl =
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";
  userCred.pantry = [];
  const user = await storageService.post("user", userCred);
  // const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeRecipe(STORAGE_KEY_LOGGEDIN_USER);
  // socketService.logout()
  return await httpService.post("auth/logout");
}

async function updatePantry({ _id, ingName, flag }) {
  let user = await getById(_id);
  user = flag
    ? addIngToPantry(user, ingName)
    : removeIngFromPantry(user, ingName);

  await storageService.put("user", user);

  // user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  const loggedinUser = await getLoggedinUser();
  if (loggedinUser._id === user._id) saveLocalUser(user);
  return user;
}
function addIngToPantry(user: UserObj, ingName: string) {
  user.pantry.push(ingName);
  return user;
}
function removeIngFromPantry(user: UserObj, ingName: string) {
  const idx = user.pantry.findIndex((ing) => ing === ingName);
  user.pantry.splice(idx, 1);
  return user;
}
function saveLocalUser(user: UserObj) {
  const { _id, fullname, imgUrl, pantry } = user;
  const newUser = {
    _id,
    fullname,
    imgUrl,
    pantry,
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(newUser));
  return newUser;
}

function getLoggedinUser(): Promise<UserObj> {
  return Promise.resolve(
    JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
  );
}

// ;(async ()=>{
// await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123'})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123'})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123'})
// })()
