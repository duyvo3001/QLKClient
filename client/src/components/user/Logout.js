// import { Navigate } from 'react-router-dom';

const Logout = () => {
    sessionStorage.removeItem("access_token")
}

export default Logout