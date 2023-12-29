import { http } from "@/utils/http";
import { R, activityUrlApi, convertDateToString } from "../utils";
import { en } from "element-plus/es/locale";

export class OptionDto {
  /** 材料选项列表 */
  materialList: Array<String>;
  /** 用途选项列表 */
  useList: Array<String>;
  /** 节日选项列表 */
  festivalList: Array<String>;
  /** 专题选项列表 */
  topicList: Array<String>;
  /** 品牌选项列表 */
  brandList: Array<String>;
}

export class ActivityFileEntity {
  /** 主键 */
  id: number;
  /** 关联的活动id */
  actId: number;
  /** url */
  url: string;
  /** 文件名 */
  name: string;
  /** 文件类型【pict/sourcefile】*/
  type: string;
  /** 是否被删除 */
  isDelete: number;
  /** 上传时间 */
  uploadTime: string;
}

export class ActivityEntity {
  id: Number;
  name: String;
  uploadTime: String;
  uploader: String;
  material: String;
  useCol: String;
  festival: String;
  topic: String;
  brand: String;
  applicableGrade: String;
  schemeIntro: String;

  setValueFromEntity(dto: ActivityDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.uploadTime = dto.uploadTime;
    this.uploader = dto.uploader;
    this.material = dto.material;
    this.brand = dto.brand;
    this.useCol = dto.useCol;
    this.festival = dto.festival;
    this.topic = dto.topic;
    this.applicableGrade = dto.applicableGrade;
    this.schemeIntro = dto.schemeIntro;
  }
}

export class ActivityDto {
  /** 主键 */
  id: Number;
  /** 活动名称 */
  name: String;
  /** 上传时间 */
  uploadTime: String;
  /** 上传者 */
  uploader: String;
  /** 物料 */
  material: String;
  /** 用途 */
  useCol: String;
  /** 节日 */
  festival: String;
  /** 主题 */
  topic: String;
  /** 品牌 */
  brand: String;
  /** 适用等级集合 */
  applicableGradeList: Array<String>;
  /** 适用等级 */
  applicableGrade: String;
  /** 活动介绍 */
  schemeIntro: String;
  /** 活动图片集合 */
  picturesUrl: Array<ActivityFileEntity>;
  /** 活动文件集合 */
  sourcefilesUrl: Array<ActivityFileEntity>;

  materialList: Array<String>;
  useColList: Array<String>;
  festivalList: Array<String>;
  topicList: Array<String>;
  brandList: Array<String>;

  constructor() {
    this.name = "";
    this.uploadTime = convertDateToString(new Date());
    this.uploader = "";
    this.material = "";
    this.useCol = "";
    this.festival = "";
    this.topic = "";
    this.brand = "";
    this.applicableGrade = "";
    this.applicableGradeList = new Array<String>();
    this.picturesUrl = new Array<ActivityFileEntity>();
    this.schemeIntro = "";
    this.sourcefilesUrl = new Array<ActivityFileEntity>();

    this.materialList = new Array<String>();
    this.brandList = new Array<String>();
    this.festivalList = new Array<String>();
    this.topicList = new Array<String>();
    this.festivalList = new Array<String>();
  }

  setValueFromEntity(dto: ActivityDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.uploadTime = dto.uploadTime;
    this.uploader = dto.uploader;
    this.material = dto.material;
    this.brand = dto.brand;
    this.useCol = dto.useCol;
    this.festival = dto.festival;
    this.topic = dto.topic;
    this.applicableGrade = dto.applicableGrade;
    this.applicableGradeList = dto.applicableGrade.split(",");
    this.picturesUrl = dto.picturesUrl;
    this.schemeIntro = dto.schemeIntro;
    this.sourcefilesUrl = dto.sourcefilesUrl;

    this.brandList = dto.brandList;
    this.materialList = dto.materialList;
    this.topicList = dto.topicList;
    this.festivalList = dto.festivalList;
    this.useColList = dto.useColList;
  }

  toEntity(): ActivityEntity {
    const entity = new ActivityEntity();
    entity.setValueFromEntity(this);
    return entity;
  }

  toSubmitDto(): ActivityDto {
    const dto = new ActivityDto();
    dto.setValueFromEntity(this);
    dto.sourcefilesUrl = null;
    dto.picturesUrl = null;
    return dto;
  }
}

export class Select {
  value: String;
  label: String;
}

export class OptionSelectDto {
  /** 材料选项列表 */
  materialList: Array<Select>;
  /** 用途选项列表 */
  useList: Array<Select>;
  /** 节日选项列表 */
  festivalList: Array<Select>;
  /** 专题选项列表 */
  topicList: Array<Select>;
  /** 品牌选项列表 */
  brandList: Array<Select>;
}

/** 查询活动库, 获取所有optionDto选项 */
export const getActivityOptionDto = () => {
  return http.request<R<OptionDto>>(
    "get",
    activityUrlApi("activity/listOption")
  );
};

/** 查询活动库, 获取所有的optionSelectDto选线 */
export const getActivityOptionSelectDto = () => {
  return http.request<R<OptionSelectDto>>(
    "get",
    activityUrlApi("activity/listOptionSelect")
  );
};

/** 保存活动表单 */
export const saveActivity = (data?: ActivityDto) => {
  return http.request<R<Number>>("post", activityUrlApi("activity/save"), {
    data
  });
};

/** 修改活动表单 */
export const updateActivity = (data?: ActivityDto) => {
  return http.request<R<String>>("post", activityUrlApi("activity/update"), {
    data
  });
};

/** 查询活动数据 */
export const getFileByActId = (id: Number, fileType: string) => {
  return http.request<R<Array<ActivityFileEntity>>>(
    "get",
    activityUrlApi(`file/getFileByActId?actId=${id}&fileType=${fileType}`)
  );
};

/** 删除活动素材 */
export const deleteById = (actId: number) => {
  return http.request<R<String>>(
    "delete",
    activityUrlApi(`activity/delete?actId=${actId}`)
  );
};
