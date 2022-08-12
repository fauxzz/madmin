import { Form, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { get, headerBearer, headerBearerFormData, postFormData } from "../../tools/api";
import { updateArray } from "../../tools/arrayTool";

const prefix = ['/deliver', '/business'];
const routes = [
    {title: "Repartidores", hash: "#delivers"},
    {title: "Negocios", hash: "#business"}
];

export default function useRequestUsers(flag = false) {
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [hash, setHash] = useState(true);
    const [status, setStatus] = useState(0);
    const [visible, setVisible] = useState(false);
    const [record, setRecord] = useState(null);

    useEffect(() => {
        if (flag) onChangeHash(location.hash === '' ? routes[0].hash : location.hash)
    },[]);

    //* ############################################
    //?* on and off loading callback ###############
    //* ############################################
    const toggleLoading = async (callback) => {
        setLoading(true);
        await callback()
        setLoading(false);
    };

    //* get paginate delivers
    function getDelivers() {
        toggleLoading(async () =>
        get(`${prefix[0]}?visible=${status}`, headerBearer).then(response => setData(response))
        .catch(() => message.error("Error al obtener datos")));
    }

    //* get paginate business
    function getBusiness() {
        toggleLoading(async () =>
        get(`${prefix[1]}?visible=${status}`, headerBearer).then(response => setData(response))
        .catch(() => message.error("Error al obtener datos")));
    }

    //* open/close modal
    function toggleModal (value = null) {
        setVisible(!visible)
        setRecord(value)
        if(value !== null) {
            form.setFieldsValue(value)
            // setImage({file: null, fileUri: `${baseUri}/public/${value.image}`});
        } else {
            form.resetFields();
            // onClearImage();
        }
    }

    //* search
    function onSearchFilter(value) {
        setSearch(value);
        toggleLoading(async () => {
            get(`${prefix[hash ? 0 : 1]}?q=${value}`, headerBearer)
            .then(response => setData(response))
            .catch(() => message.error("Error al obtener datos"))
        })
    }

    //* change section data
    const onChangeHash = (value) => {
        navigate(value)
        if(routes[0].hash === value) {
            setHash(true);
            getDelivers()
        } else {
            setHash(false);
            getBusiness();
        }
    }

    //* change status of data *visible*
    const onViewDataVisble = (value) => {
        setStatus(value);
        toggleLoading(async () => {
            get(`${prefix[hash ? 0 : 1]}?visible=${value}`, headerBearer)
            .then(response => setData(response))
            .catch(() => message.error("Error al obtener datos"))
        })
    }

    //* update data
    const onFinish = async () => {
        console.log(await form.validateFields())
        
        if(record === null) return message.info("No hay datos seleccionados")
        try {
            const values = await form.validateFields();
            toggleLoading(async () => {
                await postFormData(
                    `${prefix[hash ? 0 : 1]}/${record.id}`, values,
                    headerBearerFormData
                ).then(response => {
                    if(!response.success) throw response
                    message.success(response.message);
                    setData({...data, data: updateArray(response.data, data.data)})
                    toggleModal(null)
                }).catch((error) => message.error(error.message))
            })
        } catch (error) {
            message.error("Error");
        }
        
    }

    const onChagePage = async (value) => {
        toggleLoading(async () => {
            get(`${prefix[hash ? 0 : 1]}?page=${value}${status !== 2 ? '&visible='+status : ''}`)
            .then(response => setData(response))
            .catch(() => message.error("Error al obtener datos"))
        })
    }
    
    return {
        form,
        search,
        data,
        hash,
        loading,
        routes,
        status,
        visible,
        record,
        onSearchFilter,
        onChangeHash,
        onChagePage,
        onViewDataVisble,
        toggleModal,
        onFinish
    }
}