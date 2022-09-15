import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import React from 'react';

const {Title} = Typography;
const {Option} = Select;

export default function GenerarReports() {
    return (<div>
        <div className='card_report_orders'>
            <div className='title_report_orders'>
                <Title level={3}>Reporte General</Title>
                <Button>Limpiar</Button>
            </div>

            <Form layout='vertical'>
                <Row style={{paddingTop: 16, paddingLeft: 14, paddingRight: 14}} gutter={14} className='card_orange_report'>
                    <Col lg={6}>
                        <Form.Item name="idShop" label="Tienda">
                            <Select>
                                <Option value="1">Tienda</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={6}>
                        <Form.Item name="status" label="Estado">
                            <Select>
                                <Option value="1">Tienda</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={6}>
                        <Form.Item label="Fecha de Inicio">
                            <Input className='custom_input' />
                        </Form.Item>
                    </Col>
                    <Col lg={6}>
                        <Form.Item label="Fecha de Fin">
                            <Input className='custom_input' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{marginTop: 20, paddingTop: 16, paddingLeft: 14, paddingRight: 14}} gutter={14} className='card_orange_report'>
                    <Col lg={6}>
                        <Form.Item name="id" label="N de pedido">
                            <Input className='custom_input' />
                        </Form.Item>
                    </Col>
                    <Col lg={6}>
                        <Form.Item name="iddeliver" label="Repartidor">
                            <Select>
                                <Option value="1">Tienda</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={6}>
                        <Form.Item name="vehicle" label="Medio de transporte">
                        <Select>
                                <Option value="1">Tienda</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={6}>
                        <Form.Item name="area" label="Área">
                            <Input className='custom_input' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{marginTop: 20, paddingTop: 16, paddingLeft: 14, paddingRight: 14}} gutter={14} className='card_orange_report'>
                    <Col lg={6}>
                        <Form.Item name="method_payment" label="Pago">
                            <Select>
                                <Option value="1">Tienda</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={6}>
                        <Form.Item name="method_pago" label="Medio de pago">
                            <Select>
                                <Option value="1">Tienda</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={6}>
                        <Form.Item name="category" label="Categoría">
                        <Select>
                                <Option value="1">Tienda</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={6}>
                        <Form.Item name="idsubcategory" label="Subcategoría">
                        <Select>
                                <Option value="1">Tienda</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>);
} 