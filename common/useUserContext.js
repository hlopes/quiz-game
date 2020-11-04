import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useMemo,
    useCallback,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import { useSession, signout } from 'next-auth/client';
import { useRouter } from 'next/router';

import useRegister from '../common/useRegister';

const initialState = null;

const reducer = (state, action) => {
    if (action.type === 'USER') {
        return action.payload;
    }

    return state;
};

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [isExternalRegistered, setIsExternalRegistered] = useState(false);

    const router = useRouter();
    const [session] = useSession();

    const [registerUser] = useRegister();

    const [state, dispatch] = useReducer(reducer, initialState);

    const isAuthenticated = useMemo(() => !!state?.email, [state]);

    const logout = useCallback(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        localStorage.removeItem('user');

        dispatch({ type: 'USER', payload: null });

        if (user.isExternal) {
            signout();
        }
    }, [dispatch]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'USER', payload: user });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function registerExternalUser() {
            if (session && !isExternalRegistered) {
                return await registerUser({
                    name: session.user.name,
                    username: session.user.email,
                    password: session.accessToken,
                    image: session.user.image,
                    isExternal: true,
                });
            }
        }

        registerExternalUser().then((data) => {
            if (data) {
                localStorage.setItem('jwt', data.token);
                localStorage.setItem(
                    'user',
                    JSON.stringify({ ...data.user, isExternal: true })
                );

                dispatch({
                    type: 'USER',
                    payload: { ...data.user, isExternal: true },
                });

                if (router.pathname !== '/') {
                    router.push('/');
                }

                setIsExternalRegistered(true);
            }
        });
    }, [registerUser, router, session, isExternalRegistered]);

    return (
        <UserContext.Provider
            value={{ state, dispatch, isAuthenticated, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.any,
};

const useUserContext = () => useContext(UserContext);

export default useUserContext;
