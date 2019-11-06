import axios from 'axios'
const net = axios.create({
  withCredentials: false,
  timeout: 15000
})
export default net
