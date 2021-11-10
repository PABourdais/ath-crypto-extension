let cryptoList = ['BTC','ETH'];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ cryptoList });
  console.log('Default coin is set to BTC and ETH', `cryptoList: ${cryptoList}`);
});