import React, {Component} from 'react';
import HeaderSection from '../../components/table/headerSection';
import { Typography } from 'antd';
import useUser from '../../hooks/useUsers';
import Switch from '../../components/table/SwitchV2';
import ActionTable from '../../components/actionTable';

const {Text} = Typography;
const dataView = [
    {title: "Repartidores", hash: "#delivers"},
    {title: "Negocios", hash: "#business"}
];
const actionData = [{name: "Todos", value: 2}, {name: "Visible", value: 1}, {name: "Oculto", value: 0}]

export default function Users() {
    const {search, changeHash, viewDataVisble} = useUser();
    return(
        <div>
            <HeaderSection showSearch title="Usuarios" value={search} />
            <Switch onClick={changeHash} data={dataView} />
            <ActionTable onChange={viewDataVisble} onClick={() => {}} defaultActiveKey={2} data={actionData} />
        </div>
    );
}

// class Users extends Component {
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
//         try {
//             if(flag) {
//                 this.setState({loading: true});
//                 const data = await get("/api/auth/all-repartidor", headerBearer);
//                 // console.log(data);
//                 this.setState({flag: flag, data, loading: false});
//             } else {
//                 this.setState({loading: true});
//                 const data = await get("/api/auth/negocios", headerBearer);
//                 // console.log(data);
//                 this.setState({flag: flag, data, loading: false});
//             }

//         } catch (error) {
//             message.error("Error interno del servidor");
//             this.setState({loading: false});
//         }
//     }

//     toggleModalForm = (data = null) => this.setState({sourceData: data, visible: !this.state.visible});
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
//             title: 'Editar',
//             dataIndex: 'id',
//             key: 'id',
//             render: (text, records) => <Link to={`/app/user/${text}`}><Button type='link' icon={<SquareEditIcon />} /></Link>
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
//             title: 'Editar',
//             dataIndex: 'id',
//             key: 'id',
//             render: (text, records) => <Link to={`/app/business/${text}`}><Button type='link' icon={<SquareEditIcon />} /></Link>
//         }
//     ]

//     saveRecords = (record = null, opt) => {
//         console.log(record);
//         if(opt === 0) this.setState({data: addToArray(record, this.state.data)});
//         if (opt === 1) this.setState({data: updateArray(record, this.state.data)});
//         if (opt === 2) this.setState({data: deleteFromArray(record, this.state.data)});
//         this.toggleModalForm(null);
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
//                <HeaderSection showSearch title="Usuarios" value={search} onChange={(value) => this.searchDataFilter(value)} />
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
//             {/* {flag ? <ModalForm save={this.saveRecords} record={sourceData} visible={visible} onCancel={this.toggleModalForm} /> :  */}
//             {/* <ModalFormTwo save={this.saveRecords} record={sourceData} visible={visible} onCancel={this.toggleModalForm} /> } */}
//            </div> 
//         );
//     }
// }

// export default Users;