import { BagIcon, BookIconRed, CategoriesIcon, CrediCardIcon, DocIcon, SaveIcon, UserIcon } from "../components/customIcon";
import AksWant from "../routes/AksWant";
import BlackList from "../routes/blackList";
import Categories from "../routes/categories";
import Claims from "../routes/claims";
import Payments from "../routes/payments";
import ReporOrder from "../routes/reportOrders";
import RequestUsers from "../routes/request";
import Users from "../routes/users";

export const routesMap = [
    {
        path: "/categories-subcategories",
        name: "Categorias",
        icon: CategoriesIcon,
        View: Categories
    },
    {
        path: "/users",
        name: "Usuarios",
        icon: UserIcon,
        View: Users
    },
    {
        path: "/request",
        name: "Solicitudes",
        icon: DocIcon,
        View: RequestUsers
    },
    {
        path: "/orders",
        name: "Reporte de pedidos",
        icon: BagIcon,
        View: ReporOrder
    },
    {
        path: "/payments",
        name: "Pagos",
        icon: CrediCardIcon,
        View: Payments
    },
    {
        path: "/blacklist",
        name: "Lista negra",
        icon: BookIconRed,
        View: BlackList
    },
    {
        path: "/pide",
        name: "Pide lo que quieras",
        icon: SaveIcon,
        View: AksWant
    },
    {
        path: "/claims",
        name: "Reporte de reclamos",
        icon: BookIconRed,
        View: Claims
    },
]