// chrome.contextMenus.create({
//    title: "TDK içerisinde ara",
//    contexts: ["selection"],  // ContextType
//    onclick: function (onClickData, tabs) {
//       var query = onClickData.selectionText;
//       chrome.tabs.create({ 'url': chrome.extension.getURL(`popup.html?q=${query}`) }, function (tab) {
//          // Tab opened.
//       });
//    }
// });