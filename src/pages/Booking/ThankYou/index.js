import React from 'react';
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

const ThankYou = () => {
	return (
		<Result
			status="success"
			title="Successfully"
			extra={[
				<Button type="primary" key="console">
					<Link to="/my-orders">My orders</Link>
				</Button>,
				<Button key="buy"><Link to="/">Buy Again</Link></Button>,
			]}
		/>
	);
};

export default ThankYou;
