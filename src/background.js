// global.browser = require('webextension-polyfill')
import store from './store'
import axios from 'axios'


chrome.contextMenus.create({
 title: "Search in TDK",
 contexts:["selection"],  // ContextType
 onclick: function(word, tabs){
    // var query = word.selectionText;
    // axios.get(`http://sozluk.gov.tr/gts?ara=${query}`).then(res =>  {
    //     console.log(res)
    // })
    // var div = document.getElementById('myDivId');
    console.log(div);
    console.log(word, tabs);
 }
});