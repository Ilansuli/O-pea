import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./reducers/recipe.slice";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import { compose } from "@reduxjs/toolkit";
import userSlice from "./reducers/user.slice";
const rootReducer = combineReducers({ recipe: recipeSlice, user: userSlice });
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(thunkMiddleware),
  // enhancers: [composeEnhancers],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// import {
//   applyMiddleware,
//   combineReducers,
//   compose,
//   legacy_createStore as createStore,
// } from "redux";
// import thunk from "redux-thunk";
// // import { recipeReducer } from './reducers/recipes.reducer'
// import { userReducer } from "./reducers/user.reducer";
// import recipeSlice from "./reducers/recipe.slice";

// const rootReducer = combineReducers({
//   recipeModule: recipeSlice,
//   userModule: userReducer,
// });
// export const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );
