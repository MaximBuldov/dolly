import React, {useState} from 'react';
import {Drawer, Layout, Menu} from "antd";
import {Link, NavLink} from "react-router-dom";
import './style.scss';
import {VscMenu} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import {setUserData} from "../../redux/actions/user";



const Header = () => {
    const dispatch = useDispatch()
    const {isAuth, user} = useSelector(({user}) => user);
    const [visible, setVisible] = useState(false);
    const [currentMenu, setCurrentMenu] = useState('1');
    const showDrawer = () => {
        setVisible(!visible);
    }
    const handleClick = e => {
        setCurrentMenu(e.key)
    };

    const logoutHandler = () => {
        dispatch(setUserData(false,null))
    }
    return (
        <>
            <Layout.Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    onClick={handleClick}
                    defaultSelectedKeys={[currentMenu]}
                    style={{justifyContent: "flex-end"}}
                >
                    {isAuth ? (
                        <>
                            <Menu.Item key="home">
                                <NavLink to="/">Home</NavLink>
                            </Menu.Item>
                            <Menu.Item onClick={logoutHandler} key="logout">
                            Log out
                            </Menu.Item>
                            <Menu.Item onClick={showDrawer} key="drawer">
                                <VscMenu />
                            </Menu.Item>
                        </>
                    ) : (
                        <>
                            <Menu.Item key="login">
                                <NavLink to="/login">Log In</NavLink>
                            </Menu.Item>
                            <Menu.Item key="signup">
                                <NavLink to="/signup">Sign Up</NavLink>
                            </Menu.Item>
                        </>
                        )}
                </Menu>
            </Layout.Header>
            {isAuth && (
                <Drawer
                    title={`${user?.user_nicename}`}
                    placement="right"
                    closable={false}
                    onClose={showDrawer}
                    visible={visible}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderLeft: 0 }}
                    >
                        <Menu.Item key="1">Payment</Menu.Item>
                        <Menu.Item key="2"><Link to="/my-orders">Past order</Link></Menu.Item>
                        <Menu.Item key="3">FAQ</Menu.Item>
                        <Menu.Item key="4">Contact us</Menu.Item>
                    </Menu>
                </Drawer>
            )}

        </>
    );
};

export default Header;