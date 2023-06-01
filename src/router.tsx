// routes.js
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router';
import AppIndex from './views/AppIndex';
import LoginSignup from './cmps/LoginSignup';
const routes: RouteObject[] = [
    {
        path: '/',
        element: <AppIndex />,
        // guard: requireAuth,
    },
    {
        path: '/login',
        element: <LoginSignup />
    },
    {
        path: '/signup',
        element: <LoginSignup />
    },
    {
        path: '*',
        element: <Outlet />,
    },
];

// navigation guard
// function requireAuth(currentLocation, nextLocation) {
//  // Check if the user is authenticated
//  if (!isAuthenticated) {
//   // Redirect to login page with a query parameter to indicate the intended route
//   navigate('/login?redirect=' + nextLocation.pathname);
//   return false;
//  }
//  return true;
// }

export const router = createBrowserRouter(routes);


