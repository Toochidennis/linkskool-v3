
import { useState } from 'react';
import Button from '#/components/modules/learn/Button'
import CourseCard from '#/layouts/learn/courses/components/CourseCard'
import {
  RiMore2Fill,
  RiFileTextLine,
  RiGroupLine,
  RiAddLine,
  RiPaletteLine,
  RiFlaskLine,
  RiEyeLine,
  RiTimeLine,
  RiUserLine,
  RiBookLine,
  RiEditLine,
  RiFileCopyLine,
  RiArchiveLine,
  RiDeleteBinLine,
  RiBookOpenLine,
  RiSettingsLine,
  RiSearchLine,
  RiCalendarLine,
  RiDraftLine,
  RiCloseLine,
  RiImageLine,
  RiUpload2Line,
} from 'react-icons/ri';

const mockEnrolledCourses = [
  {
    id: 1,
    title: 'Advanced Chemistry',
    description: 'Comprehensive chemistry course covering organic, inorganic, and physical chemistry principles with hands-on laboratory experiments.',
    banner: 'https://readdy.ai/api/search-image?query=modern%20chemistry%20laboratory%20with%20colorful%20chemical%20reactions%2C%20test%20tubes%2C%20beakers%2C%20scientific%20equipment%2C%20bright%20clean%20environment%2C%20educational%20setting%2C%20high%20quality%20photography%2C%20professional%20academic%20atmosphere&width=400&height=240&seq=chemistry-enrolled&orientation=landscape',
    instructor: 'Dr. Michael Johnson',
    progress: 75,
    nextClass: '2024-01-15 10:00 AM',
    status: 'active' as const,
    level: 'Advanced',
    category: 'Science'
  },
  {
    id: 2,
    title: 'Basic Mathematics',
    description: 'Foundation mathematics covering algebra, geometry, and basic calculus concepts for high school students.',
    banner: 'https://readdy.ai/api/search-image?query=mathematics%20classroom%20with%20mathematical%20equations%20on%20whiteboard%2C%20geometric%20shapes%2C%20calculators%2C%20textbooks%2C%20clean%20modern%20educational%20environment%2C%20bright%20lighting%2C%20academic%20setting&width=400&height=240&seq=math-enrolled&orientation=landscape',
    instructor: 'Prof. Sarah Wilson',
    progress: 45,
    nextClass: '2024-01-16 2:00 PM',
    status: 'active' as const,
    level: 'Beginner',
    category: 'Mathematics'
  },
  {
    id: 3,
    title: 'Physics Workshop',
    description: 'Interactive physics course with practical experiments and real-world applications of physics principles.',
    banner: 'https://readdy.ai/api/search-image?query=physics%20laboratory%20with%20pendulums%2C%20electrical%20circuits%2C%20magnets%2C%20scientific%20instruments%2C%20modern%20educational%20equipment%2C%20clean%20bright%20environment%2C%20professional%20academic%20setting&width=400&height=240&seq=physics-enrolled&orientation=landscape',
    instructor: 'Dr. Emily Chen',
    progress: 90,
    nextClass: 'Completed',
    status: 'completed' as const,
    level: 'Intermediate',
    category: 'Science'
  }
];

const mockOwnedCourses = [
  {
    id: 4,
    title: 'English Literature',
    description: 'Explore classic and contemporary literature with focus on critical analysis and creative writing skills.',
    banner: 'https://readdy.ai/api/search-image?query=cozy%20library%20with%20classic%20books%2C%20reading%20corner%2C%20comfortable%20chairs%2C%20warm%20lighting%2C%20literary%20atmosphere%2C%20educational%20environment%2C%20academic%20setting%2C%20inspiring%20study%20space&width=400&height=240&seq=literature-owned&orientation=landscape',
    studentCount: 24,
    cohortCount: 2,
    status: 'draft' as const,
    level: 'Intermediate',
    duration: '14 weeks',
    price: 450,
    category: 'Language Arts'
  },
  {
    id: 5,
    title: 'Computer Science Basics',
    description: 'Introduction to programming, algorithms, and computer science fundamentals for beginners.',
    banner: 'https://readdy.ai/api/search-image?query=modern%20computer%20lab%20with%20coding%20on%20screens%2C%20keyboards%2C%20monitors%2C%20clean%20tech%20environment%2C%20programming%20workspace%2C%20educational%20technology%20setting%2C%20bright%20professional%20atmosphere&width=400&height=240&seq=cs-owned&orientation=landscape',
    studentCount: 38,
    cohortCount: 3,
    status: 'active' as const,
    level: 'Beginner',
    duration: '16 weeks',
    price: 750,
    category: 'Technology'
  },
  {
    id: 6,
    title: 'Art & Design',
    description: 'Creative course covering drawing, painting, digital design, and art history with hands-on projects.',
    banner: 'https://readdy.ai/api/search-image?query=art%20studio%20with%20paintings%2C%20brushes%2C%20colorful%20palettes%2C%20canvases%2C%20creative%20workspace%2C%20artistic%20materials%2C%20bright%20natural%20lighting%2C%20inspiring%20educational%20environment&width=400&height=240&seq=art-owned&orientation=landscape',
    studentCount: 20,
    cohortCount: 2,
    status: 'active' as const,
    level: 'All Levels',
    duration: '12 weeks',
    price: 600,
    category: 'Arts'
  }
];

