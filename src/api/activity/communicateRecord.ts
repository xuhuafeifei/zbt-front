import { http } from "@/utils/http";
import { R, activityUrlApi, convertDateToString } from "../utils";
import { en } from "element-plus/es/locale";

export class CommunicateRecordEntity {
  /** 主键 */
  id: Number;
  /** 父消息id */
  pid: Number;
  /** 消息发送者id */
  uploaderId: Number;
  /** 消息发送者的姓名 */
  uploaderName: String;
  /** 消息内容 */
  content: String;
  /** 消息关联的订单id */
  orderId: Number;
  /** 消息发送时间 */
  uploadTime: String;
  /** 子评论集合 */
  childrenList: Array<CommunicateRecordEntity>;
}

/** 查询活动库下的素材, 关于订单id为order_id的沟通信息 */
export const getCommunicateRecordByOrderId = (orderId: Number) => {
  return http.request<R<Array<CommunicateRecordEntity>>>(
    "get",
    activityUrlApi(`communicaterecord/listAll?orderId=${orderId}`)
  );
};

/** 新增沟通记录 */
export const saveCommunicateRecord = (data?: CommunicateRecordEntity) => {
  return http.request<R<String>>(
    "post",
    activityUrlApi("communicaterecord/save"),
    {
      data
    }
  );
};
