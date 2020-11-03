import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useMemo,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useSession } from 'next-auth/client';

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
    const [session, loading] = useSession();

    const [registerUser, { isLoading, data, error }] = useRegister();

    const [state, dispatch] = useReducer(reducer, initialState);

    const isAuthenticated = useMemo(() => !!state?.email, [state]);

    const logout = useCallback(() => {
        localStorage.removeItem('user');

        dispatch({ type: 'USER', payload: null });
    }, [dispatch]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'USER', payload: user });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log('### session ', session);
        async function registerExternalUser() {
            if (session) {
                await registerUser({
                    name: session.user.name,
                    username: session.user.email,
                    password: session.accessToken,
                    image: session.user.image,
                    isExternal: true,
                });
            }
        }

        registerExternalUser().then(() =>
            console.log('### external user registered ')
        );
    }, [registerUser, session]);

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
