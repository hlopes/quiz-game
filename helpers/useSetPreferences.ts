import { useSession } from 'next-auth/client';

const useSetPreferences = () => {
    const [session] = useSession();

    if (!session) {
        return () => {};
    }

    return async ({ numQuestions, gender }) => {
        const result = await fetch('/api/preferences', {
            method: 'POST',
            body: JSON.stringify({
                email: session.user.email,
                numQuestions,
                gender,
            }),
        });

        return result.json();
    };
};

export default useSetPreferences;
