import React, { Component } from 'react';
import { Menu, Icon,Select ,Dropdown,Modal,message ,Form, Input} from 'antd';
import storage from '../model/storage';
import api from '../model/api';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hahha:'222',
      current: 'mail',
      token:'',
      userName : '',
      loading: false,
      visible: false,
      confirmDirty: false,
      menuList:[]
     };
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
      menuList:[]
    });
  }
  componentWillMount(){
    let token = storage.get('token');
    let userName = storage.get('userName');
    let factoryCode = storage.get('factoryCode');
    this.setState({
      token,
      userName,
      factoryCode,
    })

    // 获取菜单
    let menuListAll = storage.get('permissions');
    let menuList = [];
    let arr = ['pick-up','pickPull','cymm','inventory-list','library-management','Warehouse-management','print','reservior'];
    if(menuListAll){
      menuListAll.map((value,key)=>{
        if(arr.indexOf(value.code) !== -1 && value.status === 1){
          menuList.push(value);
        }
      })
      this.setState({
        menuList:menuList
      })
    } 
  }
  handleChange= ()=>{

  }
  changeMenu = (value)=>{
    switch (value) {
      case 1:
        

        break;
      case '2':
        if(this.state.menuList.length>0){
          this.state.menuList.map((value,key)=>{
            if(value.name === 'Basic Data'){
              this.setState({
                menuList:value
              })
            }
          })
        }
        console.log(this.state.menuList);

        break;
      case 3:
        
        break;
      case 4:
        
        break;
      case 5:
        
        break;
    
      default:
        break;
    }
  }
  clickUser = (value)=>{
    let key = value.key;
    switch (key) {
      case "ChangePwd":
        this.changePwd();
        break;

      case "ModifyInfo":
        this.modifyInfo();
        break;

      case "LogOut":
        this.logOut();
       break;
    
      default:
        break;
    }

  }
  changePwd= ()=>{
    this.setState({
      visible:true
    })
  }
  handleOk = ()=>{
    this.setState({
      loading:true
    })
    console.log(1);
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(22);
      console.log(err);
      if (!err) {
        console.log('Received values of form: ', values);
        api.post(
          "/wms/auth/user/logout",
          {reqData:
            {
              oldPassword:values.oldPassword,
              newPassword:values.confirmPass,
              isReset:"0"
            },
            token:storage.get('token')
          },
          res => {
            console.log(res);
            if(res.data.repCode === '0000'){
              this.setState({
                visible:false
              })
              message.success(res.data.repMsg);
            }else{
              message.error(res.data.repMsg);
            }
            this.setState({
              loading:false
            })
          }
        )
      }
    });
  }
  handleCancel = ()=>{
    this.setState({
      visible:false
    })
  }
  handleSubmit = (e)=>{
    e.preventDefault();
    
  }
  validateAge = (rule, value, callback) => {
    if (!value) {
      callback(new Error('原密码不能为空！'));
    }
    callback();
  };
  validateFirstPass = (rule, value, callback) => {
    if (value === '') {
      // callback(new Error('新密码不能为空'));
    } else if (value.length < 6) {
      callback(new Error('密码长度不得低于6位数'));
    } else if (!(/^(?=.*?)(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.=]).{6,}$/.test(value))) {
      // console.log(reg.test(value))
      callback(new Error('密码格式错误'));
    } else{

    }
    // else {
    //   // 确认后的密码先输入
    //   if (this.props.form.getFieldValue('confirmPass')) {
    //     // 对第二个密码框单独验证
    //     this.props.form.validateFields(['confirmPass']);
    //   }
    // }
  };
  validateNextPass = (rule, value, callback) => {
    if (value === '') {
      // callback(new Error('确认密码不能为空'));
    } else if (this.props.form.getFieldValue('newPassword1') && value !== this.props.form.getFieldValue('newPassword1')) {
      callback(new Error('两次密码不一致'));
    } else {
      callback();
    }
  };
  modifyInfo= ()=>{
    console.log("modifyInfo");
  }
  logOut= ()=>{
    api.post(
      "/wms/auth/user/logout",
      {
        'token': storage.get('token')
      },
      res => {
        console.log(res);
        if(res.data.repCode == '0000'){
          sessionStorage.clear();
          window.location.href = '/';
        }
      }
    )
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const Option = Select.Option;
    const menu = (
      <Menu onClick={this.clickUser}>
        <Menu.Item key="ChangePwd"><Icon type="edit" />ChangePwd</Menu.Item>
        <Menu.Item key="ModifyInfo"><Icon type="diff" />ModifyInfo</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="LogOut"><Icon type="logout" />LogOut</Menu.Item>
      </Menu>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    
    return (
      <div className="navbarWrap">
        <div className="logo">LOGO</div>
        <ul className="navbar">
          <li onClick={this.changeMenu.bind(this,"2")}>Business operation<span className="line">|</span></li>
          <li onClick={this.changeMenu.bind(this,"2")}>Basic data<span className="line">|</span></li>
          <li onClick={this.changeMenu.bind(this,"2")}>Interface query<span className="line">|</span></li>
          <li onClick={this.changeMenu.bind(this,"2")}>System management</li>
        </ul>
        <div className="factoryCode" onClick={this.changeMenu.bind(this,"2")}>
          <Icon type="shop" theme="filled" />
          <span>{this.state.factoryCode}</span>
        </div>
        <div className="factoryWrap">
          <Icon type="home" theme="filled" />
          <Select defaultValue="lucy" onChange={this.handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
        <div className="userWrap">
          <Icon type="smile" theme="filled" />
          {/* <Icon type="user" /> */}
          <Dropdown overlay={menu} trigger={['click']} >
            <span style={{ userSelect: 'none' }}>{this.state.userName}</span>
          </Dropdown>
        </div>

        {/* 修改密码 */}
        <Modal
          visible={this.state.visible}
          title="Change Password"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="Original PWD">
              {getFieldDecorator('oldPassword', {
                rules: [{
                  required: true, message: 'Please input!',
                }],
              })(
                <Input type="password" />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="New PWD">
              {getFieldDecorator('newPassword1', {
                rules: [{
                  required: true, message: 'Please input!',
                }, {
                  validator: this.validateFirstPass,
                }],
              })(
                <Input type="password" />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Confirm PWD">
              {getFieldDecorator('confirmPass', {
                rules: [{
                  required: true, message: 'Please input!',
                }, {
                  validator: this.validateNextPass,
                }],
              })(
                <Input type="password" />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const NavBarWrap = Form.create({ name: 'changePwd' })(NavBar);
export default NavBarWrap