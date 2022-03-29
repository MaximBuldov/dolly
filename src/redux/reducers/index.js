import {combineReducers} from "redux";
import priceList from './priceList';
import cart from "./cart";
import user from "./user";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['priceList', 'cart', 'user'],
}


const rootReducer = combineReducers({
    priceList,
    cart,
    user
})

export default persistReducer(persistConfig, rootReducer);