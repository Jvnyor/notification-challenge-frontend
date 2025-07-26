import type {ReactNode} from 'react';
import {createContext, useCallback, useMemo, useState} from 'react';
import {getNotificationHistory} from '../api/notifications';
import type {INotificationLog} from '../types';

interface INotificationContext {
    logs: INotificationLog[] | null;
    isLoading: boolean;
    error: string | null;
    fetchLogs: () => Promise<void>;
}

export const NotificationContext = createContext<INotificationContext | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider = ({children}: NotificationProviderProps) => {
    const [logs, setLogs] = useState<INotificationLog[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLogs = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const history = await getNotificationHistory();
            setLogs(history);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unknown error');
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const value = useMemo(() => ({
        logs,
        isLoading,
        error,
        fetchLogs,
    }), [logs, isLoading, error, fetchLogs]);

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
