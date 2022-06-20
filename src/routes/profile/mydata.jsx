import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import useProfile from '../../hooks/useProfile';

const {Title} = Typography;

const MyData = () => {
  const {form, loading, onFinish} = useProfile({view: 'data'});

    return (
      <div>
        <Title level={3}>Mis datos</Title>
        <Card bordered={false}>
          <Form form={form} layout="vertical" onFinish={onFinish} name="mydata">
            <Row>
              {/* nombre admin */}
              <Col className="ph-1" xs={24} sm={24} md={12}>
                <Form.Item rules={[
                  {
                    required: true,
                    message: "Debes llenar todos los campos"
                  }
                ]} name="name" label="Nombre de administrador">
                  <Input className="custom_input" />
                </Form.Item>
              </Col>
              {/* Telefono */}
              <Col className="ph-1" xs={24} sm={24} md={12}>
                <Form.Item name="phone" label="Teléfono de contacto">
                  <Input type="tel" maxLength={16} className="custom_input" />
                </Form.Item>
              </Col>
              {/* email */}
              <Col className="ph-1" xs={24} sm={24} md={12}>
                <Form.Item rules={[
                  {
                    required: true,
                    message: "Debes llenar todos los campos"
                  }
                ]} name="email" label="Correo electrónico">
                  <Input type="email" className="custom_input" />
                </Form.Item>
              </Col>
              <Col span={16}>
              <Button loading={loading} htmlType='submit' type="primary" className="eden_button eden_button_padding">Guardar</Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
}

export default MyData;