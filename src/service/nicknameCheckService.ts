import User from "../models/User";

export default async function checkNickname(nickname: string) {
  try {
    let user = await User.findOne({
      where: {
        nickname: nickname,
      },
    });

    if (user) {
      return {
        data: "alreadyExistNickname",
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        msg: "사용가능한 닉네임입니다.",
      },
    };
  } catch (err) {
    return {
      status: 500,
      data: {
        success: false,
        msg: "Server Error",
      },
    };
  }
}
