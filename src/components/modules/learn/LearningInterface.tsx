import { useState, useEffect } from 'react';
import Button from '#/components/modules/learn/Button';
import {
  RiAddLine,
  RiArrowDownSLine,
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiBarChartLine,
  RiCalendarLine,
  RiChat3Line,
  RiCheckDoubleFill,
  RiCheckLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiFileEditLine,
  RiFileExcelLine,
  RiFileLine,
  RiFilePdfLine,
  RiFileTextLine,
  RiHeartLine,
  RiLockLine,
  RiMoreLine,
  RiPlayCircleLine,
  RiPlayFill,
  RiPushpinFill,
  RiQuestionLine,
  RiReplyLine,
  RiSaveLine,
  RiSearchLine,
  RiSendPlaneLine,
  RiStickyNoteLine,
  RiTimeLine,
  RiUploadCloudLine,
  RiUserLine,
  RiVideoLine
} from 'react-icons/ri';

interface LearningInterfaceProps {
  cohort: any;
  onBack: () => void;
}

interface Module {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  isCollapsed: boolean;
  lessons: Lesson[];
  progress: number;
}

interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  duration: string;
  completed: boolean;
  locked: boolean;
}

interface Discussion {
  id: number;
  title: string;
  author: string;
  authorRole: string;
  content: string;
  timestamp: string;
  pinned: boolean;
  replies: number;
  lastReply: string;
}

const mockModules = [
  {
    id: 1,
    title: 'Introduction to React',
    duration: '2 hours',
    completed: true,
    isCollapsed: false,
    progress: 100,
    lessons: [
      { id: 1, title: 'What is React?', type: 'video', duration: '15 min', completed: true, locked: false },
      { id: 2, title: 'Setting up Development Environment', type: 'reading', duration: '10 min', completed: true, locked: false },
      { id: 3, title: 'React Basics Quiz', type: 'quiz', duration: '5 min', completed: false, locked: false }
    ]
  },
  {
    id: 2,
    title: 'Components and Props',
    duration: '3 hours',
    completed: false,
    isCollapsed: false,
    progress: 25,
    lessons: [
      { id: 4, title: 'Understanding Components', type: 'video', duration: '20 min', completed: false, locked: false },
      { id: 5, title: 'Props and State', type: 'reading', duration: '15 min', completed: false, locked: false },
      { id: 6, title: 'Component Assignment', type: 'assignment', duration: '45 min', completed: false, locked: false },
      { id: 7, title: 'Component Quiz', type: 'quiz', duration: '10 min', completed: false, locked: true }
    ]
  },
  {
    id: 3,
    title: 'State Management',
    duration: '4 hours',
    completed: false,
    isCollapsed: false,
    progress: 0,
    lessons: [
      { id: 8, title: 'useState Hook', type: 'video', duration: '25 min', completed: false, locked: true },
      { id: 9, title: 'useEffect Hook', type: 'video', duration: '30 min', completed: false, locked: true },
      { id: 10, title: 'State Management Quiz', type: 'quiz', duration: '15 min', completed: false, locked: true }
    ]
  }
];

const mockDiscussions: Discussion[] = [
  {
    id: 1,
    title: 'Welcome to Advanced Chemistry!',
    author: 'Dr. Sarah Wilson',
    authorRole: 'instructor',
    content: 'Welcome everyone! Please introduce yourselves and share what you\'re most excited to learn about in this course.',
    timestamp: '2024-03-15 09:00',
    pinned: true,
    replies: 8,
    lastReply: '2024-03-16 14:30'
  },
  {
    id: 2,
    title: 'Lab Equipment Questions',
    author: 'Alice Johnson',
    authorRole: 'student',
    content: 'I have some questions about the lab equipment we\'ll be using. Are there any safety videos we should watch beforehand?',
    timestamp: '2024-03-16 10:15',
    pinned: false,
    replies: 3,
    lastReply: '2024-03-16 15:20'
  },
  {
    id: 3,
    title: 'Study Group Formation',
    author: 'Bob Smith',
    authorRole: 'student',
    content: 'Would anyone be interested in forming a study group? I think it would be helpful to work through the problems together.',
    timestamp: '2024-03-17 16:45',
    pinned: false,
    replies: 12,
    lastReply: '2024-03-18 09:10'
  },
  {
    id: 4,
    title: 'Question about Molecular Geometry',
    author: 'Emma Davis',
    authorRole: 'student',
    content: 'I\'m having trouble understanding the VSEPR theory. Could someone explain how to predict molecular shapes?',
    timestamp: '2024-03-18 11:20',
    pinned: false,
    replies: 5,
    lastReply: '2024-03-18 16:45'
  }
];

