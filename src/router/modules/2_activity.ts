const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/activity",
  name: "activity",
  component: Layout,
  redirect: "/activity",
  meta: {
    icon: "personPlay",
    title: "活动库",
    rank: 0
  },
  children: [
    {
      path: "/activity/infoAll",
      name: "activityInfoAll",
      component: () => import("@/views/activity/index.vue"),
      meta: {
        title: "活动库",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/activity/order",
      name: "activityOrder",
      component: () => import("@/views/activity/order.vue"),
      meta: {
        title: "活动订单",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/activity/orderDetail/:id",
      name: "activityOrderDetail",
      component: () => import("@/views/activity/orderDetail.vue"),
      meta: {
        title: "活动订单",
        showLink: false,
        icon: "pencilLine"
      }
    },
    {
      path: "/activity/manager",
      name: "activityManager",
      component: () => import("@/views/activity/manager.vue"),
      meta: {
        title: "活动库管理",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/activity/settings",
      name: "activitySettings",
      // component: () => import("@/views/activity/setting.vue"),
      component: Layout,
      meta: {
        title: "活动库设置",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      },
      children: [
        {
          path: "/activity/activitySetting",
          name: "activityActivitySetting",
          component: () => import("@/views/activity/setting/activity.vue"),
          meta: {
            title: "活动设置",
            showLink: VITE_HIDE_HOME === "true" ? false : true,
            icon: "pencilLine"
          }
        },
        {
          path: "/activity/materialSetting",
          name: "activityMaterialSetting",
          component: () => import("@/views/activity/setting/material.vue"),
          meta: {
            title: "物料类型",
            showLink: VITE_HIDE_HOME === "true" ? false : true,
            icon: "pencilLine"
          }
        },
        {
          path: "/activity/useSetting",
          name: "activityUseSetting",
          component: () => import("@/views/activity/setting/use.vue"),
          meta: {
            title: "用途设置",
            showLink: VITE_HIDE_HOME === "true" ? false : true,
            icon: "pencilLine"
          }
        },
        {
          path: "/activity/festivalSetting",
          name: "activityFestivalSetting",
          component: () => import("@/views/activity/setting/festival.vue"),
          meta: {
            title: "节日设置",
            showLink: VITE_HIDE_HOME === "true" ? false : true,
            icon: "pencilLine"
          }
        },
        {
          path: "/activity/topicSetting",
          name: "activityTopicSetting",
          component: () => import("@/views/activity/setting/topic.vue"),
          meta: {
            title: "专题设置",
            showLink: VITE_HIDE_HOME === "true" ? false : true,
            icon: "pencilLine"
          }
        },
        {
          path: "/activity/brandSetting",
          name: "activityBrandSetting",
          component: () => import("@/views/activity/setting/brand.vue"),
          meta: {
            title: "品牌设置",
            showLink: VITE_HIDE_HOME === "true" ? false : true,
            icon: "pencilLine"
          }
        }
      ]
    }
  ]
} as RouteConfigsTable;
