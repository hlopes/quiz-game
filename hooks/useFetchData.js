import { useCallback, useReducer } from 'react';

const dataFetcherReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'FETCH_SUCCESS':
            console.log('### action.payload ', action.payload);
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
            };
        default:
            throw new Error('Invalid action for data fetcher reducer');
    }
};

const useFetchData = (initialData) => {
    const [state, dispatch] = useReducer(dataFetcherReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
        error: null,
    });

    const call = useCallback((url, options) => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' });

            try {
                const result = await fetch(url, options).then((data) =>
                    data.json()
                );
                console.log('### result ', result);
                if (result?.errorCode) {
                    return dispatch({ type: 'FETCH_FAILURE', payload: result });
                }

                dispatch({ type: 'FETCH_SUCCESS', payload: result });
            } catch (error) {
                dispatch({ type: 'FETCH_FAILURE', payload: error });
            }
        };

        if (url) {
            fetchData();
        }
    }, []);

    return [state, call];
};

export default useFetchData;
