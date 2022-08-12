import { Tag } from "antd";


export function getMethodPayment(value) {
    if(value === 0) return 'Efectivo';
    if(value === 1) return 'Targeta de credito';
}

export const statusOrder = [
    {value: 0, text: "Nuevo"},
    {value: 1, text: "Aceptado"},
    {value: 2, text: "Alistando"},
    {value: 3, text: "Preparado"},
    {value: 4, text: "En Camino"},
    {value: 5, text: "Entregar"},
    {value: 6, text: "Recibido"},
    {value: 7, text: "Cancelado"},

];

export function getStatusOrder(value) {
    if(value === 0) return <Tag color="orange">Nuevo</Tag>;
    if(value === 1) return <Tag color="pink">Aceptado</Tag>;
    if(value === 2) return <Tag color="processing">Alistando</Tag>;
    if(value === 3) return <Tag color="geekblue">Preparado</Tag>;
    if(value === 4) return <Tag color="blue">En camino</Tag>;
    if(value === 5) return <Tag color="lime">Entregar</Tag>;
    if(value === 6) return <Tag color="green">Recibido</Tag>;
    if(value === 7) return <Tag color="error">Cancelado</Tag>;
}
