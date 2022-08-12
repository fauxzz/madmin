import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Modal, Radio, Row, Select, Spin, Typography } from 'antd';
import { baseUri } from '../../tools/constants';
import { useContext } from 'react';
import { RequestUsersContext } from '.';
import { getVehiclesString } from '../../tools/tools';

const {Title, Text} = Typography;
const {Option} = Select;

const ModalInfo = () => {
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
    

    useEffect(() => {
        initModal();
        // return () => {
        //     form.resetFields();
        //     setImage(null);
        // }
    }, [record]);

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    const initModal = () => {
      if(record !== null) {
        setStatus(record.status)
      }
        // if(record !== null) {
        //     form.setFieldsValue(record);
        //     setEstado(record.estado)
        // } else {
        //     form.resetFields();
        //     setImage(null);
        // }
    }

    // const onFinish = async () => {
    //   console.log('oks')
    //     // try {
    //     //     setLoading(true);
    //     //     const values = await form.validateFields();
    //     //     const response = await postFormData("/api/auth/update-repartidor", {id: record.id, ...values}, headerBearer);
    //     //     console.log(response);
    //     //     if(response.success) {
    //     //         message.success(response.message);
    //     //         setLoading(false)
    //     //         save({...record, ...values}, 2)
    //     //         return;
    //     //     }
    //     //     throw response;
            
    //     // } catch (error) {
    //     //     console.log(error)
    //     //     message.error(error.message);
    //     //     setLoading(false);
    //     // }

    // }

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
              Datos del usuario
            </Title>
            <Title level={4}>Repartidor</Title>
            <Text className="text_request_modal">
              <span>Nombre completo</span> {record.name}
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
                  <Option key={2} value={0}>
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
            </Form>
            <Button
              // onClick={toggleModalDelete}
              className="btn_delete_data"
              type="link"
              danger
            >
              Eliminar solicitud <DeleteOutlined />
            </Button>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Documento de identificación</span> Carnet de extranjería
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Número de identificación</span> {record.dni}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Correo electrónico</span> {record.email}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Teléfono de contacto</span> {record.phone}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Medio de transporte</span> {getVehiclesString(record.tipo_transporte)}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Licencia</span> {record.license.length > 1 ? <Button type="link"><a href={`${baseUri}/public/pdfs/${record.license}`} target="blank">Ver documento</a></Button> : <Text>No hay archivo</Text>}
            </Text>{" "}
            <br />
            <Text className="text_request_modal">
              <span>Datos del vehículo</span>{" "}
              {record.datavehicle.length > 1 ? <Button type="link"><a href={`${baseUri}/public/pdfs/${record.license}`} target="blank">Ver documento</a></Button> : <Text>No hay archivo</Text>}
            </Text>
          </Col>
        </Row> : <Spin />}
        {/* <Modal
          closable={false}
          visible={visiblem}
          // onCancel={toggleModalDelete}
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



export default ModalInfo;