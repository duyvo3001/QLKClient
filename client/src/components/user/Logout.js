// import { Navigate } from 'react-router-dom';

const Logout = () => {
    sessionStorage.removeItem("access_token")
    sessionStorage.setItem("isAuthenticated",false)
}

export default Logout