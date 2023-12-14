import { http } from "@/utils/http";
import { PageUtils, R, activityUrlApi, convertDateToString } from "../utils";
import { ActivityDto, ActivityEntity } from "./activity";

/** 查询活动库, 获取所有optionDto选项 */
export const getActivityPageList = (page: number, limit: number) => {
  return http.request<R<PageUtils<ActivityDto>>>(
    "get",
    activityUrlApi(`activity/list?page=${page}&limit=${limit}`)
  );
};
