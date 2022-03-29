import React from 'react';
import moment from "moment";
import {FcCancel, FcCheckmark} from "react-icons/all";
import {Card, Col, Row, Space} from "antd";

const line = (label, value) => (
	<div className="order-line">
		<span className="order-line-label">{label}: </span>
		<span className="order-line-value">{value}</span>
	</div>
)

const address = (details, dir) => (
	<>
		{line('Address', `${details[dir].address}, unit ${details[dir].unit}`)}
		{line('Elevator', details[dir].elevator ? <FcCheckmark /> : <FcCancel />)}
		{line('Stairs', details[dir].stairs ? `${details[dir].stairsCount} flights of stairs` : <FcCancel />)}
		{line('Hardwood', details[dir].hardwood ? <FcCheckmark /> : <FcCancel />)}
		{line('Notes', details[dir].note)}
	</>
)


const OrderCard = ({order}) => {
	const details = order.info
	const stuff = details.stuff.items.map(item => (
		<div>{item.count} {item.name}{item.breakdown ? ', need breakdown' : ''}{item.details ? `. Details: ${item.details}` : ''}</div>
	))

	console.log(details)
	return (
		<div>
			<Space direction="vertical" size="large">
				<Row gutter={24}>
					<Col span={12}>
						<Card title="Date and time">
							{line('Moving day', moment(details.date).format("MMM/D/YYYY"))}
							{line('Start time', `${details.startTime}:00`)}
							{line('End time', `${details.endTime}:00`)}
						</Card>
					</Col>
					<Col span={12}>
						<Card title="Stuff">
							{stuff}
						</Card>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col span={12}>
						<Card title="To">
							{address(details, 'to')}
						</Card>
					</Col>
					<Col span={12}>
						<Card title="From">
							{address(details, 'from')}
						</Card>
					</Col>
				</Row>
			</Space>

		</div>
	);
};

export default OrderCard;