const upcomingSchedule = [
  {
    id: 1,
    title: 'Advanced Chemistry - Lab Session',
    time: '10:00 AM - 12:00 PM',
    date: 'Today',
    type: 'lab',
    cohort: 'Chemistry Cohort A',
    students: 15
  },
  {
    id: 2,
    title: 'Computer Science - Project Review',
    time: '2:00 PM - 3:30 PM',
    date: 'Tomorrow',
    type: 'review',
    cohort: 'CS Beginners',
    students: 22
  },
  {
    id: 3,
    title: 'Art & Design - Portfolio Critique',
    time: '11:00 AM - 1:00 PM',
    date: 'Jan 17',
    type: 'critique',
    cohort: 'Art Fundamentals',
    students: 18
  }
];

const Courses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'enrolled' | 'owned'>('enrolled');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState<number | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    prerequisites: '',
    learningObjectives: ''
  });

  const filteredEnrolledCourses = mockEnrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredOwnedCourses = mockOwnedCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewCourse = (id: number) => {
    window.REACT_APP_NAVIGATE(`/learn/course/${id}`);
  };

  const handleEditCourse = (id: number) => {
    console.log('Edit course:', id);
    setShowActionDropdown(null);
  };

  const handleDuplicateCourse = (id: number) => {
    console.log('Duplicate course:', id);
    setShowActionDropdown(null);
  };

  const handleArchiveCourse = (id: number) => {
    console.log('Archive course:', id);
    setShowActionDropdown(null);
  };

  const handleDeleteCourse = (id: number) => {
    console.log('Delete course:', id);
    setShowActionDropdown(null);
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
      description: '',
      category: '',
      level: '',
      prerequisites: '',
      learningObjectives: ''
    });
    setBannerFile(null);
    setBannerPreview('');
    setShowCreateModal(false);
  };

  const handleSaveDraft = () => {
    console.log('Saving course as draft...', { formData, bannerFile });
    resetForm();
  };

  const handleCreateCourse = () => {
    console.log('Creating course...', { formData, bannerFile });
    resetForm();
  };

  const handleCreateCohort = () => {
    console.log('Creating cohort...');
  };

  const handleAddClasswork = () => {
    console.log('Adding classwork...');
  };

  const getActionItems = (course: any) => [
    { icon: RiEyeLine, label: 'View Details', color: 'text-blue-600 hover:bg-blue-50', action: () => handleViewCourse(course.id) },
    { icon: RiEditLine, label: 'Edit Course', color: 'text-green-600 hover:bg-green-50', action: () => handleEditCourse(course.id) },
    { icon: RiFileCopyLine, label: 'Duplicate', color: 'text-purple-600 hover:bg-purple-50', action: () => handleDuplicateCourse(course.id) },
    { icon: RiArchiveLine, label: 'Archive', color: 'text-orange-600 hover:bg-orange-50', action: () => handleArchiveCourse(course.id) },
    { icon: RiDeleteBinLine, label: 'Delete', color: 'text-red-600 hover:bg-red-50', action: () => handleDeleteCourse(course.id) }
  ];

  const renderEnrolledTab = () => (
    <div className="space-y-4">
      {/* Search and Filters for Enrolled */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <RiSearchLine className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" size={22}/>
            <input
              type="text"
              placeholder="Search enrolled courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            {['all', 'active', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${statusFilter === status
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enrolled Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEnrolledCourses.map((course) => (
          <div key={course.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
            <div className="relative">
              <img
                src={course.banner}
                alt={course.title}
                className="w-full h-40 object-cover object-top"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${course.status === 'active' ? 'bg-green-100 text-green-800' :
                  course.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </span>
              </div>
              {course.status === 'active' && (
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-md p-1.5">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[10px] font-medium text-gray-600">Progress</span>
                      <span className="text-[10px] font-bold text-gray-900">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1.5">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-center text-sm text-gray-500">
                  <RiUserLine className="mr-1.5 text-sm" />
                  <span>Instructor: {course.instructor}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <RiCalendarLine className="mr-1.5 text-sm" />
                  <span>Next: {course.nextClass}</span>
                </div>
              </div>

              <Button
                onClick={() => handleViewCourse(course.id)}
                variant="primary"
                size="sm"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs py-3"
              >
                {course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredEnrolledCourses.length === 0 && (
        <div className="text-center py-12">
          <RiBookLine className="text-4xl text-gray-300 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1.5">No enrolled courses found</h3>
          <p className="text-gray-600 text-sm">
            {searchQuery ? 'Try adjusting your search terms' : 'Browse available courses to start learning'}
          </p>
        </div>
      )}
    </div>
  );

  const renderOwnedTab = () => (
    <div className="space-y-5">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs font-medium">Total Active Students</p>
              <p className="text-2xl font-bold text-blue-900 mt-0.5">82</p>
              <p className="text-blue-600 text-[10px] mt-0.5">+12 this month</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <RiUserLine className="text-white text-lg" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-xs font-medium">Active Cohorts</p>
              <p className="text-2xl font-bold text-emerald-900 mt-0.5">7</p>
              <p className="text-emerald-600 text-[10px] mt-0.5">+2 this month</p>
            </div>
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <RiGroupLine className="text-white text-lg" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-xs font-medium">Total Courses</p>
              <p className="text-2xl font-bold text-purple-900 mt-0.5">{mockOwnedCourses.length}</p>
              <p className="text-purple-600 text-[10px] mt-0.5">1 draft, 2 active</p>
            </div>
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <RiBookLine className="text-white text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Upcoming Schedule - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Upcoming Schedule</h3>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 text-xs px-2 py-1">
                View All
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingSchedule.map((item) => (
                <div key={item.id} className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mr-3 ${item.type === 'lab' ? 'bg-blue-100 text-blue-600' :
                    item.type === 'review' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                    {item.type === 'lab' ? <RiFlaskLine className="text-sm" /> :
                      item.type === 'review' ? <RiEyeLine className="text-sm" /> :
                        <RiPaletteLine className="text-sm" />
                    }
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                    <div className="flex items-center space-x-3 mt-0.5">
                      <span className="text-xs text-gray-600 flex items-center">
                        <RiTimeLine className="mr-1 text-xs" />
                        {item.time}
                      </span>
                      <span className="text-xs text-gray-600 flex items-center">
                        <RiGroupLine className="mr-1 text-xs" />
                        {item.students} students
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${item.date === 'Today' ? 'bg-red-100 text-red-800' :
                      item.date === 'Tomorrow' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
            <h3 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h3>

            <div className="space-y-2.5">
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full flex items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all group"
              >
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <RiAddLine className="text-white text-base" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-semibold text-blue-900">Create Course</h4>
                  <p className="text-[10px] text-blue-600">Start building a new course</p>
                </div>
              </button>

              <button
                onClick={handleCreateCohort}
                className="w-full flex items-center p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 transition-all group"
              >
                <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <RiGroupLine className="text-white text-base" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-semibold text-emerald-900">Create Cohort</h4>
                  <p className="text-[10px] text-emerald-600">Add a new student group</p>
                </div>
              </button>

              <button
                onClick={handleAddClasswork}
                className="w-full flex items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all group"
              >
                <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <RiFileTextLine className="text-white text-base" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-semibold text-purple-900">Add Classwork</h4>
                  <p className="text-[10px] text-purple-600">Create assignments or quizzes</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters for Owned Courses */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <RiSearchLine className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" size={22} />
            <input
              type="text"
              placeholder="Search your courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex gap-1 bg-white rounded-lg p-1.5 shadow-sm border border-gray-200">
            {['all', 'active', 'draft'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${statusFilter === status
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Owned Courses Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOwnedCourses.map((course) => (
          <div key={course.id} className="relative">
            <CourseCard
              course={course}
              userRole="teacher"
              onView={handleViewCourse}
              onEdit={handleEditCourse}
              onDelete={handleDeleteCourse}
            />
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={() => setShowActionDropdown(showActionDropdown === course.id ? null : course.id)}
                className="w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
              >
                <RiMore2Fill className="text-gray-600" size={16} />
              </button>
              {showActionDropdown === course.id && (
                <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                  {getActionItems(course).map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={item.action}
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium transition-colors first:rounded-t-lg last:rounded-b-lg ${item.color}`}
                      >
                        <Icon className="text-sm" size={14} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOwnedCourses.length === 0 && (
        <div className="text-center py-12">
          <RiBookLine className="text-4xl text-gray-300 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1.5">No courses found</h3>
          <p className="text-gray-600 text-sm">
            {searchQuery ? 'Try adjusting your search terms' : 'Start by creating your first course'}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">My Courses</h1>
            <p className="text-gray-600 mt-1 text-sm">Manage your learning journey and teaching portfolio</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-gray-200 mb-6 max-w-md">
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`flex-1 py-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${activeTab === 'enrolled'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            <RiBookOpenLine className="text-sm" size={22} />
            <span>Enrolled Courses</span>
          </button>
          <button
            onClick={() => setActiveTab('owned')}
            className={`flex-1 py-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${activeTab === 'owned'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            <RiSettingsLine size={22} />
            <span>My Courses</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'enrolled' ? renderEnrolledTab() : renderOwnedTab()}

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <RiBookOpenLine className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      Create New Course
                    </h3>
                    <p className="text-gray-600 text-lg">Build an engaging learning experience for your students</p>
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
              <div className="space-y-8">
                {/* Course Title */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Course Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg placeholder-gray-400"
                    placeholder="e.g., Advanced Chemistry for High School Students"
                  />
                  <p className="text-sm text-gray-500 mt-2">Choose a clear, descriptive title that students will easily understand</p>
                </div>

                {/* Course Banner Upload */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">Course Banner</label>
                  <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all">
                    {bannerPreview ? (
                      <div className="relative">
                        <img
                          src={bannerPreview}
                          alt="Banner preview"
                          className="w-full h-48 object-cover rounded-xl mb-6 shadow-lg"
                        />
                        <button
                          onClick={() => {
                            setBannerFile(null);
                            setBannerPreview('');
                          }}
                          className="absolute top-3 right-3 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <RiCloseLine className="text-lg" />
                        </button>
                      </div>
                    ) : (
                      <div className="py-12">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <RiImageLine className="text-3xl text-blue-600" />
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Upload Course Banner</h4>
                        <p className="text-gray-600 mb-2">Make your course stand out with an attractive banner image</p>
                        <p className="text-sm text-gray-500">Recommended size: 1200x600px • Max file size: 5MB</p>
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
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <RiUpload2Line className="mr-3 text-lg" />
                      {bannerPreview ? 'Change Banner' : 'Choose Banner Image'}
                    </label>
                  </div>
                </div>

                {/* Course Description */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Course Description
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={5}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg resize-none placeholder-gray-400"
                    placeholder="Provide a comprehensive overview of what students will learn in this course. Include key topics, teaching methods, and what makes this course unique..."
                  />
                  <p className="text-sm text-gray-500 mt-2">Write a detailed description that helps students understand the course content and benefits</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-b-3xl">
              <div className="flex items-center justify-between">
                <Button
                  onClick={resetForm}
                  variant="ghost"
                  className="px-8 py-4 font-semibold text-lg hover:bg-gray-200"
                >
                  Cancel
                </Button>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={handleSaveDraft}
                    variant="ghost"
                    className="px-8 py-4 bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold text-lg"
                  >
                    <RiDraftLine className="mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    onClick={handleCreateCourse}
                    variant="primary"
                    className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl font-semibold text-lg transform hover:-translate-y-0.5 transition-all"
                  >
                    <RiAddLine className="mr-2" />
                    Create Course
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
