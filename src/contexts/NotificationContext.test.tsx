import {act, render} from '@testing-library/react';
import {NotificationContext, NotificationProvider} from './NotificationContext';
import {useContext} from 'react';

jest.mock('../api/notifications.ts', () => ({
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

describe('NotificationContext', () => {
    it('provides logs and fetchLogs to consumers', async () => {
        let contextValue: any = null;

        function TestComponent() {
            contextValue = useContext(NotificationContext);
            return null;
        }

        render(
            <NotificationProvider>
                <TestComponent/>
            </NotificationProvider>
        );
        expect(contextValue.logs).toBeNull();
        await act(async () => {
            await contextValue.fetchLogs();
        });
        expect(contextValue.logs).toHaveLength(1);
        expect(contextValue.logs[0].categoryName).toBe('Test');
    });
});

