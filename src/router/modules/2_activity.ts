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
    // {
    //   path: "/activity/infoAll",
    //   name: "infoAll",
    //   component: () => import("@/views/activity/index.vue"),
    //   meta: {
    //     title: "活动库",
    //     showLink: VITE_HIDE_HOME === "true" ? false : true,
    //     icon: "pencilLine"
    //   }
    // },
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
      path: "/activity/manager",
      name: "activityManager",
      component: () => import("@/views/activity/manager.vue"),
      meta: {
        title: "活动管理",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/activity/settings",
      name: "activitySettings",
      component: () => import("@/views/activity/setting.vue"),
      meta: {
        title: "活动管理",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    }
  ]
} as RouteConfigsTable;
