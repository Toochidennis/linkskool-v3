
import { useState } from 'react';
import Card from '#/components/modules/learn/Card';
import {
    RiUserLine,
    RiGroupLine,
    RiBookOpenLine,
    RiStarFill,
    RiUserAddLine,
    RiFileTextLine,
    RiChat3Line,
    RiQuestionLine,
    RiLink,
    RiMailLine,
    RiQrCodeLine,
    RiShareLine,
    RiBarChartLine,
    RiCalendarCheckLine,
    RiLineChartLine,
    RiFolderZipLine,
    RiCheckLine,
    RiEditLine,
    RiAddLine,
    RiDownloadLine,
    RiSettingsLine,
    RiCloseLine,
    RiTimeLine,
    RiArrowDownSLine,
} from 'react-icons/ri';

interface OverviewProps {
    course: {
        id: number;
        title: string;
        description: string;
        banner: string;
        instructor: string;
        duration: string;
        level: string;
        language: string;
        studentCount: number;
        cohortCount: number;
        status: string;
        createdAt: string;
        lastUpdated: string;
    };
}

export default function Overview({ course }: OverviewProps) {
    const [showShareModal, setShowShareModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [isExporting, setIsExporting] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const stats = [
        { label: 'Total Students', value: course.studentCount, icon: RiUserLine, color: 'blue', change: '+12%' },
        { label: 'Active Cohorts', value: course.cohortCount, icon: RiGroupLine, color: 'green', change: '+1' },
        { label: 'Course Materials', value: 24, icon: RiBookOpenLine, color: 'purple', change: '+3' },
        { label: 'Avg. Rating', value: '4.8', icon: RiStarFill, color: 'yellow', change: '+0.2' }
    ];

    const recentActivity = [
        { action: 'New student enrolled', student: 'Alice Johnson', time: '2 hours ago', icon: RiUserAddLine, color: 'green' },
        { action: 'Assignment submitted', student: 'Bob Smith', time: '4 hours ago', icon: RiFileTextLine, color: 'blue' },
        { action: 'Discussion post', student: 'Carol White', time: '6 hours ago', icon: RiChat3Line, color: 'purple' },
        { action: 'Quiz completed', student: 'David Brown', time: '8 hours ago', icon: RiQuestionLine, color: 'orange' }
    ];

    const shareOptions = [
        { id: 'link', label: 'Copy Link', icon: RiLink, description: 'Share course link with others' },
        { id: 'email', label: 'Email Invitation', icon: RiMailLine, description: 'Send email invitations to specific people' },
        { id: 'qr', label: 'QR Code', icon: RiQrCodeLine, description: 'Generate QR code for easy sharing' },
        { id: 'social', label: 'Social Media', icon: RiShareLine, description: 'Share on social platforms' }
    ];

    const exportOptions = [
        { id: 'students', label: 'Student List', format: 'CSV', size: '2.3 KB', icon: RiUserLine },
        { id: 'grades', label: 'Grade Report', format: 'PDF', size: '156 KB', icon: RiBarChartLine },
        { id: 'attendance', label: 'Attendance Report', format: 'Excel', size: '45 KB', icon: RiCalendarCheckLine },
        { id: 'analytics', label: 'Course Analytics', format: 'PDF', size: '234 KB', icon: RiLineChartLine },
        { id: 'complete', label: 'Complete Report', format: 'ZIP', size: '1.2 MB', icon: RiFolderZipLine }
    ];

    const getColorClasses = (color: string) => {
        switch (color) {
            case 'blue': return { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' };
            case 'green': return { bg: 'bg-green-500', light: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' };
            case 'purple': return { bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' };
            case 'yellow': return { bg: 'bg-yellow-500', light: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' };
            case 'orange': return { bg: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' };
            default: return { bg: 'bg-gray-500', light: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' };
        }
    };

    const handleCopyLink = async () => {
        const courseLink = `${window.location.origin}/course/${course.id}`;
        try {
            await navigator.clipboard.writeText(courseLink);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const handleExport = (type: string) => {
        setIsExporting(true);
        setExportProgress(0);

        const interval = setInterval(() => {
            setExportProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsExporting(false);
                    setShowExportModal(false);
                    setExportProgress(0);
                    // Here you would trigger the actual download
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Course Hero Section */}
            <Card className="overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 border-0 shadow-xl">
                <div className="relative">
                    <img
                        src={course.banner}
                        alt={course.title}
                        className="w-full h-80 object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-end justify-between">
                            <div className="text-white">
                                <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
                                <p className="text-gray-200 text-lg mb-3 max-w-2xl">{course.description}</p>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <RiUserLine className="text-gray-300" />
                                        <span className="text-gray-200">{course.instructor}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RiTimeLine className="text-gray-300" />
                                        <span className="text-gray-200">{course.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RiStarFill className="text-gray-300" />
                                        <span className="text-gray-200">{course.level}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium">
                                    <RiCheckLine className="mr-2" />
                                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const colors = getColorClasses(stat.color);
                    return (
                        <Card key={index} className={`${colors.light} ${colors.border} border hover:shadow-lg transition-all duration-300`}>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center shadow-lg`}>
                                        <stat.icon className="text-white text-xl" />
                                    </div>
                                    <span className={`text-sm font-medium ${colors.text} bg-white/60 px-2 py-1 rounded-full`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                    <p className={`text-sm font-medium ${colors.text}`}>{stat.label}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Course Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Course Details */}
                    <Card className="bg-white shadow-lg border-0">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Course Details</h3>
                                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    <RiEditLine className="text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">Edit</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Instructor</label>
                                        <p className="text-gray-900 text-lg font-medium mt-1">{course.instructor}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Duration</label>
                                        <p className="text-gray-900 text-lg font-medium mt-1">{course.duration}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Level</label>
                                        <p className="text-gray-900 text-lg font-medium mt-1">{course.level}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Language</label>
                                        <p className="text-gray-900 text-lg font-medium mt-1">{course.language}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Created</label>
                                        <p className="text-gray-900 text-lg font-medium mt-1">{new Date(course.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Last Updated</label>
                                        <p className="text-gray-900 text-lg font-medium mt-1">{new Date(course.lastUpdated).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="bg-white shadow-lg border-0">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
                            </div>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => {
                                    const colors = getColorClasses(activity.color);
                                    return (
                                        <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                            <div className={`w-10 h-10 ${colors.light} rounded-full flex items-center justify-center`}>
                                                <activity.icon className={colors.text} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-900 font-medium">{activity.action}</p>
                                                <p className="text-gray-600 text-sm">{activity.student}</p>
                                            </div>
                                            <span className="text-sm text-gray-500">{activity.time}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Performance Chart */}
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 shadow-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Overview</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Student Engagement</span>
                                        <span className="text-sm font-bold text-blue-600">92%</span>
                                    </div>
                                    <div className="w-full bg-white/60 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Assignment Completion</span>
                                        <span className="text-sm font-bold text-green-600">87%</span>
                                    </div>
                                    <div className="w-full bg-white/60 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Course Satisfaction</span>
                                        <span className="text-sm font-bold text-purple-600">95%</span>
                                    </div>
                                    <div className="w-full bg-white/60 rounded-full h-2">
                                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="bg-white shadow-lg border-0">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all group">
                                    <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center">
                                        <RiAddLine className="text-blue-600" />
                                    </div>
                                    <span className="font-medium">Create New Cohort</span>
                                </button>
                                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-all group">
                                    <div className="w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center">
                                        <RiUserAddLine className="text-green-600" />
                                    </div>
                                    <span className="font-medium">Invite Students</span>
                                </button>
                                <button
                                    onClick={() => setShowShareModal(true)}
                                    className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-all group"
                                >
                                    <div className="w-8 h-8 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center">
                                        <RiShareLine className="text-purple-600" />
                                    </div>
                                    <span className="font-medium">Share Course</span>
                                </button>
                                <button
                                    onClick={() => setShowExportModal(true)}
                                    className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-700 rounded-lg transition-all group"
                                >
                                    <div className="w-8 h-8 bg-orange-100 group-hover:bg-orange-200 rounded-lg flex items-center justify-center">
                                        <RiDownloadLine className="text-orange-600" />  
                                    </div>
                                    <span className="font-medium">Export Reports</span>
                                </button>
                                <button
                                    onClick={() => setShowSettingsModal(true)}
                                    className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all group"
                                >
                                    <div className="w-8 h-8 bg-gray-100 group-hover:bg-gray-200 rounded-lg flex items-center justify-center">
                                        <RiSettingsLine className="text-gray-600" />
                                    </div>
                                    <span className="font-medium">Course Settings</span>
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Share Course Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Share Course</h3>
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <RiCloseLine className="text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {shareOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={option.id === 'link' ? handleCopyLink : undefined}
                                        className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors text-left"
                                    >
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <option.icon className="text-purple-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{option.label}</p>
                                            <p className="text-sm text-gray-600">{option.description}</p>
                                        </div>
                                        {option.id === 'link' && copySuccess && (
                                            <span className="text-green-600 text-sm font-medium">Copied!</span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm font-medium text-gray-700 mb-2">Course Link:</p>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={`${window.location.origin}/course/${course.id}`}
                                        readOnly
                                        className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                                    />
                                    <button
                                        onClick={handleCopyLink}
                                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium whitespace-nowrap"
                                    >
                                        {copySuccess ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Reports Modal */}
            {showExportModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Export Reports</h3>
                                <button
                                    onClick={() => setShowExportModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <RiCloseLine className="text-gray-500" />
                                </button>
                            </div>

                            {isExporting && (
                                <div className="mb-6 p-4 bg-orange-50 rounded-xl">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="animate-spin w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full"></div>
                                        <span className="font-medium text-orange-900">Generating report...</span>
                                    </div>
                                    <div className="w-full bg-orange-200 rounded-full h-2">
                                        <div
                                            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${exportProgress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-orange-700 mt-2">{exportProgress}% complete</p>
                                </div>
                            )}

                            <div className="space-y-3">
                                {exportOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <option.icon className="text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{option.label}</p>
                                                <p className="text-sm text-gray-600">{option.format} • {option.size}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleExport(option.id)}
                                            disabled={isExporting}
                                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Export
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Course Settings Modal */}
            {showSettingsModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Course Settings</h3>
                                <button
                                    onClick={() => setShowSettingsModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <RiCloseLine className="text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Basic Information */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                                            <input
                                                type="text"
                                                defaultValue={course.title}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                                            <input
                                                type="text"
                                                defaultValue={course.instructor}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                            <input
                                                type="text"
                                                defaultValue={course.duration}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                                            <div className="relative">
                                                <button className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                    {course.level}
                                                </button>
                                                <RiArrowDownSLine className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <textarea
                                            rows={3}
                                            defaultValue={course.description}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-5   00 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Course Visibility */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Visibility & Access</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">Public Course</p>
                                                <p className="text-sm text-gray-600">Allow anyone to view and enroll</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">Auto-approve Enrollments</p>
                                                <p className="text-sm text-gray-600">Automatically accept new student registrations</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div>
                                    <h4 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h4>
                                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-red-900">Archive Course</p>
                                                <p className="text-sm text-red-700">Hide this course from students and stop new enrollments</p>
                                            </div>
                                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap">
                                                Archive
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => setShowSettingsModal(false)}
                                    className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium whitespace-nowrap"
                                >
                                    Cancel
                                </button>
                                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
