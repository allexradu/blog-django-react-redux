import React from 'react';
import {Form, Input, Button} from 'antd';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as actions from '../store/actions/auth';
import {UserOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        passPasswordError: false,

    };

    onFinish = (values) => {
        this.props.onAuth(
            values.userName,
            values.email,
            values.password,
            values.confirm
        );
        if (this.props.error !== null) {
            this.props.history.push('/');
        }
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }


    render() {
        let passPasswordError
        return (
            <Form onFinish={this.onFinish}>

                <FormItem name="userName" rules={[{required: true, message: 'Please input your username!'},]}>
                    <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
                </FormItem>

                <FormItem name="email" rules={[{
                    type: 'email', message: 'The input is not valid E-mail!',
                }]}>

                    <Input prefix={<MailOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Email"/>

                </FormItem>

                <FormItem name="password" rules={[{
                    required: true, message: 'Please input your password!',
                },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (getFieldValue(['password']).length < 6) {
                                return Promise.reject('Your password should be at lest 6 characters')
                            } else {
                                if (passPasswordError) {
                                    return Promise.reject('Your password should match')
                                } else {
                                    return Promise.resolve()
                                }
                            }


                        }
                    })


                ]}>
                    <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                           placeholder="Password"/>
                </FormItem>

                <FormItem name="confirm" rules={[{
                    required: true, message: 'Please confirm your password!',
                },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (getFieldValue(['password']) !== getFieldValue(['confirm'])) {
                                passPasswordError = true;
                                return Promise.reject('Your password should match')
                            } else {
                                return Promise.resolve()
                            }
                        }
                    })
                ]}>

                    <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                           placeholder="Password" onBlur={this.handleConfirmBlur}/>
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                        Signup
                    </Button>
                    Or
                    <NavLink
                        style={{marginRight: '10px'}}
                        to='/login/'> login
                    </NavLink>
                </FormItem>

            </Form>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);