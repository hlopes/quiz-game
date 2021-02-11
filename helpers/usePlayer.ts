import useSWR from 'swr';
import { useRef } from 'react';

const usePlayer = () => {
    const wasFetchedRef = useRef(false);

    const getUser = async (name) => {
        wasFetchedRef.current = true;

        const result = await fetch(`/api/player?name=${name}`);

        return await result.json();
    };

    const { data, error, isValidating, mutate } = useSWR(
        '/api/player',
        getUser,
        {
            revalidateOnMount: false,
            revalidateOnFocus: false,
        }
    );

    const refetch = async (name) => {
        const data = await getUser(name);

        await mutate(data, false);

        return data;
    };

    return {
        wasFetched: wasFetchedRef.current,
        refetch,
        data,
        error,
        isValidating,
    };
};

export default usePlayer;
