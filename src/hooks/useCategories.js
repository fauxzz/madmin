import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCategories, fetchCategoriesPerPage, fetchCategoriesSearch, fetchCategoriesVisible } from "../app/actions/categoriesAction";
import { fetchSubcategories } from "../app/actions/subcategoriasAction";

const hashPath = [
    {title: "Categoría", hash: "#category"},
    {title: "Subcategorías", hash: "#subcategory"}
]
let initDispath = false;
export default function useCategories() {
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate()

    const data = useSelector(state => state.categories.data); //? categories
    const msg = useSelector(state => state.categories.message);
    const loading = useSelector(state => state.categories.loading);
    const success = useSelector(state => state.categories.success);

    const [hash, setHash] = useState(hashPath[0].hash === location.hash || location.hash === "" ? true : false);
    const [search, setSearch] = useState("");
    const [visible, setVisible] = useState(false);
    const [record, setRecord] = useState(null);

    useEffect(() => {
        
        // console.log(subcategories);
        // let flag = true;
        
        if(!initDispath) {
            dispatch(fetchCategories(getPath()))
            initDispath = true;
        }
        console.log(hashPath[0].hash === location.hash || location.hash === "")
        

        // if(data.data.length === 0) {
        //     dispatch(fetchCategories())
        //     dispatch(fetchSubcategories())
        //     // dispatch(fetchSubcategories())
        //     // console.log({categories, success})
        // }
        // if(msg.length > 1 && typeof msg !== 'undefined') {
        //     message.error(msg)
        // }

        // if(hashPath[0].hash === location.hash || location.hash === "")  {
        //     setHash(true);
        //     setData(value => categories === value ?? categories);
        // }
        // if(hashPath[1].hash === location.hash) setHash(false);

        // hash ? setData(categories) : setData(subcategories);
        // console.log(location.hash)
        // return () => {
        //     initDispath = false;
        // }

    }, [dispatch, location]);

    const getPath = () => 
        hash ? '/category' : '/subcategory';

    function toggleModal (values) {
        setVisible(!visible)
        setRecord(values)
    }

        function chagePage (value) {
        console.log(value)
        dispatch(fetchCategoriesPerPage(value))
        // setLoading(true)
        // try {
        //     // if (validateHash()) setData(await get("/category?page="+value))
        //     // if (!validateHash()) setData(await get("/subcategory?page="+value))
        // } catch (error) {
        //     message.error("No se pudo cargar los datos")
        //     setLoading(false);
        // }
    }

    function onSearchFilter(value) {
        console.log(value)
        setSearch(value)
        if(value.length > 0) {
            dispatch(fetchCategoriesSearch({value, path: getPath()}))
        } else {
            dispatch(fetchCategories(getPath()))
        }
    }

    function viewDataVisble(value) {
        console.log(value)
        dispatch(fetchCategoriesVisible({value, path: getPath()}))
    }

    // function validateHash() {
    //     if(hashPath[0].hash === location.hash || location.hash === "") return true;
    //     if(hashPath[1].hash === location.hash) return false;
        
    // }

    function onChangeHash(value) {
        try {
            if ((hashPath[0].hash === value && 
                hash === true) || (hashPath[1].hash === value && 
                    hash === false)) return;
            navigate(value);
            // console.log(await location.hash)
            if(hashPath[0].hash === value) {
                setHash(true)
                dispatch(fetchCategories())
            } else {
                setHash(false)
                dispatch(fetchCategories('/subcategory'))
            }
        } catch (error) {
            message.error("No se pudo cargar los datos")
        }
    }
 


    return {
        data,
        loading,
        record,
        search,
        visible,
        hashPath,
        chagePage,
        hash,
        onSearchFilter,
        viewDataVisble,
        toggleModal,
        onChangeHash,
    }
}