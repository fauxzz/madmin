import React, { useState } from 'react';

const SwitchPath = ({children, flag = true}) => {
    // const [flag, setFalg] = useState(true);
    return (
        <div className='switch_node'>
            
            <div className='switch_'>
            <div className='selector_' style={{left: flag ? '5%': '55%'}}></div>
                {children}
            </div>
            
        </div>
    );
}

export default SwitchPath;

export const SwitchItem = ({title, value, onClick}) => {
    return (
        <div className='switch_item_node' onClick={() => onClick(value)}>
            {/* <div className='selector'></div> */}
            <p>{title}</p>
        </div>
    );
}