import { Button, Image, message, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ActionTable from '../../components/actionTable';
import { SquareEditIcon } from '../../components/customIcon';
import HeaderSection from '../../components/table/headerSection';
import Switch from '../../components/table/SwitchV2';
import useCategories from '../../hooks/useCategories';
import { get } from '../../tools/api';
import { updateArray } from '../../tools/arrayTool';
import { baseUri } from '../../tools/constants';
import ModalForm from './modalForm';
import ModalFormTwo from './modalFormTwo';

const {Text} = Typography;

// const routes = [{name: "Categoría", hash: "#categories"}, {name: "Subcategorías", hash: "#subcategories"}]
const actionData = [{name: "Todos", value: 2}, {name: "Visible", value: 1}, {name: "Oculto", value: 0}]

function Categories() {
    const {
        data,
        loading, 
        search,
        record,
        visible,
        hashPath,
        chagePage, 
        viewDataVisble,
        hash,
        onSearchFilter,
        onChangeHash,
        toggleModal} = useCategories();
    // const location = useLocation();
    // const navigate = useNavigate()
    // const [search, setSearch] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [visible, setVisible] = useState(false);
    // const [data, setData] = useState({data: null});
    // const [sourceData, setSourceData] = useState(null);

    // useEffect(() => {
    //     console.log(categories)
    //     fetchData()
    // },[location])

    // function validateHash() {
    //     // console.log("validate")
    //     if(dataView[0].hash === location.hash || location.hash === "") return true;
    //     if(dataView[1].hash === location.hash) return false;
        
    // }

    // async function fetchData () {
    //     console.log(location.hash === "")
    //     try {
    //         if(validateHash()) {
    //             const response = await get("/category");
    //             setData(response);
    //         } else {
    //             const response = await get("/subcategory");
    //             setData(response);
    //         }

    //         console.log(data)
    //     } catch (error) {
    //         message.error("No se pudo cargar los datos")
    //         setLoading(false);
    //     }
    // }

    // function toggleModal (record) {
    //     setVisible(!visible)
    //     setSourceData(record)
    // }

    // const getHash = () => (location.hash === "" || routes[0].hash === location.hash) ? location.hash : location.hash;

    // const changeHash = async (value) => {
    //     navigate(value)
    //     try {
    //         if (validateHash()) setData(await get("/category"))
    //         if (!validateHash()) setData(await get("/subcategory"))
    //     } catch (error) {
    //         message.error("No se pudo cargar los datos")
    //         setLoading(false);
    //     }
    // }

    // const onSave = (opt, record) => {
    //     if(opt === 1) {
    //         const info = data;
    //         if (opt === 1) setData({...info, data: updateArray(record, data.data)});
    //     } else {
    //         fetchData();
    //     }
        
    //     toggleModal(null);
    // }

    // const onSearchFilter = async (value) => {
    //     setSearch(value)
    //     setLoading(true)
    //     try {
    //         if(value.length > 0) {
    //             if(validateHash()) setData(await get("/category?q="+value));
    //             if(!validateHash()) setData(await get("/subcategory?q="+value));
    //         } else {
    //             if (validateHash()) setData(await get("/category"))
    //             if (!validateHash()) setData(await get("/subcategory"))
    //         }
    //         setLoading(false)
    //     } catch (error) {
    //         message.error("No se pudo cargar los datos")
    //         setLoading(false);
    //     }
    // }

    // const chagePage = async (value) => {
    //     // console.log(value)
    //     try {
    //         if (validateHash()) setData(await get("/category?page="+value))
    //         if (!validateHash()) setData(await get("/subcategory?page="+value))
    //     } catch (error) {
    //         message.error("No se pudo cargar los datos")
    //         setLoading(false);
    //     }
    // }

    // const viewDataVisble = async (value) => {
    //     console.log(value)
    //     setLoading(true)
    //     try {
    //         if (value !== 2) {
    //             if (validateHash()) setData(await get("/category?visible="+value))
    //             if (!validateHash()) setData(await get("/subcategory?visible="+value))
    //         } else {
    //             if (validateHash()) setData(await get("/category"))
    //             if (!validateHash()) setData(await get("/subcategory"))
    //         }
    //         setLoading(false)
    //     } catch (error) {
    //         message.error("No se pudo cargar los datos")
    //         setLoading(false);
    //     }


    // }

    const columnsCategories = [
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
            dataIndex: 'visible',
            key: 'visible',
            render: text => text ? <Text style={{color: "#219653"}}>Visible</Text> : <Text style={{color: "#EB5757"}}>Oculto</Text>
        },
        {
            title: 'Editar',
            dataIndex: 'id',
            key: 'id',
            render: (text, records) => <Button onClick={() => toggleModal(records)} type='link' icon={<SquareEditIcon />} />
        }
    ]

    const columnsSubategories = [
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
            dataIndex: 'imagen',
            key: 'imagen',
            render: text => <Image width={50} src={`${baseUri}/public/${text}`} />
        },
        {
            title: 'Estado',
            dataIndex: 'visible',
            key: 'visible',
            render: text => text ? <Text style={{color: "#219653"}}>Visible</Text> : <Text style={{color: "#EB5757"}}>Oculto</Text>
        },
        {
            title: 'Editar',
            dataIndex: 'id',
            key: 'id',
            render: (text, records) => <Button onClick={() => toggleModal(records)} type='link' icon={<SquareEditIcon />} />
        }
    ]

    return (
        <div>
            <HeaderSection showSearch title="Categorías y subcategorías" onChange={(e) => onSearchFilter(e)} value={search} />
            <Switch onClick={onChangeHash} data={hashPath} />
            <ActionTable onChange={viewDataVisble} onClick={() => toggleModal(null)} defaultActiveKey={2} data={actionData} title={hash ? "Agregar categorías" : "Agregar Sub categorías"} showButton />
            <Table
               style={{marginTop: 20}}
               size="small"
                columns={hash ? columnsCategories : columnsSubategories}
                rowKey={(row) => row.id}
                dataSource={data.data}
                pagination={{showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`, total: data.total, current: data.page, pageSize: 10, onChange: chagePage}}
                scroll={{y: window.innerHeight * 0.4}}
                loading={loading}
                // onChange={this.handleTableChange}
            />
            {hash ? <ModalForm save={() => {}} 
            record={record} 
            visible={visible} 
            onCancel={() => toggleModal(null)} /> : 
            <ModalFormTwo save={() => {}} 
            record={record} 
            visible={visible} 
            onCancel={() => toggleModal(null)} />}
        </div>
    );
}

export default Categories;