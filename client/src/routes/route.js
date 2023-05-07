
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
//public Route
const publicRoutes =[
    {path:'/login',component :Login , layout : null},
    {path:'/',component :ImportStock },
    {path:'/importBrand',component :ImportBrand },
    {path:'/importSupplier',component :ImportSupplier },
    {path:'/Barcode',component :BarcodePage },
    {path:'/ExportProduct',component :ExportPage },
    {path:'/PdfExportPage',component :PdfExportPage },
    {path:'/UserPage',component :UserPage },
    {path:'/customerPage',component :ImportCustomer  },
    {path:'/ImportWareHouse',component :ImportWareHouse  },
    {path:'*',component :ErorPage  }
]

const privateRoutes=[ ]

export {publicRoutes,privateRoutes}