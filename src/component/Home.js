import React, { Component } from 'react';
import storage from '../model/storage';
import Login from './Login';
import NavBar from './NavBar';
import {Layout,Menu, Icon} from 'antd';
import router from '../router'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from './Index';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed:false,
      sideStyle:{},
      menuList:[],
    };
  }
  componentDidMount(){
    let menuList = this.navBar.state.menuList;
    if(menuList.length>0){
      this.setState({
        menuList:menuList
      })
    }
    console.log(555);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps ,nextState);
    console.log('shouldComponentUpdate');
    return true;
  }
  componentWillMount(){
    let H = document.documentElement.clientHeight	;
    this.setState({
      sideStyle:{
        height:H-60
      }
    })
    console.log(H);
  }
  onCollapse = (collapsed)=>{
    this.setState({ collapsed });
  }
  render() {
    const { Header, Content, Sider } = Layout;
    const SubMenu = Menu.SubMenu;
    if(storage.get('token')){
      return (
        <div>
          <Header style={{padding:0,lineHeight: 60,height:60}}>
            <NavBar wrappedComponentRef={(form) => this.navBar = form}/>
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
                      onSelect = {this.changePath}
                      mode="inline"
                      theme="dark"
                      inlineCollapsed={this.state.collapsed}
                      key = {key}
                    >
                      <SubMenu key={key} title={<span><Icon type="appstore" style={{color:"#67a5e4"}}/><span>{value.name}</span></span>}>
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