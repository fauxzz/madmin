import { Button, Card, Col, Form, Input, InputNumber, message, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderPanel from '../components/headerPanel';
import { post } from '../tools/api';

const {Title} = Typography;

const ResetPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const params = useParams();

    const onFinish = async () => {
      try {
        
        const values = await form.validateFields();
        if(values.password !== values.repassword) {
          message.error("Contraseñas no coinciden")
          return;
        }
        setLoading(true)
        const response = await post("/user/reset", {...values, email: params.email});
        console.log(response)
        if(response.success) {
          message.success(response.message);
          setLoading(false);
          navigate("/")
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
          <Col xs={20} sm={18} md={18} lg={8}>
              <Card className='shadow_card' bordered={false}>
              <Title level={3}>Cambio de contraseña</Title>
            <Form layout="vertical" onFinish={onFinish} form={form} name="form-signup">
              <Form.Item rules={[
                {required: true,
                message: "debe llenar este campo"}
              ]} name="code" label="Introduce el código de verificación">
                <Input type="number" showCount={(value) => 6 - value} minLength={6} className='custom_input' style={{width: "100%"}} />
              </Form.Item>
              <Form.Item rules={[
                {required: true,
                message: "debe llenar este campo"}
              ]} name="password" label="Nueva contraseña">
                <Input.Password className='custom_input' />
              </Form.Item>
              <Form.Item rules={[
                {required: true,
                message: "debe llenar este campo"}
              ]} name="repassword" label="Confirmación de nueva contraseña">
                <Input.Password className='custom_input' />
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
    )
}

export default ResetPassword;