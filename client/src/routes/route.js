
import Login from '../pages/auth/Login';
import ImportStock  from "../pages/Import/importStock"
import ImportBrand from "../pages/Import/importBrand"
import ImportSupplier from "../pages/Import/importSupplier"

//public Route
const publicRoutes =[
    {path:'/login',component :Login , layout : null},
    {path:'/',component :ImportStock },
    {path:'/importBrand',component :ImportBrand },
    {path:'/importSupplier',component :ImportSupplier }
]

const privateRoutes=[]

export {publicRoutes,privateRoutes}