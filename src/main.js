import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "ant-design-vue/dist/antd.css"; // 引入样式
// import Antd from "ant-design-vue"; // 引入ant-design-vue组件
// import Button from "ant-design-vue/lib/button"; // 按需引入
// import "ant-design-vue/lib/button/style"; // button 样式
import { Button, Layout, Menu, Icon, Drawer, Radio } from "ant-design-vue"; // 按需引入
Vue.config.productionTip = false;

// Vue.use(Antd)
Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
