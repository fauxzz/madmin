import { Button, Col, Form, Input, message, Modal, Radio, Row, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import BankCard from '../../components/bankCard';
import { useAuth } from '../../hooks/authContext';
import { get, headerBearer, post, remove } from '../../tools/api';
import { banksMap, TypeAccoutnBankMap, TypeDocument } from './jsonbank';
import removeItem from "../../assets/removeitem.svg";
import { getStorage } from '../../tools/storage';
import { USER_DATA } from '../../tools/constants';
import useProfile from '../../hooks/useProfile';

const {Title, Text} = Typography;
const {Option} = Select;

const Banks = () => {
  const {loading, banks, visible, record, saveBank, toggleModal, toggleModalDelete, onFinish, onDeleteBank, form} = useProfile({view: 'banks'});
  // const [visible, setVisible] = useState(false);
  const [visibled, setVisibled] = useState(false);
  // const [data, setData] = useState([]);
  const [user, setUser] = useState(getStorage(USER_DATA));
  const [selects, setSelects] = useState({bank: banksMap[0], typeBank: TypeAccoutnBankMap[0], typeDoc: TypeDocument[0]});
  // const [form] = Form.useForm();

  // useEffect(() => {
  //   fetchData()
  // },[]);

  // const fetchData = async () => {
  //   // const userd = getStorage(USER_DATA);
  //   const result = await get(`/bank?id=${user.ID}&user=1`, headerBearer);
  //   setData(result.data);
  //   console.log(result);
  // }

  // const toggleModal = (rec = null) => {
  //   setVisible(!visible)
  //   if(rec !== null) {
  //     setrecord(rec)
  //     form.setFieldsValue(rec);
  //   } else {
  //     setrecord(rec)
  //     form.resetFields();
  //   }
  // }

  // const toggleModalDelete = (rec = null) => {
  //   setVisibled(!visibled);
  //   setrecord(rec)
  // }

  // const onFinish = async () => {
  //   try {
  //     setLoading(true)
  //     const values = await form.validateFields();
  //     if(record === null) {
  //       const response = await post("/bank", {iduser: user.ID, type_user: 1,...values}, headerBearer)
  //       if(response.success) {
  //         message.success(response.message);
  //         setData([response.data].concat(data));
  //         setLoading(false)
  //         toggleModal(null);
  //         return;
  //       }
  //       throw response;
  //     } else {
  //       const response = await post("/bank/"+record.id, {...record, ...values}, headerBearer);
  //       if(response.success) {
  //         message.success(response.message);
  //         setData(data.map(item => item.id === response.data.id ? response.data : item))
  //         setLoading(false)
  //         toggleModal(null);
  //         return;
  //       }
  //       throw response;
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     message.error(error.message);
  //     setLoading(false);
  //   }
  // }

  // const onDeleteBank = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await remove("/bank/"+record, headerBearer);
  //     if(response.success) {
  //       message.success(response.message);
  //       setData(data.filter(item => item.id === record))
  //       setLoading(false)
  //       toggleModalDelete(null);
  //       return;
  //     }
  //     throw response;
  //   } catch (error) {
  //     message.error(error.message)
  //     setLoading(false)
  //   }
  // }

    return (
      <div style={{ paddingBottom: 20 }}>
        <div className="add_bank">
          <Title level={3}>Información bancaria</Title>
          <Button
            type="primary"
            className="eden_button"
            onClick={() => toggleModal()}
          >
            Agregar Banco
          </Button>
        </div>

        {banks.length === 0 ? (
          <Title
            level={3}
            style={{ paddingTop: 20, color: "GrayText", textAlign: "center" }}
          >
            No hay bancos agregados
          </Title>
        ) : (
          <Row>
            {banks.map(item => <BankCard key={item.id} data={item} onDelete={() => toggleModalDelete(item.id)} onEdit={() => toggleModal(item)} />)}
          </Row>
        )}

        <Modal onCancel={() => toggleModal(null)} visible={visible} footer={null}>
          <Form form={form} layout="vertical" onFinish={saveBank} name="banks">
            <Row>
              {/* nombre del titular */}
              <Col className="ph-1" span={24}>
                <Form.Item name="name_owner" label="Nombre de titular">
                  <Input className="custom_input" />
                </Form.Item>
              </Col>
              {/* nombre del banco */}
              <Col className="ph-1" span={24}>
                <Form.Item name="name_bank" label="Nombre del banco">
                  <Select
                    onChange={(e) => setSelects({...selects, bank: e})}
                    className="custom_select"
                  >
                    {/* <Select.Option className="option_" value={1}>1 <Radio checked={category === 1} /></Select.Option> */}
                    {banksMap.map((item) => (
                      <Option key={item} value={item}>
                        {item} <Radio checked={selects.bank === item} />
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              {/* numero de cuenta */}
              <Col className="ph-1" span={24}>
                <Form.Item name="number_account" label="Numero de cuenta">
                  <Input className="custom_input" />
                </Form.Item>
              </Col>
              {/* tipo de cuenta */}
              <Col className="ph-1" span={24}>
                <Form.Item name="type_account" label="Tipo de cuenta">
                <Select
                    onChange={(e) => setSelects({...selects, typeBank: e})}
                    className="custom_select"
                  >
                    {/* <Select.Option className="option_" value={1}>1 <Radio checked={category === 1} /></Select.Option> */}
                    {TypeAccoutnBankMap.map((item) => (
                      <Option key={item} value={item}>
                        {item} <Radio checked={selects.typeBank === item} />
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              {/* Telefono */}
              <Col className="ph-1" span={24}>
                <Form.Item name="type_document" label="Documento de indetificación">
                <Select
                    onChange={(e) => setSelects({...selects, typeDoc: e})}
                    className="custom_select"
                  >
                    {/* <Select.Option className="option_" value={1}>1 <Radio checked={category === 1} /></Select.Option> */}
                    {TypeDocument.map((item) => (
                      <Option key={item} value={item}>
                        {item} <Radio checked={selects.typeDoc === item} />
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              {/* documento de identificacion */}
              <Col className="ph-1" span={24}>
                <Form.Item name="number_document" label="Número de Identificación">
                  <Input className="custom_input" />
                </Form.Item>
              </Col>
              <Col span={24}>
              <div className="footer_card_modal">
            <Button danger type="link" onClick={() => toggleModal(null)}>
              Cancelar
            </Button>
            <Button htmlType='submit' className='custom_button_form' loading={loading} type="primary">Guardar</Button>
          </div>
              </Col>
            </Row>
          </Form>
        </Modal>
        <Modal closable={false} visible={visibled} onCancel={() => toggleModalDelete(null)} footer={null}>
                <div className='modal_delete'>
                    <Title style={{marginBottom: 20}} level={4}>Eliminar Cuenta</Title>
                    <img src={removeItem} alt='remove' />
                    <Text style={{marginTop: 20}}>¿Estas seguro que quieres eliminar esta Cuenta bancaria?</Text>
                    <div style={{marginTop: 20, width: '100%', textAlign: 'center'}}>
                    <Button className='eden_delete_button' type='link' onClick={() => toggleModalDelete(null)} danger>Cancelar</Button>
                    <Button className='eden_button' loading={loading} type='primary' onClick={onDeleteBank}>Eliminar</Button>
                    </div>
                </div>
            </Modal>
      </div>
    );
}

export default Banks;