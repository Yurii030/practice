import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {Layout, Menu } from 'antd';
import logo from '../assets/logo201.png';
import React, { useCallback, useRef, useState,useEffect } from 'react';
import {Divider,Table,Radio, Space } from 'antd';
import { Mentions } from 'antd';
import debounce from 'lodash/debounce';
import { margin } from '@mui/system';
import { ForkRight } from '@mui/icons-material';
import { Input } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";
 
const { Header, Content, Footer, Sider } = Layout;
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'companyname',
    dataIndex: 'companyname',
  },
  {
    title: 'userinfo',
    dataIndex: 'userinfo',
  },
];
const data = [
  {
    key: '1',
    name: 'yurii',
    id: 'wer32',
    companyname: 'infofla',
    userinfo: '사용자'
  },
  {
    key: '2',
    name: 'eile',
    id: 'wiefo77',
    companyname: 'London46',
    userinfo: '사용자'
  },
  {
    key: '3',
    name: 'Joe',
    id: 32,
    companyname: 'Lake Park',
    userinfo : '기업관리자'
  },
  {
    key: '4',
    name: 'eow',
    id: '99q9e1we',
    companyname: 'Sidney No. 1',
    userinfo : '기업관리자',
  },
];
// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const App = () => {
  const menuName = [{name:'운영상황조회',path:'/now'},{name:'유저관리',path:'/user'},{name:'기기관리',path:'/devicecontrol'}];
  
  const [size, setSize] = useState('large'); // default is 'middle'
  const [selectionType, setSelectionType] = useState('checkbox');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const ref = useRef();
  const loadGithubUsers = (key) => {
    if (!key) {
      setUsers([]);
      return;
    }
    fetch(`https://api.github.com/search/users?q=${key}`)
    .then((res) => res.json())
    .then(({ items = [] }) => {
      if (ref.current !== key) return;
      setLoading(false);
      setUsers(items.slice(0, 10));
    });
  }
  const debounceLoadGithubUsers = useCallback(debounce(loadGithubUsers, 800), []);
  const onSearch = (search) => {
    console.log('Search:', search);
    ref.current = search;
    setLoading(!!search);
    setUsers([]);
    debounceLoadGithubUsers(search);
  };
  return (
    
        <Layout>
      <Sider 
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        >
     
        <div className="ITOMS" /><img src={logo}style ={{ width : 230}}></img>{
        <Menu style ={{ margin : '20px 0.3px 0'}} 
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          
          // items={[VideoCameraOutlined,UserOutlined,VideoCameraOutlined].map(
          //   (icon, index) => ({
              
          //     key: String(index + 1),
          //     icon: React.createElement(icon),
          //     label: `${menuName[index].name}`,
              
              
          //   }),
          
          // )}

        >
          {
            menuName.map(item => 
            <Link to={item.path} key={item.name}> 
              <Menu.Item>{item.name}</Menu.Item> 
            </Link>)
          }
          
          </Menu>
          }
        
        
        
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0}} />
        <Content style={{ margin: '15px 250px 0' }}>
          <div className="site-layout-background" style={{ padding: 0, minHeight: 800 }}>
            
            <Radio.Group value={size}  onChange={(e) => setSize(e.target.value)}>
        <Radio.Button value="등록"style={{margin: '50px 0px 0px 698px'}}>등록</Radio.Button>
        <Radio.Button value="삭제"style={{margin: '80px 0px 0px 0px'}}>삭제</Radio.Button>
        
      </Radio.Group>
      <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >

      </Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
      <Space direction="vertical">
        <Space wrap>
          
        </Space>
      </Space>
          </div>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>INFOFLA</Footer>
      </Layout>
    </Layout>
    
  );
};

export default App;