import axios, { handleResp } from '../config/axios';
import { decodedata, encodedata } from '../config/secure';

export const categoryAdd = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/adminapi/supportCategory`,
            'data': {encode: encodedata(data)}
        });
        const response = decodedata(respData.data)
        return {
            status: "success",
            loading: false,
            message: response.result.messages,
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

export const categoryList = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/adminapi/supportCategory`,
            'params': {encode: encodedata(data)}
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
            error: response.errors,
            message: response.message
        }
    }
}

export const categoryUpdate = async (data) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `/adminapi/supportCategory`,
            'data': {encode: encodedata(data)}
        });
        const response = decodedata(respData.data)
        return {
            status: "success",
            loading: false,
            message: response.result.messages,
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

export const TicketList = async (params) => {
    try {
        
        let respData = await axios({
            'method': 'get',
            'url': `/adminapi/ticketList`,
            params: {encode: encodedata(params)}
        });

        if (params.export == 'csv') {
            const url = window.URL.createObjectURL(new Blob([respData.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'support Ticket List.csv');
            document.body.appendChild(link);
            link.click();
        }

        if (params.export == 'xls') {
            const url = window.URL.createObjectURL(new Blob([respData.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'support Ticket List.xls');
            document.body.appendChild(link);
            link.click();
        }
        const response = decodedata(respData.data);
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
export const getMessage = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/adminapi/ticketMessage`,
            'params': data
        });

        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    } catch (err) {
        return {
            status: "failed",
            loading: false,
        }
    }
}

export const replyMsg = async (data) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `/adminapi/ticketMessage`,
            data: {encode: encodedata(data)}
        });
        const response = decodedata(respData.data);
        return {
            status: "success",
            loading: false,
            message: response.result.message,
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