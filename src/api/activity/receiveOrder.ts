import { http } from "@/utils/http";
import {
  PageUtils,
  R,
  activityUrlApi,
  convertDateToString,
  getStoreUser
} from "../utils";
import { ActivityDto } from "./activity";
import { OrderEntity } from "./order";
import { en } from "element-plus/es/locale";

export class ReceOrderEntity {
  /** 接单id */
  id: Number;
  /** 接单时间 */
  orderReceiveTime: String;
  /** 设计师 */
  designer: String;
  /** 传递初稿时间 */
  firstDraftTime: String;
  /** 传递源文件时间 */
  firstSourcefileTime: String;
  /** 完成时间 */
  finishTime: String;
  /** 联系人电话 */
  concatTelephone: String;
  /** 设计师id */
  designerId: Number;

  /** 接单id = 下单id */
  constructor(orderId: Number) {
    this.orderReceiveTime = convertDateToString(new Date());
    const user = getStoreUser();
    this.designer = user.username;
    this.designerId = user.id;
    this.id = orderId;
  }

  setValueFromEntity(entity: ReceOrderEntity) {
    if (entity === null) {
      this.orderReceiveTime = null;
      this.designer = null;
      this.designerId = null;
      this.id = null;
      return;
    }
    this.id = entity.id;
    this.concatTelephone = entity.concatTelephone;
    this.designer = entity.designer;
    this.designerId = entity.designerId;
    this.finishTime = entity.finishTime;
    this.orderReceiveTime = entity.orderReceiveTime;
    this.firstDraftTime = entity.firstDraftTime;
    this.firstSourcefileTime = entity.firstSourcefileTime;
  }
}

/** 查询接单数据 */
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

/** 接单 */
export const saveReceOrder = (data?: ReceOrderEntity) => {
  return http.request<R<String>>("post", activityUrlApi("receorder/save"), {
    data
  });
};

/** 根据id查询order */
export const getReceOrderById = (id: number) => {
  return http.request<R<ReceOrderEntity>>(
    "get",
    activityUrlApi("receorder/info/" + id)
  );
};
