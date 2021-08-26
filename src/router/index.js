import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "@/views/404";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //加载动画
// 使用render函数，替代 RenderRouterView
// import RenderRouterView from "../components/RenderRouterView";
Vue.use(VueRouter);

const routes = [
  {
    name: "user",
    path: "/user",
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
        component: { render: (h) => h("router-view") },
        children: [
          {
            name: "analysis",
            path: "/dashboard/analysis",
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
        component: { render: (h) => h("router-view") },
        children: [
          {
            name: "basic-form",
            path: "/form/basicForm",
            component: () =>
              import(
                /* webpackChunkName: "basicForm" */ "../views/forms/BasicForm"
              ),
          },
          {
            name: "step-form",
            path: "/form/stepForm",
            // component: () => import(/* webpackChunkName: "stepForm" */ "../views/forms/stepForm"),// index.js不生效？
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
    path: "/*",
    name: "404",
    component: NotFound,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
