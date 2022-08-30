import { Form, message } from "antd";
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/authContext";
import { get, headerBearer} from "../../tools/api";
import { baseUri } from "../../tools/constants";

const prefix = '/claim';
const routes = [{title: "Categoría", hash: "#categories"}, {title: "Subcategorías", hash: "#subcategories"}]

export default function useClaims(flag = false) {
    const [form] = Form.useForm();
    const {token} = useAuth();

    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [hash, setHash] = useState(true);
    const [record, setRecord] = useState(null);
    const [data, setData] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [status, setStatus] = useState(2);

    useEffect(() => {
        getClaims()
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
    function getClaims() {
        toggleLoading(async () =>
        get(`${prefix}?status=0`, headerBearer(token)).then(response => setData(response))
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
    // function toggleModal (value = null) {
    //     setVisible(!visible)
    //     setRecord(value)
    //     if(value !== null) {
    //         form.setFieldsValue(value)
    //         setImage({file: null, fileUri: `${baseUri}/public/${value.image}`});
    //     } else {
    //         form.resetFields();
    //         onClearImage();
    //     }
    // }

    //* change status of data *visible*
    const onViewDataVisble = (value) => {
        setStatus(value);
        toggleLoading(async () => {
            get(`${prefix}?status=${value}`, headerBearer(token))
            .then(response => setData(response))
            .catch(() => message.error("Error al obtener datos"))
        })
    }

    const onChagePage = async (value) => {
        toggleLoading(async () => {
            get(`${prefix[hash ? 0 : 1]}?page=${value}${status !== 2 ? '&visible='+status : ''}`)
            .then(response => setData(response))
            .catch(() => message.error("Error al obtener datos"))
        })
    }

    // const onFinish = async () => {
        
    //     if(image === null) return message.info("Debes seleccionar una imagen");
    //     try {
    //         const values = await form.validateFields();
            
    //         toggleLoading(async () => {
    //             const config = {
    //                 path: record !== null ? '/'+record.id : '',
    //                 value: record !== null ? {...values, image: image.file !== null ? image.file : null} : {...values, image: image.file}
    //             }
    //             console.log({record, config})
    //             await postFormData(
    //                 `${prefix[hash ? 0 : 1] + config.path}`, 
    //                 config.value,
    //                 headerBearerFormData
    //             ).then(response => {
    //                 if (!response.success) throw response;
    //                 form.resetFields();
    //                 onClearImage();
    //                 message.success(response.message)
    //                 setData({
    //                     ...data, 
    //                     data: record !== null ?  
    //                     updateArray(response.data, data.data) :
    //                     addToArray(response.data, data.data)
    //                 })
    //                 toggleModal(null);
    //             }).catch((error) => message.error(error.message))
    //         });
    //     } catch (error) {
    //         message.error("Error");
    //     }
        
    // }
    
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
        onSearchFilter,
        onViewDataVisble,
        onChagePage,
    }
}