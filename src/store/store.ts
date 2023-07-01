import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  compose,
} from "@reduxjs/toolkit";

import recipeSlice from "./reducers/recipe.slice";
import userSlice from "./reducers/user.slice";
const rootReducer = combineReducers({
  recipe: recipeSlice.reducer,
  user: userSlice.reducer,
});
// const rootReducer =
//   combineReducers({ recipe: recipeSlice, user: userSlice });
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
