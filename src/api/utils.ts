export const baseUrlApi = (url: string) => `/api_zbt/${url}`;
export const activityUrlApi = (url: string) => `/api_zbt/activity/${url}`;

export const pictType = "pict";
export const fileType = "sourcefile";

/** 后端返回通用数据类型 */
export type R<T> = {
  code: Number;
  msg: String;
  data: T;
};

import { format } from "date-fns";

/** Date转换为String, 格式为yyyy-MM-dd HH:mm:ss */
export const convertDateToString = (date: Date) =>
  format(date, "yyyy-MM-dd HH:mm:ss");

/** 同步休眠函数, 参数为毫秒 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/** 分页数据类型 */
export type PageUtils<T> = {
  /** 总记录数 */
  totalCount: number;
  /** 每页记录数 */
  pageSize: number;
  /** 总页数 */
  totalPage: number;
  /** 当前页数 */
  currPage: number;
  /** 列表数据 */
  list: Array<T>;
};

export const getStoreUser = () => {
  const res = sessionStorage.getItem("user-info");
  // const res = sessionStorage.getItem("user-info");
  console.log(res);
  return JSON.parse(res);
};

export const getFilenameFromURL = (url: String) => {
  // 去除URL的协议（http, https, etc.）
  const filePath = url.split("://")[1];
  // 去除URL的主机部分（域名或IP地址）
  const fileName = filePath.split("/")[filePath.split("/").length - 1];
  // 返回文件名
  return fileName;
};
