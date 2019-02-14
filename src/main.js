import Vue from "vue";
import ECharts from "vue-echarts/components/ECharts.vue"
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import "echarts/lib/component/markLine"
import "echarts/lib/component/markPoint"
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router"
import "@/assets/style/reset.css"
import store from './store'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component("v-chart", ECharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
