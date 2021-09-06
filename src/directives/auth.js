import { check } from "@/utils/auth";
// 函数式指令 指令式组件控制，vue自定义指令
// 缺点：只有在第一次调用执行，无法控制动态更新
/**
 * 注册
 * @param Vue
 * @param options
 */
function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    },
  });
}

export default { install };
