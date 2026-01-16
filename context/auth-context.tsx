import {
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';

interface UserProfile {
    fullName?: string;
    email?: string;
    uid?: string;
    phone?: string;
    settings?: {
        pushNotifications?: boolean;
        emailMarketing?: boolean;
    };
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribeProfile: (() => void) | undefined;

        const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                // Listen to Firestore profile updates
                unsubscribeProfile = onSnapshot(doc(db, 'users', firebaseUser.uid), (doc) => {
                    if (doc.exists()) {
                        setUserProfile(doc.data() as UserProfile);
                    } else {
                        setUserProfile(null);
                    }
                    setLoading(false);
                });
            } else {
                setUserProfile(null);
                if (unsubscribeProfile) unsubscribeProfile();
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeProfile) unsubscribeProfile();
        };
    }, []);

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
