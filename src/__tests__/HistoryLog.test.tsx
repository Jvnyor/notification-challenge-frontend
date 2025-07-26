import {render, screen} from '@testing-library/react';
import HistoryLog from '../components/HistoryLog';
import {NotificationProvider} from '../contexts/NotificationContext';

jest.mock('../contexts/useNotification', () => {
    return {
        useNotification: () => ({
            logs: [
                {
                    id: '1',
                    categoryName: 'Finance',
                    channelName: 'Email',
                    status: 'SENT',
                    userName: 'Jane Doe',
                    userContact: 'jane@example.com',
                    messageContent: 'Finance update',
                    createdAt: new Date().toISOString(),
                },
            ],
            isLoading: false,
            error: null,
            fetchLogs: jest.fn(),
        }),
    };
});

describe('HistoryLog', () => {
    it('renders Notification History title', () => {
        render(
            <NotificationProvider>
                <HistoryLog/>
            </NotificationProvider>
        );
        expect(screen.getByText(/Notification History/i)).toBeInTheDocument();
    });

    it('renders log items when logs are present', () => {
        render(
            <NotificationProvider>
                <HistoryLog/>
            </NotificationProvider>
        );
        // Use getAllByText to avoid multiple match error
        expect(screen.getAllByText(/Finance/).length).toBeGreaterThan(0);
        expect(screen.getByText(/Email/)).toBeInTheDocument();
        expect(screen.getByText(/Jane Doe/)).toBeInTheDocument();
        expect(screen.getByText(/Finance update/)).toBeInTheDocument();
    });
});
