import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, InputNumber, message, Modal, Radio, Row, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UsersContext } from ".";
import { BookIconRed } from "../../components/customIcon";
import HeaderSection from "../../components/table/headerSection";
import { get, headerBearer, postFormData } from "../../tools/api";
import { baseUri } from "../../tools/constants";
import { docDniMap } from "../../tools/mapTools";

const { Title, Text } = Typography;
const { Option } = Select;

const EditUser = () => {
  const {
    form, 
    toggleModal, 
    record,
    onFinish,
    loading,
    setLicense,
    setDataVehicle
  } = useContext(UsersContext);

  const [status, setStatus] = useState(record.status);
  const [transp, setTransp] = useState(record.transport);
    
    const [visible, setVisible] = useState(false);

    return (
      <div style={{ height: "100%",}}>
        <HeaderSection title="Datos del usuario" />
        <input onChange={(e) => setLicense(e.target.files[0])} id="licence" style={{display: 'none'}} type="file" />
        <input onChange={(e) => setDataVehicle(e.target.files[0])} id="datavehicle" style={{display: 'none'}} type="file" />
        <Form form={form}
         onFinish={onFinish} 
        style={{paddingBottom: 40}}
         layout="vertical">
          <Row style={{ marginTop: 20 }}>
            <Col xs={24} md={6}>
              <Title level={5}>Repartidor</Title>
              <Avatar className="frame_avatar" size={150} icon={<UserOutlined />} />
            </Col>
            <Col xs={25} md={18}>
              <Text className="text_inline">
                <Text className="text_title_inline">Nombre Completo: </Text>{record.name}</Text>
              <Form.Item
                label="Estatus"
                name="status"
                // initialValue={record.status}
                style={{ marginTop: 10 }}
              >
                <Select onChange={(e) => setStatus(e)} className="custom_select" style={{ width: "50%" }}>
                <Option value={0}>
                    <Text type="warning">Pendiente</Text> <Radio checked={status === 2} />
                  </Option>
                  <Option value={1}>
                    <Text type="success">Habilitado</Text> <Radio checked={status === 1} />
                  </Option>
                  <Option value={2}>
                    <Text type="danger">No Habilitado</Text> <Radio checked={status === 0} />
                  </Option>
                  <Option value={3}>
                    <Text type="danger">Banneado</Text> <Radio checked={status === 3} />
                  </Option>
                </Select>
              </Form.Item>
              {status !== 3 ? <Button
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
            <Col sm={24} md={14} style={{marginTop: 20}}>
              <Text className="text_inline">
                <Text className="text_title_inline">
                  Documento de identificación: </Text>
                {docDniMap[record.typedoc]}
              </Text>
              <br />
              <Text className="text_inline">
                <Text className="text_title_inline">Número de identificación: </Text>
                {record.dni}
              </Text>
              <br />
              <Text className="text_inline">
                <Text className="text_title_inline">Correo electrónico: </Text>
                {record.email}
              </Text>
              {/* <Text strong >Teléfono </Text> */}
              <Form.Item style={{marginTop: 10}} className="form_horizontal" name="phone" label="Teléfono">
                <InputNumber min={0} style={{width: '100%'}} className="custom_input" />
              </Form.Item>
              <Form.Item
              name="vehicle"
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
              {record.license.length < 1 ? <Form.Item className="form_horizontal" name="license" label="Licencia">
                <Input onClick={() => document.getElementById("licence").click()} readOnly className="custom_input" />
              </Form.Item> : <Text className="text_inline">
                <Text className="text_title_inline">Licencia </Text>
                <Button type="link"><a href={`${baseUri}/public/pdfs/${record.license}`} target="blank">Ver documento</a></Button>
              </Text>}
              <br />
              {record.datavehicle < 1 ? <Form.Item className="form_horizontal" name="datavehicle" label="Datos del Vehículo">
                <Input onClick={() => document.getElementById("datavehicle").click()} readOnly className="custom_input" />
              </Form.Item> : <Text className="text_inline">
                <Text className="text_title_inline">Datos del Vehículo </Text>
                <Button type="link"><a href={`${baseUri}/public/pdfs/${record.datavehicle}`} target="blank">Ver documento</a></Button>
              </Text>}
              {/* <br />
              <Text className="text_edit">
                <Text className="text_strong">Método de Pago: </Text> {getTextTypePayment(1)}
              </Text>
              <br />
              <Text className="text_edit">
                <Text className="text_strong">Número de cuenta: </Text>
                {'numero banco'}
              </Text>
              <br /> */}
            </Col>
            <Col span={24} style={{ textAlign: "center" }}>
            <Button
                  className="custom_button_form_cancel"
                  type="link"
                  danger
                  onClick={() => toggleModal(null)}
                >
                  Volver
                </Button>
              <Button loading={loading}
              className="custom_button_form" 
              htmlType="submit" type="primary">
                Guardar
              </Button>
            </Col>
          </Row>
        </Form>

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
                // onClick={bannearDelivery}
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

function getTextTypePayment(val) {
    switch (val) {
        case 1:
            return "Paypal"
    
        default:
            return "Deposito banco"
    }
}

export default EditUser;
