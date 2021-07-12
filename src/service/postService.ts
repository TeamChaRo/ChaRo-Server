import { db } from "../models";

export async function likePostService(userId: string, postId:string){

    return {
        status: 200,
        data:{
            success: true,
            msg : "이 메시지를 읽었으니 오늘은 행복할거에여~~~ 맛있는거 먹쟈아아므ㅏ의므라므ㅏ 성공!" //"successfully liking the post",
        }
    }
}