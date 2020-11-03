export default {
    ALREADY_REGISTERED: {
        errorCode: 100,
        message: 'User already registered',
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
    INVALID_EMAIL: {
        errorCode: 105,
        message: 'Invalid email',
    },
    ERROR_REGISTERING: {
        errorCode: 106,
        message: 'Error registering user',
    },
};
