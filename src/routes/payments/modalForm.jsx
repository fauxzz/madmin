import React, { useContext } from 'react';
import { Col, Modal, Row, Typography } from 'antd';
import { PaymentsContext } from '.';
import { paymentStatusRender } from './status_render';
import { baseUri } from '../../tools/constants';

const {Title, Text} = Typography;

const ModalForm = () => {
    const {
        visible, 
        toggleModal,
        record
    } = useContext(PaymentsContext)

    return (
        <Modal
        visible={visible}
        onCancel={() => toggleModal(null)}
        footer={null}>
            {record !== null ? <div>
            <div>
                <Title level={3}>Datos del usuario</Title>
            </div>
            <Title level={4}>Repartidor</Title>
            <Row>
                <Col span={12}>
                    {record.photoDeliver ? <img src={`${baseUri}/deliver${record.photoDeliver}`} alt="mandaitos" /> : <div className='frame_deliver' />}
                </Col>
                <Col span={12}>
                    <Text><Text strong className='text_modal'>Estado: </Text>        {paymentStatusRender(record.paidDa)}</Text> <br/>
                    <Text className='text_modal'><Text strong className='text_modal'>Nombre completo: </Text>{record.nameDeliver}</Text> <br/>
                    <Text className='text_modal'><Text strong className='text_modal'>Monto a recibir: </Text> ${record.feeShop.toFixed(2)}</Text>
                </Col>
            </Row>
            <Text className='text_modal'><Text strong className='text_modal'>Correo electrónico: </Text>{record.emailDeliver}</Text> <br />
            <Text className='text_modal'><Text strong className='text_modal'>Teléfono de contacto: </Text>{record.phoneDeliver}</Text>
            </div> : null}
        </Modal>
    );
}



export default ModalForm;