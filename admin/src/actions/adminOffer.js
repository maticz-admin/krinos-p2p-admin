import axios from "../config/axios";


export const getOffer = async (data)=>{
    try{

let respData =await axios ({
    'method':'get',
    'url':'/adminapi/Offer'
});
return{
    status:"success",
    loading:false,
    result:respData.data.result
}

    }catch(err){
        console.log("errrr",err);
    }
}