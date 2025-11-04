import { useState } from 'react';

interface Question {
    id: number;
    type: 'multiple-choice' | 'checkbox' | 'true-false';
    title: string;
    description: string;
    required: boolean;
    isCollapsed: boolean;
    options?: string[];
    correctAnswer?: string | string[];
}

interface CreateQuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (quizData: any) => void;
}

export default function CreateQuizModal({ isOpen, onClose, onSubmit }: CreateQuizModalProps) {
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        instructions: '',
        timeLimit: '',
        attempts: 1,
        dueDate: '',
        points: ''
    });

    const [questions, setQuestions] = useState<Question[]>([
        {
            id: 1,
            type: 'multiple-choice',
            title: '',
            description: '',
            required: true,
            isCollapsed: false,
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: ''
        }
    ]);

    const [draggedQuestion, setDraggedQuestion] = useState<number | null>(null);

    const questionTypeIcons = {
        'multiple-choice': 'ri-radio-button-line',
        'checkbox': 'ri-checkbox-line',
        'true-false': 'ri-toggle-line'
    };

    const questionTypeLabels = {
        'multiple-choice': 'Multiple choice',
        'checkbox': 'Checkboxes',
        'true-false': 'True/False'
    };

    const addQuestion = (type: Question['type']) => {
        const newQuestion: Question = {
            id: Date.now(),
            type,
            title: '',
            description: '',
            required: true,
            isCollapsed: false,
            options: type === 'true-false' ? ['True', 'False'] :
                type === 'checkbox' ? ['Option 1', 'Option 2', 'Option 3'] :
                    ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: ''
        };
        setQuestions([...questions, newQuestion]);
    };

    const updateQuestion = (id: number, updates: Partial<Question>) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
    };

    const deleteQuestion = (id: number) => {
        if (questions.length > 1) {
            setQuestions(questions.filter(q => q.id !== id));
        }
    };

    const toggleQuestionCollapse = (id: number) => {
        updateQuestion(id, { isCollapsed: !questions.find(q => q.id === id)?.isCollapsed });
    };

    const addOption = (questionId: number) => {
        const question = questions.find(q => q.id === questionId);
        if (question && question.options) {
            const newOptions = [...question.options, `Option ${question.options.length + 1}`];
            updateQuestion(questionId, { options: newOptions });
        }
    };

    const updateOption = (questionId: number, optionIndex: number, value: string) => {
        const question = questions.find(q => q.id === questionId);
        if (question && question.options) {
            const newOptions = [...question.options];
            newOptions[optionIndex] = value;
            updateQuestion(questionId, { options: newOptions });
        }
    };

    const removeOption = (questionId: number, optionIndex: number) => {
        const question = questions.find(q => q.id === questionId);
        if (question && question.options && question.options.length > 2) {
            const newOptions = question.options.filter((_, index) => index !== optionIndex);
            updateQuestion(questionId, { options: newOptions });
        }
    };

    const handleDragStart = (e: React.DragEvent, questionId: number) => {
        setDraggedQuestion(questionId);
        e.dataTransfer.effectAllowed = 'move';
        e.currentTarget.style.opacity = '0.5';
    };

    const handleDragEnd = (e: React.DragEvent) => {
        e.currentTarget.style.opacity = '1';
        setDraggedQuestion(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetId: number) => {
        e.preventDefault();
        if (!draggedQuestion || draggedQuestion === targetId) return;

        const draggedIndex = questions.findIndex(q => q.id === draggedQuestion);
        const targetIndex = questions.findIndex(q => q.id === targetId);

        const newQuestions = [...questions];
        const [removed] = newQuestions.splice(draggedIndex, 1);
        newQuestions.splice(targetIndex, 0, removed);

        setQuestions(newQuestions);
        setDraggedQuestion(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...quizData, questions });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Create Quiz Assignment</h2>
                            <p className="text-purple-100 mt-1">Design an interactive quiz for your students</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-200"
                        >
                            <i className="ri-close-line text-xl"></i>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="p-6">
                        {/* Quiz Details */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                    <i className="ri-file-list-3-line text-white"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Quiz Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Quiz Title *</label>
                                    <input
                                        type="text"
                                        value={quizData.title}
                                        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder="e.g., Chapter 5 Chemistry Quiz"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={quizData.description}
                                        onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
                                        placeholder="Brief description of the quiz content and objectives"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time Limit (minutes)</label>
                                    <input
                                        type="number"
                                        value={quizData.timeLimit}
                                        onChange={(e) => setQuizData({ ...quizData, timeLimit: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder="60"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Points</label>
                                    <input
                                        type="number"
                                        value={quizData.points}
                                        onChange={(e) => setQuizData({ ...quizData, points: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder="100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
                                    <input
                                        type="datetime-local"
                                        value={quizData.dueDate}
                                        onChange={(e) => setQuizData({ ...quizData, dueDate: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Attempts Allowed</label>
                                    <select
                                        value={quizData.attempts}
                                        onChange={(e) => setQuizData({ ...quizData, attempts: Number(e.target.value) })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8 transition-all duration-200"
                                    >
                                        <option value={1}>1 attempt</option>
                                        <option value={2}>2 attempts</option>
                                        <option value={3}>3 attempts</option>
                                        <option value={-1}>Unlimited</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Questions */}
                        <div className="space-y-6 mb-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">Questions</h3>
                                <div className="flex items-center space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => addQuestion('multiple-choice')}
                                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-200 group"
                                    >
                                        <i className="ri-add-line group-hover:rotate-90 transition-transform duration-200"></i>
                                        <span>Add Question</span>
                                    </button>
                                </div>
                            </div>

                            {questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, question.id)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, question.id)}
                                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                                >
                                    {/* Question Header */}
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm cursor-move">
                                                    {index + 1}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <i className={`${questionTypeIcons[question.type]} text-purple-600`}></i>
                                                    <span className="font-medium text-gray-700">{questionTypeLabels[question.type]}</span>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${question.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {question.required ? 'Required' : 'Optional'}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <select
                                                    value={question.type}
                                                    onChange={(e) => updateQuestion(question.id, {
                                                        type: e.target.value as Question['type'],
                                                        options: e.target.value === 'true-false' ? ['True', 'False'] :
                                                            e.target.value === 'checkbox' ? ['Option 1', 'Option 2', 'Option 3'] :
                                                                ['Option 1', 'Option 2', 'Option 3', 'Option 4']
                                                    })}
                                                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                                                >
                                                    <option value="multiple-choice">Multiple choice</option>
                                                    <option value="checkbox">Checkboxes</option>
                                                    <option value="true-false">True/False</option>
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleQuestionCollapse(question.id)}
                                                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                                >
                                                    <i className={`ri-arrow-${question.isCollapsed ? 'down' : 'up'}-s-line text-gray-500 transition-transform duration-200`}></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => deleteQuestion(question.id)}
                                                    className="p-2 hover:bg-red-100 text-red-500 hover:text-red-700 rounded-lg transition-colors"
                                                    disabled={questions.length === 1}
                                                >
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Question Content */}
                                    {!question.isCollapsed && (
                                        <div className="p-6 space-y-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Question *</label>
                                                <input
                                                    type="text"
                                                    value={question.title}
                                                    onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                                    placeholder="Type your question here..."
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description (optional)</label>
                                                <textarea
                                                    value={question.description}
                                                    onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
                                                    rows={2}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
                                                    placeholder="Additional context or instructions for this question"
                                                />
                                            </div>

                                            {/* Options */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-3">Answer Options</label>
                                                <div className="space-y-3">
                                                    {question.options?.map((option, optionIndex) => (
                                                        <div key={optionIndex} className="flex items-center space-x-3 group">
                                                            <div className="flex items-center space-x-2">
                                                                {question.type === 'multiple-choice' && (
                                                                    <i className="ri-radio-button-line text-gray-400"></i>
                                                                )}
                                                                {question.type === 'checkbox' && (
                                                                    <i className="ri-checkbox-blank-line text-gray-400"></i>
                                                                )}
                                                                {question.type === 'true-false' && (
                                                                    <i className="ri-toggle-line text-gray-400"></i>
                                                                )}
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={option}
                                                                onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                                                placeholder={`Option ${optionIndex + 1}`}
                                                            />
                                                            {question.type !== 'true-false' && question.options && question.options.length > 2 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeOption(question.id, optionIndex)}
                                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                                                                >
                                                                    <i className="ri-close-line"></i>
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}

                                                    {question.type !== 'true-false' && (
                                                        <button
                                                            type="button"
                                                            onClick={() => addOption(question.id)}
                                                            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                                                        >
                                                            <i className="ri-add-line"></i>
                                                            <span>Add option</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Settings */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={question.required}
                                                        onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                                                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                                    />
                                                    <span className="text-sm font-medium text-gray-700">Required question</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors whitespace-nowrap"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-medium transition-all duration-200 whitespace-nowrap shadow-lg hover:shadow-xl"
                            >
                                Create Quiz
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}