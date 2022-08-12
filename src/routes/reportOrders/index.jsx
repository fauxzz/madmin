import { Button, Image, Table, Typography } from 'antd';
import moment from 'moment';
import React, { createContext } from 'react';
import ActionTable from '../../components/actionTable';
import { DocIcon, SquareEditIcon } from '../../components/customIcon';
import HeaderSection from '../../components/table/headerSection';
import Switch from '../../components/table/SwitchV2';
import { baseUri } from '../../tools/constants';
import { getStatusOrder } from './statusOrder';
// import ModalForm from './modalForm';
// import ModalFormTwo from './modalFormTwo';
import useReporOrder from './useOrderReport';

const {Text} = Typography;
const actionData = [{name: "Todos", value: 2}, {name: "Entregado", value: 1}, {name: "Pendiente", value: 0}]
const ReporOrderContext = createContext()

function ReporOrder() {
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
    } = useReporOrder(true);

    // const onSave = (opt, record) => {
    //     if(opt === 1) {
    //         const info = data;
    //         if (opt === 1) setData({...info, data: updateArray(record, data.data)});
    //     } else {
    //         fetchData();
    //     }
        
    //     toggleModal(null);
    // }

    const columnsReporOrder = [
        {
            title: 'N° pedido',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Fecha',
            dataIndex: 'CreatedAt',
            key: 'CreatedAt',
            render: text => moment(text).format("DD/MM/YYYY hh:mm:ss a")
        },
        {
          title: 'Repartidor',
          dataIndex: 'deliver',
          key: 'deliver',
          render: (text, record) => record.deliver.name
      },
      {
        title: 'Negocio',
        dataIndex: 'business',
        key: 'business',
        render: (text, record) => record.busines.name_business
    },
    {
      title: 'Cliente',
      dataIndex: 'customer',
      key: 'customer',
      render: (text, record) => record.customer.name
  },
  {
    title: 'D. cliente',
    dataIndex: 'address',
    key: 'address',
    render: text => text.substring(0, 20)+"..."
},
{
  title: 'Total',
  dataIndex: 'total',
  key: 'total',
  render: (text, record) => ((record.total+record.deliver_cost)+record.tip).toFixed(2)
},
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: text => getStatusOrder(text)
        },
        {
            title: 'Editar',
            dataIndex: 'id',
            key: 'id',
            render: (text, records) => <Button style={{color: '#4F4F4F'}} onClick={() => toggleModal(records)} type='link' icon={<DocIcon />} />
        }
    ]
    return (
      <ReporOrderContext.Provider value={{
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
          <HeaderSection showSearch title="Reporte de pedidos" onChange={(e) => onSearchFilter(e)} value={search} />
          <ActionTable
            onChange={onViewDataVisble}
            onClick={() => toggleModal(null)}
            defaultActiveKey={status}
            data={actionData}
            title={"Generar reportes"}
            showButton
          />
          <Table
            style={{ marginTop: 20 }}
            size="small"
            columns={columnsReporOrder}
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
      </ReporOrderContext.Provider>
    );
}

export default ReporOrder;
export {ReporOrderContext}