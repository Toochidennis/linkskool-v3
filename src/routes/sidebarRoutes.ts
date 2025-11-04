export type RouteItem = {
    path: string;
    key: string;
    label: string;
    icon: string;
};

export type SectionType = "explore" | "portal" | "learn";

export const sectionLabels: Record<SectionType, string> = {
    explore: "Explore",
    portal: "Portal",
    learn: "Learn",
};

export const sidebarRoutes: Record<SectionType, RouteItem[]> = {
    explore: [
        { path: "/explore", key: "explore-home", label: "Discover", icon: "ri-compass-3-line" },
        { path: "/explore/topics", key: "explore-topics", label: "Topics", icon: "ri-hashtag" },
        { path: "/explore/collections", key: "explore-collections", label: "Collections", icon: "ri-folders-line" },
        { path: "/explore/settings", key: "explore-settings", label: "Settings", icon: "ri-settings-line" },
    ],
    portal: [
        { path: "/portal", key: "portal-dashboard", label: "Dashboard", icon: "ri-dashboard-line" },
        { path: "/portal/tools", key: "portal-tools", label: "Tools", icon: "ri-tools-line" },
        { path: "/portal/analytics", key: "portal-analytics", label: "Analytics", icon: "ri-bar-chart-line" },
        { path: "/portal/settings", key: "portal-settings", label: "Settings", icon: "ri-settings-line" },
    ],
    learn: [
        { path: "/learn", key: "learn-dashboard", label: "Dashboard", icon: "ri-dashboard-line" },
        { path: "/learn/courses", key: "learn-courses", label: "Courses", icon: "ri-book-line" },
        { path: "/learn/wallet", key: "learn-wallet", label: "Wallet & Earnings", icon: "ri-wallet-line" },
        { path: "/learn/notifications", key: "learn-notifications", label: "Notifications", icon: "ri-notification-line" },
        { path: "/learn/settings", key: "learn-settings", label: "Settings", icon: "ri-settings-line" },
    ],
};

/**
 * Get the active route label based on the current pathname
 */
export const getActiveRouteLabel = (pathname: string): string => {
    const section = (pathname.split("/")[1] || "explore") as SectionType;
    const routes = sidebarRoutes[section] || sidebarRoutes["explore"];
    
    // Find the matching route
    const activeRoute = routes.find(route => 
        route.path === pathname || 
        (route.path !== `/${section}` && pathname.startsWith(route.path))
    ) || routes.find(route => route.path === `/${section}`);
    
    return activeRoute?.label || "Dashboard";
};
