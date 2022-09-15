import { Form, message } from "antd";
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authContext";
import { get, headerBearer, headerBearerFormData, postFormData, remove } from "../../tools/api";
import { addToArray, deleteFromArray, updateArray } from "../../tools/arrayTool";
import { baseUri } from "../../tools/constants";
import { checkImage } from "../../tools/imageTool";

const prefix = ['/payment', '/payment'];
const routes = [{title: "Pagos por recibir", hash: "#recived"}, {title: "Cuentas por pagar", hash: "#payment"}]

export default function usePayments(flag = false) {
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const {token} = useAuth();

    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [hash, setHash] = useState(true);
    const [record, setRecord] = useState(null);
    const [data, setData] = useState({rows: []});
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [status, setStatus] = useState(2);
    const [payTo, setPayTo] = useState(0);

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

    //* get paginate categories
    function getPaymentCash() {
        toggleLoading(async () =>
        get(`${prefix[0]}?mode=0&status=1`, headerBearer(token)).then(response => {
            console.log(response)
            setData(response)
        })
        .catch(() => message.error("Error al obtener datos")));
    }

    //* get paginate categories
    function getPaymentOnline() {
        toggleLoading(async () =>
        get(`${prefix[1]}?mode=1&status=0`, headerBearer(token)).then(response => setData(response))
        .catch(() => message.error("Error al obtener datos")));
    }

    //* search
    function onSearchFilter(value) {
        setSearch(value);
        toggleLoading(async () => {
            get(`${prefix[hash ? 0 : 1]}?q=${value}`)
            .then(response => setData(response))
            .catch(() => message.error("Error al obtener datos"))
        })
    }

    //* open/close modal
    function toggleModal (value = null) {
        setVisible(!visible)
        setRecord(value)
        if(value !== null) {
            form.setFieldsValue(value)
            setImage({file: null, fileUri: `${baseUri}/public/${value.image}`});
        } else {
            form.resetFields();
            onClearImage();
        }
    }

    //* change section data
    const onChangeHash = (value) => {
        navigate(value)
        if(routes[0].hash === value) {
            setHash(true);
            getPaymentCash()
        } else {
            setHash(false);
            getPaymentOnline();
        }
    }

    //* change status of data *visible*
    const onViewDataVisble = (value) => {
        setStatus(value);
        toggleLoading(async () => {
            get(`${prefix[hash ? 0 : 1]}?mode=0&status=${value}`, headerBearer(token))
            .then(response => setData(response))
            .catch(() => message.error("Error al obtener datos"))
        })
    }

    const onChagePage = async (value) => {
        toggleLoading(async () => {
            get(`${prefix[hash ? 0 : 1]}?page=${value}&mode=0&status=${status}`)
            .then(response => setData(response))
            .catch(() => message.error("Error al obtener datos"))
        })
    }

    const onFinish = async () => {
        
        if(image === null) return message.info("Debes seleccionar una imagen");
        try {
            const values = await form.validateFields();
            
            toggleLoading(async () => {
                const config = {
                    path: record !== null ? '/'+record.id : '',
                    value: record !== null ? {...values, image: image.file !== null ? image.file : null} : {...values, image: image.file}
                }
                console.log({record, config})
                await postFormData(
                    `${prefix[hash ? 0 : 1] + config.path}`, 
                    config.value,
                    headerBearerFormData
                ).then(response => {
                    if (!response.success) throw response;
                    form.resetFields();
                    onClearImage();
                    message.success(response.message)
                    setData({
                        ...data, 
                        data: record !== null ?  
                        updateArray(response.data, data.data) :
                        addToArray(response.data, data.data)
                    })
                    toggleModal(null);
                }).catch((error) => message.error(error.message))
            });
        } catch (error) {
            message.error("Error");
        }
        
    }

    //* selected/preview image
    const onSelectedImage = (values) => {
        console.log(values)
        const file = values.target.files[0] // file
        const checki = checkImage(file);
        // check image
        if(!checki.success) return message.info(checki.error);

        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = function () {
            setImage({file, fileUri: reader.result});
        }
    }

    //* open/close modal delete
    const onToggleModalDelete = () => setVisibleModal(!visibleModal);
    const onClearImage = () => setImage(null);
    
    //* delete Item
    const onDeleteItem = () => {
        toggleLoading(async () => {
            await remove(`${prefix[hash ? 0 : 1]}/${record.id}`, headerBearer)
            .then(response => {
                console.log(response)
                if (!response.success) throw response;
                form.resetFields();
                onClearImage();
                message.success(response.message)
                setData({
                    ...data,
                    data: deleteFromArray(record, data.data)
                })
                onToggleModalDelete();
                toggleModal(null);
            }).catch(error => message.error(error.message))
        })
        // try {
        //     setLoading(true)
        //     const result = await remove("/category/"+record.ID, headerBearer);
        //     if(result.success) {
        //         message.success(result.message);
        //         setLoading(false)
        //         setVisiblem(false);
        //         save()
        //         return
        //     } 
        //     throw result;
        // } catch (error) {
        //     message.error(error.message)
        //     setLoading(false)
        // }
    }

    return {
        search,
        visible,
        record,
        hash,
        loading,
        data,
        routes,
        image,
        visibleModal,
        form,
        status,
        getPaymentCash,
        onSearchFilter,
        toggleModal,
        onChangeHash,
        onViewDataVisble,
        onChagePage,
        onFinish,
        onSelectedImage,
        onToggleModalDelete,
        onDeleteItem,
        onClearImage
    }
}