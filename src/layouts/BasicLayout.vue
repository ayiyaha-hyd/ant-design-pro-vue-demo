<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <!-- 布局1 -->
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!-- 侧边栏布局 -->
      <a-layout-sider
        collapsible
        width="256px"
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
      >
        <!-- 标题Logo -->
        <div class="logo">Ant Design Vue Pro</div>
        <!-- 自定义侧边栏菜单组件 -->
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <!-- 布局2 -->
      <a-layout>
        <!-- 头部布局 -->
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <!-- 内容布局 -->
        <a-layout-content style="margin: 0 16px"
          ><router-view
        /></a-layout-content>
        <!-- 尾部布局 -->
        <a-layout-footer style="text-align: center"><Footer /></a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- 权限组件，利用函数式组件实现,render -->
    <Authorized :authority="['admin']">
      <!-- 设置-抽屉 -->
      <SettingDrawer />
    </Authorized>
  </div>
</template>

<script>
//引入
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import SiderMenu from "@/layouts/SiderMenu";
import SettingDrawer from "@/components/SettingDrawer";

export default {
  name: "BasicLayout",
  //注册组件
  components: { Header, SiderMenu, Footer, SettingDrawer },

  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
};
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  height: 64px;
  font-size: 20px;
}

.trigger.hover {
  background: #eeeeee;
}

/* logo 样式 */
.logo {
  height: 48px;
  line-height: 48px;
  text-align: center;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

/* css样式穿透，穿透scoped修改样式，用法：[外层容器] >>> [组件]{} */

/* 深色主题 logo 颜色 */
.nav-theme-dark >>> .logo {
  color: #ffffff;
}
/* 浅色主题 logo 颜色 */
.nav-theme-light >>> .logo {
  color: #008b8b;
}

/*.nav-layout-left >>> .*/
</style>
