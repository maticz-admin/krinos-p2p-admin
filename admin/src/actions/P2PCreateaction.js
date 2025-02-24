import axios, { handleResp } from "../config/axios";
import { decodedata, encodedata } from "../config/secure";

export const Addoffertaghook = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/p2papiadmin/add-offertag`,
            'data': { encode: encodedata(data) }
        });
        const response = decodedata(respData.data);
        return { data: response }
    } catch (err) {
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: "failed",
            loading: false,
            message: response?.message,
            error: response?.errors
        }
    }
}

export const Editoffertaghook = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/p2papiadmin/edit-offertag`,
            'data': data
        });

        return respData;
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const Getoffertaghook = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/p2papiadmin/get-offertag`,
            'params': { encode: encodedata(data) }
        });
        const response = decodedata(respData.data)
        return { data: response }
    } catch (err) {
        console.log('eeeerrrr-----', err.response)
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: "failed",
            loading: false,
            message: response.message,
            error: response.errors
        }
    }
}

export const Getofferhistoryhook = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/p2papiadmin/get-offer-history`,
            'params': { encode: encodedata(data) }
        });
        if (data.export == 'csv') {
            const url = window.URL.createObjectURL(new Blob([respData.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Offerhistory.csv');
            document.body.appendChild(link);
            link.click();
        }

        if (data.export == 'xls') {
            const url = window.URL.createObjectURL(new Blob([respData.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Offerhistory.xls');
            document.body.appendChild(link);
            link.click();
        }
        const response = decodedata(respData.data)
        return { data: response }
    } catch (err) {
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: "failed",
            loading: false,
            message: response.message,
            error: response.errors
        }
    }
}


export const Gettradehistoryhook = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/p2papiadmin/get-trade-history`,
            'params': { encode: encodedata(data) }
        });

        if (data.export == 'csv') {
            const url = window.URL.createObjectURL(new Blob([respData.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'currency List.csv');
            document.body.appendChild(link);
            link.click();
        }

        if (data.export == 'xls') {
            const url = window.URL.createObjectURL(new Blob([respData.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'currency List.xls');
            document.body.appendChild(link);
            link.click();
        }
        // console.log('response----', respData)
        const response = decodedata(respData.data);
        return { data: response }
    } catch (err) {
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: "failed",
            loading: false,
            message: response.message,
            error: response.errors
        }
    }
}

export const Getpaymenttypehook = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/p2papiadmin/get-paymenttypes`,
            'params': { encode: encodedata(data) }
        });
        const response = decodedata(respData.data)
        
        return { data: response }
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}


export const Addpaymenttypeshooks = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/p2papiadmin/add-paymenttypes`,
            'data': {encode: encodedata(data)}
        });
        const response = decodedata(respData.data)
        return {data: response}
    } catch (err) {
       
        const response = decodedata(err?.response?.data)

        return {
            status: "failed",
            loading: false,
            message: response.message,
            error: response.errors
        }
    }
}

export const Editpaymenttypehooks = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/p2papiadmin/edit-paymenttypes`,
            'data': {encode: encodedata(data)}
        });
        const response = decodedata(respData.data)
        return {data: response};
    } catch (err) {
        const response = decodedata(err.response.data)

        return {
            status: "failed",
            loading: false,
            message: response.message,
            error: response.errors
        }
    }
}

export const Addownerwallethooks = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/p2papiadmin/updatewallet`,
            'data': { encode: encodedata(data) }
        });
        const response = decodedata(respData.data);
        return { data: response }
    } catch (err) {
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: "failed",
            loading: false,
            message: response?.message,
            error: response?.errors
        }
    }
}

export const Getownerwallethooks = async (data) => {
    try {
        
        let respData = await axios({
            'method': 'get',
            'url': `/p2papiadmin/getownerwallet`,
            'params': data
        });

        return respData
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}