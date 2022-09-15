import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {PowerOffIcon} from '../components/customIcon'
import HeaderPanel from '../components/headerPanel';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { routesMap } from '../tools/routerMap';
// import { useAuth } from '../hooks/authContext';
import { deleteStorage } from '../tools/storage';
import { TOKEN, USER_DATA } from '../tools/constants';
import Cookies from '../tools/cookies';
import Profile from '../routes/profile';
import EditUser from '../routes/users/EditUser';
import EditBusiness from '../routes/users/EditBusiness';
import Notifications from './Notification';
import arrowSide from '../assets/images/arrowSide.svg'
import { useAuth } from '../hooks/authContext';
import GenerarReports from '../routes/reportOrders/generaReports';

const cookies = new Cookies();
const { Content, Sider } = Layout;

const Panel = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {token, setToken, setAuth} = useAuth();

    // const {auth} = useAuth();

    if(token === '') {
      navigate("/");
    }

    const logout = () => {
      deleteStorage(USER_DATA);
      cookies.deleteCookie(TOKEN)
      setAuth(null);
      setToken(null);
      navigate("/");
    }

    const onCollapse = () => {
        setCollapsed(!collapsed);
      };

    return (
      <Layout className="eden_panel">
        <HeaderPanel showbuttons={true}></HeaderPanel>
        <Layout style={{ paddingTop: 10 }}>
          <Sider className="eden_sidebar" width={280} trigger={null} collapsible collapsed={collapsed}>
            <div className="container_menu_group">
              <div className="close_side_container">
                <img className={collapsed ? "button_close" : null} onClick={onCollapse} src={arrowSide} alt="arrowBack" />
              </div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                {routesMap.map((item) => (
                  <Menu.Item key={item.path} icon={<item.icon />}>
                    <Link className="link_sidebar" to={`/app${item.path}`}>
                      {item.name}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            </div>

            <Menu theme="dark" mode="inline">
              <Menu.Item onClick={logout} className="closed_sesion" key="closed_sesion" icon={<PowerOffIcon />}>
                Cerrar Sesión
              </Menu.Item>
            </Menu>
          </Sider>
          <Content
            className="site-layout-background"
            style={{
              overflowY: "auto",
              margin: "0 16px",
              padding: "16px 0 0 24px",
              minHeight: 280,
            }}
          >
            <Routes>
              {routesMap.map((item) => (
                <Route key={item.path} path={`${item.path}`} element={<item.View />} />
              ))}
              <Route key="/profile" path="/profile" element={<Profile />} />
              <Route key="/user/edit-user" path="/user/:id" element={<EditUser />} />
              <Route key="/business" path="/business/:id" element={<EditBusiness />} />
              <Route key="/notifications" path="/notifications" element={<Notifications />} />
              <Route key="/genera-reports" path="/genera-report" element={<GenerarReports />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    );
}

export default Panel;