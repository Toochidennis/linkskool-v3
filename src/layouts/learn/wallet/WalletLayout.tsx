import {
    FaWallet,
    FaChartLine,
    FaClock,
    FaDownload,
    FaFilter,
    FaUniversity,
    FaFileAlt,
    FaFileInvoiceDollar,
    FaPlus,
    FaBuilding,
    FaGraduationCap,
    FaBook,
    FaMoneyBillWave,
    FaChalkboardTeacher,
    FaUserGraduate
} from 'react-icons/fa';
import { useState } from 'react';

interface Transaction {
    title: string;
    subtitle: string;
    amount: string;
    date: string;
    status: string;
    type: 'positive' | 'negative';

}

const Wallet: React.FC = () => {
    const [selectedAction, setSelectedAction] = useState<string>('withdraw');
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    return (
        <div className="p-4 h-screen flex flex-col overflow-hidden">
            <div className="p-4 flex-1 h-[calc(100vh-80px)] overflow-hidden">
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-0 leading-tight">Wallet & Earnings</h1>
                    <p className="text-sm text-gray-600 mt-0 leading-tight">Manage your earnings and withdraw funds</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="p-4 rounded-lg relative min-h-[140px] flex flex-col bg-green-500 text-white">
                        <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md bg-white/20">
                            <FaWallet size={20} />
                        </div>
                        <div className="mt-auto pb-2">
                            <div className="text-sm font-medium absolute top-3 left-4 leading-8">Available Balance</div>
                            <div className="text-2xl font-bold mt-6 mb-1">$4,250</div>
                            <div className="text-xs opacity-80">Ready to withdraw</div>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg relative min-h-[140px] flex flex-col bg-blue-500 text-white">
                        <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md bg-white/20">
                            <FaClock size={20} />
                        </div>
                        <div className="mt-auto pb-2">
                            <div className="text-sm font-medium absolute top-3 left-4 leading-8">Pending Balance</div>
                            <div className="text-2xl font-bold mt-6 mb-1">$750</div>
                            <div className="text-xs opacity-80">Processing payments</div>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg relative min-h-[140px] flex flex-col bg-purple-600 text-white">
                        <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md bg-white/20">
                            <FaChartLine size={20} />
                        </div>
                        <div className="mt-auto pb-2">
                            <div className="text-sm font-medium absolute top-3 left-4 leading-8">Total Earnings</div>
                            <div className="text-2xl font-bold mt-6 mb-1">$12,840</div>
                            <div className="text-xs opacity-80">All time earnings</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-6 h-full">
                    <div className="flex-[0_0_70%] bg-white rounded-lg shadow-sm h-[calc(100vh-280px)] flex flex-col relative max-h-[calc(100vh-280px)] min-h-[400px]">
                        <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-100 z-10 rounded-t-lg flex-shrink-0">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-semibold text-gray-800 m-0 leading-9 h-9">Transaction History</h2>
                                    <p className="text-sm text-gray-600 m-0 leading-tight">Your payment and withdrawal history</p>
                                </div>
                                <div className="flex gap-3 h-9">
                                    <button className="flex items-center gap-2 px-4 h-9 rounded-md border border-blue-500 text-blue-500 bg-white text-sm font-medium cursor-pointer transition-all hover:bg-blue-50">
                                        <FaDownload size={16} />
                                        <span>Export</span>
                                    </button>
                                    <button className="flex items-center gap-2 px-4 h-9 rounded-md border border-blue-500 text-blue-500 bg-white text-sm font-medium cursor-pointer transition-all hover:bg-blue-50">
                                        <FaFilter size={16} />
                                        <span>Filter</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto px-6 pb-6 h-full max-h-[calc(100vh-340px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                            {[
                                {
                                    title: "Student payment - Advanced Mathematics",
                                    subtitle: "Student: John Doe",
                                    amount: "+$299",
                                    date: "1/22/2024",
                                    status: "Completed",
                                    type: "positive" as const,
                                    icon: <FaGraduationCap size={20} />
                                },
                                {
                                    title: "Course Payment - Physics 101",
                                    subtitle: "Student: Sarah Smith",
                                    amount: "+$249",
                                    date: "1/21/2024",
                                    status: "Completed",
                                    type: "positive" as const,
                                    icon: <FaBook size={20} />
                                },
                                {
                                    title: "Withdrawal to Bank Account",
                                    subtitle: "Bank of America ****1234",
                                    amount: "-$1,500",
                                    date: "1/20/2024",
                                    status: "Completed",
                                    type: "negative" as const,
                                    icon: <FaMoneyBillWave size={20} />
                                },
                                {
                                    title: "Tutorial Session - Chemistry",
                                    subtitle: "Student: Mike Johnson",
                                    amount: "+$150",
                                    date: "1/19/2024",
                                    status: "Completed",
                                    type: "positive" as const,
                                    icon: <FaChalkboardTeacher size={20} />
                                },
                                {
                                    title: "Course Bundle - Computer Science",
                                    subtitle: "Student: Emily Brown",
                                    amount: "+$599",
                                    date: "1/18/2024",
                                    status: "Completed",
                                    type: "positive" as const,
                                    icon: <FaUserGraduate size={20} />
                                }
                            ].map((transaction, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 last:mb-[120px] last:pb-10 first:mt-1 cursor-pointer transition-colors hover:bg-gray-50"
                                    onClick={() => setSelectedTransaction(transaction)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-blue-500">
                                            {transaction.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-sm font-medium text-gray-800 mb-1">{transaction.title}</div>
                                            <div className="text-xs text-gray-600">{transaction.subtitle}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-0.5">
                                        <div className={`text-sm font-semibold leading-tight ${transaction.type === 'positive' ? 'text-green-500' : 'text-red-500'}`}>{transaction.amount}</div>
                                        <div className="text-xs text-gray-600 mt-1">{transaction.date}</div>
                                        <div className="text-xs text-green-500 mt-1">{transaction.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {selectedTransaction && (
                            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]" onClick={() => setSelectedTransaction(null)}>
                                <div className="bg-white rounded-xl p-8 w-[400px] max-w-[90vw] shadow-lg" onClick={e => e.stopPropagation()}>
                                    <div className="bg-white p-6 border border-gray-200 rounded-lg">
                                        <div className="text-center mb-6 pb-4 border-b-2 border-dashed border-gray-200">
                                            <h3 className="text-xl text-gray-800 m-0 mb-2">Transaction Receipt</h3>
                                            <p className="text-gray-600 text-sm m-0">LinkSkool Education Platform</p>
                                        </div>
                                        <div className="mb-6">
                                            <div className="flex justify-between mb-3 text-sm">
                                                <span className="text-gray-600">Transaction ID</span>
                                                <span className="text-gray-800 font-medium">#LSK{Math.random().toString().slice(2, 8)}</span>
                                            </div>
                                            <div className="flex justify-between mb-3 text-sm">
                                                <span className="text-gray-600">Date</span>
                                                <span className="text-gray-800 font-medium">{selectedTransaction.date}</span>
                                            </div>
                                            <div className="flex justify-between mb-3 text-sm">
                                                <span className="text-gray-600">Type</span>
                                                <span className="text-gray-800 font-medium">{selectedTransaction.title}</span>
                                            </div>
                                            <div className="flex justify-between mb-3 text-sm">
                                                <span className="text-gray-600">From/To</span>
                                                <span className="text-gray-800 font-medium">{selectedTransaction.subtitle}</span>
                                            </div>
                                            <div className="flex justify-between mb-3 text-sm">
                                                <span className="text-gray-600">Status</span>
                                                <span className="text-gray-800 font-medium">{selectedTransaction.status}</span>
                                            </div>
                                            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-200">
                                                <div className="flex justify-between text-base">
                                                    <span className="text-gray-600">Amount</span>
                                                    <span className="text-gray-800 font-semibold">{selectedTransaction.amount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-6">
                                        <button className="flex-1 p-2.5 rounded-md text-sm font-medium cursor-pointer transition-all bg-blue-500 text-white border-none hover:bg-blue-600" onClick={() => alert('Downloading receipt...')}>
                                            <FaDownload size={16} className="inline mr-2" /> Download Receipt
                                        </button>
                                        <button className="flex-1 p-2.5 rounded-md text-sm font-medium cursor-pointer transition-all bg-white text-gray-600 border border-gray-200 hover:bg-gray-50" onClick={() => setSelectedTransaction(null)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 pt-6 px-6 bg-white rounded-lg shadow-sm overflow-y-auto h-[calc(100vh-240px)] flex flex-col max-h-[calc(100vh-340px)] min-h-[400px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 leading-tight">Quick Actions</h2>
                        <div className="flex flex-col gap-3">
                            <button
                                className={`flex items-center gap-3 p-3 border rounded-lg text-sm font-medium cursor-pointer transition-all ${selectedAction === 'withdraw' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-blue-500'}`}
                                onClick={() => setSelectedAction('withdraw')}
                            >
                                <FaUniversity size={20} className={selectedAction === 'withdraw' ? 'text-white' : 'text-blue-500'} />
                                <span>Withdraw Funds</span>
                            </button>
                            <button
                                className={`flex items-center gap-3 p-3 border rounded-lg text-sm font-medium cursor-pointer transition-all ${selectedAction === 'tax' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-blue-500'}`}
                                onClick={() => setSelectedAction('tax')}
                            >
                                <FaFileAlt size={20} className={selectedAction === 'tax' ? 'text-white' : 'text-blue-500'} />
                                <span>Tax Documents</span>
                            </button>
                            <button
                                className={`flex items-center gap-3 p-3 border rounded-lg text-sm font-medium cursor-pointer transition-all ${selectedAction === 'invoice' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-blue-500'}`}
                                onClick={() => setSelectedAction('invoice')}
                            >
                                <FaFileInvoiceDollar size={20} className={selectedAction === 'invoice' ? 'text-white' : 'text-blue-500'} />
                                <span>Generate Invoice</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
