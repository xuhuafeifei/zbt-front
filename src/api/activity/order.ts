import { http } from "@/utils/http";
import { PageUtils, R, activityUrlApi, convertDateToString, getStoreUser } from "../utils";
import { ActivityDto } from "./activity";

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
  }
}

/** 查询订单数据 */
export const getOrderList = (page: number, limit: number, userId: number) => {
  return http.request<R<PageUtils<OrderEntity>>>(
    "get",
    activityUrlApi(`order/list?page=${page}&limit=${limit}&userId=${userId}`)
  );
};

/** 保存订单数据 */
export const saveOrder = (data?: OrderEntity) => {
  return http.request<R<PageUtils<OrderEntity>>>(
    "post",
    activityUrlApi("order/save"),
    {
      data
    }
  );
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
