
import { useState } from 'react';
import Card from '#/components/modules/learn/Card';
import Button from '#/components/modules/learn/Button';
import {
    RiVipCrownLine,
    RiUserStarLine,
    RiUserSettingsLine,
    RiEyeLine,
    RiEditLine,
    RiMoneyDollarCircleLine,
    RiTeamLine,
    RiCheckboxLine,
    RiMailLine,
    RiQrCodeLine,
    RiShareLine,
    RiUserAddLine,
    RiWifiLine,
    RiShieldUserLine,
    RiMailSendLine,
    RiTimeLine,
    RiUserUnfollowLine,
    RiMessage3Line,
    RiDeleteBinLine,
    RiAddLine,
    RiCheckLine,
    RiSendPlaneLine,
    RiFileCopyLine,
    RiDownloadLine,
    RiTwitterXLine,
    RiFacebookLine,
    RiLinkedinLine,
    RiWhatsappLine,
    RiSaveLine,
} from 'react-icons/ri';

interface CollaboratorsProps {
    courseId: number;
}

// Mock data for collaborators
const mockCollaborators = [
    {
        id: 1,
        name: 'Dr. Sarah Wilson',
        email: 'sarah.wilson@university.edu',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20teacher%20portrait%2C%20friendly%20smile%2C%20business%20casual%20attire%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=80&height=80&seq=sarah-avatar&orientation=squarish',
        role: 'owner',
        permissions: ['view', 'edit', 'manage_payments', 'manage_collaborators'],
        joinedAt: '2024-01-15',
        lastActive: '2 hours ago',
        status: 'online'
    },
    {
        id: 2,
        name: 'Prof. Michael Chen',
        email: 'michael.chen@university.edu',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20male%20teacher%20portrait%2C%20friendly%20smile%2C%20business%20casual%20attire%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=80&height=80&seq=michael-avatar&orientation=squarish',
        role: 'co-teacher',
        permissions: ['view', 'edit'],
        joinedAt: '2024-02-01',
        lastActive: '1 day ago',
        status: 'offline'
    },
    {
        id: 3,
        name: 'Emma Rodriguez',
        email: 'emma.rodriguez@university.edu',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20assistant%20portrait%2C%20friendly%20smile%2C%20business%20casual%20attire%2C%20clean%20white%20background%2C%20high%20quality%20headshot%20photo%2C%20modern%20professional%20appearance&width=80&height=80&seq=emma-avatar&orientation=squarish',
        role: 'assistant',
        permissions: ['view'],
        joinedAt: '2024-02-15',
        lastActive: '5 minutes ago',
        status: 'online'
    }
];

// Configuration for role presentation
const roleConfig = {
    owner: {
        label: 'Owner',
        color: 'bg-gradient-to-r from-purple-500 to-purple-600',
        textColor: 'text-white',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        icon: RiVipCrownLine
    },
    'co-teacher': {
        label: 'Co-Teacher',
        color: 'bg-gradient-to-r from-blue-500 to-blue-600',
        textColor: 'text-white',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: RiUserStarLine
    },
    assistant: {
        label: 'Assistant',
        color: 'bg-gradient-to-r from-green-500 to-green-600',
        textColor: 'text-white',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: RiUserSettingsLine
    }
};

