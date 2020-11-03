import { useQuery } from 'react-query';

const useQuestions = () => {
    const fetchQuestions = async () => {
        const result = await fetch('https://opentdb.com/api.php?amount=3');

        return result.json();
    };

    return useQuery('questions', fetchQuestions, {
        refetchOnWindowFocus: false,
    });
};

export default useQuestions;
