import { useQuery } from 'react-query';

const useLogin = (username, password) => {
    const login = async () => {
        const result = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: username,
                password,
            }),
        });

        return result.json();
    };

    return useQuery(`login-${username}-${password}`, login, {
        enabled: false,
        refetchOnWindowFocus: false,
    });
};

export default useLogin;
