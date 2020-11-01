import { useQuery } from 'react-query';

const useTop10 = () => {
    const fetchTop = async () => {
        const result = await fetch('api/top');

        return result.json();
    };

    return useQuery('top10', fetchTop, {
        refetchOnWindowFocus: false,
    });
};

export default useTop10;
