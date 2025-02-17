// import config
import axios, { handleResp } from '../config/axios';
import { decodedata, encodedata } from '../config/secure';

export const currencyList = async (reqData) => {
    try {
        const respData = await axios({
            'url': `/adminapi/currency`,
            'method': 'get',
            'params': {encode: encodedata(reqData)}
        })

        if (reqData.export == 'csv') {
            const url = window.URL.createObjectURL(new Blob([respData.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'currency List.csv');
            document.body.appendChild(link);
            link.click();
        }

        if (reqData.export == 'xls') {
            const url = window.URL.createObjectURL(new Blob([respData.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'currency List.xls');
            document.body.appendChild(link);
            link.click();
        };
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

export const addCurrency = async (reqData) => {
    try {
        const respData = await axios({
            'url': `/adminapi/currency`,
            'method': 'post',
            // 'data': {encode: encodedata(reqData)}
            'data': reqData

        });
        // const response = decodedata(respData.data);
        // console.log('response-----', response)
        return {
            status: "success",
            loading: false,
            message: respData.data.message
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

export const updateCurrency = async (reqData) => {
    try {
        // console.log('reqData-----', reqData)
        const respData = await axios({
            'url': `/adminapi/currency`,
            'method': 'put',
            'data': reqData
        });
        // const response = decodedata(respData.data)
        return {
            status: "success",
            loading: false,
            message: respData.data.message
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

export const getCurrency = async () => {
    try {
        const respData = await axios({
            'url': `/adminapi/getCurrency`,
            'method': 'get',
        })
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
        }
    }
}