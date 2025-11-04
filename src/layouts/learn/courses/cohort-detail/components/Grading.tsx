
import { useState } from 'react';
import { RiDownloadLine } from 'react-icons/ri';

interface GradingProps {
    cohortId: number;
}

const mockStudents = [
    { id: 1, name: 'Alice Johnson', avatar: 'AJ' },
    { id: 2, name: 'Bob Smith', avatar: 'BS' },
    { id: 3, name: 'Carol Davis', avatar: 'CD' },
    { id: 4, name: 'David Wilson', avatar: 'DW' },
    { id: 5, name: 'Emma Brown', avatar: 'EB' }
];

const mockAssignments = [
    { id: 1, title: 'Lab Safety Quiz', type: 'quiz', maxScore: 100 },
    { id: 2, title: 'Periodic Table Assignment', type: 'assignment', maxScore: 50 },
    { id: 3, title: 'Chemical Bonding Quiz', type: 'quiz', maxScore: 75 },
    { id: 4, title: 'Molecular Structure Lab', type: 'assignment', maxScore: 100 }
];

const mockGrades = {
    1: { 1: 95, 2: 48, 3: 72, 4: 92 }, // Alice
    2: { 1: 88, 2: 45, 3: null, 4: 85 }, // Bob
    3: { 1: 92, 2: 50, 3: 70, 4: null }, // Carol
    4: { 1: 85, 2: 42, 3: 68, 4: 88 }, // David
    5: { 1: 98, 2: 47, 3: 75, 4: 95 } // Emma
};

export default function Grading({ cohortId }: GradingProps) {
    const [activeTab, setActiveTab] = useState('gradebook');
    const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

    const calculateAverage = (studentId: number) => {
        const grades = mockGrades[studentId as keyof typeof mockGrades];
        const validGrades = Object.values(grades).filter(grade => grade !== null) as number[];
        if (validGrades.length === 0) return 0;
        return Math.round(validGrades.reduce((sum, grade) => sum + grade, 0) / validGrades.length);
    };

    const getGradeColor = (score: number | null, maxScore: number) => {
        if (score === null) return 'text-gray-400';
        const percentage = (score / maxScore) * 100;
        if (percentage >= 90) return 'text-green-600';
        if (percentage >= 80) return 'text-blue-600';
        if (percentage >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Grading</h2>
                <div className="flex space-x-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <RiDownloadLine/>
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6">
                {[
                    { id: 'gradebook', label: 'Gradebook' },
                    { id: 'analytics', label: 'Analytics' },
                    { id: 'missing', label: 'Missing Work' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'gradebook' && (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 sticky left-0 bg-gray-50">
                                        Student
                                    </th>
                                    {mockAssignments.map((assignment) => (
                                        <th key={assignment.id} className="text-center px-4 py-3 text-sm font-medium text-gray-500 min-w-[120px]">
                                            <div>{assignment.title}</div>
                                            <div className="text-xs text-gray-400">/{assignment.maxScore}</div>
                                        </th>
                                    ))}
                                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-500">Average</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {mockStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 sticky left-0 bg-white">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                                    {student.avatar}
                                                </div>
                                                <span className="font-medium text-gray-900">{student.name}</span>
                                            </div>
                                        </td>
                                        {mockAssignments.map((assignment) => {
                                            const grade = mockGrades[student.id as keyof typeof mockGrades]?.[assignment.id];
                                            return (
                                                <td key={assignment.id} className="px-4 py-4 text-center">
                                                    <span className={`font-medium ${getGradeColor(grade, assignment.maxScore)}`}>
                                                        {grade !== null ? grade : '-'}
                                                    </span>
                                                </td>
                                            );
                                        })}
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-bold text-gray-900">
                                                {calculateAverage(student.id)}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'analytics' && (
                <div className="space-y-6">
                    {/* Class Performance Overview */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="font-medium text-gray-900 mb-4">Class Performance Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">89%</div>
                                <div className="text-sm text-gray-600">Class Average</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">98%</div>
                                <div className="text-sm text-gray-600">Highest Score</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-600">68%</div>
                                <div className="text-sm text-gray-600">Lowest Score</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">3</div>
                                <div className="text-sm text-gray-600">Missing Assignments</div>
                            </div>
                        </div>
                    </div>

                    {/* Assignment Performance */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="font-medium text-gray-900 mb-4">Assignment Performance</h3>
                        <div className="space-y-4">
                            {mockAssignments.map((assignment) => {
                                const scores = mockStudents.map(student => {
                                    const grade = mockGrades[student.id as keyof typeof mockGrades]?.[assignment.id];
                                    return grade !== null ? (grade / assignment.maxScore) * 100 : null;
                                }).filter(score => score !== null) as number[];

                                const average = scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;

                                return (
                                    <div key={assignment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900">{assignment.title}</div>
                                            <div className="text-sm text-gray-500">{assignment.type} • {scores.length}/{mockStudents.length} submitted</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-900">{average}%</div>
                                            <div className="text-sm text-gray-500">Average</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'missing' && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Missing Work</h3>
                    <div className="space-y-4">
                        {mockStudents.map((student) => {
                            const missingWork = mockAssignments.filter(assignment => {
                                const grade = mockGrades[student.id as keyof typeof mockGrades]?.[assignment.id];
                                return grade === null;
                            });

                            if (missingWork.length === 0) return null;

                            return (
                                <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                            {student.avatar}
                                        </div>
                                        <span className="font-medium text-gray-900">{student.name}</span>
                                        <span className="text-sm text-red-600">({missingWork.length} missing)</span>
                                    </div>
                                    <div className="space-y-2">
                                        {missingWork.map((assignment) => (
                                            <div key={assignment.id} className="flex items-center justify-between text-sm">
                                                <span className="text-gray-700">{assignment.title}</span>
                                                <button className="text-blue-600 hover:text-blue-700 font-medium">
                                                    Send Reminder
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
