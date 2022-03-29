import React, {useCallback} from 'react';
import {Typography, Space, Table, Popconfirm, Tag, Spin} from "antd";
import moment from "moment";
import {Link} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
const { Column } = Table;
const { Text } = Typography;

const OrderList = ({orders, fetch}) => {
	const token = localStorage.getItem('token')
	const {request, loading} = useHttp()
	const deleteOrder = useCallback(async (id) => {
		try {
			await request(`/api/order/delete/${id}`, 'POST', null, {
				Authorization: `Bearer ${token}`
			})
			fetch()
		} catch (e) {
			console.log(e)
		}
	}, [token])

	const editHandle = (id) => {

	}

	const columns = [
		{
			title: 'Created',
			dataIndex: 'date',
			key: 'name',
			render: text => moment(text).format("MMM/D/YYYY"),
		},
		{
			title: 'Move Date',
			dataIndex: ['acf', 'date'],
			key: 'date',
		},
		{
			title: 'Total',
			dataIndex: ['acf', 'total'],
			key: 'total',
			render: text => `$${text}`
		},
		{
			title: 'Status',
			key: 'status',
			render: tags => (
				<>
					<Tag color="success">Complete</Tag>
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<Space>
					{/*<Link to={`/order/${record._id}`}>Details</Link>*/}
					<Link to={'/usecases'} onclick={() => editHandle(record._id)}>Edit</Link>
					<Popconfirm
						title="Are you sure to delete this order?"
						onConfirm={() => deleteOrder(record._id)}
						okText="Yes"
						cancelText="No"
					>
						<Text type="danger" className="cursor-pointer">Cancel</Text>
					</Popconfirm>

				</Space>
			),
		},
	]

	return (
		<Spin spinning={loading}>
			<Table columns={columns} dataSource={orders.reverse()}/>
		</Spin>
	);
};

export default OrderList;
