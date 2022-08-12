import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UsersContext } from ".";
import { BookIconRed } from "../../components/customIcon";
import HeaderSection from "../../components/table/headerSection";
import { get, headerBearer, post, postFormData } from "../../tools/api";
import { baseUri } from "../../tools/constants";

const { Title, Text } = Typography;
const { Option } = Select;

const EditBusiness = () => {
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
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState(record.category_id);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    console.log(record)
    if(record !== null) {
      const response = await get("/category/all");
      setCategories(response.data)
    };
  }

  // const fetchData = async () => {
  //   setCategories(await get("/api/auth/categories", headerBearer));
  //   const result = await get("/api/auth/negocio/" + params.id, headerBearer);
  //   console.log(result);
  //   form.setFieldsValue(result);
  //   setEstado(result.estado);
  //   setTransp(result.tipo_transporte);
  //   setFiles({ documento1: result.documento1, documento2: result.documento2 });
  //   setData(result);
  // };

  // const bannearDelivery = async () => {
  //   try {
  //     setLoading(true);
  //     const resp = await get("/api/auth/banb/" + params.id, headerBearer);
  //     if (resp.success) {
  //       message.success(data.correo + " fue banneado de la plataforma");
  //       setVisible(false);
  //       setData({...data, estado: 3});
  //       setLoading(false);
  //       return;
  //     }
  //     throw resp;
  //   } catch (error) {
  //     message.error(error.message);
  //     setLoading(false);
  //   }
  // };

  // const onFinish = async (values) => {
  //   console.log(values);
  //   // try {
  //   //   setLoading(true);
  //   //   const resp = await postFormData(
  //   //     "/api/auth/update-negocio",
  //   //     { id: params.id, ...values },
  //   //     headerBearer
  //   //   );
  //   //   console.log(resp);
  //   //   if (resp.success) {
  //   //     message.success(resp.message);
  //   //     setData(resp.data);
  //   //     setLoading(false);
  //   //   } else {
  //   //     throw resp;
  //   //   }
  //   // } catch (error) {
  //   //   console.log(error);
  //   //   message.error(error.message);
  //   //   setLoading(false);
  //   // }
  // };

  return (
    <div style={{ height: "100%"}}>
      <HeaderSection title="Datos del usuario" />
      <input onChange={(e) => setDataVehicle(e.target.files[0])} id="datavehicle" style={{ display: "none" }} type="file" />
      <input onChange={(e) => setLicense(e.target.files[0])} id="license" style={{ display: "none" }} type="file" />

        <Form style={{paddingBottom: 40}} form={form} onFinish={onFinish} layout="vertical">
          <Row style={{ marginTop: 20 }}>
            <Col xs={24} md={6}>
              <Title level={5}>Repartidor</Title>
              <Avatar 
              className="frame_avatar" 
              size={150} 
              icon={!record.avatar ? <UserOutlined /> : null} 
              src={record.avatar ? `${baseUri}/public/business/${record.avatar}` : null} />
            </Col>
            <Col xs={25} md={18}>
              <Text className="text_inline">
                <Text className="text_title_inline">Nombre del local: </Text>
                {record.name_business}
              </Text>
              <Form.Item
                label="Estatus"
                name="status"
                style={{ marginTop: 10 }}
              >
                <Select
                  onChange={(e) => setStatus(e)}
                  className="custom_select"
                  style={{ width: "50%" }}
                >
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
              {status !== 3 ? (
                <Button
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
                </Button>
              ) : (
                <Button
                  type="link"
                  danger
                  style={{
                    display: "flex",
                    fontWeight: 500,
                    alignItems: "center",
                  }}
                >
                  Usuario banneado
                </Button>
              )}
            </Col>
            <Col sm={24} md={14} style={{marginTop: 20}}>
              {/* categoria */}
              <Form.Item
                name="category_id"
                className="form_horizontal"
                label="Categoría del negocio"
              >
                <Select
                  onChange={(e) => setCategory(e)}
                  className="custom_select"
                >
                  {categories.length > 0 ? categories.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name} <Radio checked={category === item.id} />
                    </Option>
                  )) : null}
                </Select>
              </Form.Item>
              {/* nombre del titular */}
              <Text className="text_inline">
                <Text className="text_title_inline">Nombre del titular: </Text>
                {record.name}
              </Text>{" "}
              <br />
              {/* email */}
              <Text className="text_inline">
                <Text className="text_title_inline">Correo electrónico: </Text>
                {record.email}
              </Text>{" "}
              <br />
              {/* numero de celular */}
              <Form.Item
                className="form_horizontal"
                name="phone"
                label="Telefono"
                style={{marginTop: 10}} 
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  className="custom_input"
                />
              </Form.Item>
              {/* cantidad de sucursales */}
              <Form.Item
                className="form_horizontal"
                name="quantity_brach"
                label="Cantidad de sucursales"
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  className="custom_input"
                />
              </Form.Item>
              {/* permisos de uso */}
              {record.license < 1 ? (
                <Form.Item
                  className="form_horizontal"
                  name="license"
                  label="Permiso de uso"
                >
                  <Input
                    onClick={() =>
                      document.getElementById("license").click()
                    }
                    readOnly
                    className="custom_input"
                  />
                </Form.Item>
              ) : (
                <Text className="text_inline">
                  <Text className="text_title_inline">Permiso de uso </Text>
                  <Button type="link">Ver documento</Button>
                </Text>
              )}{" "}
              <br />
              {/* datos de vehiculo */}
              {record.datavehicle.length < 1 ? (
                <Form.Item
                  className="form_horizontal"
                  name="datavehicle"
                  label="Licencia"
                >
                  <Input
                    onClick={() =>
                      document.getElementById("datavehicle").click()
                    }
                    readOnly
                    className="custom_input"
                  />
                </Form.Item>
              ) : (
                <Text className="text_inline">
                  <Text className="text_title_inline">Datos del vehículo </Text>
                  <Button type="link">Ver documento</Button>
                </Text>
              )}
              <br />
              {/* numero de registro comerciante */}
              <Text className="text_inline">
                <Text className="text_title_inline">
                  Número de registro de comerciantes:{" "}
                </Text>{" "}
                {record.merchantregistration}
              </Text>
              <br />
              {/* numero de registro comerciante */}
              <Text className="text_inline">
                <Text className="text_title_inline">
                Dirección de la Tienda:{" "}
                </Text>{" "}
                {record.address}
              </Text>
              <br />
              {/* metodo de pago */}
              {/* <Text className="text_edit">
                <Text className="text_strong">Método de Pago: </Text>{" "}
                {getTextTypePayment(data.method_payment)}
              </Text>
              <br /> */}
                            {/* numero de banco */}
                            {/* <Text className="text_edit">
                <Text className="text_strong">Número de cuenta: </Text>{" "}
                {getTextTypePayment(data.number_bank)}
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
              <Button
                className="custom_button_form"
                htmlType="submit"
                loading={loading}
                type="primary"
              >
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
            ¿Estas seguro que quieres a agregar a la lista negra al repartidor?
            Una vez realizado esta acción ya no pertenecerá a la familia
            Mandaitos.
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
};

function getTextDocument(val) {
  switch (val) {
    case 1:
      return "Carnet de extranjería";

    default:
      return "Documento de identidad";
  }
}

function getTextTypePayment(val) {
  switch (val) {
    case 1:
      return "Paypal";

    default:
      return "Deposito banco";
  }
}

export default EditBusiness;
