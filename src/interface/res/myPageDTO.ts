export interface myPageUser {
  nickname: string;
  profileImage: string;
  following: number;
  follower: number;
}

export interface myPagePreview {
  postId: number;
  title: string;
  image: string;
  tags: string[];
  favoriteNum: number;
  saveNum: number;
  year: string;
  month: string;
  day: string;
}

type myPagePreviewCollection = myPagePreview[];

export interface myPageDTO {
  userInformation: myPageUser;

  writtenTotal: number;
  writtenPost: myPagePreviewCollection;
  savedTotal: number;
  savedPost: myPagePreviewCollection;
}
