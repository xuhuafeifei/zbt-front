import { http } from "@/utils/http";
import { R, activityUrlApi, convertDateToString } from "../utils";

export class OptionEntity {
  id: Number;
  // 活动库名称
  libraryName: String;
  // 类型名称
  typeName: String;
  // 选项名称
  optionName: String;
  // 上传时间
  uploadTime: String;
  // 状态
  status: String;

  constructor() {
    this.libraryName = "";
    this.typeName = "";
    this.optionName = "";
    this.uploadTime = convertDateToString(new Date());
    this.status = "启用";
  }

  setValueFromEntity(entity: OptionEntity) {
    if (entity === undefined || entity === null) return;
    this.id = entity.id;
    this.libraryName = entity.libraryName;
    this.typeName = entity.typeName;
    this.optionName = entity.optionName;
    this.uploadTime = entity.uploadTime;
    this.status = entity.status;
  }

  setValueFromValues(libraryName: String, typeName: String) {
    this.libraryName = libraryName;
    this.typeName = typeName;
  }

  setValueExceptId(entity: OptionEntity) {
    if (entity === undefined || entity === null) return;
    this.id = null;
    this.libraryName = entity.libraryName;
    this.typeName = entity.typeName;
    this.optionName = entity.optionName;
    this.uploadTime = entity.uploadTime;
    this.status = entity.status;
  }
}

/** 查询活动库, typeName类型的选项 */
export const getActivityOptionListByTypeName = (typeName: String) => {
  return http.request<R<Array<OptionEntity>>>(
    "get",
    activityUrlApi(`option/listAll?libraryName=活动库&typeName=${typeName}`)
  );
};

/** 新增选项 */
export const saveActivityOption = (data?: Object) => {
  console.log(data);
  return http.request<R<String>>("post", activityUrlApi("option/save"), {
    data
  });
};

/** 修改选项 */
export const updateActivityOption = (data?: Object) => {
  console.log(data);
  return http.request<R<String>>("post", activityUrlApi("option/update"), {
    data
  });
};

/** 删除选项 */
export const deleteActivityOption = (data?: Object) => {
  console.log(data);
  return http.request<R<String>>("delete", activityUrlApi("option/delete"), {
    data
  });
};
