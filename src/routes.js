/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Category from "@material-ui/icons/Category";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ElectricRickshawIcon from "@mui/icons-material/ElectricRickshaw";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// core components/views for Admin layout
import DashboardPage from "./views/dashboard/dashboard";
import Categories from "./views/category/categories";
import Properties from "./views/property/properties";
import PendingOrders from "./views/pendingOrder/pendingOrders";
import OrderDetail from "./views/orderDetail/orderDetail";
import Shippers from "./views/shipper/shippers";
import ToPickup from "./views/shipperPage/toPickup";
import Shipping from "./views/shipperPage/shipping";
import Shipped from "./views/shipperPage/shipped";
import RevenueStatistic from "./views/revenueStatistic/revenueStatistic";
import Orders from "./views/orders/orders";
import Done from './views/shipperPage/done';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Category",
    icon: Category,
    component: Categories,
    layout: "/admin",
  },
  {
    path: "/properties/:cateId",
    name: "Property",
    icon: MiscellaneousServicesIcon,
    component: Properties,
    layout: "/admin",
  },
  {
    path: "/pending/",
    name: "Pending Orders",
    icon: PendingActionsIcon,
    component: PendingOrders,
    layout: "/admin",
  },
  {
    path: "/orders/",
    name: "Orders",
    icon: PendingActionsIcon,
    component: Orders,
    layout: "/admin",
  },
  {
    path: "/shippers",
    name: "Shipper",
    icon: AssignmentIndIcon,
    component: Shippers,
    layout: "/admin",
  },
  {
    path: "/revenue",
    name: "Revenue",
    icon: AttachMoneyIcon,
    component: RevenueStatistic,
    layout: "/admin",
  },
  {
    path: "/order/:orderId",
    component: OrderDetail,
    layout: "/admin",
  },
  {
    path: "/toPickup",
    name: "To Pickup",
    icon: ElectricRickshawIcon,
    component: ToPickup,
    layout: "/shipper",
  },
  {
    path: "/shipping",
    name: "Shipping",
    icon: LocalShippingIcon,
    component: Shipping,
    layout: "/shipper",
  },
  {
    path: "/done",
    name: "Done",
    icon: DoneOutlineIcon,
    component: Done,
    layout: "/shipper",
  },
];

export default dashboardRoutes;
