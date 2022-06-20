import React, {Component} from 'react';
import HeaderSection from '../../components/headerSection';
import { Button, Image, message, Table, Tabs, Typography } from 'antd';
import SwitchPath, { SwitchItem } from '../../components/switch';
import ActionTable from '../../components/actionTable';
import ModalForm from './modalForm';
import { get, headerBearer, post } from '../../tools/api';
// import { EditOutlined } from '@ant-design/icons';
import { baseUri } from '../../tools/constants';
import { SquareEditIcon } from '../../components/customIcon';
import { addToArray, deleteFromArray, updateArray } from '../../tools/arrayTool';
import ModalFormTwo from './modalFormTwo';
// import { Navigate, useLocation } from 'react-router-dom';
const { TabPane } = Tabs;

const {Text} = Typography;
const dataSwitch = [
    {path: "/categories", title: "Categoría"},
    {path: "/subcategories", title: "Subcategorías"}
]

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            view: "category",
            visible: false,
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
        this.getCategories();
    }

    async getCategories (flag = true) {
        try {
            if(flag) {
                this.setState({loading: true});
                const data = await get("/category");
                // console.log(data);
                this.setState({flag: flag, data, loading: false});
            } else {
                this.setState({loading: true});
                const data = await get("/api/auth/subcategories", headerBearer);
                // console.log(data);
                this.setState({flag: flag, data, loading: false});
            }

        } catch (error) {
            message.error("Error interno del servidor");
            this.setState({loading: false});
        }
    }

    toggleModalForm = (data = null) => this.setState({sourceData: data, visible: !this.state.visible});
    toggleFlag = (val) => {
        // Navigate({to: "/app/categories/1"})
        // console.log(this.props.history);
        this.getCategories(val);
    };

    columnsCategories = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Imagen',
            dataIndex: 'image',
            key: 'image',
            render: text => <Image width={50} src={`${baseUri}/public/${text}`} />
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: text => text ? <Text style={{color: "#219653"}}>Visible</Text> : <Text style={{color: "#EB5757"}}>Oculto</Text>
        },
        {
            title: 'Editar',
            dataIndex: 'id',
            key: 'id',
            render: (text, records) => <Button onClick={() => this.toggleModalForm(records)} type='link' icon={<SquareEditIcon />} />
        }
    ]

    columnsSubategories = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Imagen',
            dataIndex: 'image',
            key: 'image',
            render: text => <Image width={50} src={`${baseUri}/images/subcategorias/${text}`} />
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: text => text ? <Text style={{color: "#219653"}}>Visible</Text> : <Text style={{color: "#EB5757"}}>Oculto</Text>
        },
        {
            title: 'Editar',
            dataIndex: 'id',
            key: 'id',
            render: (text, records) => <Button onClick={() => this.toggleModalForm(records)} type='link' icon={<SquareEditIcon />} />
        }
    ]

    saveRecords = (record = null, opt) => {
        console.log(record);
        if(opt === 0) this.setState({data: addToArray(record, this.state.data)});
        if (opt === 1) this.setState({data: updateArray(record, this.state.data)});
        if (opt === 2) this.setState({data: deleteFromArray(record, this.state.data)});
        this.toggleModalForm(null);
    }

    searchDataFilter (value) {
        this.setState({search: value})
        if(value === '' || value === ' ') {
            this.setState({searchData: []});
            
        } else {
            const result = this.state.data.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
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
               <HeaderSection showSearch title="Categorías y subcategorías" value={search} onChange={(value) => this.searchDataFilter(value)} />
               <SwitchPath flag={flag}>
                   <SwitchItem value={true} title="Categoría" onClick={(e) => this.toggleFlag(e)} />
                   <SwitchItem value={false} title="Subcategorías" onClick={(e) => this.toggleFlag(e)} />
               </SwitchPath>
               <ActionTable title={flag ? "Agregar categorías": "Agregar Sub categorías"} defaultActiveKey={filterStatus} onChange={(e) => this.onFilterStatus(e)} showButton onClick={() => this.toggleModalForm(null)} />
               <Table
               style={{marginTop: 20}}
               size="small"
                columns={flag ? this.columnsCategories : this.columnsSubategories}
                rowKey={record => record.id}
                dataSource={(search.length > 0) || (filterStatus !== "2") ? searchData : data.data}
                // pagination={pagination}
                scroll={{y: window.innerHeight * 0.4}}
                loading={loading}
                onChange={this.handleTableChange}
            />
            {flag ? <ModalForm save={this.saveRecords} record={sourceData} visible={visible} onCancel={this.toggleModalForm} /> : 
            <ModalFormTwo save={this.saveRecords} record={sourceData} visible={visible} onCancel={this.toggleModalForm} /> }
           </div> 
        );
    }
}

export default Categories;