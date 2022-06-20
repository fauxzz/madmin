import React, { useEffect } from 'react';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { CircleCloseIcon } from '../../components/customIcon';

const {Title, Text} = Typography;

const ModalInfo = ({visible, onCancel, save, record}) => {

    useEffect(() => {
        // initModal();
    }, [record]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const initModal = () => {
    //     if(record !== null) {
    //         form.setFieldsValue(record);
    //         setEstado(record.estado)
    //     } else {
    //         form.resetFields();
    //         setImage(null);
    //     }
    // }


    // drago inf, minero, princesa, baby drago, mago elec, mago, horda de esb, tronco

    return (
      <Modal
        width={"50%"}
        visible={visible}
        closable={false}
        footer={null}
      >
        <Row>
          <Col span={24} style={{position: 'relative'}}>
            <div className='close_modal_resume'>
            <Button onClick={onCancel} type='link' icon={<CircleCloseIcon />} />
            </div>
            <Title level={3} style={{fontWeight: 600 }}>
            Pedido N°01 - Detalle
            </Title>
            {/* cliente */}
            <div className='card_detailt_order'>
              <Title level={4}>Cliente</Title>
              <Text className="text_request_modal">
                <span>Nombre:</span> Lucero Figueroa
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Número de teléfono:</span> +51 976 633 461
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Correo electrónico:</span> lucerofiguero@gmail.com
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Dirección:</span> Calle loa Alamos 123 Lima
              </Text>
              <br />
            </div>
            {/* repartidor */}
            <div className='card_detailt_order'>
              <Title level={4}>Repatidor</Title>
              <Text className="text_request_modal">
                <span>Nombre repartidor:</span> Oscar Li
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Número de teléfono:</span> +51 976 633 461
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Correo electrónico:</span> lucerofiguero@gmail.com
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Vehículo:</span> Moto
              </Text>
              <br />
            </div>

              {/* repartidor */}
              <div className='card_detailt_order'>
              <Title level={4}>Negocio</Title>
              <Text className="text_request_modal">
                <span>Nombre local:</span> Va Bien!
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Número de teléfono:</span> +51 976 633 461
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Correo electrónico:</span> lucerofiguero@gmail.com
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Dirección:</span> Calle loa Alamos 123 Lima
              </Text>
              <br />
            </div>

            {/* repartidor */}
            <div className='card_detailt_order'>
              <Title level={4}>Detalle del pedido</Title>
              <Text className="text_request_modal">
                <span>Dirección de entrega:</span>Calle córdova 126, 3ra etapa mayorazgo
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Dirección del negocio:</span> Calle córdova 126, 3ra etapa mayorazgo
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Método de pago:</span> efectivo
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Fecha y hora:</span> 12/05/21 - 7:00pm
              </Text>
              <br />
              <Text className="text_request_modal">
                <span>Distancia:</span> 1Km
              </Text>
              <br />
              <Title level={4}>Resumen </Title>
              <div className='row_order_resume'>
                <Text>1 pollo + guiso de papa ensalada + 2 gaseosas 500 ml + cremas</Text>
                <Text>$60.00</Text>
              </div>
              <div className='row_order_resume'>
                <Text>Costo delivery</Text>
                <Text>$00.00</Text>
              </div>
              <div className='row_order_resume'>
                <Title level={3}>Total</Title>
                <Title level={3}> $60.00</Title>
              </div>
            </div>

          </Col>
        </Row>
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