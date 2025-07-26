import type {INotificationLog} from '../types';
import {Box, Card, CardContent, Chip, Stack, Typography} from '@mui/material';

/**
 * Props for the LogItem component.
 * @typedef {Object} Props
 * @property {INotificationLog} log - The notification log entry to display.
 */
interface Props {
    log: INotificationLog;
}

/**
 * Renders a single notification log entry as a Material UI Card.
 * @param {Props} props
 * @returns {JSX.Element}
 */
const LogItem = ({log}: Props) => {
    const formattedDate = new Date(log.createdAt).toLocaleString();

    return (
        <Card variant="outlined" sx={{width: '100%'}}>
            <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <Chip label={log.categoryName} color="primary" size="small"/>
                    <Chip label={log.channelName} color="secondary" size="small"/>
                    <Chip label={log.status} color={log.status === 'SENT' ? 'success' : 'warning'} size="small"/>
                </Stack>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    To: {log.userName} ({log.userContact})
                </Typography>
                <Typography variant="body1" sx={{fontStyle: 'italic', mb: 1}}>
                    "{log.messageContent}"
                </Typography>
                <Box textAlign="right">
                    <Typography variant="caption" color="text.secondary">
                        {formattedDate}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default LogItem;