export default function Collaborators({ courseId }: CollaboratorsProps) {
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState('assistant');
    const [selectedCollaborator, setSelectedCollaborator] = useState<any>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showSocialModal, setShowSocialModal] = useState(false);
    const [emailInvitations, setEmailInvitations] = useState(['']);

    // Function to get label and icon for a permission
    const getPermissionLabel = (permission: string) => {
        const labels = {
            view: { text: 'View Course', icon: RiEyeLine },
            edit: { text: 'Edit Content', icon: RiEditLine },
            manage_payments: { text: 'Manage Payments', icon: RiMoneyDollarCircleLine },
            manage_collaborators: { text: 'Manage Team', icon: RiTeamLine }
        };
        return labels[permission as keyof typeof labels] || { text: permission, icon: RiCheckboxLine };
    };

    // Open the edit modal for a collaborator
    const openEditModal = (collaborator: any) => {
        setSelectedCollaborator(collaborator);
        setShowEditModal(true);
    };

    // Email invitation handling
    const addEmailField = () => {
        setEmailInvitations([...emailInvitations, '']);
    };

    const removeEmailField = (index: number) => {
        setEmailInvitations(emailInvitations.filter((_, i) => i !== index));
    };

    const updateEmail = (index: number, value: string) => {
        const updated = [...emailInvitations];
        updated[index] = value;
        setEmailInvitations(updated);
    };

    // Clipboard copy utility
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    // Social sharing handler
    const shareToSocial = (platform: string) => {
        const courseUrl = `${window.location.origin}/course/${courseId}`;
        const text = `Join me in the "${mockCourse.title}" course!`;

        let shareUrl = '';
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(courseUrl)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(courseUrl)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(courseUrl)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + courseUrl)}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                            <RiTeamLine className="mr-3 text-blue-600" />
                            Course Team
                        </h2>
                        <p className="text-gray-600 mt-1">Manage collaborators and their permissions</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button onClick={() => setShowEmailModal(true)} variant="outline" className="shadow-sm">
                            <RiMailLine className="mr-2" />
                            Email Invites
                        </Button>
                        <Button onClick={() => setShowQRModal(true)} variant="outline" className="shadow-sm">
                            <RiQrCodeLine className="mr-2" />
                            QR Code
                        </Button>
                        <Button onClick={() => setShowSocialModal(true)} variant="outline" className="shadow-sm">
                            <RiShareLine className="mr-2" />
                            Social Media
                        </Button>
                        <Button onClick={() => setShowInviteModal(true)} variant="primary" className="shadow-lg">
                            <RiUserAddLine className="mr-2" />
                            Invite Member
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-600 text-sm font-medium">Total Members</p>
                                <p className="text-2xl font-bold text-blue-700">{mockCollaborators.length}</p>
                            </div>
                            <RiTeamLine className="text-2xl text-blue-500" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-600 text-sm font-medium">Online Now</p>
                                <p className="text-2xl font-bold text-green-700">{mockCollaborators.filter(c => c.status === 'online').length}</p>
                            </div>
                            <RiWifiLine className="text-2xl text-green-500" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-600 text-sm font-medium">Active Roles</p>
                                <p className="text-2xl font-bold text-purple-700">3</p>
                            </div>
                            <RiShieldUserLine className="text-2xl text-purple-500" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-600 text-sm font-medium">Invites Sent</p>
                                <p className="text-2xl font-bold text-orange-700">12</p>
                            </div>
                            <RiMailSendLine className="text-2xl text-orange-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Collaborators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCollaborators.map((collaborator) => {
                    const config = roleConfig[collaborator.role as keyof typeof roleConfig];
                    return (
                        <Card key={collaborator.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-6">
                                {/* Header with Status */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="relative">
                                        <img
                                            src={collaborator.avatar}
                                            alt={collaborator.name}
                                            className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                                        />
                                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${collaborator.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                            }`}></div>
                                    </div>

                                    {/* Role Badge */}
                                    <div className={`${config.color} ${config.textColor} px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-md`}>
                                        <config.icon className="mr-1" />
                                        {config.label}
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="mb-4">
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">{collaborator.name}</h3>
                                    <p className="text-gray-600 text-sm mb-2">{collaborator.email}</p>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <RiTimeLine className="mr-1" />
                                        <span>Active {collaborator.lastActive}</span>
                                    </div>
                                </div>

                                {/* Permissions Preview */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Permissions</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {collaborator.permissions.slice(0, 2).map((permission) => {
                                            const permInfo = getPermissionLabel(permission);
                                            return (
                                                <span
                                                    key={permission}
                                                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                                                >
                                                    <i className={`${permInfo.icon} mr-1 text-xs`}></i>
                                                    {permInfo.text}
                                                </span>
                                            );
                                        })}
                                        {collaborator.permissions.length > 2 && (
                                            <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                                                +{collaborator.permissions.length - 2} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-xs text-gray-500">
                                        Joined {new Date(collaborator.joinedAt).toLocaleDateString()}
                                    </span>
                                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {collaborator.role !== 'owner' && (
                                            <>
                                                <button
                                                    onClick={() => openEditModal(collaborator)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit permissions"
                                                >
                                                    <RiEditLine className="text-sm" />
                                                </button>
                                                <button
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Remove collaborator"
                                                >
                                                    <RiUserUnfollowLine className="text-sm" />
                                                </button>
                                            </>
                                        )}
                                        <button
                                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                            title="Send message"
                                        >
                                            <RiMessage3Line className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}

                {/* Add Member Card */}
                <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-dashed border-2 border-gray-300 hover:border-blue-400">
                    <button
                        onClick={() => setShowInviteModal(true)}
                        className="w-full h-full p-6 flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 transition-colors min-h-[300px]"
                    >
                        <div className="w-16 h-16 bg-gray-100 group-hover:bg-blue-50 rounded-full flex items-center justify-center mb-4 transition-colors">
                            <RiUserAddLine className="text-2xl group-hover:text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600">Invite Member</h3>
                        <p className="text-sm text-center">Add a new collaborator to your course team</p>
                    </button>
                </Card>
            </div>

            {/* Email Invitations Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                <RiMailLine className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Send Email Invitations</h3>
                                <p className="text-gray-600">Send email invitations to specific people</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Email Addresses</label>
                                {emailInvitations.map((email, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-3">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => updateEmail(index, e.target.value)}
                                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                                            placeholder="colleague@university.edu"
                                        />
                                        {emailInvitations.length > 1 && (
                                            <button
                                                onClick={() => removeEmailField(index)}
                                                className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                            >
                                                <RiDeleteBinLine className="text-sm" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    onClick={addEmailField}
                                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm mt-2"
                                >
                                    <RiAddLine className="mr-1" />
                                    Add another email
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Default Role</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {Object.entries(roleConfig).filter(([role]) => role !== 'owner').map(([role, config]) => (
                                        <label key={role} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedRole === role
                                                ? `${config.borderColor} ${config.bgColor}`
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}>
                                            <input
                                                type="radio"
                                                name="emailRole"
                                                value={role}
                                                checked={selectedRole === role}
                                                onChange={(e) => setSelectedRole(e.target.value)}
                                                className="sr-only"
                                            />
                                            <div className={`w-8 h-8 ${config.color} rounded-full flex items-center justify-center mr-3 shadow-md`}>
                                                <i className={`${config.icon} text-white text-sm`}></i>
                                            </div>
                                            <div className="flex-1">
                                                <span className="font-semibold text-gray-900 text-sm">{config.label}</span>
                                                {selectedRole === role && (
                                                    <RiCheckLine className="text-green-600 font-bold ml-2" />
                                                )}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Subject</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                                    defaultValue="Invitation to collaborate on Advanced Chemistry course"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Personal Message</label>
                                <textarea
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                                    rows={4}
                                    defaultValue="Hi! I'd like to invite you to collaborate on my Advanced Chemistry course. Your expertise would be valuable to our students."
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-4 mt-8">
                            <Button onClick={() => setShowEmailModal(false)} variant="ghost" className="px-6">
                                Cancel
                            </Button>
                            <Button onClick={() => setShowEmailModal(false)} variant="primary" className="px-6 shadow-lg">
                                <RiSendPlaneLine className="mr-2" />
                                Send Invitations
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* QR Code Modal */}
            {showQRModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <RiQrCodeLine className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Course QR Code</h3>
                            <p className="text-gray-600 mt-1">Scan to join the course</p>
                        </div>

                        <div className="text-center space-y-6">
                            <div className="p-6 bg-gray-50 rounded-2xl">
                                <div className="w-48 h-48 mx-auto bg-white rounded-xl p-4 shadow-md">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.origin + '/course/' + courseId)}`}
                                        alt="Course QR Code"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <span className="text-sm text-gray-600 truncate flex-1 mr-2">
                                        {window.location.origin}/course/{courseId}
                                    </span>
                                    <button
                                        onClick={() => copyToClipboard(window.location.origin + '/course/' + courseId)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Copy link"
                                    >
                                        <RiFileCopyLine />
                                        Copy Link
                                    </button>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" className="flex-1" onClick={() => copyToClipboard(window.location.origin + '/course/' + courseId)}>
                                        <RiFileCopyLine className="mr-2" />
                                        Copy Link
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <RiDownloadLine className="mr-2" />
                                        Download QR
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-8">
                            <Button onClick={() => setShowQRModal(false)} variant="primary" className="px-8">
                                Done
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Social Media Modal */}
            {showSocialModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <RiShareLine className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Share on Social Media</h3>
                            <p className="text-gray-600 mt-1">Invite people through social platforms</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => shareToSocial('twitter')}
                                    className="flex items-center justify-center p-4 border-2 border-sky-200 bg-sky-50 hover:bg-sky-100 rounded-xl transition-all group"
                                >
                                    <RiTwitterXLine className="text-2xl text-sky-600 mr-3" />
                                    <div className="text-left">
                                        <div className="font-semibold text-sky-700">Twitter</div>
                                        <div className="text-xs text-sky-600">Share tweet</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => shareToSocial('facebook')}
                                    className="flex items-center justify-center p-4 border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all group"
                                >
                                    <RiFacebookLine className="text-2xl text-blue-600 mr-3" />
                                    <div className="text-left">
                                        <div className="font-semibold text-blue-700">Facebook</div>
                                        <div className="text-xs text-blue-600">Share post</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => shareToSocial('linkedin')}
                                    className="flex items-center justify-center p-4 border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all group"
                                >
                                    <RiLinkedinLine className="text-2xl text-blue-700 mr-3" />
                                    <div className="text-left">
                                        <div className="font-semibold text-blue-800">LinkedIn</div>
                                        <div className="text-xs text-blue-700">Professional</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => shareToSocial('whatsapp')}
                                    className="flex items-center justify-center p-4 border-2 border-green-200 bg-green-50 hover:bg-green-100 rounded-xl transition-all group"
                                >
                                    <RiWhatsappLine className="text-2xl text-green-600 mr-3" />
                                    <div className="text-left">
                                        <div className="font-semibold text-green-700">WhatsApp</div>
                                        <div className="text-xs text-green-600">Send message</div>
                                    </div>
                                </button>
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Share Message Preview</label>
                                <div className="text-sm text-gray-600 italic">
                                    "Join me in the 'Advanced Chemistry' course! Learn comprehensive chemistry principles with hands-on laboratory experiments."
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <span className="text-sm text-gray-600 truncate flex-1 mr-2">
                                    {window.location.origin}/course/{courseId}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(window.location.origin + '/course/' + courseId)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Copy link"
                                >
                                    <RiFileCopyLine className="mr-2" />
                                    Copy Link
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center mt-8">
                            <Button onClick={() => setShowSocialModal(false)} variant="primary" className="px-8">
                                Done
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                <RiUserAddLine className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Invite Collaborator</h3>
                                <p className="text-gray-600">Add a new member to your course team</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="colleague@university.edu"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Role</label>
                                <div className="space-y-3">
                                    {Object.entries(roleConfig).filter(([role]) => role !== 'owner').map(([role, config]) => (
                                        <label key={role} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedRole === role
                                                ? `${config.borderColor} ${config.bgColor}`
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}>
                                            <input
                                                type="radio"
                                                name="role"
                                                value={role}
                                                checked={selectedRole === role}
                                                onChange={(e) => setSelectedRole(e.target.value)}
                                                className="sr-only"
                                            />
                                            <div className={`w-10 h-10 ${config.color} rounded-full flex items-center justify-center mr-4 shadow-md`}>
                                                <i className={`${config.icon} text-white`}></i>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-semibold text-gray-900">{config.label}</span>
                                                    {selectedRole === role && (
                                                        <RiCheckLine className="text-green-600 font-bold" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {role === 'co-teacher' ? 'Can view and edit course content' : 'Can view course content only'}
                                                </p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Personal Message (Optional)</label>
                                <textarea
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    rows={3}
                                    placeholder="Hi! I'd like to invite you to collaborate on my course..."
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-4 mt-8">
                            <Button onClick={() => setShowInviteModal(false)} variant="ghost" className="px-6">
                                Cancel
                            </Button>
                            <Button onClick={() => setShowInviteModal(false)} variant="primary" className="px-6 shadow-lg">
                                <RiSendPlaneLine className="mr-2" />
                                Send Invitation
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && selectedCollaborator && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center mb-6">
                            <img
                                src={selectedCollaborator.avatar}
                                alt={selectedCollaborator.name}
                                className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Edit Permissions</h3>
                                <p className="text-gray-600">{selectedCollaborator.name}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Role</label>
                                <div className="space-y-3">
                                    {Object.entries(roleConfig).filter(([role]) => role !== 'owner').map(([role, config]) => (
                                        <label key={role} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedCollaborator.role === role
                                                ? `${config.borderColor} ${config.bgColor}`
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}>
                                            <input
                                                type="radio"
                                                name="editRole"
                                                value={role}
                                                checked={selectedCollaborator.role === role}
                                                className="sr-only"
                                            />
                                            <div className={`w-10 h-10 ${config.color} rounded-full flex items-center justify-center mr-4 shadow-md`}>
                                                <i className={`${config.icon} text-white`}></i>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-semibold text-gray-900">{config.label}</span>
                                                    {selectedCollaborator.role === role && (
                                                        <RiCheckLine className="text-green-600 font-bold" />
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {(role === 'co-teacher' ? ['view', 'edit'] : ['view']).map((permission) => {
                                                        const permInfo = getPermissionLabel(permission);
                                                        return (
                                                            <span key={permission} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                                                <i className={`${permInfo.icon} mr-1 text-xs`}></i>
                                                                {permInfo.text}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-4 mt-8">
                            <Button onClick={() => setShowEditModal(false)} variant="ghost" className="px-6">
                                Cancel
                            </Button>
                            <Button onClick={() => setShowEditModal(false)} variant="primary" className="px-6 shadow-lg">
                                <RiSaveLine className="mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
