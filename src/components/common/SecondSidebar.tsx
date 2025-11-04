import { Link, useLocation } from "react-router-dom";
import { icons } from "#/assets/icons";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { sidebarRoutes, sectionLabels, RouteItem, SectionType } from "#/routes/sidebarRoutes";

type SidebarProps = {
    isCollapsed: boolean;
    onToggle: () => void;
    routes?: Array<RouteItem>; // Optional override; defaults by section
}

const SecondSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle, routes }) => {
    const location = useLocation();

    // Determine current top-level section (explore | portal | learn)
    // Default to "learn" since that's the starting section
    const section = (location.pathname.split("/")[1] || "learn") as SectionType;

    const effectiveRoutes = routes ?? sidebarRoutes[section] ?? sidebarRoutes["learn"];

    return (
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 
            ${isCollapsed ? 'w-fit' : 'w-64'} flex flex-col h-screen`}>
            {/* Section Header with Collapse Button */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between gap-3">
                    {!isCollapsed && (
                        <h1 className="text-xl font-bold text-gray-900 capitalize truncate">
                            {sectionLabels[section]}
                        </h1>
                    )}
                    <button
                        onClick={onToggle}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {/* <i className={`${isCollapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'} text-gray-600 text-xl`}></i> */}
                        {isCollapsed ? <RiMenuUnfoldLine size={20} /> : <RiMenuFoldLine size={20} />}
                    </button>
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-3 py-6 space-y-2">
                {effectiveRoutes.map((route, index) => {
                    const Icon = icons[route.icon];
                    // Check if route is active with proper path matching
                    // If on root path, highlight the first item (Dashboard)
                    const isActive = location.pathname === '/'
                        ? index === 0
                        : location.pathname === route.path ||
                        (location.pathname.startsWith(route.path + '/') && route.path !== `/${section}`);

                    return (
                        <Link
                            key={route.key}
                            to={route.path}
                            title={isCollapsed ? route.label : undefined}
                            className={`
                                flex items-center rounded-lg 
                                transition-all duration-200 cursor-pointer
                                ${isCollapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'}
                                ${isActive
                                    ? 'bg-blue-50 text-blue-600 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center justify-center flex-shrink-0">
                                {Icon && <Icon className="text-lg" size={20} />}
                            </div>
                            {!isCollapsed && <span className="ml-3 font-medium whitespace-nowrap">{route.label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </div>
    )
}

export default SecondSidebar
