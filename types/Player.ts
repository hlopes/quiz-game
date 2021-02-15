export type Player = {
    _id: any;
    name: string;
    password: string;
    statistics: {
        points: number;
        questionsAnswered: number;
    };
    preferences: {
        numQuestions: number;
        gender: string;
    };
};
