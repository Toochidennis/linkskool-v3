
import { useState } from 'react';
import { RiChat3Line, RiHeartLine, RiMoreLine, RiPushpinLine, RiAddLine } from 'react-icons/ri';

interface DiscussionsProps {
    cohortId: number;
}

const mockDiscussions = [
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
    }
];

const Discussions: React.FC<DiscussionsProps> = ({ cohortId }) => {
    const [showNewPost, setShowNewPost] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Discussions</h2>
                <button
                    onClick={() => setShowNewPost(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                    <RiAddLine />
                    <span>New Post</span>
                </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                    <div key={discussion.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                {discussion.pinned && (
                                    <RiPushpinLine className='text-blue-600'/>
                                )}
                                <h3 className="font-medium text-gray-900">{discussion.title}</h3>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <RiMoreLine />
                            </button>
                        </div>

                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                {discussion.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">{discussion.author}</span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(discussion.authorRole)}`}>
                                    {discussion.authorRole}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">{discussion.timestamp}</span>
                        </div>

                        <p className="text-gray-700 mb-4">{discussion.content}</p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center space-x-1">
                                    <RiChat3Line />
                                    <span>{discussion.replies} replies</span>
                                </span>
                                <span>Last reply: {discussion.lastReply}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="text-blue-600 hover:text-blue-700 font-medium">
                                    Reply
                                </button>
                                <button className="text-gray-500 hover:text-gray-700">
                                    <RiHeartLine />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* New Post Modal */}
            {showNewPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <h3 className="text-lg font-semibold mb-4">New Discussion Post</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Discussion title..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <textarea
                                placeholder="Share your thoughts..."
                                rows={6}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            ></textarea>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="pin" className="rounded border-gray-300" />
                                <label htmlFor="pin" className="text-sm text-gray-600">Pin this post</label>
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowNewPost(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowNewPost(false)}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Post Discussion
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Discussions;
