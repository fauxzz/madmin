import { Button, Typography } from "antd";
import { SquareEditIcon } from "../../components/customIcon";

export const columnsBusiness = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Correo electrónico',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'N° Celular',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: 'Dirección',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'Estado',
        dataIndex: 'visible',
        key: 'visible',
        render: text => text ? <Typography.Text style={{color: "#219653"}}>Visible</Typography.Text> : <Typography.Text style={{color: "#EB5757"}}>Oculto</ Typography.Text>
    },
    {
        title: 'Editar',
        dataIndex: 'id',
        key: 'id',
        render: (text, records) => <Button style={{color: '#4F4F4F'}} type='link' icon={<SquareEditIcon />} />
    }
]