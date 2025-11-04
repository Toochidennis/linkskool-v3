
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Overview from './components/Overview';
import Cohorts from './components/Cohorts';
import Coursework from '../../../../components/modules/learn/Coursework';
import Collaborators from './components/Collaborators';
import {
  RiArrowLeftLine,
  RiBookOpenLine,
  RiEyeLine,
  RiGroupLine,
  RiTeamLine,
} from 'react-icons/ri';

const mockCourse = {
  id: 1,
  title: 'Advanced Chemistry',
  description: 'Comprehensive chemistry course covering organic, inorganic, and physical chemistry principles with hands-on laboratory experiments and real-world applications.',
  banner: 'https://readdy.ai/api/search-image?query=modern%20chemistry%20laboratory%20with%20colorful%20chemical%20reactions%2C%20test%20tubes%2C%20beakers%2C%20scientific%20equipment%2C%20bright%20clean%20environment%2C%20educational%20setting%2C%20high%20quality%20photography%2C%20professional%20academic%20atmosphere&width=800&height=300&seq=chemistry-detail&orientation=landscape',
  instructor: 'Dr. Sarah Wilson',
  duration: '12 weeks',
  level: 'Advanced',
  language: 'English',
  studentCount: 32,
  cohortCount: 3,
  status: 'active',
  createdAt: '2024-01-15',
  lastUpdated: '2024-03-10'
};

export default function CourseDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: RiEyeLine },
    { id: 'cohorts', label: 'Cohorts', icon: RiGroupLine },
    { id: 'coursework', label: 'Coursework', icon: RiBookOpenLine },
    { id: 'collaborators', label: 'Collaborators', icon: RiTeamLine }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview course={mockCourse} />;
      case 'cohorts':
        return <Cohorts courseId={Number(id)} />;
      case 'coursework':
        return <Coursework courseId={Number(id)} />;
      case 'collaborators':
        return <Collaborators courseId={Number(id)} />;
      default:
        return <Overview course={mockCourse} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-3 mb-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <RiArrowLeftLine
                className="text-gray-600 group-hover:text-gray-900 text-lg cursor-pointer"
                size={24}
                onClick={() => window.REACT_APP_NAVIGATE(-1)}
              />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{mockCourse.title}</h1>
              <p className="text-gray-600">{mockCourse.instructor}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <tab.icon className="text-lg" />
                <span>{tab.label}</span>
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
