import { Tabs } from "antd";
import React, { Component } from "react";
import HeaderSection from "../../components/table/headerSection";
import Banks from "./banks";
import Feed from "./Feed";
import MyData from "./mydata";

const { TabPane } = Tabs;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };


  }



  render() {
    return (
      <div style={{ padding: "0 0" }}>
        {/* <HeaderSection title="Configuración" /> */}
          <Tabs tabPosition="left">
          <TabPane tab="Mis datos" key="1">
            <MyData />
          </TabPane>
          <TabPane tab="Bancos" key="2">
            <Banks />
          </TabPane>
          <TabPane tab="Comisiones" key="3">
            <Feed />
          </TabPane>
        </Tabs>

      </div>
    );
  }
}

export default Profile;
