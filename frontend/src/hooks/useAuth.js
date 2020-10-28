import React, { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import setAuthToken from '../utils/setAuthToken';

firebase.initializeApp({
    apiKey: "AIzaSyBHCFpqUji6J7UTsEepwl2ez0y2UUSDBXk",
    authDomain: "ringed-magpie-285413.firebaseapp.com",
    databaseURL: "https://ringed-magpie-285413.firebaseio.com",
    projectId: "ringed-magpie-285413",
    storageBucket: "ringed-magpie-285413.appspot.com",
    messagingSenderId: "909033433276",
    appId: "1:909033433276:web:7c648e23c9ef94eba008b9",
    measurementId: "G-Y8JJMBV190"
});

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [signinFormActive, setSigninFormActive] = useState(false);

    const signout = () => {
        return firebase.auth().signOut().then(() => {
            setUser(false);
        });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user){
                user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                    setAuthToken(idToken);
                    setUser(user);
                })
            }
            else {
                setAuthToken(null);
                setUser(false);
            }
        });
        return () => unsubscribe();
    }, []);
  
    return {
        user,
        signout,
        signinFormActive,
        setSigninFormActive,
    };
}