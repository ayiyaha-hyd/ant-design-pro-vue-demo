<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        collapsible
        width="256px"
      >
        <div class="logo">Ant Design Vue Pro</div>
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header> </Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer />
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

.logo {
  height: 48px;
  line-height: 48px;
  text-align: center;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.nav-theme-dark >>> .logo {
  color: #ffffff;
}

/*.nav-layout-left >>> .*/
</style>
