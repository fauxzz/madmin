// import { Button, Tabs, Typography } from 'antd';
// import React from 'react';

// const { TabPane } = Tabs;

// const ActionTable = ({showButton, title, onClick, onChange, defaultActiveKey}) => {
//     return(
//         <div className='action_table_node'>
//             <div className='action_status'>
//                 <Typography.Title level={5} style={{marginRight: 20}}>Estados: </Typography.Title>
//                 <Tabs defaultActiveKey={defaultActiveKey} onChange={(e) => onChange(e)}>
//                     <TabPane tab="Todos" key={2} />
//                     <TabPane tab="Visible" key={1} />
//                     <TabPane tab="Oculto" key={0} />
//                 </Tabs>
//             </div>
//             {showButton && <Button onClick={onClick} className='custom_button' style={{maxWidth: '40%', minWidth: '20%'}} type='primary'>{title}</Button>}
//         </div>
//     );
// }

// export default ActionTable;



import { Button, Tabs, Typography } from 'antd';
import React from 'react';

const { TabPane } = Tabs;

const ActionTable = ({data, showButton, title, onClick, onChange, defaultActiveKey}) => {
    return(
        <div className='action_table_node'>
            <div className='action_status'>
                <Typography.Title level={5} style={{marginRight: 20}}>Estados: </Typography.Title>
                <Tabs defaultActiveKey={defaultActiveKey} onChange={(e) => onChange(e)}>
                    {data.map(d => <TabPane tab={d.name} key={d.value} />)}
                </Tabs>
            </div>
            {showButton && <Button onClick={onClick} className='custom_button' style={{maxWidth: '40%', minWidth: '20%'}} type='primary'>{title}</Button>}
        </div>
    );
}

export default ActionTable;