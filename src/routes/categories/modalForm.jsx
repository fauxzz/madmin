import React, { useContext } from 'react';
import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, Form, Image, Input, Modal, Radio, Row, Typography } from 'antd';
import removeItem from "../../assets/removeitem.svg";
import { CategoriesContext } from '.';

const {Title, Text} = Typography;

const optionsWithDisabled = [
    { label: 'Visible', value: true },
    { label: 'Oculto', value: false },
  ];

const ModalForm = () => {
    const {
        visible, 
        loading, 
        form, 
        onFinish, 
        onSelectedImage, 
        image,
        onDeleteItem,
        visibleModal,
        onToggleModalDelete,
        onClearImage,
        toggleModal,
        record
    } = useContext(CategoriesContext)

    // drago inf, minero, princesa, baby drago, mago elec, mago, horda de esb, tronco

    return (
        <Modal
        visible={visible} 
        closable={false} 
        footer={[
            <Button onClick={() => toggleModal(null)} className='custom_button_form_cancel' type='link' danger key="back">
            Cancelar
          </Button>,
        <Button loading={loading} onClick={onFinish} className='custom_button_form' type='primary' key="create">
        Crear
    </Button>,
    record !== null ? <Row>
        <Col>
            <Button onClick={onToggleModalDelete} className='btn_delete_data' type='link' danger>Eliminar categoria <DeleteOutlined /></Button>
        </Col>
    </Row> : null
        ]} >
            <Row >
                <Col span={8}>
                    <Typography.Title level={4}>Categoría</Typography.Title>
                    <div className='preview_image'>
                        {image !== null ? <Image src={image.fileUri} /> : null}
                        <label className='label_image' htmlFor="upload-photo">
                        <Input onChange={onSelectedImage} id="upload-photo" type="file" />
                        {image === null ? <Typography.Text className='label_form'>
                        <PlusCircleFilled style={{marginRight: 5}} /> 
                            Foto de la categoría
                        </Typography.Text> : null}
                    </label>
                    {image !== null ? <Button 
                    onClick={onClearImage}
                    size='small'
                    type='link'
                    className='delete_image_form' 
                    icon={<DeleteOutlined />} /> : null}
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
            <Modal closable={false} visible={visibleModal} onCancel={onToggleModalDelete} footer={null}>
                <div className='modal_delete'>
                    <Title style={{marginBottom: 20}} level={4}>Eliminar categoría</Title>
                    <img src={removeItem} alt='remove' />
                    <Text style={{marginTop: 20}}>¿Estas seguro que quieres eliminar esta subcategoria?</Text>
                    <div style={{marginTop: 20, width: '100%', textAlign: 'center'}}>
                    <Button className='custom_button_form_cancel' type='link' onClick={onToggleModalDelete} danger>Cancelar</Button>
                    <Button loading={loading} className='custom_button_form' type='primary' onClick={onDeleteItem}>Eliminar</Button>
                    </div>
                </div>
            </Modal>
        </Modal>
    );
}



export default ModalForm;