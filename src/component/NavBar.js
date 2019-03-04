import React, { Component } from 'react';
import { Menu, Icon,Select ,Dropdown,Modal,message ,Form, Input} from 'antd';
import storage from '../model/storage';
import api from '../model/api';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
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
    // 获取菜单
    let menuListAll = storage.get('menuList');
    // console.log(menuListAll); 
    let menuList = [];
    let arr = ['Receive MGT','Authority','Basic Data','Customer Data','Factory Data','IN-WH MGT','Print Center','Query Center','Interface','Pick & Line feeding','Data initialization'];
    if(menuListAll){
      menuListAll.map((value,key)=>{
        if(arr.indexOf(value.name) !== -1 && value.status === 1){
          // console.log(value)
          menuList.push(value);
        }
      })
    }
    // console.log(menuList); 
    this.setState({
      menuList:menuList
    })
    
    let token = storage.get('token');
    let userName = storage.get('userName');
    let factoryCode = storage.get('factoryCode');
    this.setState({
      token,
      userName,
      factoryCode,
    })
  }
  componentDidMount(){
  }
  componentWillUpdate(){
  }
  handleChange= ()=>{

  }
  changeAside = (list)=>{
    if(this.state.menuList.length>0){
      this.state.menuList.map((item,key)=>{
        if((list.indexOf(item.name) !==-1) && item.status === 1) {
          var itemCode = document.getElementById(item.code);
          if(itemCode){
            document.getElementById(item.code).style.display = "block";
          }
        } else {
          var itemCode2 = document.getElementById(item.code);
          if(itemCode2) {
            document.getElementById(item.code).style.display = "none";
          }
        }
      })
    }
  }
  changeMenu = (value)=>{
    let obj = document.getElementsByClassName('navbar')[0].children;
    for(let i =0;i<obj.length;i++){
      obj[i].classList.remove('ac')
    }
    switch (value) {
      case 1:
        let list1 = ['Receive MGT','IN-WH MGT','Print Center','Query Center','Pick & Line feeding'];
        this.changeAside(list1);
        obj[0].classList.add('ac');
        break;
      case 2:
        let list2 = ['Basic Data'];
        this.changeAside(list2);
        obj[1].classList.add('ac');
        break;
      case 3:
        let list3 = ['Interface'];
        this.changeAside(list3);
        obj[2].classList.add('ac');
        break;
      case 4:
        let list4 = ['Authority'];
        this.changeAside(list4);
        obj[3].classList.add('ac');
        break;
      case 5:
        let list5 = ['Data initialization','Factory Data','Customer Data'];
        this.changeAside(list5);
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
          <li className="ac" onClick={this.changeMenu.bind(this,1)}>Business operation<span className="line">|</span></li>
          <li onClick={this.changeMenu.bind(this,2)}>Basic data<span className="line">|</span></li>
          <li onClick={this.changeMenu.bind(this,3)}>Interface query<span className="line">|</span></li>
          <li onClick={this.changeMenu.bind(this,4)}>System management</li>
        </ul>
        <div className="factoryCode" onClick={this.changeMenu.bind(this,5)}>
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