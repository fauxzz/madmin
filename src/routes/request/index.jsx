import React, { createContext } from 'react';
import { Button, Table, Typography } from "antd";
import useRequestUsers from './useUserRequest';
import HeaderSection from '../../components/table/headerSection';
import Switch from '../../components/table/SwitchV2';
import ActionTable from '../../components/actionTable';
import { columnsBusiness } from '../users/columns';
import { DocIcon, SquareEditIcon } from '../../components/customIcon';
import ModalInfo from './modalInfo';
import ModalInfoBusiness from './modalInfoBusiness';
import { getStatusString } from '../../tools/tools';

const dataSwitch = [
    {path: "/categories", title: "Categoría"},
    {path: "/subcategories", title: "Subcategorías"}
]

const {Text} = Typography;
const RequestUsersContext = createContext()
const actionData = [{name: "Pendiente", value: 0}, {name: "Rechazados", value: 4}]

export default function RequestUsers() {
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
        onFinish
    } = useRequestUsers(true)

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
            key: 'phone'
        },
        {
            title: 'N° Identidad',
            dataIndex: 'dni',
            key: 'dni'
        },
        {
            title: 'Vehiculo',
            dataIndex: 'vehicle',
            key: 'vehicle'
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
            render: (text, records) => <Button onClick={() => toggleModal(records)} style={{color: '#4F4F4F'}} type='link' icon={<DocIcon />} />
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
        <RequestUsersContext.Provider value={{
            form,
            toggleModal,
            onFinish,
            record,
            visible,
            loading
        }}>
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
                // onChange={this.handleTableChange}
            />
            {hash ? <ModalInfo /> : <ModalInfoBusiness />}
        </RequestUsersContext.Provider>
    );
}

export {RequestUsersContext}


// class RequestUsers extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { 
//             view: "category",
//             visible: false,
//             flag: true,
//             data: [],
//             searchData: [],
//             filterStatus: "2",
//             loading: false,
//             sourceData: null,
//             search: "",
//          };
//     }

//     async componentDidMount() {
//         this.getCategories();
//     }

//     async getCategories (flag = true) {
//         // console.log(await get("/api/auth/all-repartidor?estado=4", headerBearer));

//         try {
//             if(flag) {
//                 this.setState({loading: true});
//                 const data = await get("/api/auth/all-repartidor?estado=2", headerBearer);
//                 // console.log(data);
//                 this.setState({flag: flag, data, loading: false});
//             } else {
//                 this.setState({loading: true});
//                 const data = await get("/api/auth/negocios?estado=2", headerBearer);
//                 // console.log(data);
//                 this.setState({flag: flag, data, loading: false});
//             }

//         } catch (error) {
//             message.error("Error interno del servidor");
//             this.setState({loading: false});
//         }
//     }

//     toggleModalInfo = (data = null) => this.setState({sourceData: data, visible: !this.state.visible});
//     toggleFlag = (val) => {
//         // Navigate({to: "/app/categories/1"})
//         // console.log(this.props.history);
//         this.getCategories(val);
//     };

//     columnsDelivers = [
//         {
//             title: 'Nombre',
//             dataIndex: 'nombre',
//             key: 'nombre'
//         },
//         {
//             title: 'Correo electrónico',
//             dataIndex: 'correo',
//             key: 'correo'
//         },
//         {
//             title: 'N° celular',
//             dataIndex: 'telefono',
//             key: 'telefono',
//         },
//         {
//             title: 'N° identidad',
//             dataIndex: 'numero_documento',
//             key: 'numero_documento',
//         },
//         {
//             title: 'Vehículo',
//             dataIndex: 'tipo_transporte',
//             key: 'tipo_transporte',
//         },
//         {
//             title: 'Estado',
//             dataIndex: 'status',
//             key: 'status',
//             render: text => text ? <Text style={{color: "#219653"}}>Visible</Text> : <Text style={{color: "#EB5757"}}>Oculto</Text>
//         },
//         {
//             title: 'Detalle',
//             dataIndex: 'id',
//             key: 'id',
//             render: (text, records) => <Button onClick={() => this.toggleModalInfo(records)} type='link' icon={<DocIcon />} />
//         }
//     ]

