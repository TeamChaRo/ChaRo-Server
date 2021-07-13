export interface myPageUser{
    nickname: string,
    profileImage: string,
    following: string[],
    follower: string[]
}

export interface myPagePreview{
    title: string,
    image: string,
    tags: string[],
    favoriteNum: number,
    saveNum: number,
    year: string,
    month: string,
    day: string
}

type myPagePreviewCollection = myPagePreview[];

export interface myPageDTO{
    userInformation: myPageUser,
    
    writtnTotal : number,
    writtenPost: myPagePreviewCollection,
    savedTotal : number,
    savedPost: myPagePreviewCollection

}