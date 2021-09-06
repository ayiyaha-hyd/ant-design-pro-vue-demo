import Vue from "vue";
import VueRouter from "vue-router"; // 引入 vue路由管理
import NotFound from "@/views/404"; // 无效url访问指定跳转页面
import NProgress from "nprogress"; // 页面跳转是出现在浏览器顶部的进度条 官网:https://ricostacruz.com/nprogress/
import "nprogress/nprogress.css"; // NProgress加载动画css
import { findLast } from "loadsh/collection"; // 引入 loadsh 组件库，调用其方法
import { check, isLogin } from "@/utils/auth"; // 引入 权限校验
import Forbidden from "@/views/Forbidden";
import { notification } from "ant-design-vue";
// 使用render函数，替代 RenderRouterView
// import RenderRouterView from "../components/RenderRouterView";
/*
 * https://www.cnblogs.com/shaozhu520/p/11298805.html
 * vue-router使用：
 * 1.import,2.Vue.use,3.new VueRouter()构造函数构造一个router实例,4.new Vue()添加进去
 */
Vue.use(VueRouter);

const routes = [
  {
    name: "user",
    path: "/user",
    hideInMenu: true,
    // component: RenderRouterView,
    // 添加layout，改造之后，这一部也不需要了
    // component: {render: h=>h("router-view")},
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"),
    children: [
      {
        name: "login",
        path: "/user/login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/Login"),
      },
      {
        name: "register",
        path: "/user/register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/Register"),
      },
    ],
  },
  {
    path: "/",
    meta: {
      authority: ["user", "admin"],
    },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis",
      },
      {
        name: "dashboard",
        path: "/dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: (h) => h("router-view") },
        children: [
          {
            name: "analysis",
            path: "/dashboard/analysis",
            meta: { icon: "analysis", title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/dashboard/Analysis"
              ),
          },
        ],
      },
      {
        name: "form",
        path: "/form",
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        component: { render: (h) => h("router-view") },
        children: [
          {
            name: "basic-form",
            path: "/form/basicForm",
            meta: { icon: "basicForm", title: "基础表单" },
            component: () =>
              import(
                /* webpackChunkName: "basicForm" */ "../views/forms/BasicForm"
              ),
          },
          {
            name: "step-form",
            path: "/form/stepForm",
            hideChildrenMenu: true, //隐藏子路由
            meta: { icon: "stepForm", title: "分布表单" },
            // component: () => import(/* webpackChunkName: "stepForm" */ "../views/forms/stepForm"),// index.js不生效？ 20210827生效
            component: () =>
              import(
                /* webpackChunkName: "stepForm" */ "../views/forms/stepForm/StepForm"
              ),
            children: [
              {
                path: "/form/stepFrom",
                redirect: "/form/stepForm/info",
              },
              {
                name: "info",
                path: "/form/stepForm/info",
                component: () =>
                  import(
                    /* webpackChunkName: "info" */ "../views/forms/stepForm/Step1"
                  ),
              },
              {
                name: "confirm",
                path: "/form/stepForm/confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "confirm" */ "../views/forms/stepForm/Step2"
                  ),
              },
              {
                name: "result",
                path: "/form/stepForm/result",
                component: () =>
                  import(
                    /* webpackChunkName: "result" */ "../views/forms/stepForm/Step3"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden,
  },
  {
    path: "/*",
    name: "404",
    hideInMenu: true,
    component: NotFound,
  },
];

/**
 * this.$router 构造函数new VueRouter()的属性
 * this.$router.options 实例router的属性
 * this.$router.options.routes 自定义传入的路由数据
 * @type {VueRouter}
 */
const router = new VueRouter({
  mode: "history", // 配置路由模式
  base: process.env.BASE_URL, // 应用的基路径
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  // TODO 了解 findLast,to.matched 用法
  const record = findLast(to.matched, (record) => record.meta.authority);
  //如果权限校验没通过
  if (record && !check(record.meta.authority)) {
    //判断是否未登录无权限，未登录跳转到登陆页面
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login",
      });
    } else if (to.path !== "/403") {
      // 已登录无权限
      // 此处注意if...else if充分利用好顺序，判断条件要优化，比如写成else if(isLogin() && to.path !== "/403") 则画蛇添足

      // this.$notification.error 什么时候可以用$xxx????
      notification.error({
        message: "403",
        description: "没有权限，请联系管理员",
      });
      next({
        path: "/403",
      });
      NProgress.done();
    }
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
