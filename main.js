// ==UserScript==
// @name         PK - remind
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://live.bilibili.com/22235072
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
const chromeVersion = /Chrome\/([0-9.]+)/
  .exec(window?.navigator?.userAgent)?.[1]
  ?.split('.')[0];

if (chromeVersion && parseInt(chromeVersion, 10) >= 88) {//解决最小化到后台时定时器被限制的问题
  const videoDom = document.createElement('video');
  const hiddenCanvas = document.createElement('canvas');

  videoDom.setAttribute('style', 'display:none');
  videoDom.setAttribute('muted', '');
  videoDom.muted = true;
  videoDom.setAttribute('autoplay', '');
  videoDom.autoplay = true;
  videoDom.setAttribute('playsinline', '');
  hiddenCanvas.setAttribute('style', 'display:none');
  hiddenCanvas.setAttribute('width', '1');
  hiddenCanvas.setAttribute('height', '1');
  hiddenCanvas.getContext('2d')?.fillRect(0, 0, 1, 1);
  videoDom.srcObject = hiddenCanvas?.captureStream();
}
    // Your code here...
    function getNotification(){//获取弹窗权限函数
        Notification.requestPermission().then(permission => {
            switch (permission) {
                case 'default':
                    //alert('用户关闭了授权');
                    break;
                case 'granted':
                    //alert('用户同意授权')
                    break;
                case 'denied':
                    //alert('用户还是拒绝了该网站消息通知');
                    break;
            }
        });
    }
    //检测并获取弹窗权限
    if (window.Notification) {
    switch (Notification.permission) {
        case 'default':
            //alert('用户暂未开启该网站消息通知');
            getNotification();
            break;
        case 'granted':
            //alert('用户已开启该网站消息通知');
            break;
        case 'denied':
            //alert('用户拒绝该网站消息通知');
            getNotification();
            break;
    }
    } else {
        alert('暂不支持消息通知');
    }

    //var flag=0;设置标识，尝试避免短时间内发送太多次，不过暂时不需要

setInterval(function(){//启动定时器，每1秒检测一次PK状态
    var pk_time = document.getElementsByClassName("pk-info-display-board-timer")[0].textContent.replace(/[ ]|[\r\n]/g,"");//取PK剩余秒数
    console.log(pk_time);
    var pk_js = document.getElementsByClassName("pk-info-display-board-pk-icon final-hit-icon")[0];//取是否绝杀时刻"pk-info-display-board-pk-icon final-hit-icon"
    if(pk_js == null){
        if(pk_time !== null && pk_time == "20s"){
            console.log("尝试发送消息弹窗");
            const title = document.getElementsByClassName("room-owner-username live-skin-normal-a-text dp-i-block v-middle pointer")[0].textContent + ' PK还有20秒结束';
            var img = document.getElementsByClassName("blive-avatar-face")[0].style.backgroundImage;
            var url = window.location.href;
            const options = {
                body: '点击前往直播间',
                dir: 'auto',
                icon: img.substring(img.indexOf('"')+1,img.indexOf('")'))
            };
            const notification = new Notification(title, options);
            notification.onclick = e => {
                window.open(url);
            }
		}
        }
        //flag = 1;
},1000);
})();