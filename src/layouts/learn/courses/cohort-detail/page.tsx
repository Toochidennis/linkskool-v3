
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Overview from './components/Overview';
import Coursework from '#/components/modules/learn/Coursework';
import Students from './components/Students';
import Payments from './components/Payments';
import Discussions from './components/Discussions';
import Grading from './components/Grading';
import {
    RiEyeLine,
    RiUserLine,
    RiBookOpenLine,
    RiArrowLeftLine,
    RiMoneyDollarCircleLine,
    RiChat3Line,
    RiBarChartLine,
} from 'react-icons/ri';

const mockCohort = {
    id: 1,
    title: 'Advanced Chemistry - Spring 2024',
    courseTitle: 'Advanced Chemistry',
    description: 'Intensive 12-week cohort covering advanced chemistry concepts with hands-on laboratory work and research projects.',
    banner: 'https://readdy.ai/api/search-image?query=modern%20chemistry%20laboratory%20classroom%20setting%20with%20students%2C%20colorful%20chemical%20reactions%2C%20test%20tubes%2C%20beakers%2C%20scientific%20equipment%2C%20bright%20educational%20environment%2C%20collaborative%20learning%20atmosphere&width=800&height=300&seq=cohort-banner&orientation=landscape',
    startDate: '2024-03-15',
    endDate: '2024-06-15',
    enrolledStudents: 15,
    maxStudents: 20,
    status: 'active',
    instructor: 'Dr. Sarah Wilson',
    schedule: 'Mon, Wed, Fri - 10:00 AM to 12:00 PM'
};

const CohortDetail: React.FC = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: RiEyeLine, color: 'from-blue-500 to-cyan-500' },
        { id: 'coursework', label: 'Coursework', icon: RiBookOpenLine, color: 'from-purple-500 to-pink-500' },
        { id: 'students', label: 'Students', icon: RiUserLine, color: 'from-green-500 to-emerald-500' },
        { id: 'discussions', label: 'Discussions', icon: RiChat3Line, color: 'from-teal-500 to-cyan-500' },
        { id: 'grading', label: 'Grading', icon: RiBarChartLine, color: 'from-rose-500 to-pink-500' },
        { id: 'payments', label: 'Payments', icon: RiMoneyDollarCircleLine, color: 'from-yellow-500 to-orange-500' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview cohort={mockCohort} />;
            case 'coursework':
                return <Coursework cohortId={Number(id)} />;
            case 'students':
                return <Students cohortId={Number(id)} />;
            case 'discussions':
                return <Discussions cohortId={Number(id)} />;
            case 'grading':
                return <Grading cohortId={Number(id)} />;
            case 'payments':
                return <Payments cohortId={Number(id)} />;
            default:
                return <Overview cohort={mockCohort} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
                <div className="px-4 py-4">
                    <div className="flex items-center space-x-4 mb-6">
                        <button className="p-3 hover:bg-white/60 rounded-xl transition-all duration-300 group">
                            <RiArrowLeftLine
                                className="text-gray-600 group-hover:text-gray-900 text-lg cursor-pointer"
                                size={24}
                                onClick={() => window.history.back()}
                            />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                {mockCohort.title}
                            </h1>
                            <p className="text-gray-600 font-medium mt-1">{mockCohort.courseTitle} • {mockCohort.instructor}</p>
                        </div>
                    </div>

                    {/* Modern Tabs */}
                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <div className={`w-6 h-6 flex items-center justify-center rounded-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-white/20' : 'group-hover:bg-white/50'
                                    }`}>
                                    <tab.icon className={`${tab.icon} text-sm`}></tab.icon>
                                </div>
                                <span className="text-sm font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1">
                {renderTabContent()}
            </div>
        </div>
    );
}

export default CohortDetail;
