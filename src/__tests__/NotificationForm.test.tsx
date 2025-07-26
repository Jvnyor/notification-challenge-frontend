import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import NotificationForm from '../components/NotificationForm';
import {NotificationProvider} from '../contexts/NotificationContext';

jest.mock('../api/notifications.ts', () => ({
    sendNotification: jest.fn(() => Promise.resolve()),
}));

describe('NotificationForm', () => {
    it('renders form fields and submits a notification', async () => {
        render(
            <NotificationProvider>
                <NotificationForm/>
            </NotificationProvider>
        );
        expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
        fireEvent.change(screen.getByLabelText(/Message/i), {target: {value: 'Test message'}});
        fireEvent.click(screen.getByRole('button', {name: /Send Notification/i}));
        await waitFor(() => {
            expect(screen.getByText(/Notification sent successfully!/i)).toBeInTheDocument();
        });
    });
});

