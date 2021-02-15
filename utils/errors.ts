export default {
    ALREADY_REGISTERED: {
        errorCode: 100,
        message: 'Player already registered',
    },
    LOGIN_FORM_DATA_MISSING: {
        errorCode: 101,
        message: 'Please add email or password',
    },
    REGISTER_FORM_DATA_MISSING: {
        errorCode: 102,
        message: 'Please add name, email or password',
    },
    USER_NOT_FOUND: {
        errorCode: 103,
        message: 'Invalid email or password',
    },
    SECRET_NOT_DEFINED: {
        errorCode: 104,
        message: 'Secret for token is not defined',
    },
    INVALID_NAME: {
        errorCode: 105,
        message: 'Invalid name',
    },
    ERROR_REGISTERING: {
        errorCode: 106,
        message: 'Error registering Player',
    },
    USER_LIST_ERROR: {
        errorCode: 107,
        message: 'Error retrieving Users',
    },
    UPDATE_USER_PREFERENCES: {
        errorCode: 108,
        message: 'Error updating player preferences',
    },
    GET_USER_PREFERENCES: {
        errorCode: 109,
        message: 'Error retrieving player preferences',
    },
};
