import { http } from "@/utils/http";
import { R, activityUrlApi } from "./utils";

export type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
    /** 用户id */
    id: number;
    /** 用户姓名 */
    name: string;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
    /** 用户id */
    id: number;
  };
};

/** 用户信息 */
export class UserInfoEntity {
  /** 主键 */
  id: Number;
  /** 信息内容 */
  infoContent: String;
  /** 关联用户id */
  userId: Number;
  /** 信息类型 */
  infoType: String;
}

/** 获取用户信息 */
export const getUserInfoByUserId = (userId: Number, infoType: String) => {
  return http.request<R<Array<UserInfoEntity>>>(
    "get",
    activityUrlApi(
      `userinfo/listByUserId?userId=${userId}&infoType=${infoType}`
    )
  );
};


/** 保存用户信息 */
export const saveUserInfo = (data: UserInfoEntity) => {
  return http.request<R<any>>("post", activityUrlApi("userinfo/save"), {
    data
  });
};

/** 登录 */
export const getLogin = (data?: object) => {
  const { username, password } = data;
  return http.request<UserResult>(
    "get",
    activityUrlApi(`user/login?username=${username}&password=${password}`)
  );
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refreshToken", { data });
};
