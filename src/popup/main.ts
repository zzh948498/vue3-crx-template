import { createApp } from 'vue';

// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
// // element
// import zhCn from 'element-plus/es/locale/lang/zh-cn';
// import router from './router';
import Popup from '@/popup/popup.vue';
import '../style.css';

const app = createApp(Popup);
// app.use(ElementPlus, {
//   locale: zhCn,
// });
// app.use(router);
app.mount('#app');
