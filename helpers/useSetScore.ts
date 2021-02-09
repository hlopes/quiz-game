import useSWR from 'swr';

const useSetScore = () => {
    const { data, error, isValidating, mutate } = useSWR('/api/user', {
        revalidateOnMount: false,
        revalidateOnFocus: false,
    });

    const setScore = async ({ email, points, questions }) => {
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
