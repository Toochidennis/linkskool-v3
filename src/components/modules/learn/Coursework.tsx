
import { useState } from 'react';
import CreateQuizModal from '#/components/modules/learn/CreateQuizModal';
import {
    RiFileTextLine,
    RiAttachmentLine,
    RiCalendarLine,
    RiFolderAddLine,
    RiFolderLine,
    RiMore2Line,
    RiQuestionLine,
    RiStarLine,
    RiArrowDownSLine,
    RiFileAddLine
} from 'react-icons/ri';

interface Material {
    id: number;
    title: string;
    type: 'assignment' | 'material' | 'quiz' | 'topic';
    description: string;
    dueDate?: string;
    points?: number;
    cohorts: string[];
    status: 'draft' | 'published' | 'archived';
    attachments?: number;
}

interface Topic {
    id: number;
    title: string;
    description: string;
    materials: Material[];
    order: number;
    isCollapsed: boolean;
}

const mockTopics: Topic[] = [
    {
        id: 1,
        title: 'Introduction to Organic Chemistry',
        description: 'Fundamental concepts and basic principles',
        order: 1,
        isCollapsed: false,
        materials: [
            {
                id: 1,
                title: 'Course Introduction and Safety Guidelines',
                type: 'material',
                description: 'Essential safety protocols and course overview',
                cohorts: ['Spring 2024', 'Fall 2023'],
                status: 'published',
                attachments: 3
            },
            {
                id: 2,
                title: 'Chemical Bonding Quiz',
                type: 'quiz',
                description: 'Test your understanding of chemical bonds',
                dueDate: '2024-03-20',
                points: 50,
                cohorts: ['Spring 2024'],
                status: 'published'
            },
            {
                id: 3,
                title: 'Molecular Structure Assignment',
                type: 'assignment',
                description: 'Draw and analyze molecular structures',
                dueDate: '2024-03-25',
                points: 100,
                cohorts: ['Spring 2024'],
                status: 'published'
            }
        ]
    },
    {
        id: 2,
        title: 'Reaction Mechanisms',
        description: 'Understanding how chemical reactions occur',
        order: 2,
        isCollapsed: true,
        materials: [
            {
                id: 4,
                title: 'Reaction Pathways Video Series',
                type: 'material',
                description: 'Visual explanation of reaction mechanisms',
                cohorts: ['Spring 2024', 'Fall 2023'],
                status: 'published',
                attachments: 1
            },
            {
                id: 5,
                title: 'Mechanism Practice Problems',
                type: 'assignment',
                description: 'Practice identifying reaction mechanisms',
                dueDate: '2024-04-10',
                points: 75,
                cohorts: ['Spring 2024'],
                status: 'draft'
            }
        ]
    },
    {
        id: 3,
        title: 'Laboratory Techniques',
        description: 'Hands-on practical skills and procedures',
        order: 3,
        isCollapsed: false,
        materials: [
            {
                id: 6,
                title: 'Lab Safety Manual',
                type: 'material',
                description: 'Comprehensive safety guidelines for laboratory work',
                cohorts: ['Spring 2024', 'Fall 2023', 'Summer 2023'],
                status: 'published',
                attachments: 5
            }
        ]
    }
];

const getTypeColor = (type: string) => {
    switch (type) {
        case 'material': return 'bg-blue-100 text-blue-700';
        case 'assignment': return 'bg-green-100 text-green-700';
        case 'quiz': return 'bg-purple-100 text-purple-700';
        default: return 'bg-gray-100 text-gray-700';
    }
};

