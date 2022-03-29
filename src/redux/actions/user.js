export const setUserData = (bool, user) => ({
    type: 'SET_USER_DATA',
    payload: {bool, user}
})

export const setUserLoading = (bool) => ({
    type: 'SET_USER_LOADING',
    payload: bool
})