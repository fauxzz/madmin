import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Switch = ({data, onClick}) => {
    const location = useLocation();

    return(<div className='manda2_switch_container'>
        <div className='manda2_switch_node'>
            <div className='manda2_switch_text'>
            {data.map(d => 
                    <div key={d.hash} className='manda2_switch' onClick={() => onClick(d.hash)}>
                        <span>{d.title}</span>
                    </div>)}
            </div>
            <div className='manda2_switch_select' 
            style={{left: location.hash === data[0].hash || location.hash === '' ? '2.5%': "52.5%"}} />
        </div>
    </div>);
}

export default Switch;