export default function Coursework() {
    const [topics, setTopics] = useState<Topic[]>(mockTopics);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showAddDropdown, setShowAddDropdown] = useState(false);
    const [showQuizModal, setShowQuizModal] = useState(false);
    const [draggedItem, setDraggedItem] = useState<{ type: 'topic' | 'material'; id: number; topicId?: number } | null>(null);

    const typeIcons = {
        assignment: RiFileTextLine,
        material: RiFolderLine,
        quiz: RiQuestionLine,
        topic: RiFolderAddLine
    };

    const typeColors = {
        assignment: 'text-blue-600',
        material: 'text-green-600',
        quiz: 'text-purple-600',
        topic: 'text-orange-600'
    };

    const statusColors = {
        draft: 'bg-orange-50 text-orange-700 border-orange-200',
        published: 'bg-green-50 text-green-700 border-green-200',
        archived: 'bg-gray-50 text-gray-700 border-gray-200'
    };

    const toggleTopicCollapse = (topicId: number) => {
        setTopics(topics.map(topic =>
            topic.id === topicId
                ? { ...topic, isCollapsed: !topic.isCollapsed }
                : topic
        ));
    };

    const handleDragStart = (e: React.DragEvent, type: 'topic' | 'material', id: number, topicId?: number) => {
        setDraggedItem({ type, id, topicId });
        e.dataTransfer.effectAllowed = 'move';
        e.currentTarget.style.opacity = '0.5';
    };

    const handleDragEnd = (e: React.DragEvent) => {
        e.currentTarget.style.opacity = '1';
        setDraggedItem(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetType: 'topic' | 'material', targetId: number, targetTopicId?: number) => {
        e.preventDefault();
        if (!draggedItem) return;

        // Handle topic reordering
        if (draggedItem.type === 'topic' && targetType === 'topic' && draggedItem.id !== targetId) {
            const newTopics = [...topics];
            const draggedIndex = newTopics.findIndex(t => t.id === draggedItem.id);
            const targetIndex = newTopics.findIndex(t => t.id === targetId);

            const [removed] = newTopics.splice(draggedIndex, 1);
            newTopics.splice(targetIndex, 0, removed);

            setTopics(newTopics);
        }

        // Handle material reordering within same topic
        if (draggedItem.type === 'material' && targetType === 'material' &&
            draggedItem.topicId === targetTopicId && draggedItem.id !== targetId) {
            const newTopics = [...topics];
            const topicIndex = newTopics.findIndex(t => t.id === draggedItem.topicId);
            if (topicIndex !== -1) {
                const materials = [...newTopics[topicIndex].materials];
                const draggedIndex = materials.findIndex(m => m.id === draggedItem.id);
                const targetIndex = materials.findIndex(m => m.id === targetId);

                const [removed] = materials.splice(draggedIndex, 1);
                materials.splice(targetIndex, 0, removed);

                newTopics[topicIndex].materials = materials;
                setTopics(newTopics);
            }
        }

        // Handle material moving between topics
        if (draggedItem.type === 'material' && targetType === 'topic' &&
            draggedItem.topicId !== targetId) {
            const newTopics = [...topics];
            const sourceTopicIndex = newTopics.findIndex(t => t.id === draggedItem.topicId);
            const targetTopicIndex = newTopics.findIndex(t => t.id === targetId);

            if (sourceTopicIndex !== -1 && targetTopicIndex !== -1) {
                const materialIndex = newTopics[sourceTopicIndex].materials.findIndex(m => m.id === draggedItem.id);
                if (materialIndex !== -1) {
                    const [removed] = newTopics[sourceTopicIndex].materials.splice(materialIndex, 1);
                    newTopics[targetTopicIndex].materials.push(removed);
                    setTopics(newTopics);
                }
            }
        }

        setDraggedItem(null);
    };

    const handleQuizSubmit = (quizData: any) => {
        console.log('New quiz created:', quizData);
        // Here you would typically save to database or state management
        alert('Quiz assignment created successfully!');
    };

    const addContentOptions = [
        { type: 'topic', label: 'Create topic', icon: RiFolderAddLine },
        { type: 'material', label: 'Material', icon: RiFolderLine },
        { type: 'assignment', label: 'Assignment', icon: RiFileTextLine },
        { type: 'quiz', label: 'Quiz assignment', icon: RiQuestionLine }
    ];

    const handleCreateAction = (type: string) => {
        setShowAddDropdown(false);
        if (type === 'quiz') {
            setShowQuizModal(true);
        } else {
            console.log(`Create ${type}`);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-medium text-gray-900">Coursework</h1>

                    {/* Add Content Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowAddDropdown(!showAddDropdown)}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <RiFolderAddLine className="text-lg" />
                            <span>Create</span>
                            <RiArrowDownSLine className="text-lg" />
                        </button>

                        {showAddDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                                {addContentOptions.map((option) => (
                                    <button
                                        key={option.type}
                                        onClick={() => handleCreateAction(option.type)}
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <i className={`${option.icon} ${typeColors[option.type as keyof typeof typeColors]} text-lg`}></i>
                                        <span className="text-gray-900">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search classwork..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                        >
                            <option value="all">All Types</option>
                            <option value="material">Materials</option>
                            <option value="assignment">Assignments</option>
                            <option value="quiz">Quizzes</option>
                        </select>
                    </div>
                </div>


                {/* Topics */}
                <div className="space-y-4">
                    {topics.map((topic) => (
                        <div
                            key={topic.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'topic', topic.id)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'topic', topic.id)}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow"
                        >
                            {/* Topic Header */}
                            <div
                                className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleTopicCollapse(topic.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <RiFolderLine className="text-blue-600 text-xl" />
                                    <div>
                                        <h3 className="font-medium text-gray-900">{topic.title}</h3>
                                        {topic.description && (
                                            <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">
                                        {topic.materials.length} item{topic.materials.length !== 1 ? 's' : ''}
                                    </span>
                                    <button className="p-1 hover:bg-gray-200 rounded">
                                        <RiMore2Line className="text-gray-500" />
                                    </button>
                                    <RiArrowDownSLine className={`text-gray-400 transition-transform ${topic.isCollapsed ? 'rotate-90' : ''}`} />
                                </div>
                            </div>

                            {/* Topic Materials */}
                            {!topic.isCollapsed && (
                                <div className="p-4 space-y-3">
                                    {topic.materials.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            <RiFileAddLine className="text-3xl mb-2 block" />
                                            <p>No materials in this topic yet</p>
                                        </div>
                                    ) : (
                                        topic.materials.map((material) => (
                                            <div
                                                key={material.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, 'material', material.id, topic.id)}
                                                onDragEnd={handleDragEnd}
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleDrop(e, 'material', material.id, topic.id)}
                                                className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-move transition-colors"
                                            >
                                                <i className={`${typeIcons[material.type]} ${typeColors[material.type]} text-xl mt-1`}></i>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-3 mb-1">
                                                                <span className="font-medium text-gray-900">{material.title}</span>
                                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(material.type)}`}>
                                                                    {material.type}
                                                                </span>
                                                            </div>
                                                            {/* <h4 className="font-medium text-gray-900 mb-1">{material.title}</h4> */}
                                                            <p className="text-sm text-gray-600 mb-2">{material.description}</p>

                                                            <div className="flex items-center space-x-3 flex-wrap">
                                                                <span className={`px-2 py-1 text-xs font-medium rounded border ${statusColors[material.status]}`}>
                                                                    {material.status}
                                                                </span>

                                                                {material.dueDate && (
                                                                    <span className="text-xs text-gray-600">
                                                                        <RiCalendarLine className="mr-1" />
                                                                        Due {new Date(material.dueDate).toLocaleDateString()}
                                                                    </span>
                                                                )}

                                                                {material.points && (
                                                                    <span className="text-xs text-gray-600">
                                                                        <RiStarLine className="mr-1" />
                                                                        {material.points} points
                                                                    </span>
                                                                )}

                                                                {material.attachments && (
                                                                    <span className="text-xs text-gray-600">
                                                                        <RiAttachmentLine className="mr-1" />
                                                                        {material.attachments} files
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button className="p-1 hover:bg-gray-200 rounded ml-2">
                                                            <RiMore2Line className="text-gray-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {topics.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <RiFolderAddLine className="text-gray-400 text-3xl" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No topics yet</h3>
                        <p className="text-gray-600 mb-6">Create your first topic to organize course content</p>
                        <button
                            onClick={() => setShowAddDropdown(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Create Topic
                        </button>
                    </div>
                )}
            </div>

            {/* Overlay to close dropdown */}
            {showAddDropdown && (
                <div
                    className="fixed inset-0 z-5"
                    onClick={() => setShowAddDropdown(false)}
                ></div>
            )}

            {/* Quiz Modal */}
            <CreateQuizModal
                isOpen={showQuizModal}
                onClose={() => setShowQuizModal(false)}
                onSubmit={handleQuizSubmit}
            />
        </div>
    );
}
