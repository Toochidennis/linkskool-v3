import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import FirstSidebar from './FirstSidebar';
import SecondSidebar from './SecondSidebar';
import Header from './Header';
import { getActiveRouteLabel } from '#/routes/sidebarRoutes';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSecondSidebarCollapsed, setIsSecondSidebarCollapsed] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const location = useLocation();
    const mainRef = useRef<HTMLElement>(null);

    const appBarTitle = getActiveRouteLabel(location.pathname);

    // Scroll to top when route changes
    useEffect(() => {
        if (mainRef.current) {
            mainRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [location.pathname]);

    return (
        <div className='flex h-screen bg-gray-50'>
            <FirstSidebar />

            <SecondSidebar
                isCollapsed={isSecondSidebarCollapsed}
                onToggle={() => setIsSecondSidebarCollapsed(!isSecondSidebarCollapsed)}
            />
            <div className='flex flex-col flex-1 overflow-hidden'>
                <Header
                    appBarTitle={appBarTitle}
                    onToggleNotifications={() => setNotifications(!notifications)}
                    onToggleProfileMenu={() => setProfileMenuOpen(!profileMenuOpen)}
                    notificationsOpen={notifications}
                    profileMenuOpen={profileMenuOpen}
                />
                <main ref={mainRef} className='flex-1 overflow-auto'>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
