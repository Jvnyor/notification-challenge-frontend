import {act, renderHook, waitFor} from '@testing-library/react';
import {NotificationProvider} from './NotificationContext';
import {useNotification} from './useNotification';

jest.mock('../api/notifications', () => ({
    getNotificationHistory: jest.fn(() => Promise.resolve([
        {
            id: '1',
            categoryName: 'Test',
            channelName: 'SMS',
            status: 'SENT',
            userName: 'User',
            userContact: '123',
            messageContent: 'Hello',
            createdAt: new Date().toISOString()
        }
    ])),
}));

describe('useNotification', () => {
    it('returns context values and fetchLogs works', async () => {
        const {result} = renderHook(() => useNotification(), {
            wrapper: NotificationProvider,
        });
        expect(result.current.logs).toBeNull();
        await act(async () => {
            await result.current.fetchLogs();
        });
        await waitFor(() => {
            expect(result.current.logs).toHaveLength(1);
        });
        expect(result.current.logs?.[0].categoryName).toBe('Test');
    });

    it('throws if used outside provider', () => {
        expect(() => renderHook(() => useNotification())).toThrow();
    });
});
