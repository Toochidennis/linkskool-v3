
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '#/components/modules/learn/Card';
import Button from '#/components/modules/learn/Button';

import {
    RiAddLine,
    RiPlayCircleLine,
    RiUserAddLine,
    RiDraftLine,
    RiArchiveLine,
    RiCheckDoubleLine,
    RiQuestionLine,
    RiPauseCircleLine,
    RiStopCircleLine,
    RiDeleteBinLine,
    RiSendPlaneLine,
    RiFileCopyLine,
    RiRestartLine,
    RiEyeLine,
    RiEditLine,
    RiGridLine,
    RiListCheck,
    RiUserLine,
    RiMore2Line,
    RiCalendarLine,
    RiMoneyDollarCircleLine,
    RiSettingsLine,
    RiCloseLine,
    RiImageLine,
    RiUpload2Line,
    RiSearchLine,
    RiCheckLine,
    RiTeamLine
} from 'react-icons/ri';

interface CohortsProps {
    courseId: number;
}

const mockCohorts = [
    {
        id: 1,
        title: 'Advanced Chemistry - Spring 2024',
        startDate: '2024-03-15',
        endDate: '2024-06-15',
        enrolledStudents: 15,
        maxStudents: 20,
        status: 'active',
        instructor: 'Dr. Sarah Wilson',
        revenue: 12500,
        completionRate: 87,
        price: 800,
        banner: 'https://readdy.ai/api/search-image?query=modern%20chemistry%20laboratory%20classroom%20with%20students%20working%20on%20experiments%2C%20colorful%20chemical%20reactions%2C%20test%20tubes%20and%20beakers%2C%20bright%20educational%20environment%2C%20professional%20academic%20setting%2C%20high%20quality%20photography&width=400&height=200&seq=cohort1-banner&orientation=landscape'
    },
    {
        id: 2,
        title: 'Advanced Chemistry - Summer 2024',
        startDate: '2024-06-20',
        endDate: '2024-09-20',
        enrolledStudents: 12,
        maxStudents: 18,
        status: 'enrollment',
        instructor: 'Dr. Sarah Wilson',
        revenue: 9600,
        completionRate: 0,
        price: 850,
        banner: 'https://readdy.ai/api/search-image?query=summer%20chemistry%20laboratory%20with%20bright%20sunlight%2C%20students%20conducting%20experiments%2C%20colorful%20solutions%20and%20chemicals%2C%20modern%20lab%20equipment%2C%20collaborative%20learning%20environment%2C%20high%20quality%20educational%20photography&width=400&height=200&seq=cohort2-banner&orientation=landscape'
    },
    {
        id: 3,
        title: 'Advanced Chemistry - Fall 2024',
        startDate: '2024-09-25',
        endDate: '2024-12-25',
        enrolledStudents: 5,
        maxStudents: 25,
        status: 'draft',
        instructor: 'Dr. Sarah Wilson',
        revenue: 0,
        completionRate: 0,
        price: 900,
        banner: 'https://readdy.ai/api/search-image?query=autumn%20chemistry%20laboratory%20setting%20with%20warm%20lighting%2C%20advanced%20scientific%20equipment%2C%20molecular%20models%2C%20students%20preparing%20for%20experiments%2C%20professional%20academic%20atmosphere%2C%20high%20quality%20photography&width=400&height=200&seq=cohort3-banner&orientation=landscape'
    }
];

