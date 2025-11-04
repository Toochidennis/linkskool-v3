
import Card from '#/components/modules/learn/Card';

interface OverviewProps {
    cohort: {
        title: string;
        courseTitle: string;
        description: string;
        banner: string;
        startDate: string;
        endDate: string;
        enrolledStudents: number;
        maxStudents: number;
        status: string;
        instructor: string;
        schedule: string;
    };
}

export default function Overview({ cohort }: OverviewProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'enrollment': return 'bg-blue-100 text-blue-800';
            case 'draft': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Cohort Banner */}
            <Card>
                <div className="relative">
                    <img
                        src={cohort.banner}
                        alt={cohort.title}
                        className="w-full h-64 object-cover object-top rounded-lg"
                    />
                    <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cohort.status)}`}>
                            {cohort.status.charAt(0).toUpperCase() + cohort.status.slice(1)}
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{cohort.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{cohort.description}</p>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cohort Information */}
                <div className="lg:col-span-2">
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cohort Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Course</label>
                                    <p className="text-gray-900">{cohort.courseTitle}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Instructor</label>
                                    <p className="text-gray-900">{cohort.instructor}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Start Date</label>
                                    <p className="text-gray-900">{new Date(cohort.startDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">End Date</label>
                                    <p className="text-gray-900">{new Date(cohort.endDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Schedule</label>
                                    <p className="text-gray-900">{cohort.schedule}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Duration</label>
                                    <p className="text-gray-900">12 weeks</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Progress Timeline */}
                    <Card className="mt-6">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
                            <div className="relative">
                                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <i className="ri-check-line text-white text-sm"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Introduction to Chemistry</h4>
                                            <p className="text-sm text-gray-600">Completed • Week 1-2</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <i className="ri-play-line text-white text-sm"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Organic Chemistry</h4>
                                            <p className="text-sm text-gray-600">In Progress • Week 3-6</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                            <i className="ri-time-line text-white text-sm"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Physical Chemistry</h4>
                                            <p className="text-sm text-gray-600">Upcoming • Week 7-10</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                            <i className="ri-graduation-cap-line text-white text-sm"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Final Projects</h4>
                                            <p className="text-sm text-gray-600">Upcoming • Week 11-12</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Statistics & Actions */}
                <div className="space-y-4">
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment</h3>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">
                                    {cohort.enrolledStudents}/{cohort.maxStudents}
                                </div>
                                <p className="text-gray-600 mb-4">Students Enrolled</p>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${(cohort.enrolledStudents / cohort.maxStudents) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    {Math.round((cohort.enrolledStudents / cohort.maxStudents) * 100)}% Full
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <i className="ri-file-text-line text-blue-600"></i>
                                        <span className="text-gray-600">Assignments</span>
                                    </div>
                                    <span className="font-semibold text-gray-900">8</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <i className="ri-question-line text-purple-600"></i>
                                        <span className="text-gray-600">Quizzes</span>
                                    </div>
                                    <span className="font-semibold text-gray-900">5</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <i className="ri-chat-3-line text-green-600"></i>
                                        <span className="text-gray-600">Discussions</span>
                                    </div>
                                    <span className="font-semibold text-gray-900">12</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <i className="ri-trophy-line text-yellow-600"></i>
                                        <span className="text-gray-600">Avg. Grade</span>
                                    </div>
                                    <span className="font-semibold text-gray-900">87%</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                    <i className="ri-user-add-line text-blue-600"></i>
                                    <span>Invite Students</span>
                                </button>
                                <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                    <i className="ri-mail-send-line text-green-600"></i>
                                    <span>Send Announcement</span>
                                </button>
                                <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                    <i className="ri-download-line text-purple-600"></i>
                                    <span>Export Reports</span>
                                </button>
                                <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                    <i className="ri-settings-line text-gray-600"></i>
                                    <span>Cohort Settings</span>
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
