import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {Layout, Menu } from 'antd';
import logo from '../assets/logo201.png';
import React, { useCallback, useRef, useState,useEffect } from 'react';
import {Divider,Table,Radio, Space } from 'antd';
import debounce from 'lodash/debounce';
import { Input,Form,Button } from 'antd';
import { Link } from "react-router-dom";
// import Nav from "../components/Nav/Nav";
import { useHistory, useLocation } from "react-router-dom";
//import getdevice from "../components/Getdevice";
import { useQuery } from "@apollo/client";
import { getdevice } from "../graphql/query";


 
const { Search } = Input;

const { Header, Content, Footer, Sider } = Layout;
//표 
const columns = [
  {
    title: 'deviceID',
    dataIndex: 'deviceID',
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
    title: 'devicename',
    dataIndex: 'devicename',
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

//메뉴

  function Now() {
  const[deviceID, setdeviceID] = useState("");

  const location = useLocation();
  const history = useHistory();
    const { data } = useQuery(getdevice);
    console.log(data);
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
    // login에서 id state받아옴
 
  }

  const onsearchDeviceID =(e) => {
    setdeviceID(e.target.value)
  }
  const onsearch=(e)=>{
    console.log(e);
  }

  return (
    
    <>
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
            
      <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
          <>

    <br />
    <Search  style={{ margin: '15px 15px 0px 260px' }} placeholder="deviceid 입력"  onSearch={onsearch} size="large"  />
    {/* <Input.Search value={deviceID} onChange={onsearchDeviceID}/> */}
  
  </>

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
    <>
    
  </>
    <br />
    <Search placeholder="장비등록 수 검색(회사 이름을 검색해주세요)" enterButton="검색"  size="large"  />


      <Space direction="vertical">
        <Space wrap>
        </Space>
      </Space>
          </div>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>INFOFLA</Footer>
      </Layout>
    </Layout>
      
    </>
  );
};

export default Now;