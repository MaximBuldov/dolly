import {useSelector} from "react-redux";
import moment from "moment";


export const CalcHook = () => {
	const cart = useSelector(({cart}) => cart.items[cart.currentApp])
	const priceList = useSelector(({priceList}) => priceList.items)
	const {movingType, distance, stuff, date, from, to} = cart
	let itemsPrice = 0
	stuff.items.forEach(el => {
		const price = priceList.find(item => item.title.rendered === el.name).acf.price
		itemsPrice += price * el.count
	})
	const price = (id) => priceList.find(el => el.moon_price_cat.includes(id)).acf.price
	const stairsPrice = (dir) => {
		if (dir.stairsCount > 0) {
			return parseInt(dir.stairsCount) * price(40)
		} else {
			return 0
		}
	}
	let totalPrice = 70 + (parseInt(distance) * price(39)) + itemsPrice + stairsPrice(from) + stairsPrice(to) + priceList.find(el => el.id === movingType).acf.price

	if (moment(date).weekday() > 5) {
		totalPrice += 20
	}
	return {totalPrice, cart};
}