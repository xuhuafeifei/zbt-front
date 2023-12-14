import { http } from "@/utils/http";
import { R } from "./utils";
import { fileUrlApi } from "./utils";
import { ActivityFileEntity } from "./activity/activity";

/** 上传文件 */
export const uploadFile = (data: FormData, actId: number, fileType: string) => {
  return http.request<R<String>>(
    "post",
    fileUrlApi(`file/uploadFileList?actId=${actId}&fileType=${fileType})`),
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
    fileUrlApi(`file/uploadFileList?actId=${actId}&fileType=${fileType}`),
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
  return http.request<R<String>>("post", fileUrlApi("file/deleteFile"), {
    data
  });
};

/** 批量删除文件 */
export const deleteFileList = (data?: Array<ActivityFileEntity>) => {
  return http.request<R<String>>("post", fileUrlApi("file/deleteFileList"), {
    data
  });
};
