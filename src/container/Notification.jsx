import React from 'react';
import { Typography } from 'antd';
import NotificationCard from '../components/notification_card';

const {Title} = Typography;

const Notifications = () => {
    return (
        <div className='notifications_container'>
            <Title level={3}>Notificaciones Mandaitos</Title>
            <div className='scrolled_notifications'>
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                
            </div>
        </div>
    );
}

export default Notifications;