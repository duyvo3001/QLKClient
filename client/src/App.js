import { Fragment, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes/route'
import defaultLayout from './components/Layout/DefaultLayout/defaultLayout'
import 'bootstrap/dist/css/bootstrap.min.css';
// import ReportPage from './pages/report/ReportPage';
import { AuthContext } from './context/AuthContext';

function PrivateRoute({ children }) {
  const storedAuth = sessionStorage.getItem('isAuthenticated');
  console.log('storedAuth',storedAuth)
  if (JSON.parse(storedAuth) === true) {
    console.log('hello')
    return children
  }
  else return <Navigate to="/login" />;

  return children
}
function App() {

  return (
    <Routes>
      {
        publicRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : defaultLayout;
          const Page = route.component
          return <Route key={index} path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>} />
        })
      }
      {
        privateRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : defaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute>
                  <Layout>
                    <Page />
                  </Layout>
                </PrivateRoute>
              }
            />
          );
        })
      }
    </Routes>
  )
}

export default App;
