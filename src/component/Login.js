import React, {
  Component
} from 'react';
import '../asset/css/index.css';
import '../asset/css/App.css';
import axios from 'axios';
import {
  Form,
  Icon,
  Input,
  Button,
  message
} from 'antd';
import storage from '../model/storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://10.108.2.56/wms/auth/user/noauth/login',
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.post(this.state.url, {
            reqData: {
              authType: "0",
              operPassword: values.password,
              operName: values.userName,
            }
            
          })
          .then(function (response) {
            console.log(response);
            if(response.data.repCode == '0000'){
              let res = response.data.repData;
              storage.set('token',res.token);
              storage.set('permissions',res.permissions);
              storage.set('userName',res.name);
              storage.set('factoryCode',res.code);
              window.location.href = '/index';
            }else{
              message.error(response.data.repMsg)
            }
            
          })
          .catch(function (error) {
            console.log(error);
          });

      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return ( 
      <div className = "loginWrap" >
        <div className = "loginForm" >
          <div > < img src = {require('../asset/image/homelogin.png')} alt = "" / > </div> 
          <Form onSubmit = {this.handleSubmit} className = "login-form" >
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: '#fff',fontSize:"18px" }} />} placeholder="Username" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: '#fff',fontSize:"18px" }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item >
              <Button type = "primary" htmlType = "submit" className = "login-form-button login_bottom" > Log in </Button> 
            </Form.Item> 
          </Form>
        </div>
      </div>
      );
    }

  }

  const WrappedNormalLoginForm = Form.create()(Login);
  export default WrappedNormalLoginForm