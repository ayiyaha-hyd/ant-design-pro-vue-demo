<script>
// 函数式组件没有this,此处如何把check给到<template>使用呢
// <template>不能把slot作为根元素，需要提供一个标签，可能会破坏原有样式结构
// 所以使用函数式组件
import { check } from "@/utils/auth";

/**
 * 权限校验组件
 */
export default {
  // 函数式组件
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true,
    },
  },
  render(createElement, context) {
    const { props, scopedSlots } = context;
    //如果有权限则渲染
    return check(props.authority) ? scopedSlots.default() : null;
  },
  name: "Authorized",
};
</script>
