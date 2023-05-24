import axios from "axios";
import https from 'https';

axios.defaults.baseURL = 'https://old.shamela.ws/';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})
axios.defaults.httpsAgent = httpsAgent

export default axios;
