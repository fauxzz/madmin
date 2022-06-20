import React, { useEffect, useState } from 'react';
import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, Form, Image, Input, message, Modal, Radio, Row, Select, Typography } from 'antd';
import { headerBearer, headerBearerFormData, postFormData, remove } from '../../tools/api';
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
        initComponet()
    }, [record])

    const initComponet = () => {
        if(record !== null) {
            form.setFieldsValue(record)
            setImage({file: null, fileUri: `${baseUri}/public/${record.Image}`});
        }
        console.log(record)
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
            const values = await form.validateFields();
            if(record === null) {
                if(image === null) return message.info("Debes seleccionar una imagen");
                setLoading(true)
                const response = await postFormData("/category", {...values, image: image.file}, headerBearerFormData);
                if(response.success) {
                    // console.log(response)
                    form.resetFields()
                    setImage(null);
                    message.success(response.message)
                    setLoading(false);
                    // save();
                    return;
                }
                throw response;
            } else {
                const response = await postFormData("/category/"+record.ID, {...values, image: image.file !== null ? image.file : record.image} ,headerBearerFormData);
                if(response.success) {
                    // console.log(response)
                    form.resetFields()
                    setImage(null);
                    message.success(response.message)
                    setLoading(false);
                    save(1, response.data);
                    return;
                }
                throw response;
            }
        } catch (error) {
            console.log(error)
            message.error(error.message)
            setLoading(false)
        }
        
    }

    const toggleModalDelete = () => setVisiblem(!visiblem);

    const deleteItem = async () => {
        try {
            setLoading(true)
            const result = await remove("/category/"+record.ID, headerBearer);
            if(result.success) {
                message.success(result.message);
                setLoading(false)
                setVisiblem(false);
                save()
                return
            } 
            throw result;
        } catch (error) {
            message.error(error.message)
            setLoading(false)
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
                form.resetFields()
                setImage(null);
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
                        <Form.Item name="visible" label="Estado" rules={[
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
                    <Button loading={loading} className='custom_button_form' type='primary' onClick={deleteItem}>Eliminar</Button>
                    </div>
                </div>
            </Modal>
        </Modal>
    );
}



export default ModalForm;