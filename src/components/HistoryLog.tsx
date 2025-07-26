import {useEffect} from 'react';
import {useNotification} from '../contexts/useNotification';
import LogItem from './LogItem';
import type {INotificationLog} from '../types';
import {Box, Card, CardContent, Stack, Typography} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

const HistoryLog = () => {
    const {logs, isLoading, error, fetchLogs} = useNotification();

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const renderContent = () => {
        if (isLoading) {
            return <Typography>Loading history...</Typography>;
        }
        
        if (error || (logs && logs.length === 0)) {
            return (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={6}>
                    <InboxIcon sx={{fontSize: 64, color: 'text.disabled', mb: 2}}/>
                    <Typography variant="h6" color="text.secondary">
                        No notification history found.
                    </Typography>
                </Box>
            );
        }
        if (logs && logs.length > 0) {
            return (
                <Stack spacing={2}>
                    {logs.map((log: INotificationLog) => <LogItem key={log.id} log={log}/>)}
                </Stack>
            );
        }
        return null;
    };

    return (
        <Card sx={{maxWidth: 700, margin: '2rem auto', boxShadow: 3}}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Notification History
                </Typography>
                {renderContent()}
            </CardContent>
        </Card>
    );
};

export default HistoryLog;
