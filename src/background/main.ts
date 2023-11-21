// only on dev mode
// import { postFspiderGoodsGoodInfo } from '@/api/gassApi/controller';
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
  // load latest content script
  import('./contentScriptHMR');
}

chrome.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed');
});

let previousTabId = 0;

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
chrome.tabs.onActivated.addListener(({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId;
    return;
  }

  chrome.tabs.get(previousTabId, tab => {
    if (chrome.runtime.lastError) return;

    previousTabId = tabId;

    // eslint-disable-next-line no-console
    console.log('previous tab', tab);
    chrome.tabs.sendMessage(tabId, { title: tab.title }, { frameId: 0 });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('onMessage');
  // 采集
  // if (request.type === 'shopeeGather') {
  //   postFspiderGoodsGoodInfo(request.content)
  //     .then(data => sendResponse(data))
  //     .catch(e => sendResponse(e));

  //   return true;
  // }
  // if (message === 'get-current-tab') {
  //   chrome.tabs.get(previousTabId, tab => {
  //     if (chrome.runtime.lastError) {
  //       sendResponse({ title: undefined });
  //       return;
  //     }

  //     sendResponse({ title: tab?.title });
  //   });

  //   return true;
  // }
});
