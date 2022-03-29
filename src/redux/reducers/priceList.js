const initialState = {
    items: []
}

const priceList = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_PRICE':
            return {
                ...state,
                items: action.payload,
            }
        default:
            return state
    }
}

export default priceList;