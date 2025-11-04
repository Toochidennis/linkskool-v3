
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Learn section routes
import Dashboard from "#/layouts/learn/dashboard/page";
import Courses from '#/layouts/learn/courses/Courses';
import Wallet from '#/layouts/learn/wallet/WalletLayout';
import Settings from '#/layouts/learn/settings/page';
import Notifications from '#/layouts/learn/notifications/page';
const CourseDetail = lazy(() => import('#/layouts/learn/courses/course-detail/page'));
const CohortDetail = lazy(() => import('#/layouts/learn/courses/cohort-detail/page'));

import NotFound from '#/components/common/NotFound';

const routes: RouteObject[] = [
    // {
    //   path: '/',
    //   element: <Home />
    // },
    // Learn routes
    {
        path: '/',
        element: <Dashboard />
    },
    {
        path: '/learn',
        element: <Dashboard />
    },
    {
        path: '/learn/courses',
        element: <Courses />
    },
    {
        path: '/learn/wallet',
        element: <Wallet />
    },
    {
        path: '/learn/notifications',
        element: <Notifications />
    },
    {
        path: '/learn/settings',
        element: <Settings />
    },
    {
        path: '/learn/course/:id',
        element: <CourseDetail />
    },
    {
        path: '/learn/cohort/:id',
        element: <CohortDetail />
    },
    {
        path: '*',
        element: <NotFound />
    }
];

export default routes;


