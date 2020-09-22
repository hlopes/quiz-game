import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const initialState = null;

const reducer = (state, action) => {
    if (action.type === 'USER') {
        return action.payload;
    }

    return state;
};

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.any,
};

const useUserContext = () => useContext(UserContext);

export default useUserContext;
