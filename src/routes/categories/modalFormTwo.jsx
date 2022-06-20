import React, { useEffect, useState } from 'react';
import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, Form, Image, Input, message, Modal, Radio, Row, Typography } from 'antd';
import { get, headerBearer, headerBearerFormData, postFormData } from '../../tools/api';
import { baseUri } from '../../tools/constants';
import { checkImage } from '../../tools/imageTool';
import removeItem from "../../assets/removeitem.svg";
import SelectCategories from '../../components/FormSelectCategory';

const {Title, Text} = Typography;
// const {Option} = Select;

const optionsWithDisabled = [
    { label: 'Visible', value: true },
    { label: 'Oculto', value: false },
  ];

const ModalFormTwo = ({visible, onCancel, save, record}) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visiblem, setVisiblem] = useState(false);
    // const [category, setCategory] = useState(0);
    // const [categories, setCategories] = useState([]);

    useEffect(() => {
        initModal();
        return () => {
            form.resetFields();
            setImage(null);
            // setCategory("")
        }
    }, [record]);

    const initModal = async () => {
        if(record !== null) {
            form.setFieldsValue(record);
            setImage({file: null, fileUri: `${baseUri}/public/${record.Image}`});
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
        // const values = await form.validateFields();
        // console.log(values);
        // return;
        try {
            
            const values = await form.validateFields();
            if(record === null) {
                if (image === null) return message.info("Debes seleccionar una imagen");
                setLoading(true);
                const response = await postFormData("/subcategory", {...values, image: image.file}, headerBearerFormData);
                if(response.success) {
                  // console.log(response)
                  form.resetFields()
                  setImage(null);
                  message.success(response.message)
                  setLoading(false);
                  save();
                  return;
              }
              throw response;
            } else {
              console.log(values)
                const response = await postFormData("/subcategory/"+record.ID, {...values, image: image.file !== null ? image.file : record.image} ,headerBearerFormData);
                console.log(response)
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
            message.error(error.message)
            setLoading(false)
            console.log(error)
            
        }
    }

    const toggleModalDelete = () => setVisiblem(!visiblem);

    const deleteItem = async () => {
      try {
        const result = await get("/api/auth/subcategories/"+record.id, headerBearerFormData);
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

    return (
      <Modal
        width={"50%"}
        visible={visible}
        closable={false}
        footer={[
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
                  onClick={toggleModalDelete}
                  className="btn_delete_data"
                  type="link"
                  danger
                >
                  Eliminar categoria <DeleteOutlined />
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
                <Input onChange={selectedImage} id="upload-photo" type="file" />
                <Typography.Text>
                  <PlusCircleFilled /> Foto de la categoría
                </Typography.Text>
              </label>
            </div>
          </Col>
          <Col span={16} style={{ paddingLeft: 8 }}>
            <Form layout="vertical" form={form} name="categories_form">
              {/* <SelectCustom /> */}
              <SelectCategories name="categoryid" />
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



export default ModalFormTwo;