import useSWR, { mutate as globalMutate } from 'swr';

const usePreferences = () => {
    const { data, error, isValidating, mutate } = useSWR('api/preferences/', {
        revalidateOnMount: false,
        revalidateOnFocus: false,
    });

    const refetch = async (userId) => {
        const result = await fetch(`api/preferences/${userId}`);
        const data = await result.json();

        await mutate(data, false);
    };

    const update = async ({ player, numQuestions, gender }) => {
        const result = await fetch('/api/preferences', {
            method: 'POST',
            body: JSON.stringify({
                email: player.user.email,
                numQuestions,
                gender,
            }),
        });

        const data = await result.json();

        await globalMutate(
            '/api/player',
            { ...player, numQuestions, gender },
            false
        );

        return data;
    };

    return {
        refetch,
        update,
        data,
        error,
        isValidating,
    };
};

export default usePreferences;
