import User from '../models/User';

export default async function checkId(id: string) {
  try {
    let user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      return {
        data: 'alreadyExistUser',
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        msg: '사용가능한 아이디입니다.',
      },
    };
  } catch (err) {
    return {
      status: 500,
      data: {
        success: false,
        msg: 'Server Error',
      },
    };
  }
}
