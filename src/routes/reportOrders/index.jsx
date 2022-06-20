import React, {Component} from 'react';
import HeaderSection from '../../components/table/headerSection';
import { Button, message, Table, Tabs, Typography } from 'antd';
import ActionTable from '../../components/actionTable';
import { get, headerBearer } from '../../tools/api';
import { DocIcon } from '../../components/customIcon';
import { deleteFromArray, updateArray } from '../../tools/arrayTool';
import ModalInfo from './modalInfo';

const { TabPane } = Tabs;

const {Text} = Typography;
const dataSwitch = [
    {path: "/categories", title: "Categoría"},
    {path: "/subcategories", title: "Subcategorías"}
]

class ReporOrder extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            view: "category",
            visible: true,
            flag: true,
            data: [],
            searchData: [],
            filterStatus: "2",
            loading: false,
            sourceData: null,
            search: "",
         };
    }

    async componentDidMount() {
        // this.getCategories();
    }

    async getCategories (flag = true) {
        // console.log(await get("/api/auth/all-repartidor?estado=4", headerBearer));

        try {
            if(flag) {
                this.setState({loading: true});
                const data = await get("/api/auth/all-repartidor?estado=2", headerBearer);
                // console.log(data);
                this.setState({flag: flag, data, loading: false});
            } else {
                this.setState({loading: true});
                const data = await get("/api/auth/negocios?estado=2", headerBearer);
                // console.log(data);
                this.setState({flag: flag, data, loading: false});
            }

        } catch (error) {
            message.error("Error interno del servidor");
            this.setState({loading: false});
        }
    }

    toggleModalInfo = (data = null) => this.setState({sourceData: data, visible: !this.state.visible});
    toggleFlag = (val) => {
        // Navigate({to: "/app/categories/1"})
        // console.log(this.props.history);
        this.getCategories(val);
    };

    columnsDelivers = [
        {
            title: 'N° pedido',
            dataIndex: 'order',
            key: 'order'
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Repartidor',
            dataIndex: 'deliver',
            key: 'deliver',
        },
        {
            title: 'Negocio',
            dataIndex: 'business',
            key: 'business',
        },
        {
            title: 'Cliente',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'D. Cliente',
            dataIndex: 'customer_d',
            key: 'customer_d',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: text => text ? <Text style={{color: "#219653"}}>Visible</Text> : <Text style={{color: "#EB5757"}}>Oculto</Text>
        },
        {
            title: 'Detalle',
            dataIndex: 'id',
            key: 'id',
            render: (text, records) => <Button onClick={() => this.toggleModalInfo(records)} type='link' icon={<DocIcon />} />
        }
    ]

    saveRecords = (record = null, opt) => {
        console.log(record);
        if (opt === 1) this.setState({data: updateArray(record, this.state.data)});
        if (opt === 2) this.setState({data: deleteFromArray(record, this.state.data)});
        this.toggleModalInfo(null);
    }

    searchDataFilter (value) {
        this.setState({search: value})
        if(value === '' || value === ' ') {
            this.setState({searchData: []});
            
        } else {
            let result;
            if(this.state.flag) {
                result = this.state.data.filter(item => item.nombre.toLowerCase().indexOf(value.toLowerCase()) !== -1)
            } else {
                result = this.state.data.filter(item => item.nombre_local.toLowerCase().indexOf(value.toLowerCase()) !== -1)
            }
            this.setState({searchData: result});
            // console.log(result)
        }
    }

    onFilterStatus (key) {
        this.setState({filterStatus: key});
        if(parseInt(key) === 2) {
            this.setState({searchData: []});
            // console.log(parseInt(key))
        } else {
            const result = this.state.data.filter(item => item.status === parseInt(key))
            this.setState({searchData: result});
            console.log(result)
        }
    }


    render() {
        const {data, loading, search, filterStatus, flag, searchData, visible, view, sourceData} = this.state;
        return (
           <div>
               <HeaderSection showSearch title="Reporte de pedidos" value={search} onChange={(value) => this.searchDataFilter(value)} />
               <ActionTable title="Generar reportes" showButton defaultActiveKey={filterStatus} onChange={(e) => this.onFilterStatus(e)} onClick={() => this.toggleModalForm(null)} />
               <Table
               style={{marginTop: 20}}
               size="small"
                columns={this.columnsDelivers}
                rowKey={record => record.id}
                dataSource={(search.length > 0) || (filterStatus !== "2") ? searchData : data}
                // pagination={pagination}
                scroll={{y: window.innerHeight * 0.4}}
                loading={loading}
                onChange={this.handleTableChange}
            />
            <ModalInfo save={this.saveRecords} visible={visible} record={sourceData} onCancel={this.toggleModalInfo} />
            {/* {flag ? <ModalInfo save={this.saveRecords} visible={visible} record={sourceData} onCancel={this.toggleModalInfo} /> : 
            <ModalInfoBusiness save={this.saveRecords} visible={visible} record={sourceData} onCancel={this.toggleModalInfo} />} */}
            
           </div> 
        );
    }
}

export default ReporOrder;