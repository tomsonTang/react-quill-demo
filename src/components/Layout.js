
import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom'

import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import NewsPage from '../pages/newsPage'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

/**
 * 侧边栏
 * @param {*} props 
 */
const Sub1 = (props)=>{
  return (
    <Menu mode="inline"
      defaultSelectedKeys={[props.index||'1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
    >
    <SubMenu key="sub1" title={<span><Icon type="user" />消息群发</span>}>
      <Menu.Item key="1"><Link to='/nav-1/1'>新建空白图文</Link></Menu.Item>
      <Menu.Item key="2"><Link to='/nav-1/2'>新建咨询图文</Link></Menu.Item>
      <Menu.Item key="3"><Link to='/nav-1/3'>已发送</Link></Menu.Item>
    </SubMenu>
    </Menu>
  )
}

/**
 * 主体框架
 * @param {*} param0 
 */
const Layout1 = ({state,props,match,location})=>{

  return (
    <Layout style={fullPageHightStyle}>
      {/* 侧边栏 */}
      <Sider width={200} style={{ background: '#fff' }}>
        <Sub1 index={match.params.id}/>
      </Sider>
      {/* 正文栏 */}
      <Layout style={{ padding: '0 24px 24px' }}>
      {/* 面包屑 */}
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          <Breadcrumb.Item>新建图文</Breadcrumb.Item>
        </Breadcrumb>
        
        <Route path="/nav-1/:id" component={NewsPage}></Route>
      </Layout>
    </Layout>
  )
}

const fullPageHightStyle = {
  height:'100%'
}


export default class MyLayout extends React.Component{

  constructor(props){
    super(props);

    Object.assign(this,props);
  }

  render() {
    return (
      <div style={fullPageHightStyle}>
        <Layout style={fullPageHightStyle}>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link to='/nav-1'>内容管理</Link></Menu.Item>
              <Menu.Item key="2"><Link to='/nav-2'>用户管理</Link></Menu.Item>
              <Menu.Item key="3"><Link to='/nav-3'>栏目管理</Link></Menu.Item>
            </Menu>
          </Header>
          <Route path="/nav-1"  component={Layout1}></Route>
        </Layout>
      </div>
    );
  }
}