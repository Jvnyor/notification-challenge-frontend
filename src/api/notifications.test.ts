import {getNotificationHistory, sendNotification, updateUserFCMToken} from '../api/notifications';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('notifications API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getNotificationHistory returns logs on success', async () => {
        const logs = [{
            id: '1',
            categoryName: 'Test',
            channelName: 'SMS',
            status: 'SENT',
            userName: 'User',
            userContact: '123',
            messageContent: 'Hello',
            createdAt: new Date().toISOString()
        }];
        mockFetch.mockResolvedValueOnce({ok: true, json: () => Promise.resolve(logs)});
        const result = await getNotificationHistory();
        expect(result).toEqual(logs);
        expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/notifications/history'));
    });

    it('getNotificationHistory throws on error', async () => {
        mockFetch.mockResolvedValueOnce({ok: false});
        await expect(getNotificationHistory()).rejects.toThrow('Failed to fetch notification history.');
    });

    it('sendNotification posts data and returns response', async () => {
        const response = {ok: true};
        mockFetch.mockResolvedValueOnce(response);
        const data = {category: 'Sports' as const, message: 'Hi'};
        const result = await sendNotification(data);
        expect(result).toBe(response);
        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining('/notifications'),
            expect.objectContaining({method: 'POST'})
        );
    });

    it('sendNotification throws on error', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            text: () => Promise.resolve('Bad request'),
            statusText: 'Bad request'
        });
        await expect(sendNotification({
            category: 'Sports',
            message: 'Hi'
        })).rejects.toThrow('Failed to send notification: Bad request');
    });

    it('updateUserFCMToken posts token and returns response', async () => {
        const response = {ok: true};
        mockFetch.mockResolvedValueOnce(response);
        const result = await updateUserFCMToken(1, 'token123');
        expect(result).toBe(response);
        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining('/users/1/fcm-token'),
            expect.objectContaining({method: 'POST'})
        );
    });

    it('updateUserFCMToken throws on error', async () => {
        mockFetch.mockResolvedValueOnce({ok: false});
        await expect(updateUserFCMToken(1, 'token123')).rejects.toThrow('Failed to update FCM token on server.');
    });
});
