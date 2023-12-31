import { http } from "@/utils/http";
import { activityUrlApi } from "./utils";

type Result = {
  success: boolean;
  data: Array<any>;
};

/** 路由由后端返回, 取代前端的mock功能 */
export const getAsyncRoutes = () => {
  return http.request<Result>("get", activityUrlApi("activity/getAsyncRoutes"));
  // return http.request<Result>("get", "/getAsyncRoutes");
};
