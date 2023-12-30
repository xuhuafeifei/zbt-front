import { http } from "@/utils/http";
import { R, activityUrlApi } from "../utils";
import { ActivityFileEntity } from "./activity";

/** 上传文件 */
export const uploadFile = (data: FormData, actId: number, fileType: string) => {
  return http.request<R<String>>(
    "post",
    activityUrlApi(`file/uploadFileList?actId=${actId}&fileType=${fileType})`),
    {
      data,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

/** 批量上传文件 */
export const uploadFileList = (
  data: FormData,
  actId: Number,
  fileType: string
) => {
  return http.request<R<Array<String>>>(
    "post",
    activityUrlApi(`file/uploadFileList?actId=${actId}&fileType=${fileType}`),
    {
      data,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

/** 删除文件 */
export const deleteFile = (data?: ActivityFileEntity) => {
  return http.request<R<String>>("post", activityUrlApi("file/deleteFile"), {
    data
  });
};

/** 批量删除文件 */
export const deleteFileList = (data?: Array<ActivityFileEntity>) => {
  return http.request<R<String>>(
    "post",
    activityUrlApi("file/deleteFileList"),
    {
      data
    }
  );
};

/** 传递初稿, 并修改接单表中上传信息, 返回图片url */
export const uploadFirstDraft = (
  data: FormData,
  actId: Number,
  fileType: string,
  orderId: Number
) => {
  return http.request<R<String>>(
    "post",
    activityUrlApi(
      `file/firstDraft?actId=${actId}&fileType=${fileType}&orderId=${orderId}`
    ),
    {
      data,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

/** 传递源文件, 并修改接单表中上传信息  */
export const uploadFirstSourcefile = (
  data: FormData,
  actId: Number,
  fileType: string,
  orderId: Number
) => {
  return http.request<R<String>>(
    "post",
    activityUrlApi(
      `file/firstSourcefile?actId=${actId}&fileType=${fileType}&orderId=${orderId}`
    ),
    {
      data,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};
