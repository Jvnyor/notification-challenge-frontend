import {render, screen} from '@testing-library/react';
import LogItem from '../components/LogItem';
import type {INotificationLog} from '../types';

describe('LogItem', () => {
    const log: INotificationLog = {
        id: '1',
        categoryName: 'Sports',
        channelName: 'SMS',
        status: 'SENT',
        userName: 'John Doe',
        userContact: '1234567890',
        messageContent: 'Test notification',
        createdAt: new Date().toISOString(),
    };

    it('renders log details', () => {
        render(<LogItem log={log}/>);
        expect(screen.getByText(/Sports/)).toBeInTheDocument();
        expect(screen.getByText(/SMS/)).toBeInTheDocument();
        expect(screen.getByText(/SENT/)).toBeInTheDocument();
        expect(screen.getByText(/John Doe/)).toBeInTheDocument();
        expect(screen.getByText(/Test notification/)).toBeInTheDocument();
    });
});

