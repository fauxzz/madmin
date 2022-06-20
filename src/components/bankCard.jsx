import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Tooltip, Typography } from 'antd';
import React from 'react';

const {Text} = Typography;

const BankCard = ({data, onEdit, onDelete}) => {
    return (
      <Col style={{padding: "8px 0"}} xs={24} sm={24} md={24} lg={24}>
        <Card className="shadow_card eden_card_bank" bordered={false}>
          <div className='title_container_bank'>
          <Text className='title_card_bank'>{`${data.name_owner} - ${data.name_bank}`}</Text> <br />
          <div className="footer_card_bank">
            <Tooltip title="Editar"><Button style={{color: "#000"}} type="link" icon={<EditOutlined />} onClick={onEdit} /></Tooltip>
            <Tooltip title="Borrar"><Button danger type="link" onClick={onDelete} icon={<DeleteOutlined />} /></Tooltip>
          </div>
          </div>
          <Text className='text_card_bank'><span>Numero de cuenta:</span> {data.number_account}</Text> <br />

        </Card>
      </Col>
    );
}

export default BankCard;