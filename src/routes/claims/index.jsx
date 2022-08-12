import { Button, Image, Table, Typography } from 'antd';
import moment from 'moment';
import React, { createContext } from 'react';
import ActionTable from '../../components/actionTable';
import { SquareEditIcon } from '../../components/customIcon';
import HeaderSection from '../../components/table/headerSection';
import Switch from '../../components/table/SwitchV2';
import { baseUri } from '../../tools/constants';
import { claimsMap } from './claimsMap';
// import ModalForm from './modalForm';
// import ModalFormTwo from './modalFormTwo';
import useClaims from './useClaims';

const {Text} = Typography;
const actionData = [{name: "Pendiente", value: 0}, {name: "Atendido", value: 1}]
const ClaimsContext = createContext()

function Claims() {
    const {
        search,
        loading,
        data,
        visible,
        record,
        visibleModal,
        image,
        form,
        status,
        onDeleteItem,
        onSearchFilter,
        toggleModal,
        onViewDataVisble,
        onChagePage,
        onFinish,
        onSelectedImage,
        onToggleModalDelete,
        onClearImage
    } = useClaims(true);

    const columnsClaims = [
        {
            title: 'Fecha',
            dataIndex: 'CreatedAt',
            key: 'CreatedAt',
            render: text => moment(text * 1000).format("DD/MM/YYYY hh:mm:ss a")
        },
        {
            title: 'Consumidor',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
          title: 'D Consumidor',
          dataIndex: 'deliver',
          key: 'deliver',
      },
      {
        title: 'Tipo de reclamo',
        dataIndex: 'typeClaim',
        key: 'typeClaim',
        render: text => claimsMap[text]
    },
    {
      title: 'Ctvo.',
      dataIndex: 'proof',
      key: 'proof',
  },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: text => text === 1 ? <Text style={{color: "#219653"}}>Visible</Text> : <Text style={{color: "#EB5757"}}>Oculto</Text>
        },
        {
            title: 'Editar',
            dataIndex: 'id',
            key: 'id',
            render: (text, records) => <Button style={{color: '#4F4F4F'}} onClick={() => toggleModal(records)} type='link' icon={<SquareEditIcon />} />
        }
    ]

    return (
      <ClaimsContext.Provider value={{
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
          <HeaderSection showSearch title="Reporte de reclamos" onChange={(e) => onSearchFilter(e)} value={search} />
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
            columns={columnsClaims}
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
      </ClaimsContext.Provider>
    );
}

export default Claims;
export {ClaimsContext}