webpackJsonp([1],{84:function(e,n,t){"use strict";function o(){}var i=window.tongji=t(85);window.pay=function(e,n,t,u){return!u&&(u=o),tipon?(i.beginCharge(e,n,Math.floor(n/3),t,"测试通道"),getAjax("pf/default/pay",{orderid:e,money:n},function(n,t){return n?tipon(n.responseText).popup(u):(tipon("测试版，直接完成充值").popup(u),void i.endCharge(e,"测试通道"))})):void u()},window.share=function(){console.log("share")},window.preShareResult=function(e,n,t,o,i){console.log("shareContent",arguments)}},85:function(e,n,t){"use strict";var o=t(86);e.exports=o},86:function(e,n){"use strict";function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(){}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),a=window.TDGA;a||(a={Account:o,onPageLeave:o,onReward:o,onChargeRequest:o,onChargeSuccess:o,onItemPurchase:o,onMissionBegin:o,onMissionCompleted:o,onEvent:o},a.Account.setLevel=o);var r=function(){function e(){t(this,e),this._delayOp=[],this._inited=!0}return u(e,[{key:"init",value:function(e){this._inited=!0}},{key:"_delay",value:function(e){return this._inited?void e():this._delayOp.push({f:e})}},{key:"userin",value:function(e){this._delay(function(){var n=0;if(window.cordova){var t={Android:1,"BlackBerry 10":2,browser:3,iOS:4,WinCE:5,Tizen:6,"Mac OS X":7};n=t[device.platform]||8}else"wechat"==startup_param.pf&&(n=101);a.Account({accountId:e.id,level:e.level,accountName:e.nickname,gameServer:"通用",accountType:n,gender:startup_param.sex})})}},{key:"userout",value:function(){this._delay(a.onPageLeave.bind(a))}},{key:"levelup",value:function(e){this._delay(a.Account.setLevel.bind(a.Account,e))}},{key:"reward",value:function(e,n){this._delay(a.onReward.bind(a,e,n))}},{key:"beginCharge",value:function(e,n,t,o,i){"string"==typeof t&&(i=o,o=t,t=Math.floor(n/3)),this._delay(function(){a.onChargeRequest({orderId:e,iapId:o,currencyAmount:n,currencyType:"CNY",virtualCurrencyAmount:t,paymentType:i})})}},{key:"endCharge",value:function(e,n){this._delay(function(){a.onChargeSuccess({orderId:e,paymentType:n})})}},{key:"enterGame",value:function(e){this._delay(function(){a.onMissionBegin(e.toString())})}},{key:"startGame",value:function(e,n,t){this._delay(function(){a.onItemPurchase({item:n,itemNumber:1,priceInVirtualCurrency:t}),a.onEvent(n,{})})}},{key:"endGame",value:function(e){this._delay(function(){a.onMissionCompleted(e.toString())})}},{key:"share",value:function(){this._delay(function(){a.onEvent("share",{user:{id:me.id,nickname:me.nickname}})})}},{key:"invite",value:function(e,n){this._delay(function(){a.onEvent("invite",{user:{id:me.id,nickname:me.nickname},table:{id:e,msg:n}})})}},{key:"event",value:function(e,n){this._delay(function(){a.onEvent(e,"object"==("undefined"==typeof n?"undefined":i(n))?n:{data:n})})}},{key:"changeToVirtualCurrency",value:function(e,n,t,o){t=t||"金币",o=o||"钻石",this._delay(function(){var i={};i[t]=e,i[o]=n,a.onEvent("buyCoin",i)})}},{key:"consume",value:function(e,n,t){this._delay(function(){a.onItemPurchase(e,n,t)})}}]),e}(),c=new r;window.onunload=c.userout.bind(c),e.exports=c}});