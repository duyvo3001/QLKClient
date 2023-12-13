import Login from '../pages/auth/Login';
import ImportStock from "../pages/Import/importStock"
import ImportBrand from "../pages/Import/importBrand"
import ImportSupplier from "../pages/Import/importSupplier"
import UserPage from '../pages/userManegement/UserPage';
import ImportCustomer from '../pages/customer/ImportCustomer';
import ErorPage from '../pages/erorPage/ErorPage';
import ImportWareHouse from '../pages/warehouse/ImportWareHouse';
import DashBoard from '../pages/dashBoard/DashBoard';
import ProductView from '../pages/dashBoard/ProductView/ProductView';
import UserView from '../pages/dashBoard/UserView/UserView';
import WareHouseView from '../pages/dashBoard/WareHouseView/WareHouseView';
import ExportOrderPage from '../pages/PaidOrder/ExportOrderPage';
import PaidView from '../pages/dashBoard/PaidView/PaidView';
import Invoice from '../pages/PaidOrder/Invoice';
import ReportSale from '../pages/report/Sales/ReportSale';
import ReportInventory from '../pages/report/Inventory/ReportPage/ReportInventory';
import BrandView from '../pages/dashBoard/Brandview/BrandView';
import CustomerView from '../pages/dashBoard/CustomerView/CustomerView';
import SupplierView from '../pages/dashBoard/SupplierView/SupplierView';
import CategoryPage from '../pages/Category/CategoryPage';
import ReportOutOfStockPage from '../pages/report/Outofstock/ReportOutOfStockPage';
import PrintReportInventory from '../pages/report/Inventory/print/PrintReportInventory';
import InventoryManagement from '../pages/inventory/InventoryManagement';
import UserSetting from '../pages/userManegement/UserSetting';
import DetailProduct from '../pages/detail/detailProduct';
//public Route
const publicRoutes = [
    { path: '/login', component: Login, layout: null },
    { path: '*', component: ErorPage }
]
//pivate Route
const privateRoutes = [
    { path: '/', component: DashBoard },
    { path: '/importBrand', component: ImportBrand },
    { path: '/importSupplier', component: ImportSupplier },
    { path: '/ImportWareHouse', component: ImportWareHouse },
    { path: '/ImportStock', component: ImportStock },
    { path: '/UserPage', component: UserPage },
    { path: '/customerPage', component: ImportCustomer },
    { path: '/ExportOrderPage', component: ExportOrderPage },
    { path: '/ProductView', component: ProductView },
    { path: '/BrandView', component: BrandView },
    { path: '/CustomerView', component: CustomerView },
    { path: '/SupplierView', component: SupplierView },
    { path: '/WareHouseView', component: WareHouseView },
    { path: '/UserView', component: UserView },
    { path: '/PaidView', component: PaidView },
    { path: '/Invoice/:id', component: Invoice, layout: null, },
    { path: '/ReportExport', component: ReportSale },
    { path: '/ReportInventory', component: ReportInventory },
    { path: '/Category', component: CategoryPage },
    { path: '/ReportOutOfStock', component: ReportOutOfStockPage },
    { path: '/PrintInventory', component: PrintReportInventory },
    { path: '/InventoryManagement', component: InventoryManagement },
    { path: '/UserProfile', component: UserSetting },
    { path: '/DetailProduct/:id', component: DetailProduct },
    
]

export { publicRoutes, privateRoutes }