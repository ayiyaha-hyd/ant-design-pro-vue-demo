<template>
  <div class="sider-menu">
    <!-- 菜单 -->
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <!-- 菜单项 -->
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" type="pie-chart" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <!-- 子菜单项 -->
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "@/layouts/SubMenu";

export default {
  props: {
    theme: {
      type: String,
      default: "dark",
    },
  },
  components: {
    "sub-menu": SubMenu,
  },
  watch: {
    // 路由path发生变化时，改变 左侧菜单项选中和展开
    "$route.path": function (val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
  },
  data() {
    this.count = 0;
    this.selectedKeysMap = {}; // 选中的菜单项集合
    this.openKeysMap = {}; // 展开的菜单项集合
    const menuData = this.getMenuData(this.$router.options.routes); // this.$router.options.routes 路由数据
    return {
      collapsed: false, // 菜单是否收缩
      // this.$route.path 对应当前路由的路径,总是解析为绝对路径
      selectedKeys: this.selectedKeysMap[this.$route.path], // 当前选中的菜单项
      // this.$route.path 对应当前路由的路径,总是解析为绝对路径
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path], // 当前展开的菜单项
      menuData, // 菜单数据
    };
  },
  methods: {
    /**
     * 获取菜单数据
     * @param routes 路由数据
     * @param parentKeys
     * @param selectedKey
     * @returns {*[]}
     */
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      debugger;
      const menuData = [];
      // 遍历路由数据，筛选出需要展示在侧边栏的菜单数据
      routes.forEach((item) => {
        this.count++;
        console.log("count: " + this.count + ": " + JSON.stringify(item));
        // 1. 如果路由有名称，并且不隐藏菜单（需要挂载到页面上）
        if (item.name && !item.hideInMenu) {
          // 存储可供展开的菜单项，以item.path为key
          this.openKeysMap[item.path] = parentKeys;
          // 存储可供选中的菜单项，以item.path为key
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          // 克隆 item(通过扩展运算符...),对于数组来说，避免了引用修改原数组
          const newItem = { ...item };
          delete newItem.children;
          // 1.1 如果路由有子节点，并且子节点菜单不需要隐藏（需要挂载到页面）
          if (item.children && !item.hideChildrenMenu) {
            // 递归调用方法，获取处理后的路由子节点
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys, // 传入父keys
              item.path, // 传入当前key
            ]);
          } else {
            // 路由没有子节点或者子节点菜单项需要隐藏
            // this.getMenuData(
            //   item.children,
            //   selectedKey ? parentKeys : [...parentKeys, item.path],
            //   selectedKey || item.path
            // );
          }
          // 将处理好的 item 放入菜单数据
          menuData.push(newItem);
        }
        // 如果有路由没有名称，但不需要隐藏，并且存在子路由，且子路由不需要隐藏
        else if (!item.hideInMenu && !item.hideChildrenMenu && item.children) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      });
      return menuData;
    },
  },
};
</script>
<style scoped>
.sider-menu {
  width: 256px;
}
</style>
