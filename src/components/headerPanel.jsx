import { BellFilled } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo.svg";

const HeaderPanel = ({showbuttons}) => {
  const location = useLocation();

    useEffect(() => {
      // console.log(location)
    }, []);

    return (
      <div className="eden_header_bar">
        <img className="eden_logo" alt="mandaditos" width={60} src={logo} />
        {showbuttons ? <Space>
          <Link to="/app/profile"><Avatar style={{backgroundColor: location.pathname === "/app/profile" ? "#FA8B20" : "#668998"}} size={40} >LC</Avatar></Link>
          <Link to="/app/notifications">
          <Badge dot>
          <Avatar style={{backgroundColor: location.pathname === "/app/notifications" ? "#FA8B20" : "#668998"}} size={40} icon={<BellFilled />} />
      </Badge>
      </Link>
          
        </Space> : null}
      </div>
    );
}

export default HeaderPanel;