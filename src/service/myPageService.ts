import { db } from "../models";
import { QueryTypes } from 'sequelize';


export default async () => {
    try{

        return {
            status: 200,
            data:{
                success: true,
                msg : "successfully load main view data",
                //data : main
            }
        }

    }catch(err){
        console.log(err);
        return {
            status: 502,
            data:{
                success: false,
                msg : "DB main view loading error"
            }
        }
    }

}