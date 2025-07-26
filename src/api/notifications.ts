import type {INotificationLog, INotificationRequest} from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Fetches the notification history from the backend API.
 * @returns {Promise<INotificationLog[]>} A promise that resolves to an array of notification logs.
 * @throws {Error} If the request fails.
 */
export const getNotificationHistory = async (): Promise<INotificationLog[]> => {
    const response = await fetch(`${API_BASE_URL}/notifications/history`);
    if (!response.ok) {
        throw new Error('Failed to fetch notification history.');
    }
    return response.json();
};

/**
 * Sends a notification to the backend API.
 * @param {INotificationRequest} notificationData - The notification data to send.
 * @returns {Promise<Response>} The fetch response object.
 * @throws {Error} If the request fails.
 */
export const sendNotification = async (notificationData: INotificationRequest): Promise<Response> => {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to send notification: ${errorBody || response.statusText}`);
    }
    return response;
};

/**
 * Sends the user's FCM token to the backend.
 * @param {number} userId - The ID of the user.
 * @param {string} token - The FCM token.
 * @returns {Promise<Response>}
 */
export const updateUserFCMToken = async (userId: number, token: string): Promise<Response> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/fcm-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token}),
    });

    if (!response.ok) {
        throw new Error('Failed to update FCM token on server.');
    }
    return response;
};
