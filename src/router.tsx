// routes.js
import {createBrowserRouter, RouteObject } from 'react-router-dom';
import { Outlet} from 'react-router';
import AppIndex from './views/AppIndex';
import AppSearch from './views/AppSearch';
import RecipeLibrary from './views/RecipeLibrary.js';
import StatsView from './views/StatsView.js';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <AppIndex />,
        // guard: requireAuth,
    },
    {
        path: '/about',
        element: < AppSearch />,
        // guard: requireAuth,
    },
    {
        path: '/contact',
        element: <RecipeLibrary />,
    },
    {
        path: '/stats',
        element: <StatsView />,
    },
    {
        path: '*',
        element: <Outlet/>,
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


