import { useState, useRef } from 'react';
import {
    RiUserLine,
    RiNotificationLine,
    RiShieldLine,
    RiWalletLine,
    RiSettingsLine,
    RiCameraLine,
    RiAddLine,
    RiCloseLine,
    RiBankCardLine,
    RiInformationLine,
    RiGoogleLine,
    RiVideoChatLine,
    RiLink,
    RiAlertLine,
    RiErrorWarningLine,
    RiShieldCheckLine,
} from 'react-icons/ri';

import Button from '#/components/modules/learn/Button';
import Input from '#/components/modules/learn/Input';
import Modal from '#/components/modules/learn/Modal';

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [showEditPaymentModal, setShowEditPaymentModal] = useState(false);
    const [showRemovePaymentModal, setShowRemovePaymentModal] = useState(false);
    const [selectedIntegration, setSelectedIntegration] = useState<{ name: string, type: string } | null>(null);
    const [integrations, setIntegrations] = useState({
        googleCalendar: false,
        zoom: false
    });
    const [paymentSettings, setPaymentSettings] = useState({
        payoutSchedule: 'weekly',
        minimumPayout: '100',
        taxId: '•••-••-4567'
    });
   // const { draftProfile, updateProfile, saveProfile, isSaved } = useProfile();
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '•••• •••• •••• 4532',
        expiryDate: '12/26',
        cvv: '',
        cardholderName: 'Dr. Sarah Johnson'
    });
    const [passwordDetails, setPasswordDetails] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
 //   const [avatarFile, setAvatarFile] = useState<File | null>(null);
   // const fileInputRef = useRef<HTMLInputElement>(null);

    const tabs = [
        { id: 'profile', label: 'Profile', icon: RiUserLine },
        { id: 'notifications', label: 'Notifications', icon: RiNotificationLine },
        { id: 'privacy', label: 'Privacy', icon: RiShieldLine },
        { id: 'payment', label: 'Payment', icon: RiWalletLine },
        { id: 'advanced', label: 'Advanced', icon: RiSettingsLine }
    ];

    const handleConnectIntegration = (name: string, type: string) => {
        setSelectedIntegration({ name, type });
        setShowConnectModal(true);
    };

    const handleConfirmConnection = () => {
        if (selectedIntegration?.type === 'googleCalendar') {
            setIntegrations(prev => ({ ...prev, googleCalendar: true }));
        } else if (selectedIntegration?.type === 'zoom') {
            setIntegrations(prev => ({ ...prev, zoom: true }));
        }
        setShowConnectModal(false);
        setSelectedIntegration(null);
    };

    const handleDeactivateAccount = () => {
        setShowDeactivateModal(false);
        // Simulate account deactivation
        setTimeout(() => {
            alert('Account deactivated successfully. You can reactivate it by logging in again.');
        }, 500);
    };

    const handleEditPayment = () => {
        setShowEditPaymentModal(true);
    };

    const handleRemovePayment = () => {
        setShowRemovePaymentModal(true);
    };

    const handleConfirmRemovePayment = () => {
        setShowRemovePaymentModal(false);
        setTimeout(() => {
            alert('Payment method removed successfully.');
        }, 500);
    };

    const handleSavePaymentSettings = () => {
        setTimeout(() => {
            alert('Payment settings saved successfully.');
        }, 500);
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div>Profile content goes here  </div>
                    // <div className="space-y-8">
                    //     <div className="flex items-center space-x-6">
                    //         <div className="relative">
                    //             <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
                    //                 {avatarFile ? (
                    //                     <img src={URL.createObjectURL(avatarFile)} alt="Avatar" className="w-full h-full object-cover" />
                    //                 ) : (
                    //                     (draftProfile.firstName?.[0] || '') + (draftProfile.lastName?.[0] || '') || 'SJ'
                    //                 )}
                    //             </div>
                    //             <button
                    //                 className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 cursor-pointer"
                    //                 onClick={() => fileInputRef.current?.click()}
                    //             >
                    //                 <RiCameraLine className="text-sm" />
                    //             </button>
                    //             <input
                    //                 type="file"
                    //                 accept="image/*"
                    //                 ref={fileInputRef}
                    //                 onChange={handleAvatarUpload}
                    //                 className="hidden"
                    //             />
                    //         </div>
                    //         <div>
                    //             <h3 className="text-xl font-semibold text-gray-900">{draftProfile.firstName || 'Dr.'} {draftProfile.lastName || 'Sarah Johnson'}</h3>
                    //             <p className="text-gray-600">Mathematics Teacher</p>
                    //             <p className="text-sm text-gray-500 mt-1">Member since January 2024</p>
                    //         </div>
                    //     </div>

                    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    //         <div>
                    //             <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    //             <Input
                    //                 type="text"
                    //                 value={draftProfile.firstName}
                    //                 onChange={(e) => updateProfile({ firstName: e.target.value })}
                    //             />
                    //         </div>
                    //         <div>
                    //             <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    //             <Input
                    //                 type="text"
                    //                 value={draftProfile.lastName}
                    //                 onChange={(e) => updateProfile({ lastName: e.target.value })}
                    //             />
                    //         </div>
                    //         <div>
                    //             <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    //             <Input
                    //                 type="email"
                    //                 value={draftProfile.email}
                    //                 onChange={(e) => updateProfile({ email: e.target.value })}
                    //             />
                    //         </div>
                    //         <div>
                    //             <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    //             <Input
                    //                 type="tel"
                    //                 value={draftProfile.phone}
                    //                 onChange={(e) => updateProfile({ phone: e.target.value })}
                    //             />
                    //         </div>
                    //     </div>

                    //     <div>
                    //         <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    //         <textarea
                    //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-sm resize-none"
                    //             rows={4}
                    //             value={draftProfile.bio}
                    //             onChange={(e) => updateProfile({ bio: e.target.value })}
                    //         />
                    //     </div>

                    //     <div>
                    //         <label className="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
                    //         <div className="flex flex-wrap gap-2">
                    //             {['Advanced Mathematics', 'Calculus', 'Algebra', 'Statistics', 'Geometry'].map((skill) => (
                    //                 <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    //                     {skill}
                    //                     <button className="ml-2 w-4 h-4 flex items-center justify-center text-blue-600 hover:text-blue-800 cursor-pointer">
                    //                         <RiCloseLine className="text-xs" />
                    //                     </button>
                    //                 </span>
                    //             ))}
                    //             <button className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer">
                    //                 <RiAddLine className="mr-1" />
                    //                 Add Skill
                    //             </button>
                    //         </div>
                    //     </div>

                    //     <div className="flex justify-end">
                    //         <Button onClick={saveProfile} disabled={isSaved}>
                    //             {isSaved ? 'Saved!' : 'Save Changes'}
                    //         </Button>
                    //     </div>
                    // </div>
                );

            case 'notifications':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
                            <div className="space-y-4">
                                {[
                                    { id: 'new_enrollment', label: 'New student enrollments', description: 'Get notified when students join your classes' },
                                    { id: 'assignment_submission', label: 'Assignment submissions', description: 'Get notified when students submit assignments' },
                                    { id: 'payment_received', label: 'Payment notifications', description: 'Get notified when you receive payments' },
                                    { id: 'student_questions', label: 'Student questions', description: 'Get notified when students ask questions' },
                                    { id: 'class_reminders', label: 'Class reminders', description: 'Get reminders before your classes start' }
                                ].map((notification) => (
                                    <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <h4 className="font-medium text-gray-900">{notification.label}</h4>
                                            <p className="text-sm text-gray-600">{notification.description}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Push Notifications</h3>
                            <div className="space-y-4">
                                {[
                                    { id: 'instant_messages', label: 'Instant messages', description: 'Get push notifications for direct messages' },
                                    { id: 'urgent_updates', label: 'Urgent updates', description: 'Get push notifications for urgent system updates' }
                                ].map((notification) => (
                                    <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <h4 className="font-medium text-gray-900">{notification.label}</h4>
                                            <p className="text-sm text-gray-600">{notification.description}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button>Save Preferences</Button>
                        </div>
                    </div>
                );

            case 'privacy':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Public Profile</h4>
                                        <p className="text-sm text-gray-600">Allow students to view your public profile</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Contact Information</h4>
                                        <p className="text-sm text-gray-600">Show email and phone to enrolled students</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Download Your Data</h4>
                                    <p className="text-sm text-gray-600 mb-3">Get a copy of all your data including classes, students, and earnings</p>
                                    <Button variant="outline" size="sm">Request Data Export</Button>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Activity Log</h4>
                                    <p className="text-sm text-gray-600 mb-3">View your recent activity and login history</p>
                                    <Button variant="outline" size="sm">View Activity</Button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                                    </div>
                                    <Button variant="outline" size="sm">Enable 2FA</Button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Change Password</h4>
                                        <p className="text-sm text-gray-600">Update your account password</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => setShowPasswordModal(true)}>
                                        Change Password
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'payment':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                            <div className="space-y-4">
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <RiBankCardLine className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">•••• •••• •••• 4532</p>
                                                <p className="text-sm text-gray-600">Expires 12/26</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="sm" onClick={handleEditPayment}>Edit</Button>
                                            <Button variant="outline" size="sm" onClick={handleRemovePayment}>Remove</Button>
                                        </div>
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full">
                                    <RiAddLine className="mr-2" />
                                    Add Payment Method
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payout Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Payout Schedule</label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm pr-8"
                                        value={paymentSettings.payoutSchedule}
                                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, payoutSchedule: e.target.value }))}
                                    >
                                        <option value="weekly">Weekly</option>
                                        <option value="biweekly">Bi-weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Payout Amount</label>
                                    <Input
                                        type="number"
                                        value={paymentSettings.minimumPayout}
                                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, minimumPayout: e.target.value }))}
                                    />
                                    <p className="text-sm text-gray-600 mt-1">Minimum amount before automatic payout</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID / SSN</label>
                                    <Input
                                        type="text"
                                        value={paymentSettings.taxId}
                                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, taxId: e.target.value }))}
                                    />
                                </div>

                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <RiInformationLine className="text-blue-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-blue-900">Tax Forms</p>
                                            <p className="text-sm text-blue-700">Your tax forms will be available in January for the previous year's earnings.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button onClick={handleSavePaymentSettings}>Save Payment Settings</Button>
                        </div>
                    </div>
                );

            case 'advanced':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Management</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Export Data</h4>
                                    <p className="text-sm text-gray-600 mb-3">Download all your teaching data including classes, students, and materials</p>
                                    <Button variant="outline" size="sm">Export All Data</Button>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Account Backup</h4>
                                    <p className="text-sm text-gray-600 mb-3">Create a backup of your account settings and preferences</p>
                                    <Button variant="outline" size="sm">Create Backup</Button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <RiGoogleLine className="text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Google Calendar</h4>
                                            <p className="text-sm text-gray-600">Sync your classes with Google Calendar</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleConnectIntegration('Google Calendar', 'googleCalendar')}
                                    >
                                        {integrations.googleCalendar ? 'Connected' : 'Connect'}
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <RiVideoChatLine className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Zoom</h4>
                                            <p className="text-sm text-gray-600">Connect Zoom for online classes</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleConnectIntegration('Zoom', 'zoom')}
                                    >
                                        {integrations.zoom ? 'Connected' : 'Connect'}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                            <div className="space-y-4">
                                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                                    <h4 className="font-medium text-red-900 mb-2">Deactivate Account</h4>
                                    <p className="text-sm text-red-700 mb-3">Temporarily deactivate your account. You can reactivate it later.</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-red-300 text-red-700 hover:bg-red-100"
                                        onClick={() => setShowDeactivateModal(true)}
                                    >
                                        Deactivate Account
                                    </Button>
                                </div>

                                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                                    <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
                                    <p className="text-sm text-red-700 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-red-300 text-red-700 hover:bg-red-100"
                                        onClick={() => setShowDeleteModal(true)}
                                    >
                                        Delete Account
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* <Sidebar userRole="teacher" currentPath="/teacher/settings" /> */}

            <div className="flex-1 flex flex-col">
                {/* <TopBar userRole="teacher" /> */}

                <div className="flex-1 p-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                            <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="flex border-b border-gray-200">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 cursor-pointer ${activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600 bg-blue-50'
                                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <tab.icon />
                                            <span>{tab.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="p-8">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deactivate Account Modal */}
            <Modal
                isOpen={showDeactivateModal}
                onClose={() => setShowDeactivateModal(false)}
                title="Deactivate Account"
            >
                <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                            <RiAlertLine className="text-yellow-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-yellow-900 mb-1">Account will be temporarily disabled</p>
                                <p className="text-sm text-yellow-700">Your account will be deactivated and you won't be able to access it until you reactivate it by logging in again.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">What happens when you deactivate:</h4>
                        <ul className="text-sm text-gray-600 space-y-1 ml-4">
                            <li>• Your profile will be hidden from students</li>
                            <li>• Classes will be paused (not deleted)</li>
                            <li>• Students won't be able to access class materials</li>
                            <li>• You can reactivate anytime by logging in</li>
                        </ul>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Button variant="outline" onClick={() => setShowDeactivateModal(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeactivateAccount}
                            className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                        >
                            Deactivate Account
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Connect Integration Modal */}
            <Modal
                isOpen={showConnectModal}
                onClose={() => setShowConnectModal(false)}
                title={`Connect ${selectedIntegration?.name}`}
            >
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                            <RiInformationLine className="text-blue-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-blue-900 mb-1">Integration Benefits</p>
                                <p className="text-sm text-blue-700">
                                    {selectedIntegration?.type === 'googleCalendar'
                                        ? 'Automatically sync your class schedules with Google Calendar and never miss a class again.'
                                        : 'Generate Zoom meeting links for your online classes and manage them directly from your dashboard.'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">What you'll get:</h4>
                        <ul className="text-sm text-gray-600 space-y-1 ml-4">
                            {selectedIntegration?.type === 'googleCalendar' ? (
                                <>
                                    <li>• Automatic calendar sync for all classes</li>
                                    <li>• Class reminders and notifications</li>
                                    <li>• Easy schedule management</li>
                                    <li>• Share schedules with students</li>
                                </>
                            ) : (
                                <>
                                    <li>• One-click meeting creation</li>
                                    <li>• Automatic meeting links for classes</li>
                                    <li>• Recording and attendance tracking</li>
                                    <li>• Seamless video class experience</li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Button variant="outline" onClick={() => setShowConnectModal(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmConnection} className="flex-1">
                            <RiLink className="mr-2" />
                            Connect {selectedIntegration?.name}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Delete Account Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setDeleteConfirmation('')}
                title="Delete Account"
            >
                <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                            <RiErrorWarningLine className="text-red-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-red-900 mb-1">This action cannot be undone</p>
                                <p className="text-sm text-red-700">All your classes, students, and data will be permanently deleted.</p>
                            </div>
                        </div>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type "DELETE" to confirm
                        </label>
                        <Input
                            type="text"
                            placeholder="DELETE"
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                        />
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button className="flex-1 bg-red-600 hover:bg-red-700">
                            Delete Account
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Edit Payment Modal */}
            <Modal
                isOpen={showEditPaymentModal}
                onClose={() => setShowEditPaymentModal(false)}
                title="Edit Payment Method"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <Input
                            type="text"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <Input
                                type="text"
                                value={paymentDetails.expiryDate}
                                onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                                placeholder="MM/YY"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                            <Input
                                type="text"
                                value={paymentDetails.cvv}
                                onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value }))}
                                placeholder="123"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                        <Input
                            type="text"
                            value={paymentDetails.cardholderName}
                            onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardholderName: e.target.value }))}
                        />
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                            <RiShieldCheckLine className="text-blue-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-blue-900">Secure Payment</p>
                                <p className="text-sm text-blue-700">Your payment information is encrypted and secure.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Button variant="outline" onClick={() => setShowEditPaymentModal(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button onClick={() => setShowEditPaymentModal(false)} className="flex-1">
                            Update Payment Method
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Remove Payment Modal */}
            <Modal
                isOpen={showRemovePaymentModal}
                onClose={() => setShowRemovePaymentModal(false)}
                title="Remove Payment Method"
            >
                <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                            <RiAlertLine className="text-yellow-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-yellow-900 mb-1">Remove payment method</p>
                                <p className="text-sm text-yellow-700">Are you sure you want to remove this payment method? This will affect your payout settings.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <RiBankCardLine className="text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">•••• •••• •••• 4532</p>
                                <p className="text-sm text-gray-600">Expires 12/26</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">What happens when you remove:</h4>
                        <ul className="text-sm text-gray-600 space-y-1 ml-4">
                            <li>• You won't receive payouts to this card</li>
                            <li>• Any scheduled payouts will be paused</li>
                            <li>• You'll need to add a new payment method</li>
                        </ul>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Button variant="outline" onClick={() => setShowRemovePaymentModal(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmRemovePayment}
                            className="flex-1 bg-red-600 hover:bg-red-700"
                        >
                            Remove Payment Method
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Change Password Modal */}
            <Modal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
                title="Change Password"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <Input
                            type="password"
                            placeholder="Enter current password"
                            value={passwordDetails.currentPassword}
                            onChange={(e) => setPasswordDetails(prev => ({ ...prev, currentPassword: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <Input
                            type="password"
                            placeholder="Enter new password"
                            value={passwordDetails.newPassword}
                            onChange={(e) => setPasswordDetails(prev => ({ ...prev, newPassword: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <Input
                            type="password"
                            placeholder="Confirm new password"
                            value={passwordDetails.confirmPassword}
                            onChange={(e) => setPasswordDetails(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        />
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Button variant="outline" onClick={() => setShowPasswordModal(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button onClick={() => setShowPasswordModal(false)} className="flex-1">
                            Update Password
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Settings;
