import { Typography } from "antd";

export function paymentStatusRender(value) {
    if (value === 0) return <Typography.Text style={{color: '#EB5757', fontWeight: '500'}}>Pendiente</Typography.Text>
    if (value === 1) return <Typography.Text type="warning" style={{fontWeight: '500'}}>Pago recibido</Typography.Text>
}