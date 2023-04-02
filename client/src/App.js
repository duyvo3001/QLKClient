import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes/route'
import defaultLayout from './components/Layout/DefaultLayout/defaultLayout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react'
function App() {

  // const dotenv = require('dotenv');
  // dotenv.config();
  // const cookies = new Cookies()
  return (
    <Routes>
      {
      publicRoutes.map((route, index) => {
        const Layout = route.layout === null ? Fragment : defaultLayout;
        const Page = route.component
        return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
      })
      }
    </Routes>
  )
}

export default App;
