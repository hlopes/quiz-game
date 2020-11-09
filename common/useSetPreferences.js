import { useMutation } from 'react-query';

import useUserContext from './useUserContext';

const useSetPreferences = () => {
    const { user } = useUserContext();

    const setPreferences = async ({ numQuestions, gender }) => {
        const result = await fetch('/api/preferences', {
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                numQuestions,
                gender,
            }),
        });

        return result.json();
    };

    return useMutation(setPreferences, {
        enabled: false,
        refetchOnWindowFocus: false,
    });
};

export default useSetPreferences;
