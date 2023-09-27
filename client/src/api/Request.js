import axois from 'axios'

const Request = axois.create({
    baseURL: process.env.REACT_APP_NODEJS_WEB
})
export default Request 