//     columnsSubategories = [
//         {
//             title: 'Nombre',
//             dataIndex: 'nombre_local',
//             key: 'nombre_local'
//         },
//         {
//             title: 'Correo electrónico',
//             dataIndex: 'email',
//             key: 'email'
//         },
//         {
//             title: 'N° celular',
//             dataIndex: 'telefono',
//             key: 'telefono',
//         },
//         {
//             title: 'N° celular',
//             dataIndex: 'telefono',
//             key: 'telefono',
//         },
//         {
//             title: 'Dirección',
//             dataIndex: 'direccion',
//             key: 'direccion',
//         },
//         {
//             title: 'Estado',
//             dataIndex: 'estado',
//             key: 'estado',
//             render: text => text ? <Text style={{color: "#219653"}}>Visible</Text> : <Text style={{color: "#EB5757"}}>Oculto</Text>
//         },
//         {
//             title: 'Detalle',
//             dataIndex: 'id',
//             key: 'id',
//             render: (text, records) => <Button onClick={() => this.toggleModalInfo(records)} type='link' icon={<DocIcon />} />
//         }
//     ]

//     saveRecords = (record = null, opt) => {
//         console.log(record);
//         if (opt === 1) this.setState({data: updateArray(record, this.state.data)});
//         if (opt === 2) this.setState({data: deleteFromArray(record, this.state.data)});
//         this.toggleModalInfo(null);
//     }

//     searchDataFilter (value) {
//         this.setState({search: value})
//         if(value === '' || value === ' ') {
//             this.setState({searchData: []});
            
//         } else {
//             let result;
//             if(this.state.flag) {
//                 result = this.state.data.filter(item => item.nombre.toLowerCase().indexOf(value.toLowerCase()) !== -1)
//             } else {
//                 result = this.state.data.filter(item => item.nombre_local.toLowerCase().indexOf(value.toLowerCase()) !== -1)
//             }
//             this.setState({searchData: result});
//             // console.log(result)
//         }
//     }

//     onFilterStatus (key) {
//         this.setState({filterStatus: key});
//         if(parseInt(key) === 2) {
//             this.setState({searchData: []});
//             // console.log(parseInt(key))
//         } else {
//             const result = this.state.data.filter(item => item.status === parseInt(key))
//             this.setState({searchData: result});
//             console.log(result)
//         }
//     }


//     render() {
//         const {data, loading, search, filterStatus, flag, searchData, visible, view, sourceData} = this.state;
//         return (
//            <div>
//                <HeaderSection showSearch title="Solicitudes" value={search} onChange={(value) => this.searchDataFilter(value)} />
//                <SwitchPath flag={flag}>
//                    <SwitchItem value={true} title="Repartidores" onClick={(e) => this.toggleFlag(e)} />
//                    <SwitchItem value={false} title="Negocios" onClick={(e) => this.toggleFlag(e)} />
//                </SwitchPath>
//                <ActionTable defaultActiveKey={filterStatus} onChange={(e) => this.onFilterStatus(e)} onClick={() => this.toggleModalForm(null)} />
//                <Table
//                style={{marginTop: 20}}
//                size="small"
//                 columns={flag ? this.columnsDelivers : this.columnsSubategories}
//                 rowKey={record => record.id}
//                 dataSource={(search.length > 0) || (filterStatus !== "2") ? searchData : data}
//                 // pagination={pagination}
//                 scroll={{y: window.innerHeight * 0.4}}
//                 loading={loading}
//                 onChange={this.handleTableChange}
//             />
//             {flag ? <ModalInfo save={this.saveRecords} visible={visible} record={sourceData} onCancel={this.toggleModalInfo} /> : 
//             <ModalInfoBusiness save={this.saveRecords} visible={visible} record={sourceData} onCancel={this.toggleModalInfo} />}
//             {/* {flag ? <ModalForm save={this.saveRecords} record={sourceData} visible={visible} onCancel={this.toggleModalForm} /> :  */}
//             {/* <ModalFormTwo save={this.saveRecords} record={sourceData} visible={visible} onCancel={this.toggleModalForm} /> } */}
//            </div> 
//         );
//     }
// }

// export default RequestUsers;