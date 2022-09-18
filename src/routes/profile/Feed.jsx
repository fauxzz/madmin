import { Button, Card, Col, Form, InputNumber, message, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/authContext';
import { get, headerBearer, post } from '../../tools/api';

const {Title} = Typography;

const Feed = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const {token} = useAuth();
  useEffect(() => {
    fetchData()
  },[]);

  const fetchData = async () => {
    const response = await get("/fee", headerBearer(token));
    setData(response.data);
    console.log(response.data)
    form.setFieldsValue(response.data);
  }

  const onFinish = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields();
      const response = await post("/fee/"+data.id, {...values}, headerBearer(token));
      console.log(response)
      if(response.success) {
        message.success(response.message);
        setData(response.data)
        setLoading(false)
        return;
      }
      throw response;
    } catch (error) {
      console.log(error)
      message.error(error.message);
      setLoading(false);
    }
  }

    return (
      <div>
        <Title level={3}>Comisiones y costos</Title>
        <Card bordered={false}>
          <Form layout="vertical" onFinish={onFinish} form={form} name="feeform">
            <Row>

              {/* Comisión para el negocio */}
              <Col className="ph-1" xs={24} sm={24} md={12}>
                <Form.Item name="fee_business" label="Comisión para el negocio">
                  <InputNumber className="eden_input" />
                </Form.Item>
              </Col>
              {/* Comisión para el Repartidor */}
              <Col className="ph-1" xs={24} sm={24} md={12}>
                <Form.Item name="fee_deliver" label="Comisión para el Repartidor">
                  <InputNumber className="eden_input" />
                </Form.Item>
              </Col>
              {/* Costo del envío gratis */}
              <Col className="ph-1" xs={24} sm={24} md={12}>
                <Form.Item name="free_deliver" label="Costo del envío gratis">
                  <InputNumber className="eden_input" />
                </Form.Item>
              </Col>
              {/* Máxima distancia para el envío gratis */}
              <Col className="ph-1" xs={24} sm={24} md={12}>
                <Form.Item
                  name="distance_max"
                  label="Máxima distancia para el envío gratis"
                >
                  <InputNumber className="eden_input" />
                </Form.Item>
              </Col>
              {/* Distancia predeterminada para el delivery gratis */}
              <Col className="ph-1" xs={24} sm={24} md={12}>
                <Form.Item
                  name="distance_free_deliver"
                  label="Distancia predeterminada para el delivery gratis"
                >
                  <InputNumber className="eden_input" />
                </Form.Item>
              </Col>
              {/* Deuda máxima permitida para el repartidor */}
              <Col className="ph-1" xs={24} sm={24} md={12}>
                <Form.Item
                  name="deliver_max_amount"
                  label="Deuda máxima permitida para el repartidor"
                >
                  <InputNumber className="eden_input" />
                </Form.Item>
              </Col>
              {/* Comisión pide lo que quieras */}
              <Col className="ph-1" xs={24} sm={24} md={12}>
                <Form.Item name="fee_free" label="Comisión pide lo que quieras">
                  <InputNumber className="eden_input" />
                </Form.Item>
              </Col>
              {/* Costo mínimo de compra */}
              <Col className="ph-1" xs={24} sm={24} md={12}>
                <Form.Item name="cost_min_buy" label="Costo mínimo de compra">
                  <InputNumber className="eden_input" />
                </Form.Item>
              </Col>
              {/* Costo adicional por kilómetro */}
              <Col className="ph-1" xs={24} sm={24} md={12}>
                <Form.Item name="cost_km" label="Costo adicional por kilómetro">
                  <InputNumber className="eden_input" />
                </Form.Item>
              </Col>

              <Col span={16}>
                <Button
                htmlType='submit'
                  type="primary"
                  loading={loading}
                  style={{ width: "50%" }}
                  className="custom_button_form"
                >
                  Guardar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
}

export default Feed;