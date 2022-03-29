import React from 'react';
import {Button, Checkbox, Form, Input, Typography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {GiSmartphone, HiOutlineMail} from "react-icons/all";
import MaskedInput from "antd-mask-input";

const Signup = () => {
    return (
        <div>
            <Typography.Title>Sign up</Typography.Title>
            <Form
                name="normal_login"
                className="signup-form"
            >
                <Form.Item
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your First name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="First Name"
                        name="firstName"
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Last name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Last Name"
                        name="lastName"
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input
                        prefix={<HiOutlineMail className="site-form-item-icon" />}
                        placeholder="Email"
                        type="email"
                        name="email"
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Phone!',
                        },
                    ]}
                >
                    <MaskedInput
                        prefix={<GiSmartphone className="site-form-item-icon" />}
                        placeholder="(999)-999-99-99"
                        name="phone"
                        mask="(111)-111-11-11"
                        size="large"

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
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        size="large"
                        placeholder="Confirm password"/>
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>By checking this box I accept Terms of Service</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        block
                        size="large"
                    >
                        Sign up
                    </Button>

                </Form.Item>
                <div>
                    Already have an account? <Link to="/login">Log in!</Link>
                </div>
            </Form>
        </div>
    );
};

export default Signup;