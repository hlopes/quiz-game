import { useQuery } from 'react-query';

const useGetQuestions = (num) => {
    const fetchQuestions = async () => {
        const result = await fetch(`https://opentdb.com/api.php?amount=${num}`);

        return result.json();
    };

    return useQuery('questions', fetchQuestions, {
        refetchOnWindowFocus: false,
        enabled: false,
    });
};

export default useGetQuestions;
