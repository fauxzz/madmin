import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, message, Modal, Radio, Row, Select, Space, Spin, Typography } from 'antd';
import { get, headerBearer, postFormData } from '../../tools/api';
import removeItem from "../../assets/removeitem.svg";

const {Title, Text} = Typography;
const {Option} = Select;

const optionsWithDisabled = [
    { label: 'Visible', value: 1 },
    { label: 'Oculto', value: 0 },
  ];

const ModalInfoBusiness = ({visible, onCancel, save, record}) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visiblem, setVisiblem] = useState(false);
    const [estado, setEstado] = useState(0);

    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        initModal();
        return () => {
            form.resetFields();
            setImage(null);
        }
    }, [record]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initModal = async () => {
        setCategories(await get("/api/auth/categories", headerBearer));
        if(record !== null) {
            form.setFieldsValue(record);
            setEstado(record.estado)
            setCategory(record.categoria_id);
        } else {
            form.resetFields();
            setImage(null);
        }
    }

    const onFinish = async () => {
        const values = await form.validateFields();
        console.log(values);
        try {
            setLoading(true);
            const values = await form.validateFields();
            const response = await postFormData("/api/auth/update-negocio", {id: record.id, ...values}, headerBearer);
            console.log(response);
            if(response.success) {
                message.success(response.message);
                setLoading(false)
                save({...record, ...values}, 2)
                return;
            }
            throw response;
            
        } catch (error) {
            console.log(error)
            message.error(error.message);
            setLoading(false);
        }

    }

    const toggleModalDelete = () => setVisiblem(!visiblem);

    const deleteItem = async () => {
        try {
            const result = await get("/api/auth/categories/"+record.id, headerBearer);
            if(!result.success) {
                message.error(result.message)
            } else {
                message.success(result.message);
                setVisiblem(false);
                save(record, 2)
            }
        } catch (error) {
            message.error("Error al comunicarse con el servidor");
        }
    }

    // drago inf, minero, princesa, baby drago, mago elec, mago, horda de esb, tronco

    return (
      <Modal
        width={"50%"}
        visible={visible}
        closable={false}
        footer={[
            <div style={{ width: "100%", textAlign: 'center'}}>
            <Button
              onClick={() => {
                // form.resetFields()
                // setImage(null);
                onCancel();
              }}
              className="custom_button_form_cancel"
              type="link"
              danger
              key="back"
            >
              Cancelar
            </Button>
            <Button
              loading={loading}
              onClick={onFinish}
              className="custom_button_form"
              type="primary"
              key="create"
            >
              Aceptar
            </Button>
            </div>
        ]}
      >
        {record !== null ? <Row>
          <Col span={24}>
            <Title level={3} style={{ textAlign: "center", fontWeight: 600 }}>
            Datos del negocio
            </Title>
            <Title level={4}>Negocio</Title>
            <Text className="text_request_modal">
              <span>Nombre del local</span> {record.nombre_local}
            </Text>
            <Form layout="vertical" form={form} name="categories_form">
              <Form.Item
                label="Estatus"
                name="estado"
                style={{ marginTop: 10 }}
              >
                <Select
                  onChange={(e) => setEstado(e)}
                  className="custom_select"
                  style={{ width: "80%" }}
                >
                  <Option value={2}>
                    <Text>Pendiente</Text> <Radio checked={estado === 2 ? true : false} />
                  </Option>
                  <Option value={1}>
                    <Text>Aceptado</Text> <Radio checked={estado === 1 ? true : false} />
                  </Option>
                  <Option value={4}>
                    Rechazado <Radio checked={estado === 4 ? true : false} />
                  </Option>
                </Select>
              </Form.Item>

              <Button
              onClick={toggleModalDelete}
              className="btn_delete_data"
              type="link"
              danger
            >
              Eliminar solicitud <DeleteOutlined />
            </Button>{" "}
            <br />

                            {/* categoria */}
                            <Form.Item
                name="categoria_id"
                className="form_horizontal"
                label="Categoría del negocio"
              >
                <Select
                  onChange={(e) => setCategory(e)}
                  className="custom_select"
                >
                  {categories.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name} <Radio checked={category === item.id} />
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>

            <Text className="text_request_modal">
              <span>Nombre completo</span> {record.nombre_cliente}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Correo electrónico</span> {record.email}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Teléfono de contacto</span> {record.telefono}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Cantidad de sucursales</span> {record.sucursales}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Permiso de uso</span> {record.documento.length > 1 ? <Button type="link">Ver documento</Button> : <Text>No hay archivo</Text>}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Datos del vehículo</span>{" "}
              {record.documento.length > 1 ? <Button type="link">Ver documento</Button> : <Text>No hay archivo</Text>}
            </Text>
            <br />
            <Text className="text_request_modal">
              <span>Número de registro de comerciantes</span> {record.numero_registro}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Dirección de la Tienda</span> {record.direccion}
            </Text>{" "}
          </Col>
        </Row> : <Spin />}
        <Modal
          closable={false}
          visible={visiblem}
          onCancel={toggleModalDelete}
          footer={null}
        >
          <div className="modal_delete">
            <Title style={{ marginBottom: 20 }} level={4}>
              Eliminar categoría
            </Title>
            <img src={removeItem} alt="remove" />
            <Text style={{ marginTop: 20 }}>
              ¿Estas seguro que quieres eliminar esta subcategoria?
            </Text>
            <div style={{ marginTop: 20, width: "100%", textAlign: "center" }}>
              <Button
                className="custom_button_form_cancel"
                type="link"
                onClick={toggleModalDelete}
                danger
              >
                Cancelar
              </Button>
              <Button
                className="custom_button_form"
                type="primary"
                onClick={deleteItem}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </Modal>
      </Modal>
    );
}

function getTextTransp(val) {
    switch (val) {
      case 1:
        return "Bicicleta";
    
        case 2:
            return "Auto";
  
      default:
        return "Moto";
    }
  }



export default ModalInfoBusiness;