const CONSTANTS = {
    UNKNOWN_USER: {
        id: 'unknown',
        firstName: 'Unknown',
        lastName: 'User',
        email: 'unknown.user@example.com',
        initials: 'N/A',
        photo: '',
        managerId: null,
        children: [],
    },
    UI: {
        CHILD_INDENTATION: 0.25, // in rem
        MINUS_BTN_LABEL: '\u2013',
        PLUS_BTN_LABEL: '+',
    },

    BASE_URL: 'https://gongfetest.firebaseio.com',
    AUTH_COLLECTION: 'secrets',
    DEV_ERROR_TEST: true,
}

export default CONSTANTS

export const { UI, UNKNOWN_USER, BASE_URL, AUTH_COLLECTION } = CONSTANTS
