import { db } from '../models';
import { QueryTypes } from 'sequelize';
import s3 from '../Loaders/s3';
import writePostDTO from '../interface/req/writePostDTO';
import postDTO from '../interface/req/postDTO';
import courseDTO from '../interface/req/courseDTO';
import warningDTO from '../interface/req/warningDTO';
import themeDTO from '../interface/req/themeDTO';
import imageDTO from '../interface/req/imageDTO';
import tagDTO from '../interface/req/tagDTO';

const warningMap = {
  0: '고속도로',
  1: '산길포함',
  2: '초보힘듦',
  3: '사람많음',
};

function deleteImage(deleted: string[]) {
  for (let value of deleted) {
    const key = value.split('https://charo-server.s3.ap-northeast-2.amazonaws.com/')[1];
    s3.deleteObject({
      Bucket: 'charo-server',
      Key: key,
    });
  }
}

export default async function modifyPostService(
  postId: number,
  deleted: string[],
  postEntity: writePostDTO
) {
  deleteImage(deleted);

  const image: imageDTO = {
    image1: postEntity.courseImage[0],
  };

  let imageSize = postEntity.courseImage.length;
  if (imageSize > 1) {
    image.image2 = postEntity.courseImage[1];
    if (imageSize > 2) {
      image.image3 = postEntity.courseImage[2];
      if (imageSize > 3) {
        image.image4 = postEntity.courseImage[3];
        if (imageSize > 4) {
          image.image5 = postEntity.courseImage[4];
          if (imageSize > 5) image.image6 = postEntity.courseImage[5];
        }
      }
    }
  }

  // post table
  const post: postDTO = {
    title: postEntity.title,
    userId: postEntity.userId,
    province: postEntity.province,
    region: postEntity.region,
    isParking: postEntity.isParking,
    parkingDesc: postEntity.parkingDesc,
    courseDesc: postEntity.courseDesc,
  };

  // course table
  const courseSize = postEntity.course.address.length;
  const course: courseDTO = {
    src: postEntity.course.address[0],
    srcLatitude: postEntity.course.latitude[0],
    srcLongitude: postEntity.course.longtitude[0],

    dest: postEntity.course.address[courseSize - 1],
    destLatitude: postEntity.course.latitude[courseSize - 1],
    destLongitude: postEntity.course.longtitude[courseSize - 1],
  };
  if (courseSize > 2) {
    course.wayOne = postEntity.course.address[1];
    course.wayOneLatitude = postEntity.course.latitude[1];
    course.wayOneLongitude = postEntity.course.longtitude[1];

    if (courseSize > 3) {
      course.wayTwo = postEntity.course.address[2];
      course.wayTwoLatitude = postEntity.course.latitude[2];
      course.wayTwoLongitude = postEntity.course.longtitude[2];
    }
  }

  const tags: tagDTO = {
    postId: postId,
    region: postEntity.region,
    theme: postEntity.theme[0],
  };

  try {
    db.Post.update(post, { where: { id: postId } });
    db.Course.update(course, { where: { postId: postId } });

    db.PostHasImage.update(image, { where: { postId: postId } });

    //PostHasTheme
    const deleteTheme = 'DELETE FROM post_has_theme WHERE postId=:postId';
    await db.sequelize.query(deleteTheme, {
      type: QueryTypes.DELETE,
      replacements: { postId: postId },
      raw: true,
      nest: true,
    });
    postEntity.theme.map((value, index) => {
      const theme: themeDTO = {
        postId: postId,
        themeName: value,
      };
      db.PostHasTheme.create(theme);
    });

    //PostHasWarning
    const deleteWarning = 'DELETE FROM post_has_warning WHERE postId=:postId';
    await db.sequelize.query(deleteWarning, {
      type: QueryTypes.DELETE,
      replacements: { postId: postId },
      raw: true,
      nest: true,
    });
    postEntity.warning.map((value, index) => {
      if (index == 0) {
        if (value) {
          tags.warning = warningMap[index];
          db.PostHasTags.update(tags, { where: { postId: postId } });
        } else {
          db.PostHasTags.update(tags, { where: { postId: postId } });
        }
      }
      if (value) {
        const warning: warningDTO = {
          postId: postId,
          warningName: warningMap[index],
        };
        db.PostHasWarning.create(warning);
      }
    });

    return {
      status: 200,
      data: {
        success: true,
        msg: '옛날옛날에 아기돼지 6 형제가 살았습니다 내일은.. 내일은 서버왕', // "modify - DB upload success";
      },
    };
  } catch (err) {
    return {
      status: 400,
      data: {
        success: false,
        msg: 'modify - DB update fail',
      },
    };
  }
}
