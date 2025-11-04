import { Link, useLocation } from "react-router-dom";
import { icons } from "#/assets/icons";
import Logo from "#/assets/imgs/logo.svg";

const FirstSidebar: React.FC = () => {
    const location = useLocation();

    const routes = [
        { path: "/explore", key: "explore", label: "Explore", icon: "ri-earth-line" },
        { path: "/portal", key: "portal", label: "Portal", icon: "ri-tools-line" },
        { path: "/learn", key: "learn", label: "Learn", icon: "ri-book-line" },
    ] as const;

    const gradients: Record<(typeof routes)[number]["key"], string> = {
        explore: "from-purple-500 to-purple-600",
        portal: "from-orange-500 to-orange-600",
        learn: "from-green-500 to-green-600",
    };

    const iconColors: Record<(typeof routes)[number]["key"], string> = {
        explore: "text-purple-600",
        portal: "text-orange-600",
        learn: "text-green-600",
    };

    const hoverBgColors: Record<(typeof routes)[number]["key"], string> = {
        explore: "hover:bg-purple-50",
        portal: "hover:bg-orange-50",
        learn: "hover:bg-green-50",
    };

    const hoverTextColors: Record<(typeof routes)[number]["key"], string> = {
        explore: "group-hover:text-purple-700",
        portal: "group-hover:text-orange-700",
        learn: "group-hover:text-green-700",
    };

    const activeTextColors: Record<(typeof routes)[number]["key"], string> = {
        explore: "text-purple-50",
        portal: "text-orange-50",
        learn: "text-green-50",
    };

    return (
        <div className="fixed md:static inset-y-0 left-0 z-40 bg-transparent transform transition-transform duration-300 h-screen min-h-screen">
            <aside className="w-fit h-screen min-h-screen bg-white/95 backdrop-blur border-r border-gray-200 flex">
                <div className="flex-1 flex flex-col items-center gap-6 p-4">
                    <img src={Logo} alt="LinkSkool Logo" className="h-12 w-auto rounded-xl" />

                    <nav className="w-full flex flex-col gap-3">
                        {routes.map((route) => {
                            const Icon = icons[route.icon];
                            // Check if route is active - for root path, default to learn
                            const isActive = location.pathname === '/'
                                ? route.key === 'learn'
                                : location.pathname.startsWith(route.path);

                            const activeGradient = `bg-gradient-to-b ${gradients[route.key]}`;

                            const linkVariant = isActive
                                ? `${activeGradient} border-transparent`
                                : `bg-white border-gray-100 ${hoverBgColors[route.key]}`;

                            return (
                                <Link
                                    key={route.key}
                                    to={route.path}
                                    className={`group grid place-items-center text-center rounded-lg px-3 py-3 
                                    shadow-sm hover:shadow-md transition-all duration-300 ease-in-out border ${linkVariant}`}
                                >
                                    {Icon && (
                                        <Icon
                                            className={`mb-1.5 ${isActive ? activeTextColors[route.key] : iconColors[route.key]
                                                } ${hoverTextColors[route.key]}`}
                                            size={18}
                                        />
                                    )}
                                    <span
                                        className={`text-xs font-medium tracking-wide ${isActive ? activeTextColors[route.key] : "text-gray-800"
                                            } ${hoverTextColors[route.key]}`}
                                    >
                                        {route.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default FirstSidebar;
