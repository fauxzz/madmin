import React from 'react';
import { Typography } from 'antd';

const {Title, Text} = Typography;

const NotificationCard = () => {
    return(
        <div className='card_notification'>
            <Title level={4}>¡Pedido etregado!</Title>
            <Text>El repartidor Alfredo Pérez acaba de realizar satisfactoriamente la entrega del pedido N°01 a la dirección Calle Córdova 126, 3ra etapa.</Text>
        </div>
    );
}

export default NotificationCard;