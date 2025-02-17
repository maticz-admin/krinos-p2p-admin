// import config
import axios, { handleResp } from '../config/axios';
import { decodedata, encodedata } from '../config/secure';

export const getSiteSetting = async () => {
    try {
        const respData = await axios({
            'url': `/adminapi/getSiteSetting`,
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

export const updateSiteSetting = async (data) => {
    try {

        const respData = await axios({
            'url': `/adminapi/updateSiteSetting`,
            'method': 'put',
            'data': {encode: encodedata(data)}
        });
        const response = decodedata(respData.data);
        return {
            status: "success",
            loading: false,
            result: response.result,
            message: response.message
        }
    } catch (err) {
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: 'failed',
            loading: false,
            error: response.errors,
            message: response.message
        }
    }
}

export const updateSiteDetails = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/updateSiteDetails`,
            'method': 'put',
            'data': data
        })
        return {
            status: "success",
            loading: true,
            message: respData.data.message
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false,
            message: err.response.data.message,
        }
    }
}

export const updateUsrDash = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/updateUsrDash`,
            'method': 'put',
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
            errors: err.response.data.errors

        }
    }
}

export const updateSocialMedia = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/updateSocialMedia`,
            'method': 'put',
            'data': {encode: encodedata(data)}
        })
        const response = decodedata(respData.data)
        return {
            status: "success",
            loading: true,
            message: response.message
        }
    } catch (err) {
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: 'failed',
            loading: false,
            error: response.errors,
            message: response.message
        }
    }
}



export const getMailIntegrate = async () => {
    try {
        const respData = await axios({
            'url': `/adminapi/getemailintegrate`,
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


export const updateMailIntegrate = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/updatemailintegrate`,
            'method': 'post',
            'data': {encode: encodedata(data)}
        });
        const response = decodedata(respData.data);
        return {
            status: "success",
            loading: false,
            message: response.message,
            result: response.result
        }
    } catch (err) {
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: 'failed',
            loading: false,
            error: response.errors,
            message: response.message
        }
    }
}

export const updateFaqTrend = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/updateFaqTrend`,
            'method': 'put',
            'data': {encode: encodedata(data)}
        });
        const response = decodedata(respData.data);
        return {
            status: "success",
            loading: false,
            message: response.message,
            result: response.result
        }
    } catch (err) {
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: 'failed',
            loading: false,
            error: response.errors,
            message: response.message
        }
    }
}