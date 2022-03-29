import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Spin} from "antd";
import {OrderCard} from "../../components";
import {useHttp} from "../../hooks/http.hook";

const OrderDetails = () => {
	const token = localStorage.getItem('token')
	const {request, loading} = useHttp()
	const [order, setOrder] = useState(null)
	const orderId = useParams().id
	const getOrder = useCallback(async () => {
		try {
			const fetched = await request(`/api/order/${orderId}`, 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			setOrder(fetched)
		} catch (e) {
			console.log(e)
		}
	}, [token, orderId, request])

	useEffect(() => {
		getOrder()
	}, [getOrder])

	return (
		<Spin spinning={loading}>
			<OrderCard order={order} />
		</Spin>
	)
}

export default OrderDetails;