const mockCollaborators = [
    { id: 1, name: 'Dr. Sarah Wilson', email: 'sarah@university.edu', avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20teacher%20portrait%2C%20friendly%20smile%2C%20business%20casual%20attire%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=40&height=40&seq=sarah-small&orientation=squarish', role: 'instructor' },
    { id: 2, name: 'Prof. Michael Chen', email: 'michael@university.edu', avatar: 'https://readdy.ai/api/search-image?query=professional%20male%20teacher%20portrait%2C%20friendly%20smile%2C%20business%20casual%20attire%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=40&height=40&seq=michael-small&orientation=squarish', role: 'co-instructor' },
    { id: 3, name: 'Dr. Emma Rodriguez', email: 'emma@university.edu', avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20assistant%20portrait%2C%20friendly%20smile%2C%20business%20casual%20attire%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=40&height=40&seq=emma-small&orientation=squarish', role: 'assistant' },
    { id: 4, name: 'Alex Thompson', email: 'alex@university.edu', avatar: 'https://readdy.ai/api/search-image?query=professional%20young%20male%20teaching%20assistant%20portrait%2C%20friendly%20smile%2C%20business%20casual%20attire%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=40&height=40&seq=alex-small&orientation=squarish', role: 'teaching-assistant' },
    { id: 5, name: 'Maria Garcia', email: 'maria@university.edu', avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20moderator%20portrait%2C%20friendly%20smile%2C%20business%20casual%20attire%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=40&height=40&seq=maria-small&orientation=squarish', role: 'moderator' }
];

const Cohorts: React.FC<CohortsProps> = ({ courseId }) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCollaborators, setSelectedCollaborators] = useState<number[]>([]);
    const [showDropdown, setShowDropdown] = useState<number | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string>('');
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        maxStudents: '',
        schedule: '',
        price: '',
        description: ''
    });
    const navigate = useNavigate();

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'active':
                return {
                    bg: 'bg-gradient-to-r from-emerald-500/10 to-green-500/10',
                    badge: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
                    icon: <RiPlayCircleLine className="text-emerald-600" />,
                    dot: 'bg-emerald-500'
                };
            case 'enrollment':
                return {
                    bg: 'bg-gradient-to-r from-blue-500/10 to-sky-500/10',
                    badge: 'bg-blue-100 text-blue-700 border border-blue-200',
                    icon: <RiUserAddLine className="text-blue-600" />,
                    dot: 'bg-blue-500'
                };
            case 'draft':
                return {
                    bg: 'bg-gradient-to-r from-amber-500/10 to-yellow-500/10',
                    badge: 'bg-amber-100 text-amber-700 border border-amber-200',
                    icon: <RiDraftLine className="text-amber-600" />,
                    dot: 'bg-amber-500'
                };
            case 'archived':
                return {
                    bg: 'bg-gradient-to-r from-gray-500/10 to-slate-500/10',
                    badge: 'bg-gray-100 text-gray-700 border border-gray-200',
                    icon: <RiArchiveLine className="text-gray-600" />,
                    dot: 'bg-gray-500'
                };
            case 'completed':
                return {
                    bg: 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10',
                    badge: 'bg-purple-100 text-purple-700 border border-purple-200',
                    icon: <RiCheckDoubleLine className=" text-purple-600" />,
                    dot: 'bg-purple-500'
                };
            default:
                return {
                    bg: 'bg-gradient-to-r from-gray-500/10 to-slate-500/10',
                    badge: 'bg-gray-100 text-gray-700 border border-gray-200',
                    icon: <RiQuestionLine className="text-gray-600" />,
                    dot: 'bg-gray-500'
                };
        }
    };

    const handleViewCohort = (cohortId: number) => {
        navigate(`/learn/cohort/${cohortId}`);
    };

    const handleCollaboratorToggle = (collaboratorId: number) => {
        setSelectedCollaborators(prev =>
            prev.includes(collaboratorId)
                ? prev.filter(id => id !== collaboratorId)
                : [...prev, collaboratorId]
        );
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setBannerFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setBannerPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            startDate: '',
            endDate: '',
            maxStudents: '',
            schedule: '',
            price: '',
            description: ''
        });
        setSelectedCollaborators([]);
        setBannerFile(null);
        setBannerPreview('');
        setShowCreateModal(false);
    };

    const handleSaveDraft = () => {
        // Save as draft logic here
        console.log('Saving as draft...', { formData, selectedCollaborators, bannerFile });
        resetForm();
    };

    const handleCreateCohort = () => {
        // Create cohort logic here
        console.log('Creating cohort...', { formData, selectedCollaborators, bannerFile });
        resetForm();
    };

    const getActionItems = (cohort: any) => {
        const baseActions = [
            { icon: RiEyeLine, label: 'View Details', color: 'text-blue-600 hover:bg-blue-50', action: () => handleViewCohort(cohort.id) },
            { icon: RiEditLine, label: 'Edit Cohort', color: 'text-green-600 hover:bg-green-50', action: () => console.log('Edit', cohort.id) }
        ];

        switch (cohort.status) {
            case 'active':
                return [
                    ...baseActions,
                    { icon: RiPauseCircleLine, label: 'Pause Cohort', color: 'text-orange-600 hover:bg-orange-50', action: () => console.log('Pause', cohort.id) },
                    { icon: RiStopCircleLine, label: 'Stop Cohort', color: 'text-red-600 hover:bg-red-50', action: () => console.log('Stop', cohort.id) },
                    { icon: RiArchiveLine, label: 'Archive', color: 'text-gray-600 hover:bg-gray-50', action: () => console.log('Archive', cohort.id) }
                ];
            case 'enrollment':
                return [
                    ...baseActions,
                    { icon: RiPlayCircleLine, label: 'Start Cohort', color: 'text-green-600 hover:bg-green-50', action: () => console.log('Start', cohort.id) },
                    { icon: RiDeleteBinLine, label: 'Delete', color: 'text-red-600 hover:bg-red-50', action: () => console.log('Delete', cohort.id) },
                    { icon: RiArchiveLine, label: 'Archive', color: 'text-gray-600 hover:bg-gray-50', action: () => console.log('Archive', cohort.id) }
                ];
            case 'draft':
                return [
                    ...baseActions,
                    { icon: RiSendPlaneLine, label: 'Publish', color: 'text-blue-600 hover:bg-blue-50', action: () => console.log('Publish', cohort.id) },
                    { icon: RiFileCopyLine, label: 'Duplicate', color: 'text-purple-600 hover:bg-purple-50', action: () => console.log('Duplicate', cohort.id) },
                    { icon: RiDeleteBinLine, label: 'Delete', color: 'text-red-600 hover:bg-red-50', action: () => console.log('Delete', cohort.id) }
                ];
            case 'completed':
                return [
                    ...baseActions,
                    { icon: RiFileCopyLine, label: 'Duplicate', color: 'text-purple-600 hover:bg-purple-50', action: () => console.log('Duplicate', cohort.id) },
                    { icon: RiArchiveLine, label: 'Archive', color: 'text-gray-600 hover:bg-gray-50', action: () => console.log('Archive', cohort.id) }
                ];
            case 'archived':
                return [
                    { icon: RiEyeLine, label: 'View Details', color: 'text-blue-600 hover:bg-blue-50', action: () => handleViewCohort(cohort.id) },
                    { icon: RiRestartLine, label: 'Restore', color: 'text-green-600 hover:bg-green-50', action: () => console.log('Restore', cohort.id) },
                    { icon: RiDeleteBinLine, label: 'Delete Permanently', color: 'text-red-600 hover:bg-red-50', action: () => console.log('Delete permanently', cohort.id) }
                ];
            default:
                return baseActions;
        }
    };

    return (
        <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Course Cohorts
                        </h2>
                        <p className="text-gray-600 mt-2 text-lg">Create and manage cohort schedules with student enrollments</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${viewMode === 'grid'
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <RiGridLine />
                                <span>Grid</span>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${viewMode === 'list'
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <RiListCheck />
                                <span>List</span>
                            </button>
                        </div>
                        <Button onClick={() => setShowCreateModal(true)} variant="primary" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl px-6 py-3">
                            <RiAddLine className="mr-2" />
                            Create Cohort
                        </Button>
                    </div>
                </div>
            </div>

            {/* Cohorts Display */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mockCohorts.map((cohort) => {
                        const statusConfig = getStatusConfig(cohort.status);
                        const actionItems = getActionItems(cohort);
                        return (
                            <Card key={cohort.id} className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl overflow-hidden">
                                {/* Banner Image */}
                                {cohort.banner && (
                                    <div className="relative h-32 overflow-hidden">
                                        <img
                                            src={cohort.banner}
                                            alt={cohort.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Status and Price */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-3 h-3 ${statusConfig.dot} rounded-full`}></div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.badge}`}>
                                                {cohort.status.charAt(0).toUpperCase() + cohort.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-gray-900">${cohort.price}</div>
                                                <div className="text-xs text-gray-500">per student</div>
                                            </div>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowDropdown(showDropdown === cohort.id ? null : cohort.id)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <RiMore2Line className="text-gray-600" />
                                                </button>
                                                {showDropdown === cohort.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
                                                        {actionItems.map((item, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => {
                                                                    item.action();
                                                                    setShowDropdown(null);
                                                                }}
                                                                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors first:rounded-t-xl last:rounded-b-xl ${item.color}`}
                                                            >
                                                                <item.icon  />
                                                                <span>{item.label}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Title and Description */}
                                    <div className="mb-6">
                                        <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2">{cohort.title}</h3>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <RiCalendarLine className="mr-2 text-gray-400" />
                                                {new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center">
                                                <RiUserLine className="mr-2 text-gray-400" />
                                                {cohort.enrolledStudents} / {cohort.maxStudents} students enrolled
                                            </div>
                                            <div className="flex items-center">
                                                <RiMoneyDollarCircleLine className="mr-2 text-gray-400" />
                                                ${cohort.revenue.toLocaleString()} total revenue
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Enrollment Progress</span>
                                            <span className="font-semibold">{Math.round((cohort.enrolledStudents / cohort.maxStudents) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${(cohort.enrolledStudents / cohort.maxStudents) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center space-x-3">
                                        <Button
                                            onClick={() => handleViewCohort(cohort.id)}
                                            variant="primary"
                                            size="sm"
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                        >
                                            <RiSettingsLine className="mr-2" />
                                            Manage
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-4">
                    {mockCohorts.map((cohort) => {
                        const statusConfig = getStatusConfig(cohort.status);
                        return (
                            <Card key={cohort.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 flex-1">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-4 h-4 ${statusConfig.dot} rounded-full`}></div>
                                                <div className="text-3xl font-bold text-gray-900">${cohort.price}</div>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900 truncate">{cohort.title}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.badge}`}>
                                                        {cohort.status.charAt(0).toUpperCase() + cohort.status.slice(1)}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                                    <div>
                                                        <span className="font-semibold text-gray-700">Duration:</span><br />
                                                        <span className="text-gray-600">{new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-700">Students:</span><br />
                                                        <span className="text-gray-600">{cohort.enrolledStudents} / {cohort.maxStudents}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-700">Revenue:</span><br />
                                                        <span className="text-gray-600">${cohort.revenue.toLocaleString()}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-700">Completion:</span><br />
                                                        <span className="text-gray-600">{cohort.completionRate}%</span>
                                                    </div>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="mt-4">
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${(cohort.enrolledStudents / cohort.maxStudents) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 ml-6">
                                            <Button
                                                onClick={() => handleViewCohort(cohort.id)}
                                                variant="primary"
                                                size="sm"
                                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                            >
                                                <RiSettingsLine className="mr-2" />
                                                Manage
                                            </Button>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowDropdown(showDropdown === cohort.id ? null : cohort.id)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <RiMore2Line className="text-gray-600" />
                                                </button>
                                                {showDropdown === cohort.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
                                                        {getActionItems(cohort).map((item, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => {
                                                                    item.action();
                                                                    setShowDropdown(null);
                                                                }}
                                                                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors first:rounded-t-xl last:rounded-b-xl ${item.color}`}
                                                            >
                                                                <item.icon className="text-gray-600" />
                                                                <span>{item.label}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Create Cohort Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center">
                                        <RiAddLine className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">Create New Cohort</h3>
                                        <p className="text-gray-600">Set up a new cohort for your course</p>
                                    </div>
                                </div>
                                <button
                                    onClick={resetForm}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <RiCloseLine className="text-gray-500 text-xl" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column - Basic Info */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-3">Cohort Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500"
                                            placeholder="Advanced Chemistry - Winter 2024"
                                        />
                                    </div>

                                    {/* Banner Upload */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-3">
                                            Cohort Banner
                                            <span className="text-gray-500 font-normal ml-2">(Optional)</span>
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                                            {bannerPreview ? (
                                                <div className="relative">
                                                    <img
                                                        src={bannerPreview}
                                                        alt="Banner preview"
                                                        className="w-full h-32 object-cover rounded-lg mb-4"
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            setBannerFile(null);
                                                            setBannerPreview('');
                                                        }}
                                                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                                    >
                                                        <RiCloseLine className="text-sm" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="py-8">
                                                    <RiImageLine className="text-4xl text-gray-400 mb-4" />
                                                    <p className="text-gray-600 mb-2">Upload a banner image for your cohort</p>
                                                    <p className="text-sm text-gray-500">Recommended size: 800x300px</p>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleBannerUpload}
                                                className="hidden"
                                                id="banner-upload"
                                            />
                                            <label
                                                htmlFor="banner-upload"
                                                className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer font-medium"
                                            >
                                                <RiUpload2Line className="mr-2" />
                                                {bannerPreview ? 'Change Image' : 'Choose Image'}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-3">Start Date</label>
                                            <input
                                                type="date"
                                                value={formData.startDate}
                                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-3">End Date</label>
                                            <input
                                                type="date"
                                                value={formData.endDate}
                                                onChange={(e) => handleInputChange('endDate', e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-3">Maximum Students</label>
                                            <input
                                                type="number"
                                                value={formData.maxStudents}
                                                onChange={(e) => handleInputChange('maxStudents', e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="25"
                                                min="1"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-3">Price per Student ($)</label>
                                            <input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => handleInputChange('price', e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="800"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-3">Schedule</label>
                                        <input
                                            type="text"
                                            value={formData.schedule}
                                            onChange={(e) => handleInputChange('schedule', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="Mon, Wed, Fri - 10:00 AM to 12:00 PM"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-3">Description (Optional)</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                            placeholder="Brief description of this cohort..."
                                        />
                                    </div>
                                </div>

                                {/* Right Column - Collaborators */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-3">
                                            Add Team Members
                                            <span className="text-gray-500 font-normal ml-2">(Optional)</span>
                                        </label>
                                        <p className="text-sm text-gray-600 mb-4">Select colleagues who will help manage this cohort</p>

                                        {/* Search/Filter */}
                                        <div className="mb-4">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Search collaborators..."
                                                    className="w-full px-4 py-2 pl-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                                                />
                                                <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>

                                        <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-xl p-2">
                                            {mockCollaborators.map((collaborator) => (
                                                <label
                                                    key={collaborator.id}
                                                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${selectedCollaborators.includes(collaborator.id)
                                                            ? 'bg-blue-50 border-blue-200 border'
                                                            : 'border border-transparent'
                                                        }`}
                                                >
                                                    <div className="relative mr-3">
                                                        <img
                                                            src={collaborator.avatar}
                                                            alt={collaborator.name}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        {selectedCollaborators.includes(collaborator.id) && (
                                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                                                <RiCheckLine className="text-white text-xs" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium text-gray-900 text-sm truncate">{collaborator.name}</div>
                                                        <div className="text-xs text-gray-500 truncate">{collaborator.email}</div>
                                                        <div className="text-xs text-blue-600 capitalize font-medium">{collaborator.role.replace('-', ' ')}</div>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCollaborators.includes(collaborator.id)}
                                                        onChange={() => handleCollaboratorToggle(collaborator.id)}
                                                        className="ml-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    />
                                                </label>
                                            ))}
                                        </div>

                                        {/* Selected Collaborators Summary */}
                                        {selectedCollaborators.length > 0 && (
                                            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                                                <div className="flex items-center text-blue-700 mb-3">
                                                    <RiTeamLine className="mr-2" />
                                                    <span className="font-semibold">Selected Team Members ({selectedCollaborators.length})</span>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {selectedCollaborators.map(id => {
                                                        const collaborator = mockCollaborators.find(c => c.id === id);
                                                        return collaborator ? (
                                                            <div key={id} className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-blue-100">
                                                                <div className="flex items-center">
                                                                    <img src={collaborator.avatar} alt={collaborator.name} className="w-6 h-6 rounded-full mr-2" />
                                                                    <div>
                                                                        <div className="text-sm font-medium text-gray-900">{collaborator.name}</div>
                                                                        <div className="text-xs text-blue-600 capitalize">{collaborator.role.replace('-', ' ')}</div>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => handleCollaboratorToggle(collaborator.id)}
                                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                                >
                                                                    <RiCloseLine className="text-sm" />
                                                                </button>
                                                            </div>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {selectedCollaborators.length === 0 && (
                                            <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl mt-4">
                                                <RiTeamLine className="text-2xl mb-2" />
                                                <p className="text-sm">No team members selected</p>
                                                <p className="text-xs">You can add them later from cohort settings</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-gray-200 bg-gray-50 rounded-b-3xl">
                            <div className="flex items-center justify-between">
                                <Button
                                    onClick={resetForm}
                                    variant="ghost"
                                    className="px-8 py-3 font-semibold"
                                >
                                    Cancel
                                </Button>
                                <div className="flex items-center space-x-4">
                                    <Button
                                        onClick={handleSaveDraft}
                                        variant="ghost"
                                        className="px-8 py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold"
                                    >
                                        <RiDraftLine className="mr-2" />
                                        Save Draft
                                    </Button>
                                    <Button
                                        onClick={handleCreateCohort}
                                        variant="primary"
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg font-semibold"
                                    >
                                        <RiAddLine className="mr-2" />
                                        Create Cohort
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cohorts;
