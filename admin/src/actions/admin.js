// import action
import { decodeJwt } from './jsonWebToken';

// import config
import axios, { handleResp, setAuthorization } from '../config/axios';
import Config from '../config/index';

// import lib
import { setAuthToken } from '../lib/localStorage';
import { decodedata, encodedata } from '../config/secure';




export const login = async (data, dispatch) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/adminapi/login`,
            data: { encode: encodedata(data) }
        });

        const response = decodedata(respData.data);
        if (response.success == false) {
            return {
                status: "failed",
                loading: false,
                message: response.errors.password
            }

        }

        if (response.status == 'TWO_FA') {
            return {
                status: "TWO_FA",
                loading: false,
                message: response.message
            }
        }

        setAuthorization(response.token)
        setAuthToken(response.token)
        decodeJwt(response.token, dispatch)

        return {
            status: "success",
            loading: false,
            message: response.message
        }


    } catch (err) {

        handleResp(err, 'error');
        const response = decodedata(err.response.data);
        return {
            status: 'failed',
            loading: false,
            message: response.message,
            error: response.errors
        }
    }
}

export const list = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/adminapi/subAdmin`,
        });

        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false,
        }
    }
}

export const creatAdmin = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/adminapi/sub-admin`,
            data
        });


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



export const EditAdmin = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/adminapi/edit-admin`,
            data
        });


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


export const getGeoInfoData = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${Config.getGeoInfo}`,

        });


        return {
            status: "success",
            loading: false,
            message: respData.data.message,
            result: respData.data
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

export const loginHisPagination = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/adminapi/login-history`,
            'params': data

        });


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
            error: err.response.data.errors
        }
    }
}

export const changePassword = async (data) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `/adminapi/change-password`,
            data: { encode: encodedata(data) }

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
            message: response.message,
            error: response.errors
        }
    }
}

export const getProfile = async () => {
    try {

        let respData = await axios({
            'method': 'get',
            'url': `/adminapi/get-profile`,

        });

        const response = decodedata(respData.data)
        return {
            status: response.status,
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
            message: response.message,
            error: response.errors
        }
    }
}

export const sendMail = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/adminapi/send-mail`,
            data: { encode: encodedata(data) }

        });
        const response = decodedata(respData.data)
        return {
            status: response.status,
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
            message: response.message,
            error: response.errors
        }
    }
}



export const editProfile = async (data) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `/adminapi/edit-profile`,
            data: { encode: encodedata(data) }

        });
        const response = decodedata(respData.data)
        return {
            status: response.status,
            loading: false,
            message: response.message,
            result: response.result
        }
    } catch (err) {
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: response.status,
            loading: false,
            message: response.message,
            error: response.errors
        }
    }
}



