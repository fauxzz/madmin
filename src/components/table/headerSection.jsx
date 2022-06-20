import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Typography } from 'antd';
import React from 'react';

const HeaderSection = ({title, onChange, value, showSearch = false}) => {
    return (
      <div className='eden_searchbar'>
        <Row>
          <Col xs={24} sm={24} md={12} lg={18}>
            <Typography.Title className='searchbar_title'>{title}</Typography.Title>
          </Col>
          {showSearch ? (
            <Col style={{justifyContent: 'flex-end'}} xs={24} sm={24} md={12} lg={6}>
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                prefix={<SearchOutlined style={{ fontSize: 20, color: "#BDBDBD" }} />}
                placeholder="Buscar"
                className='seachbar_input'
              />
            </Col>
          ) : null}
        </Row>
      </div>
    );
}

export default HeaderSection;