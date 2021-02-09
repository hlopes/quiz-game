export enum Category {
    Error = 'ERROR',
    Success = 'SUCCESS',
}

export type Notification = {
    message?: string;
    category: Category.Error | Category.Success;
    onClose?: () => void | undefined;
};

export type NotificationContext = {
    notifications: any[];
    add: (notification: Notification) => void;
    remove: (id: string) => void;
    filterByCategory: (category: string) => void;
    clear: () => void;
};
