import useSWR, { mutate as globalMutate } from 'swr';

const useSetScore = () => {
    const { data, error, isValidating, mutate } = useSWR('/api/score', {
        revalidateOnMount: false,
        revalidateOnFocus: false,
    });

    const setScore = async ({ player, email, points, questions }) => {
        const result = await fetch('/api/score', {
            method: 'POST',
            body: JSON.stringify({
                email,
                points,
                questions,
            }),
        });

        const data = result.json();

        await mutate(data, false);

        await globalMutate(
            '/api/player',
            {
                ...player,
                user: {
                    ...player.user,
                    points: player.user.points + points,
                    questionsAnswered:
                        player.user.questionsAnswered + questions,
                },
            },
            false
        );

        return data;
    };

    return {
        setScore,
        data,
        error,
        isValidating,
    };
};

export default useSetScore;
