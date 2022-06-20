import { Button } from 'antd';
import React from 'react';

const CustomButton = ({children}) => {
    return (
        <Button loading={false} className='custom_button' type='primary'>{children}</Button>
    );
}

export default CustomButton;