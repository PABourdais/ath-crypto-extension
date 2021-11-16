let cryptoList = ['BTC','ETH', 'ADA', 'EGLD', 'AVAX'];

chrome.alarms.onAlarm.addListener(a => {
  console.log(`cryptoList: ${cryptoList}`, a);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ cryptoList });

  chrome.alarms.get('alarm', a => {
    if (!a) {
      chrome.alarms.create('alarm ', {periodInMinutes: 1});
    }
  });

});