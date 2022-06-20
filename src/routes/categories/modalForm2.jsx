import React, { useEffect, useState } from 'react';
import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, Form, Image, Input, message, Modal, Radio, Row, Select, Typography } from 'antd';
import { get, headerBearer, postFormData } from '../../tools/api';
import { baseUri } from '../../tools/constants';
import { checkImage } from '../../tools/imageTool';
import removeItem from "../../assets/removeitem.svg";

const {Title, Text} = Typography;

const optionsWithDisabled = [
    { label: 'Visible', value: true },
    { label: 'Oculto', value: false },
  ];

const ModalForm = ({visible, onCancel, save, record}) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visiblem, setVisiblem] = useState(false);

    useEffect(() => {
        initModal();
        return () => {
            form.resetFields();
            setImage(null);
        }
    }, [record]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initModal = () => {
        if(record !== null) {
            form.setFieldsValue(record);
            setImage({file: null, fileUri: `${baseUri}/images/categorias/${record.image}`});
        } else {
            form.resetFields();
            setImage(null);
        }
    }

    // preview image
    const selectedImage = (values) => {
        const file = values.target.files[0] // file
        const checki = checkImage(file);
        // check image
        if(!checki.success) return message.info(checki.error);

        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = function () {
            setImage({file, fileUri: reader.result});
        }
    }

    const onFinish = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            if(record === null) {
                if (image === null) {
                    setLoading(false);
                    return message.info("Debes seleccionar una imagen");
                }
                const response = await postFormData("/api/auth/categories", {...values, image: image.file}, headerBearer);
                // console.log(response);
                if(!response.success) {
                    message.error(response.message)
                } else {
                    form.resetFields();
                    setImage(false);
                    save(response.data, 0)
                    message.success(response.message)
                }
            } else {
                const response = await postFormData("/api/auth/update-category", {id: record.id, ...values, image: image.file !== null ? image.file : record.image} ,headerBearer);
                if(!response.success) {
                    message.error(response.message)
                } else {
                    form.resetFields();
                    setImage(false);
                    save(response.data, 1)
                    message.success(response.message)
                }
            }
            setLoading(false)
        } catch (error) {
            if (error.errorFields !== undefined) {
                message.error("Debes completar el formulario")
            } else {
                message.error("Error al agregar categoria")
            }
            setLoading(false)
            console.log(error)
            
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
            <Button onClick={() => {
                // form.resetFields()
                // setImage(null);
                onCancel()
            }} className='custom_button_form_cancel' type='link' danger key="back">
            Cancelar
          </Button>,
        <Button loading={loading} onClick={onFinish} className='custom_button_form' type='primary' key="create">
        Crear
    </Button>,
    record !== null ? <Row>
        <Col>
            <Button onClick={toggleModalDelete} className='btn_delete_data' type='link' danger>Eliminar categoria <DeleteOutlined /></Button>
        </Col>
    </Row> : null
        ]} >
            <Row >
                <Col span={8}>
                    <Typography.Title level={5}>Categoría</Typography.Title>
                    <div className='preview_image'>
                        {image !== null ? <Image src={image.fileUri} /> : null}
                        <label className='label_image' for="upload-photo">
                        <Input onChange={selectedImage} id="upload-photo" type="file" />
                        <Typography.Text><PlusCircleFilled /> Foto de la categoría</Typography.Text>
                    </label>
                    </div>

                </Col>
                <Col span={16} style={{paddingLeft: 8}}>
                    <Form layout='vertical' form={form} name="categories_form">
                        <Form.Item name="name" label="Nombre de la categoría" rules={[
          {
            required: true,
            message: 'Debes llenar este campo',
          },
        ]}>
                            <Input className='custom_input' />
                        </Form.Item>
                        <Form.Item name="status" label="Estado" rules={[
          {
            required: true,
            message: 'Debes llenar este campo',
          },
        ]}>
                        <Radio.Group
                            options={optionsWithDisabled}
                            optionType="button"
                            buttonStyle="solid"
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Modal closable={false} visible={visiblem} onCancel={toggleModalDelete} footer={null}>
                <div className='modal_delete'>
                    <Title style={{marginBottom: 20}} level={4}>Eliminar categoría</Title>
                    <img src={removeItem} alt='remove' />
                    <Text style={{marginTop: 20}}>¿Estas seguro que quieres eliminar esta subcategoria?</Text>
                    <div style={{marginTop: 20, width: '100%', textAlign: 'center'}}>
                    <Button className='custom_button_form_cancel' type='link' onClick={toggleModalDelete} danger>Cancelar</Button>
                    <Button className='custom_button_form' type='primary' onClick={deleteItem}>Eliminar</Button>
                    </div>
                </div>
            </Modal>
        </Modal>
    );
}



export default ModalForm;