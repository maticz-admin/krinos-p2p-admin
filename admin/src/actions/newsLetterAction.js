// import config
import axios, { handleResp } from '../config/axios';
import { decodedata, encodedata } from '../config/secure';

export const allSubscribed = async (reqData) => {
    try {
        const respData = await axios({
            'url': `/adminapi/subscriber-all`,
            'method': 'get',
        });
        const response = decodedata(respData.data)
        return {
            status: "success",
            loading: false,
            result: response.result
        }
    } catch (err) {
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: 'failed',
            loading: false,
            message: response.message,
        }
    }
}

export const sendNews = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/subscriber/sendNews`,
            'method': 'post',
            'data': {encode: encodedata(data)}
        });
        const response = decodedata(respData.data);
        return {
            status: "success",
            loading: false,
            message: response.message
        }
    } catch (err) {
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: 'failed',
            loading: false,
            message: response.message,
            errors: response.errors
        }
    }
}