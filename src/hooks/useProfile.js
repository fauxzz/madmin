import { Form, message } from "antd";
import { useEffect, useState } from "react";
import { get, headerBearer, post } from "../tools/api";
import { USER_DATA } from "../tools/constants";
import { getStorage } from "../tools/storage";

// function updateArray(array, data) {
//   return array.map(item => item.id === data.id ? data : item);
// }

// Array.update(updateArray);

export default function useProfile({view = ''}) {
    const [form] = Form.useForm(); // form
    const [user, setUser] = useState(getStorage(USER_DATA)); // data user
    const [visible, setVisible] = useState(false); // modal
    const [record, setrecord] = useState(null); // edit data
    const [banks, setBanks] = useState([]); // banks
    const [loading, setLoading] = useState(false); // loader

    useEffect(() => {
        switch(view) {
            case 'data':
                form.setFieldsValue(getStorage(USER_DATA))
            break;
            case 'banks':
                getBanks();
            break;
            default:
                break;
        }

    },[]);

    function getBanks() {
        setLoading(true);
        get(`/bank?id=${user.ID}&user=1`, headerBearer)
        .then(response => {setBanks(response.data); setLoading(false);})
        .catch(err => {message.error("Error al obtener bancos"); setLoading(false);})
    }

    const onFinish = async () => {
    
        // try {
        //   setLoading(true)
        //   const values = await form.validateFields();
        //   console.log(values)
        //   const response = await post(`/user/update/${user._id}`, {...values, visible: true}, headerBearer);
        //   if(response.success) {
        //     setLoading(false);
        //     setStorage(USER_DATA, response.data);
        //     setUser(response.data);
        //     message.success(response.message);
        //     return;
        //   }
        //   throw response;
        // } catch (error) {
        //   console.log(error)
        //   message.error(error.message)
        //   setLoading(false);
        // }
      }


      // open modal add/update bank
     function toggleModal(rec = null) {
        setVisible(!visible)
        setrecord(rec)
        if (rec !== null) return form.setFieldsValue(rec);
        form.resetFields();
     }


     // add/update funtion
    async function saveBank() {
    try {
      setLoading(true)
      const values = await form.validateFields();
      if(record === null) {
        const response = await post("/bank", {iduser: user.ID, type_user: 1,...values}, headerBearer)
        if(response.success) {
          message.success(response.message);
          setBanks([response.data].concat(banks));
          setLoading(false)
          toggleModal(null);
          return;
        }
        throw response;
      } else {
        const response = await post("/bank/"+record.id, {...record, ...values}, headerBearer);
        if(response.success) {
          message.success(response.message);
          // setBanks(banks.update())
          setBanks(banks.map(item => item.id === response.data.id ? response.data : item))
          setLoading(false)
          toggleModal(null);
          return;
        }
        throw response;
      }
    } catch (error) {
      console.log(error)
      message.error(error.message);
      setLoading(false);
    }
  }

     function toggleModalDelete() {

     }

     function onDeleteBank() {

     }

    return {
        user,
        banks,
        form,
        loading,
        visible,
        record,
        onFinish,
        saveBank,
        toggleModal,
        toggleModalDelete,
        onDeleteBank
    }
}