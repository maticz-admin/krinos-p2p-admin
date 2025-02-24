import axios from "axios";
import {
    GET_ERRORS,
    USER_ADD,
    USER_UPDATE,
    PROFILE_UPDATE,
    PASSWORD_UPDATE,
    SETTINGS_UPDATE,
    REPLY_CONTACT,
    SUPPORT_REPLY,

} from "./types";
import keys from "./config";
import { decodedata, encodedata } from "../config/secure";
import { handleResp } from "../config/axios";
const url = keys.baseUrl;
export const addUser = (userData, history) => dispatch => {
    axios
        .post(url + "api/user-add", userData)
        .then(res =>
            dispatch({
                type: USER_ADD,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


export const updateUser = (userData) => dispatch => {
    axios
        .post(url + "api/user-update", userData)
        .then(res =>
            dispatch({
                type: USER_UPDATE,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


export const updateProfile = (userData) => dispatch => {
    axios
        .post(url + "api/profileupload", userData)
        .then(res =>
            dispatch({
                type: PROFILE_UPDATE,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const updateChangepassword = (userData) => dispatch => {
    axios
        .post(url + "api/changepassword", userData)
        .then(res =>
            dispatch({
                type: PASSWORD_UPDATE,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const newsletteremail = (userData) => dispatch => {
    axios
        .post(url + "api/sendnewsletter", userData)
        .then(res =>
            dispatch({
                type: PROFILE_UPDATE,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const updateSettings = (userData) => dispatch => {
    axios
        .post(url + "api/updateSettings", userData)
        .then(res =>
            dispatch({
                type: SETTINGS_UPDATE,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const replyContact = (userData) => dispatch => {
    axios
        .post(url + "api/replycontact", userData)
        .then(res =>
            dispatch({
                type: REPLY_CONTACT,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


export const replysupport = (supportreplyData) => dispatch => {

    axios
        .post(url + "api/support_reply_admin", supportreplyData)
        .then(res =>
            dispatch({
                type: SUPPORT_REPLY,
                payload: res,
            })
        ).catch(err =>

            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


export const updatedynamic = (userData) => dispatch => {
    axios
        .post(url + "api/updatedynamic", userData)
        .then(res =>
            dispatch({
                type: SETTINGS_UPDATE,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const getTableDataDynamic = (dynobj) => dispatch => {
    axios
        .post(url + "cryptoapi/getTableDataDynamic", dynobj)
        .then(res => dispatch({
            type: SETTINGS_UPDATE,
            payload: res,
        }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const Botfunction = (userData) => dispatch => {
    axios
        .post(url + "api/Botfunction", userData)
        .then(res =>
            dispatch({
                type: SETTINGS_UPDATE,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const SpotTradeOrderplacing = (userData) => dispatch => {
    axios
        .post(url + "cryptoapi/spottradeorderplacing", userData)
        .then(res =>
            dispatch({
                type: SETTINGS_UPDATE,
                payload: res,
            })
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


export const getUser = async (data) => {

    try {
        console.log('data----', data)
        let respData = await axios({
            'method': 'get',
            'url': `/adminapi/user`,
            'params': {encode: encodedata(data)}
        });
        const response = decodedata(respData.data);
        console.log('responseresponse----', response)
        return {
            status: "success",
            loading: false,
            result: response.result
        }
    } catch (err) {
        console.log('rrrrrrrrrrrr---------', err)
        console.log('rrrrrrrrrrrr---------', err.response)

        // handleResp(err, 'err')
        // const response = decodedata(err.response.data)
        return {
            status: 'failed',
            loading: false,
            error: err.response.data.errors,
            message: err.response.data.message
        }
    }
}


export const getUserBalnce = async (data) => {

    try {
        let respData = await axios({
            'method': 'get',
            'url': `/adminapi/getUserBalnce`,
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
            error: err.response.data.errors
        }
    }
}



export const UpdateUser = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/adminapi/user-update`,
            data
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result,
            message: respData.data.message
        }
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors,
            message: err.response.data.message
        }
    }
}





export const Disable2FA = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/adminapi/disable-2fa`,
            data: {encode : encodedata(data)}
        });
        const response = decodedata(respData.data)
        console.log('decodedata(respData.data)-----',response)
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
            status: "failed",
            loading: false,
            error: response.errors
        }
    }
}

export const ReferenceHist = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/adminapi/referralHist`,
            data
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result,
            message: respData.data.message
        }
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}

export const kycList = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/adminapi/kycList`,
            data
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result,
            message: respData.data.message
        }
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}




