
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '#/components/modules/learn/Button';
import EnrollmentFlow from '#/layouts/learn/dashboard/components/EnrollmentFlow';
import LearningInterface from '#/components/modules/learn/LearningInterface';
import {
  RiBookLine,
  RiCalendarLine,
  RiCheckLine,
  RiCloseLine,
  RiPlayCircleLine,
  RiSearchLine,
  RiStarFill,
  RiStarHalfFill,
  RiStarLine,
  RiStopCircleLine,
  RiTimeLine,
  RiUserAddLine,
  RiUserLine,
  RiArrowLeftLine,
  RiEyeLine
} from 'react-icons/ri';

// Mock data for available cohorts from different instructors
const mockCohorts = [
  {
    id: 1,
    title: 'Advanced Chemistry - Spring 2024',
    instructor: 'Dr. Sarah Wilson',
    instructorAvatar: 'https://readdy.ai/api/search-image?query=professional%20female%20chemistry%20teacher%20portrait%2C%20friendly%20smile%2C%20lab%20coat%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=60&height=60&seq=sarah-avatar&orientation=squarish',
    instructorBio: 'Dr. Sarah Wilson is a renowned chemistry professor with over 15 years of experience in organic chemistry research. She has published numerous papers in top-tier journals and has been recognized for her innovative teaching methods.',
    category: 'Science',
    startDate: '2024-03-15',
    endDate: '2024-06-15',
    price: 899,
    rating: 4.8,
    reviewCount: 124,
    enrolledStudents: 18,
    maxStudents: 25,
    isEnrolled: false,
    banner: 'https://readdy.ai/api/search-image?query=modern%20chemistry%20laboratory%20classroom%20with%20colorful%20chemical%20reactions%2C%20test%20tubes%20and%20beakers%2C%20students%20working%20on%20experiments%2C%20bright%20educational%20environment%2C%20professional%20academic%20setting%2C%20high%20quality%20photography&width=400&height=200&seq=chem-banner&orientation=landscape',
    description: 'Master advanced chemistry concepts through hands-on laboratory experiments and theoretical foundations. This comprehensive course covers organic synthesis, spectroscopy, and advanced analytical techniques used in modern chemistry research.',
    schedule: 'Monday, Wednesday, Friday - 10:00 AM to 12:00 PM',
    prerequisites: 'General Chemistry I & II, Organic Chemistry I',
    learningOutcomes: [
      'Master advanced organic synthesis techniques',
      'Understand spectroscopic analysis methods',
      'Apply theoretical concepts to practical laboratory work',
      'Develop critical thinking skills for chemical problem-solving'
    ]
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    instructor: 'Prof. Michael Chen',
    instructorAvatar: 'https://readdy.ai/api/search-image?query=professional%20male%20data%20science%20professor%20portrait%2C%20friendly%20smile%2C%20business%20casual%20attire%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=60&height=60&seq=michael-avatar&orientation=squarish',
    instructorBio: 'Prof. Michael Chen is a leading expert in machine learning and data analytics with a PhD from MIT. He has worked at top tech companies and now dedicates his time to educating the next generation of data scientists.',
    category: 'Technology',
    startDate: '2024-04-01',
    endDate: '2024-07-01',
    price: 1299,
    rating: 4.9,
    reviewCount: 89,
    enrolledStudents: 22,
    maxStudents: 30,
    isEnrolled: true,
    banner: 'https://readdy.ai/api/search-image?query=modern%20data%20science%20classroom%20with%20multiple%20computer%20screens%20showing%20data%20visualizations%2C%20charts%20and%20graphs%2C%20students%20analyzing%20data%2C%20bright%20tech%20environment%2C%20professional%20educational%20setting%2C%20high%20quality%20photography&width=400&height=200&seq=data-banner&orientation=landscape',
    description: 'Learn Python, machine learning, and data visualization techniques from industry experts. This course provides hands-on experience with real-world datasets and modern data science tools.',
    schedule: 'Tuesday, Thursday - 2:00 PM to 5:00 PM',
    prerequisites: 'Basic programming knowledge, Statistics fundamentals',
    learningOutcomes: [
      'Master Python for data analysis',
      'Build and evaluate machine learning models',
      'Create compelling data visualizations',
      'Work with real-world datasets and APIs'
    ]
  },
  {
    id: 3,
    title: 'Creative Writing Workshop',
    instructor: 'Dr. Emma Rodriguez',
    instructorAvatar: 'https://readdy.ai/api/search-image?query=professional%20female%20creative%20writing%20teacher%20portrait%2C%20friendly%20smile%2C%20artistic%20background%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=60&height=60&seq=emma-avatar&orientation=squarish',
    instructorBio: 'Dr. Emma Rodriguez is an award-winning author and creative writing instructor. She has published three novels and numerous short stories, and has been teaching creative writing for over a decade.',
    category: 'Arts',
    startDate: '2024-03-20',
    endDate: '2024-05-20',
    price: 649,
    rating: 4.7,
    reviewCount: 156,
    enrolledStudents: 15,
    maxStudents: 20,
    isEnrolled: false,
    banner: 'https://readdy.ai/api/search-image?query=cozy%20creative%20writing%20classroom%20with%20books%2C%20notebooks%2C%20pens%2C%20inspiring%20quotes%20on%20walls%2C%20students%20writing%20and%20discussing%2C%20warm%20lighting%2C%20artistic%20educational%20environment%2C%20high%20quality%20photography&width=400&height=200&seq=writing-banner&orientation=landscape',
    description: 'Develop your creative writing skills through guided exercises and peer feedback sessions. Explore various genres including fiction, poetry, and creative nonfiction.',
    schedule: 'Saturday - 10:00 AM to 1:00 PM',
    prerequisites: 'None - all skill levels welcome',
    learningOutcomes: [
      'Develop your unique writing voice',
      'Master various creative writing techniques',
      'Learn to give and receive constructive feedback',
      'Complete a portfolio of original work'
    ]
  },
  {
    id: 4,
    title: 'Business Strategy & Leadership',
    instructor: 'Prof. James Anderson',
    instructorAvatar: 'https://readdy.ai/api/search-image?query=professional%20male%20business%20professor%20portrait%2C%20confident%20smile%2C%20business%20suit%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=60&height=60&seq=james-avatar&orientation=squarish',
    instructorBio: 'Prof. James Anderson is a former Fortune 500 executive turned business educator. With 20+ years of corporate leadership experience, he brings real-world insights to strategic business education.',
    category: 'Business',
    startDate: '2024-04-15',
    endDate: '2024-08-15',
    price: 1599,
    rating: 4.6,
    reviewCount: 203,
    enrolledStudents: 28,
    maxStudents: 35,
    isEnrolled: true,
    banner: 'https://readdy.ai/api/search-image?query=modern%20business%20classroom%20with%20presentation%20screens%2C%20professional%20meeting%20setup%2C%20students%20in%20business%20attire%20discussing%20strategies%2C%20bright%20corporate%20environment%2C%20high%20quality%20photography&width=400&height=200&seq=business-banner&orientation=landscape',
    description: 'Master strategic thinking and leadership skills essential for modern business success. Learn from real case studies and develop practical business acumen.',
    schedule: 'Monday, Wednesday - 6:00 PM to 8:00 PM',
    prerequisites: 'Basic business knowledge recommended',
    learningOutcomes: [
      'Develop strategic thinking capabilities',
      'Master leadership and team management',
      'Analyze complex business scenarios',
      'Create comprehensive business strategies'
    ]
  },
  {
    id: 5,
    title: 'Digital Marketing Mastery',
    instructor: 'Sarah Kim',
    instructorAvatar: 'https://readdy.ai/api/search-image?query=professional%20female%20digital%20marketing%20expert%20portrait%2C%20friendly%20smile%2C%20modern%20casual%20attire%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20contemporary%20professional%20appearance&width=60&height=60&seq=sarah-kim-avatar&orientation=squarish',
    instructorBio: 'Sarah Kim is a digital marketing strategist who has helped dozens of companies grow their online presence. She specializes in social media marketing, SEO, and content strategy.',
    category: 'Marketing',
    startDate: '2024-05-01',
    endDate: '2024-07-31',
    price: 999,
    rating: 4.8,
    reviewCount: 167,
    enrolledStudents: 19,
    maxStudents: 25,
    isEnrolled: false,
    banner: 'https://readdy.ai/api/search-image?query=modern%20digital%20marketing%20classroom%20with%20laptops%20showing%20social%20media%20dashboards%2C%20analytics%20charts%2C%20students%20working%20on%20campaigns%2C%20bright%20tech%20environment%2C%20professional%20educational%20setting%2C%20high%20quality%20photography&width=400&height=200&seq=marketing-banner&orientation=landscape',
    description: 'Learn cutting-edge digital marketing strategies including SEO, social media, and analytics. Build campaigns that drive real business results.',
    schedule: 'Tuesday, Thursday - 7:00 PM to 9:00 PM',
    prerequisites: 'Basic computer skills',
    learningOutcomes: [
      'Master SEO and content marketing',
      'Create effective social media campaigns',
      'Analyze marketing data and metrics',
      'Build comprehensive digital marketing strategies'
    ]
  },
  {
    id: 6,
    title: 'Introduction to Psychology',
    instructor: 'Dr. Lisa Thompson',
    instructorAvatar: 'https://readdy.ai/api/search-image?query=professional%20female%20psychology%20professor%20portrait%2C%20warm%20smile%2C%20professional%20attire%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=60&height=60&seq=lisa-avatar&orientation=squarish',
    instructorBio: 'Dr. Lisa Thompson is a clinical psychologist and researcher with expertise in cognitive psychology and human behavior. She has been teaching psychology for over 12 years and has published extensively in the field.',
    category: 'Psychology',
    startDate: '2024-03-25',
    endDate: '2024-06-25',
    price: 749,
    rating: 4.9,
    reviewCount: 298,
    enrolledStudents: 32,
    maxStudents: 40,
    isEnrolled: false,
    banner: 'https://readdy.ai/api/search-image?query=psychology%20classroom%20with%20brain%20models%2C%20educational%20posters%2C%20students%20engaged%20in%20discussion%2C%20comfortable%20learning%20environment%2C%20natural%20lighting%2C%20professional%20educational%20setting%2C%20high%20quality%20photography&width=400&height=200&seq=psychology-banner&orientation=landscape',
    description: 'Explore the fundamentals of human behavior and mental processes in this comprehensive course. Gain insights into cognitive psychology, social psychology, and research methods.',
    schedule: 'Monday, Wednesday, Friday - 2:00 PM to 4:00 PM',
    prerequisites: 'None - introductory level course',
    learningOutcomes: [
      'Understand fundamental psychological principles',
      'Learn about human cognition and behavior',
      'Explore research methods in psychology',
      'Apply psychological concepts to real-world situations'
    ]
  }
];

