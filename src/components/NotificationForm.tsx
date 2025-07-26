import {useState} from 'react';
import {useNotification} from '../contexts/useNotification';
import {sendNotification} from '../api/notifications';
import type {INotificationRequest} from '../types';
import {Alert, Button, Card, CardContent, MenuItem, Stack, TextField, Typography} from '@mui/material';

type Category = 'Sports' | 'Finance' | 'Movies';

const NotificationForm = () => {
    const [category, setCategory] = useState<Category>('Sports');
    const [message, setMessage] = useState('');
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState('');
    const {fetchLogs} = useNotification();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) {
            setFormError('Message cannot be empty.');
            return;
        }
        setIsSubmitting(true);
        setFormError('');
        setSubmitSuccess('');
        try {
            const notificationData: INotificationRequest = {category, message};
            await sendNotification(notificationData);
            setSubmitSuccess('Notification sent successfully!');
            setMessage('');
            fetchLogs();
        } catch (error: unknown) {
            if (error instanceof Error) {
                setFormError(error.message);
            } else {
                setFormError('Unknown error');
            }
            console.error('Submission failed:', error);
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitSuccess(''), 3000);
        }
    };

    return (
        <Card sx={{maxWidth: 500, margin: '2rem auto', boxShadow: 3}}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Send a Notification
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            select
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                            disabled={isSubmitting}
                            fullWidth
                        >
                            <MenuItem value="Sports">Sports</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                            <MenuItem value="Movies">Movies</MenuItem>
                        </TextField>
                        <TextField
                            label="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message here..."
                            disabled={isSubmitting}
                            multiline
                            minRows={3}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Notification'}
                        </Button>
                        {formError && <Alert severity="error">{formError}</Alert>}
                        {submitSuccess && <Alert severity="success">{submitSuccess}</Alert>}
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
};

export default NotificationForm;
