webpackJsonp([3,1,4],{79:function(e,n){"use strict";startup_param.showRecharge=!1},82:function(e,n,t){"use strict";var o=t(83);e.exports=o},83:function(e,n){"use strict";function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(){}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),a=window.TDGA;a||(a={Account:o,onPageLeave:o,onReward:o,onChargeRequest:o,onChargeSuccess:o,onItemPurchase:o,onMissionBegin:o,onMissionCompleted:o,onEvent:o},a.Account.setLevel=o);var u=function(){function e(){t(this,e),this._delayOp=[],this._inited=!0}return r(e,[{key:"init",value:function(e){this._inited=!0}},{key:"_delay",value:function(e){return this._inited?void e():this._delayOp.push({f:e})}},{key:"userin",value:function(e){this._delay(function(){var n=0;if(window.cordova){var t={Android:1,"BlackBerry 10":2,browser:3,iOS:4,WinCE:5,Tizen:6,"Mac OS X":7};n=t[device.platform]||8}else"wechat"==startup_param.pf&&(n=101);a.Account({accountId:e.id,level:e.level,accountName:e.nickname,gameServer:"通用",accountType:n,gender:startup_param.sex})})}},{key:"userout",value:function(){this._delay(a.onPageLeave.bind(a))}},{key:"levelup",value:function(e){this._delay(a.Account.setLevel.bind(a.Account,e))}},{key:"reward",value:function(e,n){this._delay(a.onReward.bind(a,e,n))}},{key:"beginCharge",value:function(e,n,t,o,i){"string"==typeof t&&(i=o,o=t,t=Math.floor(n/3)),this._delay(function(){a.onChargeRequest({orderId:e,iapId:o,currencyAmount:n,currencyType:"CNY",virtualCurrencyAmount:t,paymentType:i})})}},{key:"endCharge",value:function(e,n){this._delay(function(){a.onChargeSuccess({orderId:e,paymentType:n})})}},{key:"enterGame",value:function(e){this._delay(function(){a.onMissionBegin(e.toString())})}},{key:"startGame",value:function(e,n,t){this._delay(function(){a.onItemPurchase({item:n,itemNumber:1,priceInVirtualCurrency:t}),a.onEvent(n,{})})}},{key:"endGame",value:function(e){this._delay(function(){a.onMissionCompleted(e.toString())})}},{key:"share",value:function(){this._delay(function(){a.onEvent("share",{user:{id:me.id,nickname:me.nickname}})})}},{key:"invite",value:function(e,n){this._delay(function(){a.onEvent("invite",{user:{id:me.id,nickname:me.nickname},table:{id:e,msg:n}})})}},{key:"event",value:function(e,n){this._delay(function(){a.onEvent(e,"object"==("undefined"==typeof n?"undefined":i(n))?n:{data:n})})}},{key:"changeToVirtualCurrency",value:function(e,n,t,o){t=t||"金币",o=o||"钻石",this._delay(function(){var i={};i[t]=e,i[o]=n,a.onEvent("buyCoin",i)})}},{key:"consume",value:function(e,n,t){this._delay(function(){a.onItemPurchase(e,n,t)})}}]),e}(),c=new u;window.onunload=c.userout.bind(c),e.exports=c},85:function(e,n,t){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=(window.tongji=t(82),t(19));i._noop;switch(device.platform){case"iOS":devicepf=t(86);break;case"android":devicepf=t(79);break;default:window.pay=function(e,n,t,o){!o&&(o=_noop),tipon&&tipon(device.platfomr+"未实现").popup(),o("not impl")},window.share=function(){tipon&&tipon(device.platfomr+"未实现").popup()},window.preShareResult=function(e,n,t,o,i){tipon&&tipon(device.platfomr+"未实现").popup()}}document.addEventListener("pause",function(){Laya&&(Laya.SoundManager.muted=!0)},!1),document.addEventListener("resume",function(){Laya&&(Laya.SoundManager.muted=!1)},!1),e.exports={onload:function(){devicepf&&"object"==("undefined"==typeof devicepf?"undefined":o(devicepf))&&devicepf.onload&&devicepf.onload()}}},86:function(e,n,t){"use strict";function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function i(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function r(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var a=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),u=function e(n,t,o){null===n&&(n=Function.prototype);var i=Object.getOwnPropertyDescriptor(n,t);if(void 0===i){var r=Object.getPrototypeOf(n);return null===r?void 0:e(r,t,o)}if("value"in i)return i.value;var a=i.get;if(void 0!==a)return a.call(o)};startup_param.showRecharge=!0;var c=t(18);if(window.store){var l=function(e,n,t,o){tongji.beginCharge(e,p[e].actureMoney,p[e].actureCoins,t,"苹果商店支付"),store.order(e)},p={low:{bundle:"com.1357g.niuniu.5tickets"},middle:{bundle:"com.bjl2000.bacc.middleprice"},high:{bundle:"com.bjl2000.bacc.highprice"}};for(var d in p)store.register({id:p[d].bundle,alias:d,type:store.CONSUMABLE}),store.when(d).updated(function(e){console.log(d,"price",e.price),p[d]=c(p[d],e),"invalid"!=e.state&&(p[d].actureMoney=Number(e.price.substr(1)),p[d].actureCoins=e.description.substr(e.description.indexOf("=")+1))}).approved(function(e){e.verify()}).verified(function(e){if(console.log("finally",e),!appleOrderid)return appleOrderCb&&appleOrderCb("appleOrderid was not set");var n={actureMoney:p[d].actureMoney,orderid:appleOrderid,receipt:e.transaction.appStoreReceipt};getAjax("/pf/apple/pay",n,function(n,t){n=n||t.err,n?(console.log(n,t),tipon(n).popup()):tipon("购买成功").popup(),e.finish(),tongji.endCharge(appleOrderid,"苹果商店支付");var o=appleOrderCb;appleOrderCb=null,o&&o()})}).cancelled(function(e){var n=appleOrderCb;appleOrderCb=null,n&&n()});store.validator=function(e,n){console.log("verify",e),n(!0)},store.error(function(e){console.log(e)}),store.refresh();var f=async.queue(function(e,n){"function"==typeof e?e(n):n()});window.pay=function(e,n,t,o){!o&&(o=_noop),f.push(l.bind(null,e,n,t),o)},document.addEventListener("gameLoaded",function(){var e=t(87),n=function(e){function n(){return o(this,n),i(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,"recharge"))}return r(n,e),a(n,[{key:"onInit",value:function(){u(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"onInit",this).call(this);var e=this.contentPane.getChild("n87"),t=0,o=function(n){r=e.getChildAt(t),p[n].price&&(r.getChild("n85").text=p[n].price),r.onClick(null,function(){getAjax("createOrder",{productId:p[n].bundle},function(e,t){pay(p[n].bundle)})}),e.addChild(r)};for(var i in p){var r;o(i)}}}]),n}(e.Win);e.RechargeWin=n})}else alert("cc.fovea.cordova.purchase not installed")}});