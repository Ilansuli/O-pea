import { configureStore } from '@reduxjs/toolkit'
import recipesSlice from './reducers/recipes.slice'
import userSlice from './reducers/user.slice'
// import aislesSlice from './reducers/aislesSlice'
// import ingredientsSlice from './reducers/ingredientsSlice'

export const store = configureStore({
  reducer: {
    recipes:recipesSlice,
    users:userSlice,
    // aisles: aislesSlice,
    // ingredients: ingredientsSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch














/////////////////////////////////////////////////////////////////////////


// import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
// import thunk from 'redux-thunk'
// import { aislesReducer } from './reducers/aisles.reducer'
// import { userReducer } from './reducers/user.reducer'

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const rootReducer = combineReducers({
//   aislesModule: aislesReducer,
//   userModule: userReducer

// })

// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// // window.gStore = store