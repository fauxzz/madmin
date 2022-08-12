import React, {createContext} from 'react';
import HeaderSection from '../../components/table/headerSection';
import { Button, Table, Typography } from 'antd';
import Switch from '../../components/table/SwitchV2';
import ActionTable from '../../components/actionTable';
import useUser from './useBusiness';
import { SquareEditIcon } from '../../components/customIcon';
import EditUser from './EditUser';
import { getStatusString, getVehiclesString } from '../../tools/tools';
import EditBusiness from './EditBusiness';

// const {Text} = Typography;
const UsersContext = createContext()
const actionData = [{name: "Todos", value: 4}, {name: "Habilitado", value: 1}, {name: "No Habilitado", value: 2}]

export default function Users() {
    const {
        form,
        search,
        routes,
        data,
        hash,
        loading,
        status,
        visible,
        record,
        onSearchFilter,
        onChangeHash,
        onChagePage,
        onViewDataVisble,
        toggleModal,
        onFinish,
        setLicense,
        setDataVehicle
    } = useUser(true)

    const columnsDeliver = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Correo electrónico',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'N° Celular',
            dataIndex: 'phone',
            key: 'phone',
            render: (text, record) => record.prefix+text
        },
        {
            title: 'N° Identidad',
            dataIndex: 'dni',
            key: 'dni'
        },
        {
            title: 'Vehiculo',
            dataIndex: 'vehicle',
            key: 'vehicle',
            render: text => getVehiclesString(text)
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: text => getStatusString(text)
        },
        {
            title: 'Editar',
            dataIndex: 'id',
            key: 'id',
            render: (text, records) => <Button onClick={() => toggleModal(records)} style={{color: '#4F4F4F'}} type='link' icon={<SquareEditIcon />} />
        }
    ];

    const columnsBusiness = [
        {
            title: 'Nombre',
            dataIndex: 'name_business',
            key: 'name_business'
        },
        {
            title: 'Correo electrónico',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'N° Celular',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Dirección',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: text => getStatusString(text)
        },
        {
            title: 'Editar',
            dataIndex: 'id',
            key: 'id',
            render: (text, records) => <Button onClick={() => toggleModal(records)} style={{color: '#4F4F4F'}} type='link' icon={<SquareEditIcon />} />
        }
    ]
    
    return(
        <UsersContext.Provider value={{
            form,
            toggleModal,
            record,
            loading,
            onFinish,
            setLicense,
            setDataVehicle
        }}>
            {!visible ? <div>
                <HeaderSection 
                showSearch 
                title="Usuarios" 
                onChange={(e) => onSearchFilter(e)} 
                value={search} />
                <Switch onClick={onChangeHash} data={routes} />
                <ActionTable
                onChange={onViewDataVisble}
                defaultActiveKey={status}
                data={actionData}
                title={hash ? "Agregar categorías" : "Agregar Sub categorías"}
            />
                <Table
                style={{ marginTop: 20 }}
                size="small"
                columns={hash ? columnsDeliver : columnsBusiness}
                rowKey={(row) => row.id}
                dataSource={data.data}
                pagination={{
                showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
                total: data.total,
                current: data.page,
                pageSize: 10,
                onChange: onChagePage,
                }}
                scroll={{ y: window.innerHeight * 0.4 }}
                loading={loading}
            />
            </div> : null}
            {visible ? <div>{hash ? <EditUser /> : <EditBusiness />}</div> : null}
        </UsersContext.Provider>
    );
}

export {UsersContext}