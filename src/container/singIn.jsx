import { Button, Card, Checkbox, Col, Form, Input, message, message as msg, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderPanel from '../components/headerPanel';
// import { useAuth } from '../hooks/authContext';
import { post } from '../tools/api';
import { TOKEN, USER_DATA } from '../tools/constants';
import Cookies from '../tools/cookies';
import { setStorage } from '../tools/storage';
import { useAuth } from '../hooks/authContext';

const cookies = new Cookies();

const {Title, Text} = Typography;

const SignIn = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const {auth, setAuth} = useAuth();
  const navigate = useNavigate();
  // const [error, setError] = useState('');

  

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await post("/user/login", {...values});
      console.log(response);
      if (!response.success) {
        message.error(response.message)
      } else {
        console.log(response)
        delete response.data.password;
        cookies.setCookie(TOKEN, response.token, 30);
        setStorage(USER_DATA, response.data);
        setAuth(response.data);
        navigate("/app/categories-subcategories#categories");
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      message.error("Error al conectarse al servidor")
      setLoading(false)
    }
  }

    return (
      <div className='signin_node'>
          <HeaderPanel />
        <div style={{paddingTop: '5%'}}>
            
          <Row justify='center'>
            <Col xs={20} sm={18} md={12} lg={8}>
                <Card bordered={false}>
                <Title>Iniciar Sesión</Title>
              <Form layout="vertical" form={form} name="form-signup" onFinish={onFinish}>
                <Form.Item name="email" label="Correo electrónico">
                  <Input type="email" className='custom_input' />
                </Form.Item>
                <Form.Item name="password" label="Contraseña">
                  <Input.Password className='custom_input' />
                </Form.Item>
                <Form.Item valuePropName="checked" name="remember_me">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Checkbox>Recordar contraseña</Checkbox>
                    <Link to="/forgot-password"><Text underline>Olvidaste tu contraseña</Text></Link>
                </div>
                </Form.Item>
                <div style={{textAlign: 'center'}}>
                <Button htmlType='submit' loading={loading} className='eden_button eden_button_100' type='primary'>Ingresar</Button>
                </div>
              </Form>
                </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
}

export default SignIn;