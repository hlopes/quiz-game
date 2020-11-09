import { useQuery } from 'react-query';

import useUserContext from './useUserContext';

const useGetPreferences = () => {
    const { user } = useUserContext();

    const fetchPreferences = async () => {
        const result = await fetch(`api/preferences/${user._id}`);

        return result.json();
    };

    return useQuery('preferences', fetchPreferences, {
        refetchOnWindowFocus: false,
    });
};

export default useGetPreferences;
