import { createApp } from 'vue';
import ElementPlus from 'element-plus';
// import '@/contentScripts/element-plus.scss';
import 'element-plus/dist/index.css';
// element
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import Content from '@/contentScripts/content.vue';
// 复制组件
import CopyIcon from '@/components/CopyIcon.vue';
import '../style.css';
// (() => {
console.info('[vitesse-webext] Hello world from content script');

// communication example: send previous tab title from background page
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.type === 'tab-prev') console.log(`[vitesse-webext] Navigate from page "${message.data.title}"`);
});

// mount component to context window
const container = document.createElement('div');
container.id = __NAME__;
export const root = document.createElement('div');
root.style.position = 'relative';
root.style.zIndex = `99999999`;
root.id = `${__NAME__}-app`;
const styleEl = document.createElement('link');
// const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container;
const shadowDOM = container.attachShadow?.({ mode: 'open' }) || container;
// const shadowDOM = container;
styleEl.setAttribute('rel', 'stylesheet');
styleEl.setAttribute('href', chrome.runtime.getURL('dist/contentScripts/style.css'));
shadowDOM.appendChild(styleEl);
shadowDOM.appendChild(root);
document.body.appendChild(container);
const app = createApp(Content);
app.component('CopyIcon', CopyIcon);
// 集成Element Plus
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount(root);
// })();
