import { useState } from 'react';
import {
    RiUserAddLine,
    RiFileCheckLine,
    RiMoneyDollarCircleLine,
    RiQuestionLine,
    RiAlarmLine,
    RiAlarmWarningLine,
    RiInformationLine,
    RiNotificationLine,
    RiBookLine,
    RiUserLine,
    RiNotificationOffLine
} from 'react-icons/ri';

const Notifications: React.FC = () => {
    const [filter, setFilter] = useState('all');

    const mockNotifications = [
        {
            id: 1,
            type: 'student_enrolled',
            title: 'New Student Enrollment',
            message: 'Alice Johnson has enrolled in Advanced Mathematics',
            time: '2 minutes ago',
            read: false,
            className: 'Advanced Mathematics',
            studentName: 'Alice Johnson'
        },
        {
            id: 2,
            type: 'assignment_submitted',
            title: 'Assignment Submitted',
            message: 'Bob Smith submitted Calculus Problem Set 1',
            time: '15 minutes ago',
            read: false,
            className: 'Advanced Mathematics',
            studentName: 'Bob Smith'
        },
        {
            id: 3,
            type: 'payment_received',
            title: 'Payment Received',
            message: 'Payment of $299 received for Advanced Mathematics',
            time: '1 hour ago',
            read: false,
            amount: 299,
            className: 'Advanced Mathematics'
        },
        {
            id: 4,
            type: 'question_asked',
            title: 'Student Question',
            message: 'Carol Davis asked a question in Physics Fundamentals discussion',
            time: '2 hours ago',
            read: true,
            className: 'Physics Fundamentals',
            studentName: 'Carol Davis'
        },
        {
            id: 5,
            type: 'class_reminder',
            title: 'Class Reminder',
            message: 'English Literature class starts in 30 minutes',
            time: '3 hours ago',
            read: true,
            className: 'English Literature'
        },
        {
            id: 6,
            type: 'system_update',
            title: 'System Update',
            message: 'New features have been added to the quiz creator',
            time: '1 day ago',
            read: true
        },
        {
            id: 7,
            type: 'student_enrolled',
            title: 'New Student Enrollment',
            message: 'David Wilson has enrolled in Chemistry Lab',
            time: '1 day ago',
            read: true,
            className: 'Chemistry Lab',
            studentName: 'David Wilson'
        },
        {
            id: 8,
            type: 'assignment_overdue',
            title: 'Assignment Overdue',
            message: '3 students have overdue assignments in World History',
            time: '2 days ago',
            read: true,
            className: 'World History'
        }
    ];

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'student_enrolled':
                return { icon: RiUserAddLine, color: 'text-green-600', bg: 'bg-green-100' };
            case 'assignment_submitted':
                return { icon: RiFileCheckLine, color: 'text-blue-600', bg: 'bg-blue-100' };
            case 'payment_received':
                return { icon: RiMoneyDollarCircleLine, color: 'text-green-600', bg: 'bg-green-100' };
            case 'question_asked':
                return { icon: RiQuestionLine, color: 'text-orange-600', bg: 'bg-orange-100' };
            case 'class_reminder':
                return { icon: RiAlarmLine, color: 'text-purple-600', bg: 'bg-purple-100' };
            case 'assignment_overdue':
                return { icon: RiAlarmWarningLine, color: 'text-red-600', bg: 'bg-red-100' };
            case 'system_update':
                return { icon: RiInformationLine, color: 'text-blue-600', bg: 'bg-blue-100' };
            default:
                return { icon: RiNotificationLine, color: 'text-gray-600', bg: 'bg-gray-100' };
        }
    };

    const filteredNotifications = mockNotifications.filter(notification => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !notification.read;
        if (filter === 'read') return notification.read;
        return notification.type === filter;
    });

    const unreadCount = mockNotifications.filter(n => !n.read).length;

    // const markAllAsRead = () => {
    //     // Implementation would mark all notifications as read
    // };

    const markAsRead = (id: number) => {
        // Implementation would mark specific notification as read
    };

    return (
        <div className="flex min-h-screen bg-gray-50">

            <div className="flex-1 flex flex-col">
                {/* <TopBar userRole="teacher" /> */}

                <div className="flex-1 p-8">
                    <div className="max-w-4xl ">
                        <div className="flex items-center justify-between mb-8">
                            <div>

                                <p className="text-lg font-semibold text-gray-600 mt-2">Stay updated with your classes and students</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <span className="text-sm font-medium text-gray-900">Total: {mockNotifications.length}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <span className="text-sm font-medium text-gray-900">Unread: {unreadCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setFilter('all')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${filter === 'all'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setFilter('unread')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${filter === 'unread'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        Unread
                                    </button>
                                    <button
                                        onClick={() => setFilter('student_enrolled')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${filter === 'student_enrolled'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        Enrollments
                                    </button>
                                    <button
                                        onClick={() => setFilter('assignment_submitted')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${filter === 'assignment_submitted'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        Assignments
                                    </button>
                                    <button
                                        onClick={() => setFilter('payment_received')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${filter === 'payment_received'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        Payments
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="divide-y divide-gray-100">
                                {filteredNotifications.map((notification) => {
                                    const iconConfig = getNotificationIcon(notification.type);

                                    return (
                                        <div
                                            key={notification.id}
                                            className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/30' : ''
                                                }`}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconConfig.bg}`}>
                                                    <iconConfig.icon className={`${iconConfig.color} text-lg`} />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-800'}`}>
                                                                {notification.title}
                                                            </h3>
                                                            <p className={`mt-1 text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                                                                {notification.message}
                                                            </p>

                                                            {notification.className && (
                                                                <div className="mt-2 flex items-center space-x-4">
                                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                                        <RiBookLine className="mr-1" />
                                                                        {notification.className}
                                                                    </span>
                                                                    {notification.studentName && (
                                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                            <RiUserLine className="mr-1" />
                                                                            {notification.studentName}
                                                                        </span>
                                                                    )}
                                                                    {notification.amount && (
                                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                            <RiMoneyDollarCircleLine className="mr-1" />
                                                                            ${notification.amount}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center space-x-3">
                                                            <span className="text-sm text-gray-500">{notification.time}</span>
                                                            {!notification.read && (
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {filteredNotifications.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <RiNotificationOffLine className="text-gray-400 text-2xl" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                                        <p className="text-gray-600">You're all caught up!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notifications;