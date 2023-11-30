const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/settingCenter",
  name: "settingCenter",
  component: Layout,
  redirect: "/settingCenter",
  meta: {
    icon: "settingIcon",
    title: "设置中心",
    rank: 0
  },
  children: [
    {
      path: "/settingCenter/userSetting",
      name: "userSetting",
      component: () => import("@/views/settingCenter/userSetting.vue"),
      meta: {
        title: "用户设置",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/settingCenter/operatorSetting",
      name: "operatorSetting",
      component: () => import("@/views/settingCenter/operatorSetting.vue"),
      meta: {
        title: "操作员设置",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/setting/roleSetting",
      name: "roleSetting",
      component: () => import("@/views/settingCenter/roleSetting.vue"),
      meta: {
        title: "角色设置",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/setting/roleLevelSetting",
      name: "roleLevelSetting",
      component: () => import("@/views/settingCenter/roleLevelSetting.vue"),
      meta: {
        title: "用户等级设置",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    },
    {
      path: "/setting/unitSetting",
      name: "unitSetting",
      component: () => import("@/views/settingCenter/unitSetting.vue"),
      meta: {
        title: "单位设置",
        showLink: VITE_HIDE_HOME === "true" ? false : true,
        icon: "pencilLine"
      }
    }
  ]
} as RouteConfigsTable;
