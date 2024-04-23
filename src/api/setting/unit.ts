import { http } from "@/utils/http";
import {
  R,
  activityUrlApi,
  convertDateToString,
  settingUrlApi
} from "../utils";

export class UnitEntity {
  id: Number;
  /** 单位名称 */
  unit: String;
  /** 排序 */
  uRank: Number;
  /** 状态【启用/禁用】 */
  status: String;
  createTime: String;
  pid: Number;
  children: Array<UnitEntity>;
}

export type LabelEntity = {
  id: Number;
  label: String;
  value: String;
};

/** 查询单位数据 */
export const getUnitList = () => {
  return http.request<R<Array<UnitEntity>>>(
    "get",
    settingUrlApi("unit/listAll")
  );
};

/** 批量删除 */
export const deleteUnitList = data => {
  return http.request("post", settingUrlApi("unit/delete"), {
    data
  });
};
