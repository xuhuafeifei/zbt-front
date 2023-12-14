import { http } from "@/utils/http";
import { PageUtils, R, activityUrlApi } from "../utils";
import { ActivityDto } from "./activity";

/** 查询活动库, 获取所有optionDto选项 */
export const getActivityPageList = (page: number, limit: number) => {
  return http.request<R<PageUtils<ActivityDto>>>(
    "get",
    activityUrlApi(`activity/list?page=${page}&limit=${limit}`)
  );
};

/** 查询活动库需要的条件 */
export class ConditionActivity {
  page: number;
  limit: number;
  material: Array<string>;
  useCol: Array<string>;
  festival: Array<string>;
  topic: Array<string>;
  brand: Array<string>;
}

export const getActivityPageListWithCondition = (data?: ConditionActivity) => {
  return http.request<R<PageUtils<ActivityDto>>>(
    "post",
    activityUrlApi("activity/listWithCondition"),
    {
      data
    }
  );
};
