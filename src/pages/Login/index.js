import React, {useState} from 'react';
import {Button, Divider, Form, Input, message, Spin, Typography} from 'antd';
import {LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {HiOutlineMail} from "react-icons/all";
import {useAuth} from "../../hooks/auth.hook";

const Login = () => {
    const auth = useAuth()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false);
    const onFinish = (values) => {
        setLoading(true)
        auth.login(values).then(() => {
            setLoading(false)
        })
    };

    return (
        <Spin spinning={loading}>
            <Typography.Title>Log In</Typography.Title>
            <Form
                form={form}
                size="large"
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input
                        prefix={<HiOutlineMail className="site-form-item-icon" />}
                        placeholder="Email or username"
                        type="text"
                        name="username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        block
                    >
                        Log in
                    </Button>
                </Form.Item>
                <div>Or <Link to="/signup">register now!</Link></div>
            </Form>
            <Divider />
            <div>Login: demo</div>
            <div>Password: demo</div>
        </Spin>

    );
};

export default Login;