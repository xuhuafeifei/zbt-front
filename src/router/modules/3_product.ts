const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/product",
  name: "product",
  component: Layout,
  redirect: "/product",
  meta: {
    icon: "boxFill",
    title: "产品库",
    showLink: false,
    rank: 0
  },
  children: [
    {
      path: "/product/infoAll",
      name: "productInfoAll",
      component: () => import("@/views/product/index.vue"),
      meta: {
        title: "产品库",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/product/shopBus",
      name: "productShopBus",
      component: () => import("@/views/product/shopBus.vue"),
      meta: {
        title: "购物车",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/product/order",
      name: "productOrder",
      component: () => import("@/views/product/order.vue"),
      meta: {
        title: "产品订单",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/product/orderDetail/:id",
      name: "productOrderDetail",
      component: () => import("@/views/product/orderDetail.vue"),
      meta: {
        title: "产品订单详情",
        showLink: false,
        icon: "pencilLine"
      }
    },
    {
      path: "/product/manager",
      name: "productManager",
      component: () => import("@/views/product/manager.vue"),
      meta: {
        title: "产品库管理",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/product/settings",
      name: "productSettings",
      // component: () => import("@/views/product/setting.vue"),
      component: Layout,
      meta: {
        title: "产品库设置",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      },
      children: [
        {
          path: "/product/styleSettings",
          name: "productStyleSetting",
          component: () => import("@/views/product/setting/style.vue"),
          meta: {
            title: "款式设置",
            showLink: VITE_HIDE_HOME === "true" ? false : true,
            icon: "pencilLine"
          }
        },
        {
          path: "/product/sizeSettings",
          name: "productSizeSetting",
          component: () => import("@/views/product/setting/size.vue"),
          meta: {
            title: "尺寸设置",
            showLink: VITE_HIDE_HOME === "true" ? false : true,
            icon: "pencilLine"
          }
        }
      ]
    }
  ]
} as RouteConfigsTable;
