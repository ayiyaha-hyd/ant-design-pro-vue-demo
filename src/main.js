import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "ant-design-vue/dist/antd.css"; // 引入样式
// import Antd from "ant-design-vue"; // 引入ant-design-vue组件
// import Button from "ant-design-vue/lib/button"; // 按需引入
// import "ant-design-vue/lib/button/style"; // button 样式
import { Button, Layout, Menu, Icon, Drawer, Radio } from "ant-design-vue"; // 按需引入
// 将权限校验组件注册为全局组件
import Authorized from "@/components/Authorized";
import Auth from "@/directives/auth"; // 函数式指令
Vue.config.productionTip = false; // 消息提示的环境配置，生产上配置为true

// Vue.use(Antd) 不引入ant-design全部组件，按需引入
// ant组件按需引入，全局引入（优化点）
Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.component("Authorized", Authorized); // 全局注册,不同于Vue.use，它做了特殊处理，我们需要commponent进行全局注册
Vue.use(Auth);
// 创建Vue实例，传入路由，状态仓库，渲染到App.vue上，挂载到<div id="app">上
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
