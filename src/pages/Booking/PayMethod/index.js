import React, {useState} from 'react';
import {Button, Space, Spin, Typography} from "antd";
import {CalcHook} from "../../../hooks/calc.hook";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteDraftFromCart} from "../../../redux/actions/cart";
import axios from "axios";
import moment from "moment";

const {Title} = Typography;


const PayMethod = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [load, setLoad] = useState(false);
	const currentAppId = useSelector(({cart}) => cart.currentApp)
	const user = useSelector(({user}) => user.user)
	const {totalPrice, cart} = CalcHook()
	const token = localStorage.getItem('token')
	const createOrder = async (total, info) => {
		try {
			setLoad(true)
			const data = await axios({
				url: 'https://admin.buldov.com/wp-json/wp/v2/moon_orders',
				method: 'POST',
				headers: {Authorization: `Bearer ${token}`},
				data: {
					status: 'publish',
					title: `${user.user_nicename} ${moment(info.date).format('M/D/YYYY')}`,
					fields: {
						...info,
						total,
						user: user.user_id
					}
				}
			})
			if (data) {
				setLoad(false)
				history.push('/thankyou')
				dispatch(deleteDraftFromCart(currentAppId))
			}
		} catch (e) {
			console.log(e)
			setLoad(false)
		}
	}
	return (
		<div>
			<Spin spinning={load}>
				<Title>Payment</Title>
				<Title level={3}>Your price: {totalPrice}$</Title>
				<Space style={{width: '100%'}} direction="vertical">
					<Button
						size="large"
						type="primary"
						block
						onClick={() => createOrder(totalPrice, cart)}
					>Paypal</Button>
					<Button
						danger
						type="primary"
						block
					>Add a card</Button>
				</Space>
			</Spin>
		</div>
	);
};

export default PayMethod;
