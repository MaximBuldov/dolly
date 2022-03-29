import produce from "immer";

const initialState = {
	items: [],
	currentApp: null
}

const cart = (state = initialState, action) => {
	return produce(state, draft => {
		const cA = draft.items[draft.currentApp];
		if (action.type === 'SET_APPLICATION_ID') {
			draft.items.push({id:action.payload})
			draft.currentApp = draft.items.findIndex(el => el.id === action.payload)
		}
		if (action.type === 'ADD_TO_CART') {
			cA[action.payload.label] = action.payload.value
		}
		if (action.type === 'DELETE_DRAFT') {
			draft.items = draft.items.filter(el => el.id !== +action.payload);
		}
		if (action.type === 'CHANGE_DRAFT') {
			draft.currentApp = draft.items.findIndex(el => el.id === +action.payload)
		}
		if (action.type === 'SET_LOCATION_ADDRESS') {
			cA[action.payload.label] = { address: action.payload.value }
		}
		if (action.type === 'SET_LOCATION_DETAILS') {
			cA[action.payload.i] = {
				...cA[action.payload.i],
				[action.payload.label]: action.payload.value
			}
		}
		if (action.type === 'SET_ITEM_ID') {
			if (action.payload === 0) {
				cA.stuff = {}
				cA.stuff.items = []
			}
			cA.stuff.items[action.payload] = {}
			cA.stuff.currentItem = action.payload
		}
		if (action.type === 'SET_ITEM_DETAILS') {
			cA.stuff.items[cA.stuff.currentItem][action.payload.label] = action.payload.value
		}
		if (action.type === 'SET_ITEM_IMAGES') {
			if (cA.stuff.items[cA.stuff.currentItem].images === undefined ) {
				cA.stuff.items[cA.stuff.currentItem].images = []
			}
			cA.stuff.items[cA.stuff.currentItem].images.push(action.payload)
		}
		if (action.type === 'DELETE_ITEM_IMAGE') {
			cA.stuff.items[cA.stuff.currentItem].images = cA.stuff.items[cA.stuff.currentItem].images.filter(image => image !== action.payload)
		}
		if (action.type === 'CHANGE_ITEM_ID') {
			cA.stuff.currentItem = action.payload
		}
		if (action.type === 'DELETE_ITEM_ID') {
			cA.stuff.items.splice(action.payload, 1);
		}
	})
}

export default cart;