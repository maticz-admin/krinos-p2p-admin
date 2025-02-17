
// import config
import axios, { handleResp } from '../config/axios';
import { decodedata, encodedata } from '../config/secure';

export const getDepositList = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/depositList`,
            'method': 'get',
            'params': data
        })

        if (data.export == 'csv') {
            const url = window.URL.createObjectURL(new Blob([respData.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Deposit List.csv');
            document.body.appendChild(link);
            link.click();
        }

        if (data.export == 'xls') {
            const url = window.URL.createObjectURL(new Blob([respData.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Deposit List.xls');
            document.body.appendChild(link);
            link.click();
        }

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

export const getWithdrawList = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/withdrawList`,
            'method': 'get',
            'params': {encode: encodedata(data)}
        })

        if (data.export == 'csv') {
            const url = window.URL.createObjectURL(new Blob([respData.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Withdraw List.csv');
            document.body.appendChild(link);
            link.click();
        }

        if (data.export == 'xls') {
            const url = window.URL.createObjectURL(new Blob([respData.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Withdraw List.xls');
            document.body.appendChild(link);
            link.click();
        }
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
            error: response.errors,
            message: response.message
        }
    }
}

export const approveCoinWithdraw = async (id) => {
    try {
        const respData = await axios({
            'url': `/adminapi/coinWithdraw/approve/${id}`,
            'method': 'get',
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
        }
    }
}

export const rejectCoinWithdraw = async (id) => {
    try {
        const respData = await axios({
            'url': `/adminapi/coinWithdraw/reject/${id}`,
            'method': 'get',
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
        }
    }
}

export const approveFiatWithdraw = async (id) => {
    try {
        const respData = await axios({
            'url': `/adminapi/fiatWithdraw/approve/${id}`,
            'method': 'get',
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
        }
    }
}

export const rejectFiatWithdraw = async (id) => {
    try {
        const respData = await axios({
            'url': `/adminapi/fiatWithdraw/reject/${id}`,
            'method': 'get',
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
        }
    }
}

export const approveFiatDeposit = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/fiatDeposit/approve`,
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
            error: err.response.data.errors,
        }
    }
}

export const fundList = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/fundList`,
            'method': 'get',
            'params': data
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