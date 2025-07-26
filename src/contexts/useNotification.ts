import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';
import type { INotificationLog } from '../types';

interface INotificationContext {
    logs: INotificationLog[] | null;
    isLoading: boolean;
    error: string | null;
    fetchLogs: () => Promise<void>;
}

export function useNotification(): INotificationContext {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}

