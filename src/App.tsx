import {useEffect} from 'react';
import NotificationForm from './components/NotificationForm';
import HistoryLog from './components/HistoryLog';
import {NotificationProvider} from './contexts/NotificationContext';
import {getToken} from 'firebase/messaging';
import {messaging} from './firebase';
import {updateUserFCMToken} from './api/notifications';
import './App.css';

function App() {

    const requestNotificationPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Notification permission granted.');

                // Get the token
                const currentToken = await getToken(messaging, {
                    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
                });

                if (currentToken) {
                    console.log('FCM Token:', currentToken);
                    // For this example, we'll send the token for a hardcoded user (e.g., user with ID 3)
                    // In a real app, you would get the logged-in user's ID.
                    await updateUserFCMToken(3, currentToken);
                    console.log('FCM Token sent to server successfully.');
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            } else {
                console.log('Unable to get permission to notify.');
            }
        } catch (error) {
            console.error('An error occurred while requesting permission or getting token', error);
        }
    };

    useEffect(() => {
        requestNotificationPermission();
    },);

    return (
        <NotificationProvider>
            <div className="app-container">
                <header>
                    <h1>Notification System</h1>
                </header>
                <main>
                    <NotificationForm/>
                    <HistoryLog/>
                </main>
            </div>
        </NotificationProvider>
    );
}

export default App;
