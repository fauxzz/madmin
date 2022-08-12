import { Button, Image, Table, Typography } from 'antd';
import moment from 'moment';
import React, { createContext } from 'react';
import ActionTable from '../../components/actionTable';
import { SquareEditIcon } from '../../components/customIcon';
import HeaderSection from '../../components/table/headerSection';
import Switch from '../../components/table/SwitchV2';
import { baseUri } from '../../tools/constants';
// import ModalForm from './modalForm';
import usePayments from './usePayments';

const {Text} = Typography;
const actionData = [{name: "Todos", value: 2}, {name: "Pagado", value: 1}, {name: "No Pagado", value: 0}]
const PaymentsContext = createContext()

function Payments() {
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
    } = usePayments(true);

    // const onSave = (opt, record) => {
    //     if(opt === 1) {
    //         const info = data;
    //         if (opt === 1) setData({...info, data: updateArray(record, data.data)});
    //     } else {
    //         fetchData();
    //     }
        
    //     toggleModal(null);
    // }

    const columnsPayments = [
        {
            title: 'Fecha',
            dataIndex: 'CreatedAt',
            key: 'CreatedAt',
            render: text => moment(text).format("DD/MM/YYYY")
        },
        {
          title: 'N° pedido',
          dataIndex: 'id',
          key: 'id',
          render: (text, record) => record.order.id
      },
      {
        title: 'Nombre repartidor',
        dataIndex: 'deliver',
        key: 'deliver',
        render: (text, record) => record.order.id
    },
    {
      title: 'Ctvo',
      dataIndex: 'proof',
      key: 'proof'
  },
  {
    title: 'Costo pedido',
    dataIndex: 'total',
    key: 'total'
},
{
  title: 'Comisión',
  dataIndex: 'Comisión repartidor',
  key: 'Comisión repartidor'
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

    const columnsSubategories = [
        {
            title: 'Fecha',
            dataIndex: 'CreatedAt',
            key: 'CreatedAt'
        },
        {
            title: 'Negocio',
            dataIndex: 'business',
            key: 'business'
        },
        {
            title: 'Ctvo.',
            dataIndex: 'proof',
            key: 'proof',
        },
        {
          title: 'Costo total',
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
      <PaymentsContext.Provider value={{
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
          <HeaderSection showSearch title="Pagos" onChange={(e) => onSearchFilter(e)} value={search} />
          <Switch onClick={onChangeHash} data={routes} />
          <ActionTable
            onChange={onViewDataVisble}
            onClick={() => toggleModal(null)}
            defaultActiveKey={status}
            data={actionData}
          />
          <Table
            style={{ marginTop: 20 }}
            size="small"
            columns={hash ? columnsPayments : columnsSubategories}
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
      </PaymentsContext.Provider>
    );
}

export default Payments;
export {PaymentsContext}