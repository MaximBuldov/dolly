import React, {useCallback, useEffect, useState} from 'react';
import {Spin} from "antd";
import {OrderList} from "../../components";
import {useSelector} from "react-redux";
import axios from "axios";

const MyOrders = () => {
	const [orders, setOrders] = useState([])
	const {token, user_id} = useSelector(({user}) => user.user)
	const fetchOrders = useCallback(async () => {
		try {
			const fetched = await axios({
				url: 'https://admin.buldov.com/wp-json/wp/v2/moon_orders',
				params: {
					meta_key: 'user',
					meta_value: user_id,
					_fields: 'id,acf,date'
				},
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				},
			})
			setOrders(fetched.data)
		} catch (e) {
			console.log(e)
		}
	}, [token, user_id])

	useEffect(() => {
		fetchOrders()
	}, [])

	return (
		<Spin spinning={orders.length === 0}>
			<OrderList orders={orders} fetch={fetchOrders} />
		</Spin>
	)
};

export default MyOrders;
