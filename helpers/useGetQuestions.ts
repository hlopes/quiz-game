import useSWR from 'swr';

const useGetQuestions = (num) => {
    const fetchQuestions = async () => {
        const result = await fetch(`https://opentdb.com/api.php?amount=${num}`);

        return await result.json();
    };

    const { data, error, isValidating, mutate } = useSWR(
        'questions',
        fetchQuestions,
        {
            revalidateOnFocus: false,
        }
    );

    const refetch = async () => {
        const result = await fetchQuestions();

        await mutate(result, false);
    };

    return { refetch, data, error, isValidating };
};

export default useGetQuestions;
