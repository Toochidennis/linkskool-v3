
import { useState } from 'react';
import { RiAlertLine, RiDownloadLine, RiMoneyDollarCircleLine, RiTimeLine, RiUserLine } from 'react-icons/ri';

interface PaymentsProps {
    cohortId: number;
}

const mockPayments = [
    { id: 1, studentName: 'Alice Johnson', amount: 1200, status: 'paid', dueDate: '2024-03-15', paidDate: '2024-03-14' },
    { id: 2, studentName: 'Bob Smith', amount: 1200, status: 'pending', dueDate: '2024-03-15', paidDate: null },
    { id: 3, studentName: 'Carol Davis', amount: 1200, status: 'overdue', dueDate: '2024-03-10', paidDate: null },
    { id: 4, studentName: 'David Wilson', amount: 1200, status: 'paid', dueDate: '2024-03-15', paidDate: '2024-03-13' },
    { id: 5, studentName: 'Emma Brown', amount: 1200, status: 'pending', dueDate: '2024-03-20', paidDate: null }
];

const mockEarnings = {
    weekly: [
        { week: 'Week 1', amount: 2400 },
        { week: 'Week 2', amount: 1200 },
        { week: 'Week 3', amount: 3600 },
        { week: 'Week 4', amount: 1200 }
    ],
    monthly: { total: 8400, pending: 2400, overdue: 1200 }
};

const Payments: React.FC<PaymentsProps> = ({ cohortId }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'overdue': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Payments</h2>
                <div className="flex space-x-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <RiDownloadLine />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6">
                {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'transactions', label: 'Transactions' },
                    { id: 'analytics', label: 'Analytics' }
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

            {activeTab === 'overview' && (
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                                    <p className="text-2xl font-bold text-gray-900">${mockEarnings.monthly.total}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <RiMoneyDollarCircleLine className='text-green-600 text-xl' />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Pending</p>
                                    <p className="text-2xl font-bold text-yellow-600">${mockEarnings.monthly.pending}</p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <RiTimeLine className=" text-yellow-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Overdue</p>
                                    <p className="text-2xl font-bold text-red-600">${mockEarnings.monthly.overdue}</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <RiAlertLine className='text-red-600 text-xl' />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Students</p>
                                    <p className="text-2xl font-bold text-gray-900">{mockPayments.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <RiUserLine className='text-blue-600 text-xl' />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Status Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="font-medium text-gray-900">Payment Status</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Student</th>
                                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Amount</th>
                                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Due Date</th>
                                        <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockPayments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{payment.studentName}</td>
                                            <td className="px-6 py-4 text-gray-600">${payment.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{payment.dueDate}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-blue-600 hover:text-blue-700 font-medium">
                                                    {payment.status === 'overdue' ? 'Send Reminder' : 'View'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'transactions' && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-gray-600">Transaction history will be displayed here.</p>
                </div>
            )}

            {activeTab === 'analytics' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="font-medium text-gray-900 mb-4">Weekly Earnings</h3>
                        <div className="space-y-3">
                            {mockEarnings.weekly.map((week, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-gray-600">{week.week}</span>
                                    <span className="font-medium text-gray-900">${week.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payments;
