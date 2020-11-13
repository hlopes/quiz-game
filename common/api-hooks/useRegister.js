import { useMutation } from 'react-query';

const useRegister = () => {
    const register = async ({
        name,
        username,
        password,
        image = '',
        isExternal,
    }) => {
        const result = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email: username,
                password,
                image,
                isExternal,
            }),
        });

        return result.json();
    };

    return useMutation(register, {
        enabled: false,
        refetchOnWindowFocus: false,
    });
};

export default useRegister;
