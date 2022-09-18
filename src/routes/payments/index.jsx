import { Button, Table, Tabs, Typography } from 'antd';
import moment from 'moment';
import React, { createContext } from 'react';
import ActionTable from '../../components/actionTable';
import { DocIcon, SquareEditIcon } from '../../components/customIcon';
import HeaderSection from '../../components/table/headerSection';
import Switch from '../../components/table/SwitchV2';
import ModalForm from './modalForm';
import { paymentStatusRender } from './status_render';
// import ModalForm from './modalForm';
import usePayments from './usePayments';

const {Text} = Typography;
const actionData = [{name: "Pagado", value: 1}, {name: "No Pagado", value: 0}]
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
        title: "Fecha",
        dataIndex: "CreatedAt",
        key: "CreatedAt",
        render: (text) => moment(text).format("DD/MM/YYYY"),
      },
      {
        title: "N° pedido",
        dataIndex: "id",
        key: "id",
        render: (text, record) => record.idorder,
      },
      {
        title: "Nombre repartidor",
        dataIndex: "nameDeliver",
        key: "nameDeliver",
        render: (text, record) => record.nameDeliver,
      },
      {
        title: "Ctvo",
        dataIndex: "proof",
        key: "proof",
      },
      {
        title: "Costo pedido",
        dataIndex: "total",
        key: "total",
        render: (text, records) => (records.total + records.deliverCost).toFixed(2)
      },
      {
        title: "Comisión",
        dataIndex: "feeDelivery",
        key: "feeDelivery",
        render: (text, records) => (records.deliverCost).toFixed(2)
      },
      {
        title: "Estado",
        dataIndex: "paidDa",
        key: "paidDa",
        render: (text) => paymentStatusRender(text)
      },
      {
        title: "Detalle",
        dataIndex: "id",
        key: "id",
        render: (text, records) => (
          <Button
            style={{ color: "#4F4F4F" }}
            onClick={() => toggleModal(records)}
            type="link"
            icon={<DocIcon />}
          />
        ),
      },
    ];

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
          {!hash && <Tabs>
            <Tabs.TabPane tab="Pagar a negocios" key={0} />
            <Tabs.TabPane tab="Pagar a repartidores" key={1} />
          </Tabs>}
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
            dataSource={data.rows}
            pagination={{
              showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
              total: data.total_rows,
              current: data.page,
              pageSize: data.limit,
              onChange: onChagePage,
            }}
            scroll={{ y: window.innerHeight * 0.4 }}
            loading={loading}
            // onChange={this.handleTableChange}
          />
          <ModalForm />
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