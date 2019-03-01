import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import storage from '../model/storage';
const SubMenu = Menu.SubMenu;


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      collapsed: false,
      menuList:[],
      style1:{
        width:200
      },
      style2:{
        width:89
      },
     };
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  componentWillMount(){
    let menuList = storage.get('permissions');
    this.setState({
      menuList:menuList
    })
  }
  changePath = (value)=>{
  }
  render() {
    return (
      <div style={this.state.collapsed ? this.state.style2:this.state.style1} className="asideBarWrap">
        <div onClick={this.toggleCollapsed} style={{ position:"absolute",left:180,top:17,zIndex:1000,color:"#fff",cursor:"pointer",fontSize:"18px" }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>
        {
          this.state.menuList.map((value,key)=>{
            return(
              <Menu
                onSelect = {this.changePath}
                defaultSelectedKeys={['133036']}
                defaultOpenKeys={['0']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
                key = {key}
              >
                <SubMenu key={key} title={<span><Icon type="appstore" style={{color:"#67a5e4"}}/><span>{value.name}</span></span>}>
                  {
                    value.childAuth.map((v,k)=>{
                      return(
                        <Menu.Item key={v.id}>{v.name}</Menu.Item>
                      )
                    })
                  }
                </SubMenu>
              </Menu>
            )
          })
        }
        
      </div>
    );
  }
}

export default SideBar;