const mockGrades = {
  overall: 87,
  assignments: [
    { name: 'Basic Chemistry Review Quiz', score: 92, maxScore: 100, date: '2024-03-18' },
    { name: 'Molecular Structure Assignment', score: 85, maxScore: 100, date: '2024-03-22' },
    { name: 'Lab Safety Assessment', score: 95, maxScore: 100, date: '2024-03-15' }
  ],
  cohortAverage: 82,
  rank: 3,
  totalStudents: 18
};

const LearningInterface: React.FC<LearningInterfaceProps> = ({ cohort, onBack }) => {
  const [modules, setModules] = useState<Module[]>(mockModules);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(mockModules[0].lessons[0]);
  const [activeTab, setActiveTab] = useState<'content' | 'grades' | 'zoom' | 'discussions'>('content');
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [overallProgress, setOverallProgress] = useState(35);
  const [showNewPost, setShowNewPost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Calculate overall progress
    const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = modules.reduce((acc, module) =>
      acc + module.lessons.filter(lesson => lesson.completed).length, 0
    );
    setOverallProgress(Math.round((completedLessons / totalLessons) * 100));
  }, [modules]);

  const toggleModule = (moduleId: number) => {
    setModules(modules.map(module =>
      module.id === moduleId
        ? { ...module, isCollapsed: !module.isCollapsed }
        : module
    ));
  };

  const selectLesson = (lesson: Lesson) => {
    if (!lesson.locked) {
      setSelectedLesson(lesson);
      setActiveTab('content');
    }
  };

  const markLessonComplete = (lessonId: number) => {
    setModules(modules.map(module => ({
      ...module,
      lessons: module.lessons.map(lesson =>
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson
      )
    })));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <RiPlayCircleLine />;
      case 'reading': return <RiFileTextLine />;
      case 'quiz': return <RiQuestionLine />;
      case 'assignment': return <RiFileEditLine />;
      default: return <RiFileLine />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-600';
      case 'reading': return 'text-blue-600';
      case 'quiz': return 'text-purple-600';
      case 'assignment': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'instructor': return 'bg-purple-100 text-purple-700';
      case 'assistant': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredDiscussions = mockDiscussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (!selectedLesson) return null;

    switch (selectedLesson.type) {
      case 'video':
        return (
          <div className="space-y-6">
            <div className="bg-black rounded-2xl overflow-hidden aspect-video">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RiPlayFill className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{selectedLesson.title}</h3>
                  <p className="text-white/70">Duration: {selectedLesson.duration}</p>
                  <Button
                    onClick={() => markLessonComplete(selectedLesson.id)}
                    className="mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <RiPlayFill className="mr-2" />
                    Play Video
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4">About this lesson</h4>
              <p className="text-gray-700 leading-relaxed">
                This lesson covers the fundamental concepts you need to understand before diving deeper into organic chemistry.
                We'll explore the basic principles, safety protocols, and essential knowledge that will serve as the foundation
                for all subsequent lessons in this course.
              </p>
            </div>
          </div>
        );

      case 'reading':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{selectedLesson.title}</h3>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Welcome to this comprehensive reading on {selectedLesson.title.toLowerCase()}. This material will provide you
                    with essential theoretical knowledge that complements the practical aspects covered in our video lessons.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Learning Objectives</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li>Understand the fundamental principles of organic chemistry</li>
                    <li>Identify key safety protocols in laboratory settings</li>
                    <li>Recognize the importance of proper equipment handling</li>
                    <li>Apply theoretical knowledge to practical scenarios</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Concepts</h4>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Organic chemistry is the study of carbon-containing compounds and their properties, reactions, and synthesis.
                    This field is fundamental to understanding biological processes, pharmaceutical development, and materials science.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-blue-800">
                      <strong>Important Note:</strong> Always prioritize safety when working in the laboratory.
                      Proper protective equipment and adherence to protocols are essential for successful learning.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Estimated reading time: {selectedLesson.duration}
                  </div>
                  <Button
                    onClick={() => markLessonComplete(selectedLesson.id)}
                    variant="primary"
                    className="bg-gradient-to-r from-green-600 to-green-700"
                  >
                    <RiCheckLine className="mr-2" />
                    Mark as Complete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RiQuestionLine className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedLesson.title}</h3>
                <p className="text-gray-600">Test your understanding of the concepts covered so far</p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 mb-6">
                  <h4 className="font-bold text-gray-900 mb-4">Quiz Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Questions:</span>
                      <div className="font-semibold">15 multiple choice</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Time Limit:</span>
                      <div className="font-semibold">{selectedLesson.duration}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Attempts:</span>
                      <div className="font-semibold">3 allowed</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Passing Score:</span>
                      <div className="font-semibold">70%</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => markLessonComplete(selectedLesson.id)}
                    variant="primary"
                    className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-3"
                  >
                    <RiPlayCircleLine className="mr-2" />
                    Start Quiz
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'assignment':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedLesson.title}</h2>
                  <p className="text-gray-600 mb-4">Assignment details and instructions go here.</p>
                </div>
                <div className="text-right">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 mb-2">
                    <p className="text-sm font-medium text-orange-800">Due Date</p>
                    <p className="text-lg font-bold text-orange-900">March 25, 2024</p>
                    <p className="text-xs text-orange-700">3 days remaining</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                    <p className="text-sm font-medium text-blue-800">Points</p>
                    <p className="text-lg font-bold text-blue-900">100</p>
                  </div>
                </div>
              </div>

              {/* Assignment Resources */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Assignment Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 hoverbg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <RiFilePdfLine className="text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Assignment Worksheet</p>
                        <p className="text-sm text-gray-600">PDF • 2.3 MB</p>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap">
                        Download
                      </button>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <RiFileExcelLine className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Data Collection Template</p>
                        <p className="text-sm text-gray-600">XLSX • 156 KB</p>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submission Area */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Your Assignment</h3>

                {/* Upload Zone */}
                <div className="mb-6">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hoverbg-blue-50 transition-all cursor-pointer"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => e.preventDefault()}
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RiUploadCloudLine className="text-blue-600 text-2xl" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</h4>
                    <p className="text-gray-600 mb-2">Supported formats: PDF, DOC, DOCX, XLS, XLSX</p>
                    <p className="text-sm text-gray-500">Maximum file size: 10MB per file</p>
                    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">
                      Choose Files
                    </button>
                  </div>
                </div>

                {/* Uploaded Files */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Uploaded Files</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <RiFilePdfLine className="text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">molecular_structures_analysis.pdf</p>
                          <p className="text-sm text-gray-600">3.2 MB • Uploaded successfully</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <RiCheckLine className="text-white text-sm" />
                        </div>
                        <button className="p-1 hover:bg-red-100 rounded transition-colors">
                          <RiDeleteBinLine className="text-red-500" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <RiFileExcelLine className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">experiment_data.xlsx</p>
                          <p className="text-sm text-gray-600">1.8 MB • Uploading...</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6">
                          <div className="w-full bg-blue-200 rounded-full h-1.5">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        <button className="p-1 hover:bg-red-100 rounded transition-colors">
                          <RiCloseLine className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submission Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Add any comments or notes about your submission..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focusring-blue-500 focusborder-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
                </div>

                {/* Submission Status */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Submission Status</p>
                      <p className="text-sm text-gray-600">Ready to submit • 2 files attached</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-700">Ready</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <RiTimeLine className="mr-1" />
                    Due in 3 days, 14 hours
                  </div>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap flex items-center space-x-2">
                    <RiSendPlaneLine />
                    <span>Submit Assignment</span>
                  </button>
                </div>
              </div>

              {/* Previous Submission (if exists) */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Submission</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-yellow-900">Submitted on March 20, 2024 at 2:30 PM</p>
                      <p className="text-sm text-yellow-800 mt-1">Grade: Pending Review</p>
                      <div className="mt-3">
                        <p className="text-sm font-medium text-yellow-900 mb-2">Submitted Files:</p>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <RiFilePdfLine className="text-yellow-700" />
                            <span className="text-sm text-yellow-800">molecular_analysis_v1.pdf</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium whitespace-nowrap">
                      Under Review
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderGrades = () => (
    <div className="space-y-6">
      {/* Overall Performance */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Overall Performance</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-white">{mockGrades.overall}%</span>
            </div>
            <div className="font-semibold text-gray-900">Your Grade</div>
            <div className="text-sm text-gray-600">Current average</div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-white">{mockGrades.cohortAverage}%</span>
            </div>
            <div className="font-semibold text-gray-900">Cohort Average</div>
            <div className="text-sm text-gray-600">Class performance</div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-white">#{mockGrades.rank}</span>
            </div>
            <div className="font-semibold text-gray-900">Class Rank</div>
            <div className="text-sm text-gray-600">of {mockGrades.totalStudents} students</div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">Course Progress</span>
            <span className="text-sm text-gray-600">{overallProgress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Assignment Grades */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Assignment Grades</h3>

        <div className="space-y-4">
          {mockGrades.assignments.map((assignment, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{assignment.name}</h4>
                <p className="text-sm text-gray-600">Submitted on {new Date(assignment.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {assignment.score}/{assignment.maxScore}
                </div>
                <div className={`text-sm font-medium ${assignment.score >= 90 ? 'text-green-600' :
                  assignment.score >= 80 ? 'text-blue-600' :
                    assignment.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                  {Math.round((assignment.score / assignment.maxScore) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderZoom = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Live Sessions</h3>

        {/* Upcoming Session */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <RiVideoLine className="text-white text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Next Live Session</h4>
                <p className="text-gray-700 mb-2">Chemical Bonding Deep Dive</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <RiCalendarLine className="mr-1" />
                    March 20, 2024
                  </span>
                  <span className="flex items-center">
                    <RiTimeLine className="mr-1" />
                    10:00 AM - 12:00 PM
                  </span>
                  <span className="flex items-center">
                    <RiUserLine className="mr-1" />
                    Dr. Sarah Wilson
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              className="bg-gradient-to-r from-blue-600 to-blue-700"
            >
              <RiVideoLine className="mr-2" />
              Join Session
            </Button>
          </div>
        </div>

        {/* Session History */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Previous Sessions</h4>
          <div className="space-y-3">
            {[
              { title: 'Course Introduction & Safety', date: 'March 15, 2024', duration: '2h', recorded: true },
              { title: 'Basic Chemistry Review', date: 'March 13, 2024', duration: '1h 30m', recorded: true },
              { title: 'Lab Equipment Overview', date: 'March 11, 2024', duration: '1h 45m', recorded: false }
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <RiVideoLine className="text-gray-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{session.title}</h5>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span>{session.date}</span>
                      <span>•</span>
                      <span>{session.duration}</span>
                    </div>
                  </div>
                </div>
                {session.recorded ? (
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    <RiPlayCircleLine className="mr-2" />
                    Watch Recording
                  </Button>
                ) : (
                  <span className="text-sm text-gray-500">No recording</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDiscussions = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Course Discussions</h3>
        <Button
          onClick={() => setShowNewPost(true)}
          variant="primary"
          className="bg-gradient-to-r from-blue-600 to-blue-700"
        >
          <RiAddLine className="mr-2" />
          New Post
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <div className="relative">
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus-ring-2 focusring-blue-500 focusborder-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => (
          <div key={discussion.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {discussion.pinned && (
                  <div className="w-6 h-6 flex items-center justify-center">
                    <RiPushpinFill className="text-blue-600" />
                  </div>
                )}
                <h4 className="font-semibold text-gray-900 text-lg">{discussion.title}</h4>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <RiMoreLine />
              </button>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {discussion.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-900">{discussion.author}</span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getRoleColor(discussion.authorRole)}`}>
                  {discussion.authorRole}
                </span>
                <span className="text-sm text-gray-500">{new Date(discussion.timestamp).toLocaleDateString()}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{discussion.content}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center space-x-2">
                  <RiChat3Line />
                  <span>{discussion.replies} replies</span>
                </span>
                <span className="flex items-center space-x-2">
                  <RiTimeLine />
                  <span>Last reply: {new Date(discussion.lastReply).toLocaleDateString()}</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <RiReplyLine className="mr-2" />
                  Reply
                </Button>
                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <RiHeartLine />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">New Discussion Post</h3>
              <button
                onClick={() => setShowNewPost(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RiCloseLine className="text-lg" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discussion Title</label>
                <input
                  type="text"
                  placeholder="Enter discussion title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus-ring-2 focusring-blue-500 focusborder-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  placeholder="Share your thoughts, ask questions, or start a discussion..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus-ring-2 focusring-blue-500 focusborder-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="flex items-center space-x-3">
                <input type="checkbox" id="pin" className="rounded border-gray-300 text-blue-600 focusring-blue-500" />
                <label htmlFor="pin" className="text-sm text-gray-600">Pin this post to the top</label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                onClick={() => setShowNewPost(false)}
                variant="ghost"
                className="flex-1 border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowNewPost(false)}
                variant="primary"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700"
              >
                <RiSendPlaneLine className="mr-2" />
                Post Discussion
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 z-50">
      {/* Top Progress Bar */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-md sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-white/60 rounded-xl transition-all group cursor-pointer"
              >
                <RiArrowLeftLine className="text-gray-600 group-hover:text-gray-900 text-lg" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{cohort.title}</h1>
                <p className="text-sm text-gray-600">{cohort.instructor}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveTab('zoom')}
                className={`p-3 rounded-xl transition-all cursor-pointer ${activeTab === 'zoom' ? 'bg-blue-100 text-blue-600' : 'hover:bg-white/60 text-gray-600'}`}
              >
                <RiVideoLine className="text-lg" />
              </button>
              <button
                onClick={() => setActiveTab('grades')}
                className={`p-3 rounded-xl transition-all  cursor-pointer ${activeTab === 'grades' ? 'bg-green-100 text-green-600' : 'hover:bg-white/60 text-gray-600'}`}
              >
                <RiBarChartLine className="text-lg" />
              </button>
              <button
                onClick={() => setActiveTab('discussions')}
                className={`p-3 rounded-xl transition-all  cursor-pointer ${activeTab === 'discussions' ? 'bg-purple-100 text-purple-600' : 'hover:bg-white/60 text-gray-600'}`}
              >
                <RiChat3Line className="text-lg" />
              </button>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`p-3 rounded-xl transition-all  cursor-pointer ${showNotes ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-white/60 text-gray-600'}`}
              >
                <RiStickyNoteLine className="text-lg" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">{overallProgress}%</span>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Sidebar - Modules */}
        <div className="w-80 bg-white/90 backdrop-blur-sm border-r border-white/20 shadow-lg overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Course Content</h2>

            <div className="space-y-3">
              {modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between cursor-pointer">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{module.title}</h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <span>{module.duration}</span>
                          <span>•</span>
                          <span>{module.lessons.length} lessons</span>
                        </div>
                      </div>
                      {module.isCollapsed ? <RiArrowRightSLine className="text-gray-400" /> : <RiArrowDownSLine className="text-gray-400" />}
                    </div>

                    {/* Module Progress */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </button>

                  {/* Module Lessons */}
                  {!module.isCollapsed && (
                    <div className="border-t border-gray-200">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => selectLesson(lesson)}
                          disabled={lesson.locked}
                          className={`w-full p-3 text-left flex items-center space-x-3 transition-colors ${lesson.locked ? 'opacity-50 cursor-not-allowed' : selectedLesson?.id === lesson.id ? 'bg-blue-50 border-r-2 border-blue-500' : 'hover:bg-gray-50 cursor-pointer'}`}
                        >
                          <div className={`w-6 h-6 flex items-center justify-center ${lesson.completed ? 'text-green-600' : lesson.locked ? 'text-gray-400' : getTypeColor(lesson.type)}`}>
                            {lesson.completed ? <RiCheckDoubleFill /> : lesson.locked ? <RiLockLine /> : getTypeIcon(lesson.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 text-sm truncate">{lesson.title}</div>
                            <div className="text-xs text-gray-600">{lesson.duration}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Content Tabs */}
          <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 px-6 py-3">
            <div className="flex space-x-1">
              {[
                { id: 'content', label: 'Content', icon: RiPlayCircleLine },
                { id: 'discussions', label: 'Discussions', icon: RiChat3Line },
                { id: 'grades', label: 'Grades', icon: RiBarChartLine },
                { id: 'zoom', label: 'Live Sessions', icon: RiVideoLine }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'}`}
                >
                  <tab.icon className="text-sm" size={22}/>
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'content' && renderContent()}
            {activeTab === 'discussions' && renderDiscussions()}
            {activeTab === 'grades' && renderGrades()}
            {activeTab === 'zoom' && renderZoom()}
          </div>
        </div>

        {/* Notes Sidebar */}
        {showNotes && (
          <div className="w-80 bg-white/90 backdrop-blur-sm border-l border-white/20 shadow-lg">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Notes</h3>
                <button
                  onClick={() => setShowNotes(false)}
                  className="p-1 hover:bg-gray-200 rounded cursor-pointer transition-colors"
                >
                  <RiCloseLine className='text-gray-500' />
                  <span className="sr-only">Close notes</span>
                </button>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes while learning..."
                className="flex-1 w-full p-4 border border-gray-200 rounded-xl resize-none focus-ring-2 focusring-blue-500 focusborder-blue-500"
              />

              <Button
                variant="primary"
                className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700"
              >
                <RiSaveLine className='mr-2' />
                Save Notes
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Continue Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => {
            if (selectedLesson && !selectedLesson.completed) {
              markLessonComplete(selectedLesson.id);
            }
          }}
          variant="primary"
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-2xl px-6 py-4 text-lg font-semibold"
        >
          <RiPlayCircleLine className="mr-2" size={22} />
          Continue Learning
        </Button>
      </div>
    </div>
  );
};

export default LearningInterface;
