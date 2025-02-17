import axios from 'axios'
import { decodedata, encodedata } from '../config/secure'
import { handleResp } from '../config/axios'





export const GetData = async () => {
    try {
        const respData = await axios({
            'url': `/adminapi/get-contact`,
            'method': 'get'
        })
        const response = decodedata(respData.data)
        return {
            status: "success",
            loading: false,
            result: response.result.data
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false,
           
        }
    }
}


export const AdminMsg = async (data) => {
    try {
        const respData = await axios({
            'url': `/adminapi/admin-rly`,
            'method': 'put',
            data: {encode: encodedata(data)}
        });
        const response = decodedata(respData.data);

        return {
            status: response.status,
            loading: false,
            // result: respData.data.result.data,
            message:response.message
        }
    } catch (err) {
        handleResp(err, 'err')
        const response = decodedata(err.response.data)
        return {
            status: 'failed',
            loading: false,
            errors:response.message,
            message:response.message
        }
    }
}


// export const DeleteData = async () => {
//     try {
//         const respData = await axios({
//             'url': `/adminapi/contact-delete`,
//             'method': 'get'
//         })
//         return {
//             status: "success",
//             loading: false,
//             result: respData.data.result
//         }
//     } catch (err) {
//         return {
//             status: 'failed',
//             loading: false
//         }
//     }
// }