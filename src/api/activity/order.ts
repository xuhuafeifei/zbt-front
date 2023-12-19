import { http } from "@/utils/http";
import {
  PageUtils,
  R,
  activityUrlApi,
  convertDateToString,
  getStoreUser
} from "../utils";
import { ActivityDto } from "./activity";
import { en } from "element-plus/es/locale";

export class OrderEntity {
  /** 订单id */
  id: Number;
  /** 订单时间 */
  orderTime: String;
  /** 需求门店 */
  demandStore: String;
  /** 需求时间 */
  demandTime: String;
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
  /** 是否删除 */
  isDelete: number;
  /** 订单状态 */
  status: String;
  /** 下单用户id */
  userId: number;
  /** 下单那用户姓名 */
  orderUserName: String;
  /** 关联素材id */
  actId: Number;
  /** 活动名称 */
  actName: String;
  /** 完成时间 */
  finishTime: String;
  /** 接单用户id */
  receUserId: Number;

  constructor() {}

  setValueFromActivityDto(dto: ActivityDto) {
    this.brand = dto.brand;
    this.festival = dto.festival;
    this.material = dto.material;
    this.useCol = dto.useCol;
    this.topic = dto.topic;
    this.userId = getStoreUser().id;
    this.orderUserName = getStoreUser().name;
    this.status = "待接单";
    this.orderTime = convertDateToString(new Date());
    this.actId = dto.id;
    this.actName = dto.name;
  }

  setValueFromEntity(entity: OrderEntity) {
    this.id = entity.id; // 订单id
    this.orderTime = entity.orderTime; // 订单时间
    this.demandStore = entity.demandStore; // 需求门店
    this.demandTime = entity.demandTime; // 需求时间
    this.material = entity.material; // 物料
    this.useCol = entity.useCol; // 用途
    this.festival = entity.festival; // 节日
    this.topic = entity.topic; // 主题
    this.brand = entity.brand; // 品牌
    this.isDelete = entity.isDelete; // 是否删除
    this.status = entity.status; // 订单状态
    this.userId = entity.userId; // 下单用户id
    this.orderUserName = entity.orderUserName; // 下单用户姓名
    this.actId = entity.actId; // 关联素材id
    this.actName = entity.actName; // 活动名称
    this.finishTime = entity.finishTime; // 完成时间
    this.receUserId = entity.receUserId; // 接单用户id
  }
}

/** 查询订单数据 */
export const getOrderListWithUserId = (
  page: number,
  limit: number,
  userId: number
) => {
  return http.request<R<PageUtils<OrderEntity>>>(
    "get",
    activityUrlApi(`order/list?page=${page}&limit=${limit}&userId=${userId}`)
  );
};

export class ConditionOrder {
  page: Number;
  limit: Number;
  userId: Number;
  status: String;

  constructor() {
    this.limit = 1;
    this.page = 10;
    this.userId = null;
    this.status = "";
  }
}

export const getOrderList = (data?: ConditionOrder) => {
  const { page, limit, userId, status } = data;
  return http.request<R<PageUtils<OrderEntity>>>(
    "get",
    activityUrlApi(
      `order/list?page=${page}&limit=${limit}&userId=${userId}&status=${status}`
    )
  );
};

/** 保存订单数据 */
export const saveOrder = (data?: OrderEntity) => {
  return http.request<R<String>>("post", activityUrlApi("order/save"), {
    data
  });
};

/** 修改订单数据 */
export const updateOrder = (data?: OrderEntity) => {
  return http.request<R<PageUtils<OrderEntity>>>(
    "post",
    activityUrlApi("order/update"),
    {
      data
    }
  );
};

/** 根据id查询order */
export const getOrderById = (id: number) => {
  return http.request<R<OrderEntity>>(
    "get",
    activityUrlApi("order/info/" + id)
  );
};

/** 验收 */
export const checkAndAccept = (orderId: Number) => {
  return http.request<R<String>>(
    "get",
    activityUrlApi(`/order/checkAndAccept?orderId=${orderId}`)
  );
};
