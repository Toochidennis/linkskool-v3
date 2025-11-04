import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    role: 'teacher' | 'student';
}

interface ProfileContextType {
    profile: ProfileData;
    draftProfile: ProfileData;
    updateProfile: (newProfile: Partial<ProfileData>) => void;
    getInitials: () => string;
    getFullName: () => string;
    saveProfile: () => void;
    isSaved: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};

interface ProfileProviderProps {
    children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
    const [profile, setProfile] = useState<ProfileData>({
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        bio: "Experienced mathematics teacher with over 10 years of experience in advanced calculus and algebra. Passionate about helping students understand complex mathematical concepts.",
        role: 'teacher'
    });

    const [draftProfile, setDraftProfile] = useState<ProfileData>(profile);
    const [isSaved, setIsSaved] = useState(false);

    // Sync draftProfile with profile when profile changes
    useEffect(() => {
        setDraftProfile(profile);
    }, [profile]);

    useEffect(() => {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            if (settings.profile) {
                const loadedProfile: ProfileData = {
                    firstName: settings.profile.firstName || 'Sarah',
                    lastName: settings.profile.lastName || 'Johnson',
                    email: settings.profile.email || 'sarah.johnson@email.com',
                    phone: settings.profile.phone || '+1 (555) 123-4567',
                    bio: settings.profile.bio || "Experienced mathematics teacher with over 10 years of experience in advanced calculus and algebra. Passionate about helping students understand complex mathematical concepts.",
                    role: (settings.profile.role as 'teacher' | 'student') || 'teacher'
                };
                setProfile(loadedProfile);
            }
        }
    }, []);

    const updateProfile = (newProfile: Partial<ProfileData>) => {
        setDraftProfile(prev => ({ ...prev, ...newProfile }));
    };

    const saveProfile = () => {
        setProfile(draftProfile);
        const savedSettings = localStorage.getItem('userSettings');
        const settings = savedSettings ? JSON.parse(savedSettings) : {};
        settings.profile = draftProfile;
        localStorage.setItem('userSettings', JSON.stringify(settings));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);

        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('profileUpdated', { detail: draftProfile }));
    };

    const getInitials = () => {
        return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;
    };

    const getFullName = () => {
        return `${profile.firstName} ${profile.lastName}`;
    };

    return (
        <ProfileContext.Provider value={{
            profile,
            draftProfile,
            updateProfile,
            getInitials,
            getFullName,
            saveProfile,
            isSaved
        }}>
            {children}
        </ProfileContext.Provider>
    );
};
