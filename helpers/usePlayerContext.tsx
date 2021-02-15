import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useMemo,
    useCallback,
} from 'react';
import { mutate } from 'swr';

import { Player } from '../types/Player';
import {
    PlayerContext as PlayerContextType,
    Data,
} from '../types/PlayerContext';

type UserContextProviderProps = {
    children: any;
};

type State = {
    isLoading: boolean;
    initialEvaluation: boolean;
    error: any;
    data: Data;
};

const initialState = {
    isLoading: false,
    initialEvaluation: false,
    error: null,
    data: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_USER':
            return {
                ...state,
                isLoading: true,
            };
        case 'SUCCESS_USER':
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case 'FAIL_USER':
            return {
                ...state,
                isLoading: false,
                data: {
                    player: null,
                },
                error: action.payload,
            };
        case 'RESET_USER':
            return {
                ...initialState,
                data: {
                    ...state.data,
                    player: null,
                },
            };
        case 'AUTO_USER':
            return {
                ...initialState,
                data: {
                    ...state.data,
                    player: action.payload ?? null,
                },
            };
        default:
            return state;
    }
};

export const PlayerContext = createContext<PlayerContextType>({
    isAuthenticated: false,
    isLoading: false,
    error: null,
    data: null,
});

const updatePlayer = async (player, dispatch) => {
    await mutate('/api/player', player, false);

    dispatch({ type: 'AUTO_USER', payload: player });
};

export const PlayerContextProvider = ({
    children,
}: UserContextProviderProps) => {
    const [state, dispatch]: [State, any] = useReducer(reducer, initialState);

    const isAuthenticated = useMemo(() => !!state?.data?.player, [state]);

    const loginPlayer = useCallback(async ({ name, password }) => {
        try {
            dispatch({ type: 'START_USER' });

            const result = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    password,
                }),
            });

            const data = await result.json();

            localStorage.setItem('player', JSON.stringify(data.player));
            localStorage.setItem('jwt', data.token);

            dispatch({ type: 'SUCCESS_USER', payload: data });
        } catch (error) {
            localStorage.removeItem('player');
            localStorage.removeItem('jwt');

            return dispatch({ type: 'FAIL_USER', payload: error });
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('player');

        dispatch({ type: 'RESET_USER', payload: null });
    }, [dispatch]);

    const updatePreferences = useCallback(
        async (name, numQuestions, gender) => {
            try {
                dispatch({ type: 'START_USER' });

                const result = await fetch('/api/preferences', {
                    method: 'POST',
                    body: JSON.stringify({
                        name,
                        numQuestions,
                        gender,
                    }),
                });

                const data = await result.json();

                localStorage.setItem('player', JSON.stringify(data?.player));

                dispatch({ type: 'SUCCESS_USER', payload: data });
            } catch (error) {
                return dispatch({ type: 'FAIL_USER', payload: error });
            }
        },
        []
    );

    const updateScore = useCallback(async (name, points, questions) => {
        try {
            dispatch({ type: 'START_USER' });

            const result = await fetch('/api/score', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    points,
                    questions,
                }),
            });

            const data = await result.json();

            localStorage.setItem('player', JSON.stringify(data?.player));

            dispatch({ type: 'SUCCESS_USER', payload: data });
        } catch (error) {
            return dispatch({ type: 'FAIL_USER', payload: error });
        }
    }, []);

    // Automatic login when there is an user in local storage
    useEffect(() => {
        const player: Player = JSON.parse(localStorage.getItem('player'));

        updatePlayer(player, dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                ...state,
                isAuthenticated,
                loginPlayer,
                logout,
                updatePreferences,
                updateScore,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

const usePlayerContext = (): PlayerContextType =>
    useContext<PlayerContextType>(PlayerContext);

export default usePlayerContext;
