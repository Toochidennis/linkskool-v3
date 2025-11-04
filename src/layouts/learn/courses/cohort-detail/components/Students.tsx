
import React, { useState } from 'react';
import {
    RiForbidLine,
    RiCheckLine,
    RiUserUnfollowLine,
    RiArchiveLine,
    RiDownloadLine,
    RiCheckboxLine,
    RiNotificationLine,
    RiAlarmLine,
    RiUserAddLine,
    RiCheckboxMultipleLine,
    RiMoreLine,
    RiErrorWarningLine
} from 'react-icons/ri';

interface StudentsProps {
    cohortId: number;
}

const mockStudents = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active', joinDate: '2024-03-15', avatar: 'AJ' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'active', joinDate: '2024-03-16', avatar: 'BS' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', status: 'pending', joinDate: '2024-03-17', avatar: 'CD' },
    { id: 4, name: 'David Wilson', email: 'david@example.com', status: 'active', joinDate: '2024-03-18', avatar: 'DW' },
    { id: 5, name: 'Emma Brown', email: 'emma@example.com', status: 'active', joinDate: '2024-03-19', avatar: 'EB' },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', status: 'active', joinDate: '2024-03-20', avatar: 'FM' },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', status: 'pending', joinDate: '2024-03-21', avatar: 'GL' },
    { id: 8, name: 'Henry Taylor', email: 'henry@example.com', status: 'active', joinDate: '2024-03-22', avatar: 'HT' }
];

