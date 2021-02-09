import { User } from './User';

export type Result = {
    user: User;
    token: string;
    message?: string;
};

type LoginArgs = {
    username: string;
    password: string;
};

type RegisterArgs = LoginArgs & {
    name: string;
};

export type UserContext = {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: null;
    result: Result;
    loginUser?: (args: LoginArgs) => void;
    registerUser?: (args: RegisterArgs) => void;
    logout?: () => void;
};
