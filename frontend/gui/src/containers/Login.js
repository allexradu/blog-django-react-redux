import React from 'react';
import {Form, Input, Button, Spin} from 'antd';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as actions from '../store/actions/auth';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

const FormItem = Form.Item;
const antIcon = <Spin size="large"/>;


class NormalLoginForm extends React.Component {
    onFinish = (values) => {
        this.props.onAuth(values.userName, values.password)
        if (this.props.error !== null) {
            this.props.history.push('/');
        }


        console.log('test1')
    }


    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        // const {getFieldDecorator} = this.props.form;
        return (
            <div>
                {errorMessage}
                {
                    this.props.loading ?

                        <Spin indicator={antIcon}/>

                        :

                        <Form onFinish={this.onFinish} className="login-form">

                            <FormItem name='userName'
                                      rules={[{required: true, message: 'Please input your username!'}]}>
                                <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Username"/>
                            </FormItem>

                            <FormItem name="password"
                                      rules={[{required: true, message: 'Please input your Password!'}]}>

                                <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       type="password" placeholder="Password"/>

                            </FormItem>

                            <FormItem>
                                <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                                    Login
                                </Button>
                                Or
                                <NavLink
                                    style={{marginRight: '10px'}}
                                    to='/signup/'> signup
                                </NavLink>
                            </FormItem>
                        </Form>
                }
            </div>
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
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);