const Students: React.FC<StudentsProps> = ({ cohortId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
    const [showReminderModal, setShowReminderModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [selectedAction, setSelectedAction] = useState('');
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'inactive': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredStudents = mockStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(filteredStudents.map(student => student.id));
        }
        setSelectAll(!selectAll);
    };

    const handleStudentSelect = (studentId: number) => {
        if (selectedStudents.includes(studentId)) {
            setSelectedStudents(selectedStudents.filter(id => id !== studentId));
        } else {
            setSelectedStudents([...selectedStudents, studentId]);
        }
    };

    const handleBulkAction = (action: string) => {
        if (selectedStudents.length === 0) return;

        if (action === 'announcement') {
            setShowAnnouncementModal(true);
        } else if (action === 'reminder') {
            setShowReminderModal(true);
        } else {
            setSelectedAction(action);
            setShowActionModal(true);
        }
    };

    const getSelectedStudentNames = () => {
        return mockStudents
            .filter(student => selectedStudents.includes(student.id))
            .map(student => student.name)
            .join(', ');
    };

    const getActionDetails = (action: string) => {
        const actions = {
            block: { title: 'Block Students', icon: RiForbidLine, color: 'text-red-600', description: 'Block selected students from accessing the cohort' },
            unblock: { title: 'Unblock Students', icon: RiCheckLine, color: 'text-green-600', description: 'Restore access for selected students' },
            remove: { title: 'Remove Students', icon: RiUserUnfollowLine, color: 'text-red-600', description: 'Remove selected students from the cohort permanently' },
            archive: { title: 'Archive Students', icon: RiArchiveLine, color: 'text-gray-600', description: 'Archive selected students (they can be restored later)' },
            export: { title: 'Export Students', icon: RiDownloadLine, color: 'text-blue-600', description: 'Export selected student data to CSV' }
        };
        return actions[action as keyof typeof actions] || { title: action, icon: RiCheckboxLine, color: 'text-gray-600', description: '' };
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Students</h2>
                    <p className="text-gray-600">{mockStudents.length} students enrolled</p>
                </div>
                <div className="flex items-center space-x-3">
                    {selectedStudents.length > 0 && (
                        <>
                            <button
                                onClick={() => handleBulkAction('announcement')}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            >
                                <RiNotificationLine />
                                <span>Send Announcement</span>
                            </button>
                            <button
                                onClick={() => handleBulkAction('reminder')}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                            >
                                <RiAlarmLine />
                                <span>Send Reminder</span>
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => setShowInviteModal(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                        <RiUserAddLine />
                        <span>Invite Student</span>
                    </button>
                </div>
            </div>

            {/* Selection Summary */}
            {selectedStudents.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <RiCheckboxMultipleLine className="text-blue-600 text-lg" />
                            <span className="text-blue-900 font-medium">
                                {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleBulkAction('block')}
                                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-1"
                            >
                                <RiForbidLine />
                                <span>Block</span>
                            </button>
                            <button
                                onClick={() => handleBulkAction('remove')}
                                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-1"
                            >
                                <RiUserUnfollowLine />
                                <span>Remove</span>
                            </button>
                            <button
                                onClick={() => handleBulkAction('archive')}
                                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-1"
                            >
                                <RiArchiveLine />
                                <span>Archive</span>
                            </button>
                            <button
                                onClick={() => handleBulkAction('export')}
                                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-1"
                            >
                                <RiDownloadLine />
                                <span>Export</span>
                            </button>
                            <button
                                onClick={() => setSelectedStudents([])}
                                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                </th>
                                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Student</th>
                                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Email</th>
                                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Join Date</th>
                                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.includes(student.id)}
                                            onChange={() => handleStudentSelect(student.id)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                                {student.avatar}
                                            </div>
                                            <span className="font-medium text-gray-900">{student.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{student.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{student.joinDate}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                                                View
                                            </button>
                                            <button className="text-gray-500 hover:text-gray-700">
                                                <RiMoreLine />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Invite Student</h3>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Student email..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <textarea
                                placeholder="Optional message..."
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            ></textarea>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Send Invite
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Announcement Modal */}
            {showAnnouncementModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                        <div className="flex items-center mb-4">
                            <RiNotificationLine className="text-blue-600 text-xl mr-3" />
                            <h3 className="text-lg font-semibold">Send Announcement</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Sending to {selectedStudents.length} selected student{selectedStudents.length > 1 ? 's' : ''}
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Announcement subject..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    placeholder="Your announcement message..."
                                    rows={5}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="urgent"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="urgent" className="text-sm text-gray-700">Mark as urgent</label>
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowAnnouncementModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowAnnouncementModal(false)}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Send Announcement
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reminder Modal */}
            {showReminderModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                        <div className="flex items-center mb-4">
                            <RiAlarmLine className="text-purple-600 text-xl mr-3" />
                            <h3 className="text-lg font-semibold">Send Reminder</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Sending to {selectedStudents.length} selected student{selectedStudents.length > 1 ? 's' : ''}
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Type</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-8">
                                    <option>Assignment Due</option>
                                    <option>Quiz Reminder</option>
                                    <option>Class Schedule</option>
                                    <option>Payment Due</option>
                                    <option>Custom Reminder</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Reminder subject..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    placeholder="Reminder message..."
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Send Time</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-8">
                                    <option>Send Now</option>
                                    <option>Send in 1 hour</option>
                                    <option>Send in 24 hours</option>
                                    <option>Schedule for later</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowReminderModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowReminderModal(false)}
                                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Send Reminder
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Confirmation Modal */}
            {showActionModal && selectedAction && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex items-center mb-4">
                            <i className={`${getActionDetails(selectedAction).icon} ${getActionDetails(selectedAction).color} text-xl mr-3`}></i>
                            <h3 className="text-lg font-semibold">{getActionDetails(selectedAction).title}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            {getActionDetails(selectedAction).description}
                        </p>
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-1">Selected Students:</p>
                            <p className="text-sm text-gray-600">{getSelectedStudentNames()}</p>
                        </div>
                        {selectedAction === 'remove' && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                                <p className="text-sm text-red-700">
                                    <RiErrorWarningLine className="mr-1" />
                                    This action cannot be undone. Students will lose access to all cohort materials.
                                </p>
                            </div>
                        )}
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowActionModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowActionModal(false);
                                    setSelectedStudents([]);
                                }}
                                className={`flex-1 px-4 py-2 rounded-lg transition-colors text-white ${selectedAction === 'remove' || selectedAction === 'block'
                                    ? 'bg-red-600 hover:bg-red-700'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {selectedAction === 'export' ? 'Export' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Students;
