import { useMutation } from 'react-query';

const useSetScore = () => {
    const setScore = async ({ email, points, questions }) => {
        const result = await fetch('/api/score', {
            method: 'POST',
            body: JSON.stringify({
                email,
                points,
                questions,
            }),
        });

        return result.json();
    };

    return useMutation(setScore, {
        enabled: false,
        refetchOnWindowFocus: false,
    });
};

export default useSetScore;
