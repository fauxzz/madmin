import React, { useContext, useEffect, useState } from 'react';
import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, Form, Image, Input, message, Modal, Radio, Row, Typography } from 'antd';
import { get, headerBearer, headerBearerFormData, postFormData } from '../../tools/api';
import { baseUri } from '../../tools/constants';
import { checkImage } from '../../tools/imageTool';
import removeItem from "../../assets/removeitem.svg";
import SelectCategories from '../../components/FormSelectCategory';
import { CategoriesContext } from '.';

const {Title, Text} = Typography;
// const {Option} = Select;

const optionsWithDisabled = [
    { label: 'Visible', value: true },
    { label: 'Oculto', value: false },
  ];

const ModalFormTwo = () => {
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

    return (
      <Modal
        width={"50%"}
        visible={visible}
        closable={false}
        footer={[
          <Button
            onClick={() => toggleModal(null)}
            className="custom_button_form_cancel"
            type="link"
            danger
            key="back"
          >
            Cancelar
          </Button>,
          <Button
            loading={loading}
            onClick={onFinish}
            className="custom_button_form"
            type="primary"
            key="create"
          >
            Crear
          </Button>,
          record !== null ? (
            <Row>
              <Col>
                <Button
                  onClick={onToggleModalDelete}
                  className="btn_delete_data"
                  type="link"
                  danger
                >
                  Eliminar Subcategoria <DeleteOutlined />
                </Button>
              </Col>
            </Row>
          ) : null,
        ]}
      >
        <Row>
          <Col span={8}>
            <Typography.Title level={5}>Sub Categoría</Typography.Title>
            <div className="preview_image">
              {image !== null ? <Image src={image.fileUri} /> : null}
              <label className="label_image" for="upload-photo">
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
          <Col span={16} style={{ paddingLeft: 8 }}>
            <Form layout="vertical" form={form} name="categories_form">
              {/* <SelectCustom /> */}
              <SelectCategories name="category_id" />
              <Form.Item
                name="name"
                label="Nombre de la subcategoria"
                rules={[
                  {
                    required: true,
                    message: "Debes llenar este campo",
                  },
                ]}
              >
                <Input className="custom_input" />
              </Form.Item>
              <Form.Item
                name="visible"
                label="Estado"
                rules={[
                  {
                    required: true,
                    message: "Debes llenar este campo",
                  },
                ]}
              >
                <Radio.Group
                  options={optionsWithDisabled}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Modal
          closable={false}
          visible={visibleModal}
          onCancel={onToggleModalDelete}
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
                onClick={onToggleModalDelete}
                danger
              >
                Cancelar
              </Button>
              <Button
              loading={loading}
                className="custom_button_form"
                type="primary"
                onClick={onDeleteItem}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </Modal>
      </Modal>
    );
}



export default ModalFormTwo;