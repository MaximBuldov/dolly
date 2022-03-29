import React from "react";
import {useAuth} from "./hooks/auth.hook";
import {Layout, Spin} from 'antd';
import {Header} from "./components";
import {useSelector} from "react-redux";
import AppRoutes from "./routes";


function App() {
	const auth = useAuth()
	const isAuth = useSelector(({user}) => user.isAuth)

	return (
			<Layout>
				<Header/>
				<Layout style={{padding: '24px'}}>
					<Layout.Content className="site-layout-background container">
						{!auth.ready ? <AppRoutes auth={isAuth} /> : <Spin />}
					</Layout.Content>
				</Layout>
			</Layout>
	);
}

export default App;
