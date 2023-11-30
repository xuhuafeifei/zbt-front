const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/gift",
  name: "gift",
  component: Layout,
  redirect: "/gift",
  meta: {
    icon: "giftFill",
    title: "礼品库",
    rank: 0
  },
  children: [
    {
      path: "/gift/infoAll",
      name: "infoAll",
      component: () => import("@/views/gift/index.vue"),
      meta: {
        title: "礼品库",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/gift/shopBus",
      name: "shopBus",
      component: () => import("@/views/gift/shopBus.vue"),
      meta: {
        title: "购物车",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/gift/order",
      name: "order",
      component: () => import("@/views/gift/order.vue"),
      meta: {
        title: "礼品订单",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/gift/manager",
      name: "manager",
      component: () => import("@/views/gift/manager.vue"),
      meta: {
        title: "礼品库管理",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/gift/settings",
      name: "settings",
      component: () => import("@/views/gift/setting.vue"),
      meta: {
        title: "礼品库设置",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    }
  ]
} as RouteConfigsTable;
