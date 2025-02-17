// import config
import axios, { handleResp } from '../config/axios';
import { decodedata, encodedata } from '../config/secure';

export const templateList = async (reqData) => {
    try {
        const respData = await axios({
            'url': `/adminapi/emailTemplate`,
            'method': 'get',
            'params': { encode: encodedata(reqData) }
        });
        const response = decodedata(respData.data)
        return {
            status: "success",
            loading: false,
            result: response.result
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false
        }
    }
}

export const addEmailTemplate = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/emailTemplate`,
            'method': 'post',
            'data': data
        })
        return {
            status: "success",
            loading: false,
            message: respData.data.message
        }
    } catch (err) {

        return {
            status: 'failed',
            loading: false,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const editEmailTemplate = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/emailTemplate`,
            'method': 'put',
            'data': { encode: encodedata(data) }
        });
        const response = decodedata(respData.data)
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
            error: response.errors
        }
    }
}
