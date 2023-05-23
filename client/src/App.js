import { Routes, Route  } from 'react-router-dom'
import { publicRoutes ,privateRoutes } from './routes/route'
import defaultLayout from './components/Layout/DefaultLayout/defaultLayout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment ,useState } from 'react'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const dotenv = require('dotenv');
  // dotenv.config();
  // const cookies = new Cookies()
  return (
    <Routes>
      {
        publicRoutes.map((route, index) => {
          console.log(route)
          const Layout = route.layout === null ? Fragment : defaultLayout;
          const Page = route.component
          return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
        })
        
        // privateRoutes.map((route, index) => {
        //   const Layout = route.layout === null ? Fragment : defaultLayout;
        //   const Page = route.component
        //   return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
        // })
      }
    </Routes>
  )
}

export default App;
