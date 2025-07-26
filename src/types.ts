export interface INotificationRequest {
    category: 'Sports' | 'Finance' | 'Movies';
    message: string;
}

export interface INotificationLog {
    id: string;
    categoryName: string;
    channelName: string;
    status: string;
    userName: string;
    userContact: string;
    messageContent: string;
    createdAt: string;
}
