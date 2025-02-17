// import config
import axios, { handleResp } from '../config/axios';
import {
    GET_ERRORS,
    FAQ_ADD,
    FAQ_UPDATE
} from "./types";
import keys from "./config";
import { decodedata, encodedata } from '../config/secure';
const url = keys.baseUrl;

export const faqCategoryList = async () => {
    try {
        const respData = await axios({
            'url': `/adminapi/faqCategory`,
            'method': 'get'
        })
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

export const faqCategoryAdd = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/faqCategory`,
            'method': 'post',

            'data': {encode: encodedata(data)}
        });
        const response = decodedata(respData.data)
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
            error: response.error
        }
    }
}

export const faqCategoryEdit = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/faqCategory`,
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
            message: response.message,
            error: response.error
        }
    }
}
export const getFaqCategory = async () => {
    try {
        const respData = await axios({
            'url': `/adminapi/getFaqCategory`,
            'method': 'get',
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


export const faqList = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/faq`,
            'method': 'get',
            'params': {encode: encodedata(data)}
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

export const faqAdd = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/faq`,
            'method': 'post',
            'data': {encode: encodedata(data)}
        });
        const response = decodedata(respData.data)
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



export const faqUpdate = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/faq`,
            'method': 'put',
            'data': {encode: encodedata(data)}
        });
        const response = decodedata(respData.data)
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
            error: response.error
        }
    }
};

export const getFaqDropdown = async () => {
    try {
        const respData = await axios({
            'url': `/adminapi/getFaqDropdown`,
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