import useSWR from 'swr';

const useGetPreferences = () => {
    const { data, error, isValidating, mutate } = useSWR('api/preferences/', {
        revalidateOnMount: false,
        revalidateOnFocus: false,
    });

    const fetchPreferences = async (userId) => {
        const result = await fetch(`api/preferences/${userId}`);
        const data = await result.json();

        await mutate(data, false);
    };

    return {
        fetchPreferences,
        data,
        error,
        isValidating,
    };
};

export default useGetPreferences;
