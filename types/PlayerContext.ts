import { Player } from './Player';

export type Data = {
    player: Player;
    token: string;
    message?: string;
};

type LoginArgs = {
    username: string;
    password: string;
};

export type PlayerContext = {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: { message?: string };
    data: Data;
    loginPlayer?: (args: LoginArgs) => void;
    logout?: () => void;
    updatePreferences?: (
        name: string,
        numQuestions: number,
        gender: string
    ) => Promise<any>;
    updateScore?: (
        name: string,
        points: number,
        questionsAnswered: number
    ) => Promise<any>;
};
