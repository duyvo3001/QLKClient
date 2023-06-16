
import Login from '../pages/auth/Login';
import ImportStock  from "../pages/Import/importStock"
import ImportBrand from "../pages/Import/importBrand"
import ImportSupplier from "../pages/Import/importSupplier"
import BarcodePage from '../pages/barcode/BarcodePage'
import ExportPage from '../pages/export/ExportPage';
import PdfExportPage from '../pages/export/PdfExportPage';
import UserPage from '../pages/userManegement/UserPage';
import ImportCustomer from '../pages/customer/ImportCustomer';
import ErorPage from '../pages/erorPage/ErorPage';
import ImportWareHouse from '../pages/warehouse/ImportWareHouse';
import DashBoard from '../pages/dashBoard/DashBoard';
import ProductView from '../pages/dashBoard/ProductView/ProductView';
import UserView from '../pages/dashBoard/UserView/UserView';
import WareHouseView from '../pages/dashBoard/WareHouseView/WareHouseView';
import InventoryList from '../pages/inventory/InventoryList';
import PaidOrderPage from '../pages/PaidOrder/PaidOrderPage';
import PaidView from '../pages/dashBoard/PaidView/PaidView';
//public Route
const publicRoutes = [
    {path:'/login', component : Login , layout : null},
    {path:'*',component : ErorPage  }
]

const privateRoutes=[ 
    {path:'/',component : DashBoard },
    {path:'/importBrand',component :ImportBrand },
    {path:'/importSupplier',component :ImportSupplier },
    {path:'/Barcode',component :BarcodePage },
    {path:'/ExportProduct',component :ExportPage },
    {path:'/PdfExportPage',component :PdfExportPage },
    {path:'/UserPage',component :UserPage },
    {path:'/customerPage',component :ImportCustomer  },
    {path:'/ImportWareHouse',component :ImportWareHouse  },
    {path:'/ImportStock',component :ImportStock  },
    {path:'/ProductView',component :ProductView  },
    {path:'/WareHouseView',component :WareHouseView  },
    {path:'/UserView',component :UserView  },
    {path:'/InventoryList',component :InventoryList  },
    {path:'/PaidOrderPage',component :PaidOrderPage  },
    {path:'/PaidView',component :PaidView  },
]

export {publicRoutes,privateRoutes}