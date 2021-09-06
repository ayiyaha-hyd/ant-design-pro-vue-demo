<template>
  <div ref="chartDom" style="height: 400px" />
</template>

<script>
import echarts from "echarts";
import debounce from "lodash.debounce";
import { addListener, removeListener } from "resize-detector";

export default {
  name: "Chart",
  created() {
    // 函数防抖
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(this.$refs.chartDom);
    // 通过this.myChart替代var myChart实现能够在方法函数中调用到该对象
    this.myChart = echarts.init(this.$refs.chartDom);
    // 通过listener监听，在元素组件合适的时候初始化,不处理的话，图标尺寸有问题
    addListener(this.$refs.chartDom, this.resize);
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option);
  },
  beforeDestroy() {
    // 组件销毁的时候，移除掉事件监听
    removeListener(this.$refs.chartDom, this.resize);
    // 销毁 echarts 实例，防止内存泄露
    // ** 调用第三方库的时候，特别需要注意的点儿 **
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.myChart.resize();
    },
  },
};
</script>

<style scoped></style>
