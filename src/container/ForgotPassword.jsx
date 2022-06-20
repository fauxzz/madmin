import { Button, Card, Col, Form, Input, message, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPanel from '../components/headerPanel';
import { post } from '../tools/api';
import { RamdonCode } from '../tools/tools';

const {Title, Text} = Typography;

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const onFinish = async () => {
      try {
        setLoading(true)
        const values = await form.validateFields();
        const response = await post("/user/forgot", {...values, code: RamdonCode()});
        if(response.success) {
          message.success(response.message);
          setLoading(false);
          navigate("/reset-password/"+values.email)
          return;
        } 
        throw response;
      } catch (error) {
        message.error(error.message)
        setLoading(false)
      }
      
    }

    return (
        <div className='signin_node'>
        <HeaderPanel />
      <div style={{paddingTop: '5%'}}>
          
        <Row justify='center'>
          <Col style={{textAlign: 'center'}} xs={20} sm={18} md={12} lg={8}>
              <Card bordered={false}>
              <Title style={{textAlign: 'center'}} level={2}>¿Olvidaste tu contraseña?</Title>
              <Text>Por favor introduce tu correo electrónico para poder enviarte la recuperación de tu contraseña.</Text>
            <Form style={{marginTop: 20}} onFinish={onFinish} layout="vertical" form={form} name="form-signup">
              <Form.Item name="email" label="Correo electrónico">
                <Input type="email" className='custom_input' />
              </Form.Item>
              <div style={{textAlign: 'center'}}>
              {/* {error !== '' && <Alert message={error} type="error" showIcon />} */}
              <Button htmlType='submit' loading={loading} className='custom_button' type='primary'>Ingresar</Button>
              </div>
            </Form>
              </Card>
          </Col>
        </Row>
      </div>
    </div>
    );
}

export default ForgotPassword;