
import { useState } from 'react';

interface ClassworkProps {
    cohortId: number;
}

const mockTopics = [
    {
        id: 1,
        title: 'Introduction to Chemistry',
        items: [
            { id: 1, title: 'Atomic Structure Presentation', type: 'material', icon: 'ri-file-text-line' },
            { id: 2, title: 'Lab Safety Quiz', type: 'quiz', icon: 'ri-question-line' },
            { id: 3, title: 'Periodic Table Assignment', type: 'assignment', icon: 'ri-clipboard-line' }
        ]
    },
    {
        id: 2,
        title: 'Chemical Bonding',
        items: [
            { id: 4, title: 'Ionic vs Covalent Bonds', type: 'material', icon: 'ri-file-text-line' },
            { id: 5, title: 'Bonding Quiz', type: 'quiz', icon: 'ri-question-line' }
        ]
    }
];

export default function Classwork({ cohortId }: ClassworkProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'material': return 'bg-blue-100 text-blue-700';
            case 'assignment': return 'bg-green-100 text-green-700';
            case 'quiz': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Classwork</h2>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                        <i className="ri-add-line"></i>
                        <span>Add Topic</span>
                    </button>
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
            <div className="space-y-6">
                {mockTopics.map((topic) => (
                    <div key={topic.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="font-medium text-gray-900">{topic.title}</h3>
                            <div className="flex items-center space-x-2">
                                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                                    <i className="ri-more-line text-gray-500"></i>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3">
                                {topic.items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <i className={`${item.icon} text-gray-500`}></i>
                                            <span className="font-medium text-gray-900">{item.title}</span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                                                {item.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                                                Edit
                                            </button>
                                            <button className="text-gray-500 hover:text-gray-700">
                                                <i className="ri-more-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Topic Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Add New Topic</h3>
                        <input
                            type="text"
                            placeholder="Topic title..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                        />
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Add Topic
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
