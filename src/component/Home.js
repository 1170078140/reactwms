import React, { Component } from 'react';
import storage from '../model/storage';
import Login from './Login';
import NavBar from './NavBar';
import {Layout,Menu, Icon} from 'antd';
import router from '../router'
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import Index from './Index';
import NoMatch from './NoMatch';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed:false,
      sideStyle:{},
      menuList:[],
      current: [],
      openKeys: [],
      rootSubmenuKeys : ["133035", "133149", "133156", "133167", "133193", "133067", "133181", "133047", "133111", "133132", "133246"],
    };
  }
  componentDidMount(){
    // 默认菜单
    let list1 = ['Receive MGT','IN-WH MGT','Print Center','Query Center','Pick & Line feeding'];
    if(this.state.menuList){
      this.state.menuList.map((item,key)=>{
        if((list1.indexOf(item.name) !==-1) && item.status === 1) {
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
  componentWillUpdate(){
    
  }
  componentWillMount(){
    let H = document.documentElement.clientHeight	;
    this.setState({
      sideStyle:{
        height:H-60
      }
    })

    let menuList = storage.get('menuList');
    this.setState({
      menuList
    })

    // 刷新时当前菜单选中状态
    let url = window.location.pathname.substring(1);
    if(menuList){
      menuList.map((value,key)=>{
        value.childAuth.map((v,k)=>{
          if(url == v.code){
            this.setState({
              current : [String(v.id)],
              openKeys: [String(value.id)]
            })
          }
        })
      })
      
    }
  }
  // 菜单缩起
  onCollapse = (collapsed)=>{
    this.setState({ collapsed });
  }
  // 保持菜单单开
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  // 菜单选中状态
  selectMenu = ({ item, key, selectedKeys })=>{
    this.setState({
      current:selectedKeys
    })
  }
  render() {
    const { Header, Content, Sider } = Layout;
    const SubMenu = Menu.SubMenu;
    if(storage.get('token')){
      return (
        <div>
          <Header style={{padding:0,lineHeight: 60,height:60}}>
            <NavBar wrappedComponentRef={(form) => this.navBarState = form}/>
          </Header>
          <Router>
          <Layout>
            <Sider 
              collapsible 
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              style = {this.state.sideStyle}
            >
              {
                this.state.menuList.map((value,key)=>{
                  return(
                    <Menu
                      mode="inline"
                      theme="dark"
                      inlineCollapsed={this.state.collapsed}
                      openKeys={this.state.openKeys}
                      onOpenChange={this.onOpenChange}
                      multiple = {false}
                      onSelect = {this.selectMenu}
                      selectedKeys={this.state.current}
                      key = {key}
                    >
                      <SubMenu key={value.id} id={value.code} title={<span><Icon type="appstore" style={{color:"#67a5e4"}}/><span>{value.name}</span></span>}>
                        {
                          value.childAuth.map((v,k)=>{
                            return(
                              <Menu.Item key={v.id}>
                                <Link to={v.code}>{v.name}</Link>
                              </Menu.Item>
                            )
                          })
                        }
                      </SubMenu>
                    </Menu>
                  )
                })
              }
            </Sider>
            <Content>
              <Switch>
                <Route exact path='/login' component={Index} />
                {
                  router.map((value,key)=>{
                    if(value.exact){
                      return(
                        <Route exact path={value.path} component={Index} key={key} />
                      )
                    }else{
                      return(
                        <Route path={value.path} component={value.component} key={key} />
                      )
                    }
                  })
                }
                <Route component={NoMatch} />
              </Switch>
            </Content>
          </Layout>
          </Router>
        </div>
      );
    }else{
      return (
        <div style={{width:"100%",height:"100%"}}>
          <Login />
        </div>
      );
    }
    
  }
}

export default Home;