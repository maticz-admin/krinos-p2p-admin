// import config
import axios from '../config/axios';

export const getCmsList = async () => {
    try {
        const respData = await axios({
            'url': `/adminapi/cms`,
            'method': 'get'
        })
        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false
        }
    }
}

export const updateCms = async (data) => {
    try {
    const options = {
        headers: {"content-type": "application/json"}
    }
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        const respData = await axios({
            'url': `/adminapi/cms`,
            'method': 'put',
            'data': data,
            // 'options' : options
           
        })
        return {
            status: "success",
            loading: false,
            message: respData.data.message,
            result: respData.data.result
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false,
            message: err.response.data.message,
            Errors: err.response.data.error
        }
    }
}