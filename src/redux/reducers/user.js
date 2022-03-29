const initialState = {
    user: null,
    isAuth: false,
    isLoading: false
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                user: action.payload.user,
                isAuth: action.payload.bool
            }
        case 'SET_USER_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}

export default user;