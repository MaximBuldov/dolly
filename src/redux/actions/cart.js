export const setApplicationID = (id) => ({
    type: 'SET_APPLICATION_ID',
    payload: id
});
export const deleteDraftFromCart = (key) => ({
    type: 'DELETE_DRAFT',
    payload: key
});
export const changeDraftInCart = (key) => ({
    type: 'CHANGE_DRAFT',
    payload: key
});

export const addToCart = (label, value) => ({
    type: 'ADD_TO_CART',
    payload: { label, value }
});
export const setLocation = (label, value) => ({
    type: 'SET_LOCATION_ADDRESS',
    payload: { label, value }
});
export const setLocationDetails = (label, value, i) => ({
    type: 'SET_LOCATION_DETAILS',
    payload: { label, value, i }
});
export const setItemID = (id) => ({
    type: 'SET_ITEM_ID',
    payload: id
});
export const setItemDetails = (label, value) => ({
    type: 'SET_ITEM_DETAILS',
    payload: { label, value}
});
export const setItemImages = (value) => ({
    type: 'SET_ITEM_IMAGES',
    payload: value
});
export const deleteItemImage = (value) => ({
    type: 'DELETE_ITEM_IMAGE',
    payload: value
});
export const changeItemInCart = (key) => ({
    type: 'CHANGE_ITEM_ID',
    payload: key
});
export const deleteItemInCart = (key) => ({
    type: 'DELETE_ITEM_ID',
    payload: key
});