const categories = ['All', 'Science', 'Technology', 'Arts', 'Business', 'Marketing', 'Psychology'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $500', min: 0, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
  { label: '$1000 - $1500', min: 1000, max: 1500 },
  { label: 'Over $1500', min: 1500, max: Infinity }
];

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState('rating');
  const [selectedCohort, setSelectedCohort] = useState<any>(null);
  const [showEnrollmentFlow, setShowEnrollmentFlow] = useState(false);
  const [enrollmentStep, setEnrollmentStep] = useState(1);
  const [showLearningInterface, setShowLearningInterface] = useState(false);
  const [enrollingCohort, setEnrollingCohort] = useState<any>(null);
  const navigate = useNavigate();

  // Filter and sort cohorts
  const filteredCohorts = mockCohorts
    .filter(cohort => {
      const matchesSearch = cohort.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cohort.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || cohort.category === selectedCategory;
      const matchesPrice = cohort.price >= selectedPriceRange.min && cohort.price <= selectedPriceRange.max;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'date':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'popularity':
          return b.enrolledStudents - a.enrolledStudents;
        default:
          return 0;
      }
    });

  const handleEnroll = (cohort: any) => {
    setEnrollingCohort(cohort);
    setShowEnrollmentFlow(true);
    setEnrollmentStep(1);
  };

  const handleContinueLearning = (cohort: any) => {
    setEnrollingCohort(cohort);
    setShowLearningInterface(true);
  };

  const handleEnrollmentComplete = () => {
    setShowEnrollmentFlow(false);
    setShowLearningInterface(true);
  };

  const handleViewDetails = (cohort: any) => {
    setSelectedCohort(cohort);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`${i < Math.floor(rating)
          ? <RiStarFill className="text-yellow-400" />
          : i < rating
            ? <RiStarHalfFill className="text-yellow-400" />
            : <RiStarLine className="text-gray-300" />
          } text-xs`}
      />
    ));
  };

  // Show Learning Interface
  if (showLearningInterface && enrollingCohort) {
    return (
      <LearningInterface
        cohort={enrollingCohort}
        onBack={() => {
          setShowLearningInterface(false);
          setEnrollingCohort(null);
        }}
      />
    );
  }

  // Show Enrollment Flow
  if (showEnrollmentFlow && enrollingCohort) {
    return (
      <EnrollmentFlow
        cohort={enrollingCohort}
        currentStep={enrollmentStep}
        onStepChange={setEnrollmentStep}
        onComplete={handleEnrollmentComplete}
        onCancel={() => {
          setShowEnrollmentFlow(false);
          setEnrollingCohort(null);
          setEnrollmentStep(1);
        }}
      />
    );
  }

  if (selectedCohort) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-md sticky top-0 z-10">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-2">
              <button
                onClick={() => setSelectedCohort(null)}
                className="p-3 hover:bg-white/60 rounded-xl transition-all duration-300 group cursor-pointer"
              >
                <RiArrowLeftLine className="text-gray-600 group-hover:text-gray-900 text-lg" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Cohort Details
                </h1>
                <p className="text-gray-600 mt-1">Complete information about this cohort</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cohort Details Content */}
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Banner and Basic Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedCohort.banner}
                  alt={selectedCohort.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between">
                    <div className="text-white">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                          {selectedCohort.category}
                        </span>
                        {selectedCohort.isEnrolled && (
                          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold flex items-center">
                            <RiCheckLine className="mr-1" />
                            Enrolled
                          </span>
                        )}
                      </div>
                      <h2 className="text-3xl font-bold mb-2">{selectedCohort.title}</h2>
                      <div className="flex items-center space-x-4 text-white/90">
                        <div className="flex items-center space-x-1">
                          {renderStars(selectedCohort.rating)}
                          <span className="ml-2 font-semibold">{selectedCohort.rating}</span>
                          <span className="text-white/70">({selectedCohort.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-white">
                      <div className="text-4xl font-bold">${selectedCohort.price}</div>
                      <div className="text-white/80">per student</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Cohort</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{selectedCohort.description}</p>
                    </div>

                    {/* Learning Outcomes */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCohort.learningOutcomes.map((outcome: string, index: number) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <RiCheckLine className='text-white text-sm' />
                            </div>
                            <span className="text-gray-800 font-medium">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule & Prerequisites */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                        <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                          <RiCalendarLine className="mr-2 text-purple-600" />
                          Schedule
                        </h4>
                        <p className="text-gray-700 font-medium mb-2">{selectedCohort.schedule}</p>
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center mb-1">
                            <RiPlayCircleLine className="mr-2" />
                            Start: {new Date(selectedCohort.startDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <RiStopCircleLine className="mr-2" />
                            End: {new Date(selectedCohort.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                        <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                          <RiBookLine className="mr-2 text-green-600" />
                          Prerequisites
                        </h4>
                        <p className="text-gray-700 font-medium">{selectedCohort.prerequisites}</p>
                      </div>
                    </div>

                    {/* Instructor Bio */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Meet Your Instructor</h3>
                      <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
                        <img
                          src={selectedCohort.instructorAvatar}
                          alt={selectedCohort.instructor}
                          className="w-20 h-20 rounded-2xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedCohort.instructor}</h4>
                          <p className="text-gray-700 leading-relaxed">{selectedCohort.instructorBio}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Enrollment Info */}
                    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Enrollment Information</h4>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Students Enrolled</span>
                          <span className="font-semibold text-gray-900">{selectedCohort.enrolledStudents} / {selectedCohort.maxStudents}</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(selectedCohort.enrolledStudents / selectedCohort.maxStudents) * 100}%` }}
                          ></div>
                        </div>

                        <div className="text-center text-sm text-gray-600">
                          {Math.round((selectedCohort.enrolledStudents / selectedCohort.maxStudents) * 100)}% Full
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        onClick={() => selectedCohort.isEnrolled ? handleContinueLearning(selectedCohort.id) : handleEnroll(selectedCohort)}
                        variant="primary"
                        className={`w-full py-4 text-lg font-semibold ${selectedCohort.isEnrolled
                          ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                          }`}
                      >
                        {selectedCohort.isEnrolled ? (
                          <>
                            <RiPlayCircleLine className="mr-2" />
                            Continue Learning
                          </>
                        ) : (
                          <>
                            <RiUserAddLine className="mr-2" />
                            Enroll Now - ${selectedCohort.price}
                          </>
                        )}
                      </Button>

                      {!selectedCohort.isEnrolled && (
                        <p className="text-center text-sm text-gray-500 mt-3">
                          30-day money-back guarantee
                        </p>
                      )}
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 flex items-center">
                            <RiStarLine className="mr-2 text-yellow-500" />
                            Rating
                          </span>
                          <span className="font-semibold text-gray-900">{selectedCohort.rating}/5.0</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 flex items-center">
                            <RiUserLine className="mr-2 text-blue-500" />
                            Reviews
                          </span>
                          <span className="font-semibold text-gray-900">{selectedCohort.reviewCount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 flex items-center">
                            <RiTimeLine className="mr-2 text-green-500" />
                            Duration
                          </span>
                          <span className="font-semibold text-gray-900">
                            {Math.ceil((new Date(selectedCohort.endDate).getTime() - new Date(selectedCohort.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Discover Cohorts
          </h1>
          <p className="text-gray-600 mt-1 text-sm">Find and enroll from cohorts from expert instructors</p>
        </div>

        {/* Compact Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search cohorts or instructors..."
                  className="w-full px-3 py-2 pl-8 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs"
                />
                <RiSearchLine className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              </div>
            </div>

            {/* Category */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 pr-7 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-xs"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <select
                value={selectedPriceRange.label}
                onChange={(e) => setSelectedPriceRange(priceRanges.find(p => p.label === e.target.value) || priceRanges[0])}
                className="w-full px-3 py-2 pr-7 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-xs"
              >
                {priceRanges.map(range => (
                  <option key={range.label} value={range.label}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 pr-7 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-xs"
              >
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="date">Start Date</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCategory !== 'All' || selectedPriceRange.label !== 'All Prices') && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2 flex-wrap gap-1.5">
                <span className="text-xs font-medium text-gray-600">Filters:</span>
                {searchTerm && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center">
                    "{searchTerm}"
                    <button onClick={() => setSearchTerm('')} className="ml-1.5 hover:text-blue-900">
                      <RiCloseLine className="text-xs" />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')} className="ml-1.5 hover:text-purple-900">
                      <RiCloseLine className="text-xs" />
                    </button>
                  </span>
                )}
                {selectedPriceRange.label !== 'All Prices' && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center">
                    {selectedPriceRange.label}
                    <button onClick={() => setSelectedPriceRange(priceRanges[0])} className="ml-1.5 hover:text-green-900">
                      <RiCloseLine className="text-xs" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            Showing <span className="font-semibold text-gray-900">{filteredCohorts.length}</span> of <span className="font-semibold text-gray-900">{mockCohorts.length}</span> cohorts
          </p>
        </div>

        {/* Cohorts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCohorts.map((cohort) => (
            <div key={cohort.id} className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl overflow-hidden">
              {/* Banner Image */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={cohort.banner}
                  alt={cohort.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-[10px] font-semibold">
                    {cohort.category}
                  </span>
                </div>

                {/* Enrollment Status */}
                {cohort.isEnrolled && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 bg-green-500 text-white rounded-full text-[10px] font-semibold flex items-center">
                      <RiCheckLine className="text-xs mr-1" />
                      Enrolled
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="absolute bottom-2 right-2">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">${cohort.price}</div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                {/* Title and Rating */}
                <div className="mb-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5 line-clamp-2 group-hover:text-blue-800 transition-colors">
                    {cohort.title}
                  </h3>
                  <div className="flex items-center space-x-1.5 mb-2">
                    <div className="flex items-center space-x-0.5">
                      {renderStars(cohort.rating)}
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{cohort.rating}</span>
                    <span className="text-xs text-gray-500">({cohort.reviewCount})</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center space-x-2 mb-3">
                  <img
                    src={cohort.instructorAvatar}
                    alt={cohort.instructor}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-xs">{cohort.instructor}</div>
                    <div className="text-[10px] text-gray-500">Instructor</div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="space-y-1.5 text-xs text-gray-600 mb-3">
                  <div className="flex items-center">
                    <RiCalendarLine className="mr-1.5 text-gray-400 text-xs" />
                    <span className="text-[10px]">{new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => { handleViewDetails(cohort) }}
                    variant="ghost"
                    className="flex-1 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 text-xs py-1.5"
                  >
                    <RiEyeLine className="mr-1 text-xs" />
                    View
                  </Button>
                  <Button
                    onClick={() => cohort.isEnrolled ? handleContinueLearning(cohort) : handleEnroll(cohort)}
                    variant="primary"
                    className={`flex-1 text-xs py-1.5 ${cohort.isEnrolled
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                      }`}
                  >
                    {cohort.isEnrolled ? (
                      <>
                        <RiPlayCircleLine className="mr-1 text-xs" />
                        Continue
                      </>
                    ) : (
                      <>
                        <RiUserAddLine
                          className="mr-1 text-xs" />
                        Enroll
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCohorts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <RiSearchLine className="text-2xl text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1.5">No cohorts found</h3>
            <p className="text-gray-600 mb-4 text-sm">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedPriceRange(priceRanges[0]);
              }}
              variant="primary"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-xs px-4 py-2"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
