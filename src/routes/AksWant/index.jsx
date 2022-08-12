import { Button, Image, Table, Typography } from 'antd';
import React, { createContext } from 'react';
import ActionTable from '../../components/actionTable';
import { SquareEditIcon } from '../../components/customIcon';
import HeaderSection from '../../components/table/headerSection';
import Switch from '../../components/table/SwitchV2';
import { baseUri } from '../../tools/constants';
// import ModalForm from './modalForm';
// import ModalFormTwo from './modalFormTwo';
import useAksWant from './useAksWants';

const {Text} = Typography;
const actionData = [{name: "Todos", value: 2}, {name: "Entregados", value: 1}, {name: "Pendientes", value: 0}]
const AksWantContext = createContext()

function AksWant() {
    const {
        search,
        hash,
        loading,
        data,
        routes,
        visible,
        record,
        visibleModal,
        image,
        form,
        status,
        onDeleteItem,
        onSearchFilter,
        toggleModal,
        onChangeHash,
        onViewDataVisble,
        onChagePage,
        onFinish,
        onSelectedImage,
        onToggleModalDelete,
        onClearImage
    } = useAksWant(true);

    // const onSave = (opt, record) => {
    //     if(opt === 1) {
    //         const info = data;
    //         if (opt === 1) setData({...info, data: updateArray(record, data.data)});
    //     } else {
    //         fetchData();
    //     }
        
    //     toggleModal(null);
    // }

    const columnsAksWant = [
        {
            title: 'N° pedido',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Fecha',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
          title: 'Repartidor',
          dataIndex: 'deliver',
          key: 'deliver',
      },
      {
        title: 'Cliente',
        dataIndex: 'customer',
        key: 'customer',
    },
    {
      title: 'D.cliente',
      dataIndex: 'address',
      key: 'address',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
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
            render: (text, records) => <Button style={{color: '#4F4F4F'}} onClick={() => toggleModal(records)} type='link' icon={<SquareEditIcon />} />
        }
    ]

    return (
      <AksWantContext.Provider value={{
        visibleModal,
        image,
        visible,
        loading,
        form,
        record,
        onDeleteItem,
        onFinish,
        onSelectedImage,
        onToggleModalDelete,
        onClearImage,
        toggleModal
      }}>
        <div>
          <HeaderSection showSearch title="Pide lo que quieras" onChange={(e) => onSearchFilter(e)} value={search} />
          <ActionTable
            onChange={onViewDataVisble}
            onClick={() => toggleModal(null)}
            defaultActiveKey={status}
            data={actionData}
            title="Generar reportes"
            showButton
          />
          <Table
            style={{ marginTop: 20 }}
            size="small"
            columns={columnsAksWant}
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
          {/* {hash ? (
            <ModalForm 
            save={() => {}} 
            record={record} 
            image={image}
            onCancel={() => toggleModal(null)} />
          ) : (
            <ModalFormTwo save={() => {}} record={record} visible={visible} onCancel={() => toggleModal(null)} />
          )} */}
        </div>
      </AksWantContext.Provider>
    );
}

export default AksWant;
export {AksWantContext}