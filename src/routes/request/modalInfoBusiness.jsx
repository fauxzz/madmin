import React, { useContext, useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, message, Modal, Radio, Row, Select, Space, Spin, Typography } from 'antd';
import { get, headerBearer, postFormData } from '../../tools/api';
import removeItem from "../../assets/removeitem.svg";
import { RequestUsersContext } from '.';
import { baseUri } from '../../tools/constants';

const {Title, Text} = Typography;
const {Option} = Select;

const ModalInfoBusiness = () => {
  const {
    form,
    visible,
    toggleModal,
    record,
    loading,
    onFinish
  } = useContext(RequestUsersContext)
  const [status, setStatus] = useState(0);

  const [image, setImage] = useState(null);
  const [visiblem, setVisiblem] = useState(false);
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState([]);

    useEffect(() => {
        initModal();
    }, [record]);

    const initModal = async () => {
      if(record !== null) {
        const response = await get("/category/all");
        setCategories(response.data);
        setCategory(record.category_id);
        setStatus(record.status);
      }
        // setCategories(await get("/api/auth/categories", headerBearer));
        // if(record !== null) {
        //     form.setFieldsValue(record);
        //     setEstado(record.estado)
        //     setCategory(record.categoria_id);
        // } else {
        //     form.resetFields();
        //     setImage(null);
        // }
    }

    // const toggleModalDelete = () => setVisiblem(!visiblem);

    // const deleteItem = async () => {
    //     try {
    //         const result = await get("/api/auth/categories/"+record.id, headerBearer);
    //         if(!result.success) {
    //             message.error(result.message)
    //         } else {
    //             message.success(result.message);
    //             setVisiblem(false);
    //             save(record, 2)
    //         }
    //     } catch (error) {
    //         message.error("Error al comunicarse con el servidor");
    //     }
    // }

    // drago inf, minero, princesa, baby drago, mago elec, mago, horda de esb, tronco

    return (
      <Modal
        width={"50%"}
        visible={visible}
        closable={false}
        footer={[
            <div style={{ width: "100%", textAlign: 'center'}}>
            <Button
              onClick={() => toggleModal(null)}
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
              className="eden_button"
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
                label="Estado"
                name="status"
                style={{ marginTop: 10 }}
              >
                <Select
                  onChange={(e) => setStatus(e)}
                  className="custom_select"
                  style={{ width: "80%" }}
                >
                  <Option key={0} value={0}>
                    <Text type='warning'>Pendiente</Text> <Radio checked={status === 0} />
                  </Option>
                  <Option key={1} value={1}>
                    <Text type='success'>Aceptado</Text> <Radio checked={status === 1} />
                  </Option>
                  <Option key={4} value={4}>
                    <Text type='danger'>Rechazado</Text> <Radio checked={status === 4} />
                  </Option>
                </Select>
              </Form.Item>

              <Button
              // onClick={toggleModalDelete}
              className="btn_delete_data"
              type="link"
              danger
            >
              Eliminar solicitud <DeleteOutlined />
            </Button>{" "}
            <br />

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
                  {categories.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name} <Radio checked={category === item.id} />
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>

            <Text className="text_request_modal">
              <span>Nombre completo:</span> {record.name}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Correo electrónico:</span> {record.email}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Teléfono de contacto:</span> {record.phone}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Cantidad de sucursales:</span> {record.quantity_brach}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Permiso de uso:</span> {record.license.length > 1 ? <Button type="link"><a href={`${baseUri}/public/business/${record.license}`} target="blank">Ver documento</a></Button> : <Text>No hay archivo</Text>}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Datos del vehículo:</span>{" "}
              {record.datavehicle.length > 1 ? <Button type="link"><a href={`${baseUri}/public/business/${record.license}`} target="blank">Ver documento</a></Button> : <Text>No hay archivo</Text>}
            </Text>
            <br />
            <Text className="text_request_modal">
              <span>Número de registro de comerciantes:</span> {record.numero_registro}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Dirección de la Tienda:</span> {record.address}
            </Text>{" "}
          </Col>
        </Row> : <Spin />}
        {/* <Modal
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
        </Modal> */}
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