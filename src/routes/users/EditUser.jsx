import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, InputNumber, message, Modal, Radio, Row, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookIconRed } from "../../components/customIcon";
import HeaderSection from "../../components/table/headerSection";
import { get, headerBearer, postFormData } from "../../tools/api";

const { Title, Text } = Typography;
const { Option } = Select;

const EditUser = () => {
    const params = useParams();
    const [form] = Form.useForm();
    const [data, setData] = useState(null);
    const [estado, setEstado] = useState(0);
    const [transp, setTransp] = useState(0);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState({documento1: null, documento2: null})
    useEffect(() => {
        fetchData()
    },[]);

    const fetchData = async () => {
        const result = await get("/api/auth/repartidor/"+params.id, headerBearer);
        console.log(result)
        form.setFieldsValue(result);
        setEstado(result.estado);
        setTransp(result.tipo_transporte);
        setFiles({documento1: result.documento1, documento2: result.documento2})
        setData(result);
    }

    const bannearDelivery =  async () => {
        try {
            setLoading(true);
            const resp = await get("/api/auth/banr/"+params.id, headerBearer);
            if(resp.success) {
                message.success(data.email+" fue banneado de la plataforma");
                setVisible(false);
                setData({...data, estado: 3});
                setLoading(false);
                return;
            }
            throw resp;
        } catch (error) {
            message.error(error.message);
            setLoading(false);
        }
        
    }

    const onFinish = async (values) => {
        console.log(values);
        try {
          setLoading(true)
          const resp = await postFormData("/api/auth/update-repartidor", {id: data.id, ...values}, headerBearer);
          console.log(resp);
          if(resp.success) {
            message.success(resp.message);
            setData(resp.data)
            setLoading(false)
          } else {
            throw resp;
          }
          
        } catch (error) {
          console.log(error);
          message.error(error.message);
          setLoading(false);
        }
      }

    return (
      <div style={{ height: "100%",}}>
        <HeaderSection title="Datos del usuario" />
        <input id="documento1" style={{display: 'none'}} type="file" />
        <input id="documento2" style={{display: 'none'}} type="file" />
        {data !== null ? <Form form={form} onFinish={onFinish} layout="vertical">
          <Row style={{ marginTop: 20 }}>
            <Col xs={24} md={6}>
              <Title level={5}>Repartidor</Title>
              <Avatar size={150} icon={<UserOutlined />} />
            </Col>
            <Col xs={25} md={18}>
              <Text className="text_edit">
                <Text className="text_strong">Nombre Completo: </Text>{data.nombre}</Text>
              <Form.Item
                label="Estatus"
                name="estado"
                style={{ marginTop: 10 }}
              >
                <Select onChange={(e) => setEstado(e)} className="custom_select" style={{ width: "50%" }}>
                <Option value={2}>
                    <Text>Pendiente</Text> <Radio checked={estado === 2} />
                  </Option>
                  <Option value={1}>
                    <Text>Habilitado</Text> <Radio checked={estado === 1} />
                  </Option>
                  <Option value={0}>
                    No Habilitado <Radio checked={estado === 0} />
                  </Option>
                  <Option value={3}>
                    Banneado <Radio checked={estado === 3} />
                  </Option>
                </Select>
              </Form.Item>
              {estado !== 3 ? <Button
                type="link"
                danger
                onClick={() => setVisible(true)}
                style={{
                  display: "flex",
                  fontWeight: 500,
                  alignItems: "center",
                }}
              >
                Agregar a la lista negra <BookIconRed />
              </Button> : <Button
                type="link"
                danger
                style={{
                  display: "flex",
                  fontWeight: 500,
                  alignItems: "center",
                }}
              >
                Usuario banneado
              </Button>}
            </Col>
            <Col sm={24} md={14}>
              <Text className="text_edit">
                <Text className="text_strong">
                  Documento de identificación: </Text>
                {getTextDocument(data.tipo_documento)}
              </Text>
              <br />
              <Text className="text_edit">
                <Text className="text_strong">Número de identificación: </Text>
                {data.numero_documento}
              </Text>
              <br />
              <Text className="text_edit">
                <Text className="text_strong">Correo electrónico: </Text>
                {data.correo}
              </Text>
              {/* <Text strong >Teléfono </Text> */}
              <Form.Item className="form_horizontal" name="telefono" label="Teléfono">
                <InputNumber min={0} style={{width: '100%'}} className="custom_input" />
              </Form.Item>
              <Form.Item
              name="tipo_transporte"
                className="form_horizontal"
                label="Medio de transporte"
              >
                <Select onChange={(e) => setTransp(e)} className="custom_select">
                  <Option value={0}>
                    <Text>Moto</Text> <Radio checked={transp === 0} />
                  </Option>
                  <Option value={1}>
                    Bicicleta <Radio checked={transp === 1} />
                  </Option>
                  <Option value={2}>
                    Auto <Radio checked={transp === 2} />
                  </Option>
                </Select>
              </Form.Item>
              { data.documento1.length < 1 ? <Form.Item className="form_horizontal" name="documento1" label="Licencia">
                <Input onClick={() => document.getElementById("documento1").click()} readOnly className="custom_input" />
              </Form.Item> : <Text className="text_edit">
                <Text className="text_strong">Licencia </Text>
                <Button type="link">Ver documento</Button>
              </Text>}
              <br />
              {data.documento2 < 1 ? <Form.Item className="form_horizontal" name="documento2" label="Datos del Vehículo">
                <Input onClick={() => document.getElementById("documento2").click()} readOnly className="custom_input" />
              </Form.Item> : <Text className="text_edit">
                <Text className="text_strong">Datos del Vehículo </Text>
                <Button type="link">Ver documento</Button>
              </Text>}
              <br />
              <Text className="text_edit">
                <Text className="text_strong">Método de Pago: </Text> {getTextTypePayment(data.type_payment)}
              </Text>
              <br />
              <Text className="text_edit">
                <Text className="text_strong">Número de cuenta: </Text>
                {data.number_bank}
              </Text>
              <br />
            </Col>
            <Col span={24} style={{ textAlign: "center" }}>
              <Link to="/app/users">
                <Button
                  className="custom_button_form_cancel"
                  type="link"
                  danger
                >
                  Volver
                </Button>
              </Link>
              <Button className="custom_button_form" htmlType="submit" type="primary">
                Guardar
              </Button>
            </Col>
          </Row>
        </Form> : null}

        <Modal
          closable={false}
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <div className="modal_delete">
            <Title style={{ marginBottom: 20 }} level={4}>
            Agregar a lista negra
            </Title>
            <Text style={{ marginTop: 20 }}>
            ¿Estas seguro que quieres a agregar a la lista negra al repartidor? Una vez realizado esta acción ya no pertenecerá a la familia Mandaitos.
            </Text>
            <div style={{ marginTop: 20, width: "100%", textAlign: "center" }}>
            <Button
                className="custom_button_form"
                type="primary"
                loading={loading}
                onClick={bannearDelivery}
              >
                Agregar
              </Button>
              <Button
                className="custom_button_form_cancel"
                type="link"
                onClick={() => setVisible(false)}
                danger
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>

      </div>
    );
}

function getTextDocument(val) {
    switch (val) {
        case 1:
            return "Carnet de extranjería"
    
        default:
            return "Documento de identidad"
    }
}

function getTextTypePayment(val) {
    switch (val) {
        case 1:
            return "Paypal"
    
        default:
            return "Deposito banco"
    }
}

export default EditUser;
