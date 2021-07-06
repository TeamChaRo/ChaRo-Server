import { sequelize } from "../Loaders/db";
import { QueryTypes} from 'sequelize';

/* TO 지은, 정말 쿼리문 or 시퀄라이즈 이용해서 게시글 모든 정보를 얻어올 수 있을거야 이걸 DTO import 해서 맞춰서 data에 리턴 시키면 될듯! */
export async function localMain(userId: string, city: string ){
  // P 가 post 객체나 마찬가지 -> 얘를 SELECT 옆에서 파싱하면 된다. / isFavorite이 null일 때만 하트X 
  const query = `SELECT P.id, P.userId, liked_post.postId as isFavorite
               FROM (SELECT * FROM post WHERE post.city= :city) AS P
               LEFT OUTER JOIN liked_post ON( 
               liked_post.userId = :userId 
               AND P.id = liked_post.postId)`             
 
  const ret = await sequelize.query(query,{ replacements:{userId:userId, city:city},type: QueryTypes.SELECT });
  console.log(ret);
}

export async function themeMain(userId: string, theme: number){
  // P 가 post 객체나 마찬가지 -> 얘를 SELECT 옆에서 파싱하면 된다. / isFavorite이 null일 때만 하트X 
  const query = `SELECT P.id, P.userId, liked_post.postId as isFavorite
                FROM (SELECT * FROM post INNER JOIN post_has_theme WHERE post.id = post_has_theme.postId AND post_has_theme.theme1= :theme) AS P
                LEFT OUTER JOIN liked_post ON( 
                liked_post.userId = :userId 
                AND P.id = liked_post.postId)` 

  const ret = await sequelize.query(query,{ replacements:{userId:userId, theme:theme},type: QueryTypes.SELECT }); 
  console.log(ret);
}