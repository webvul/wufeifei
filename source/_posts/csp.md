title: Content Security Policy
date: 2013-06-24 23:11:45
tags:
- safe

---

> CSP主要用来定义页面可以加载哪些资源,可以部分防止跨站脚本等危害.在CSP之前可以使用X-Frame-Options能有效防止ClickJaking(点击劫持)攻击.关于点击劫持以后再讲

####浏览器支持
	Content-Security-Policy
		- Chrome 26+
	X-WebKit-CSP
		- Safari 5.1+
		- Chrome 14-25
	X-Content-Security-Policy
		- Firefox 4+
		- Internet Explorer 10+

Example:

```
Content-Security-Policy: default-src 'self'
```

PHP Example:

```php
header("Content-Security-Policy: script-src 'self'; ");
```

####策略设置
|键|值|描述|
|-|-|-|
|default-src|'self' cdn.wufeifei.com|定义所有资源类型使用默认加载策略|
|script-src|'self' js.wufeifei.com|定义JavaScript加载策略|
|style-src|'self' css.wufeifei.com|定义Style样式加载策略|
|img-src|'self' img.wufeifei.com|定义image图片加载策略|
|content-src|'self'|定义Xhr/Ajax/WebSockets/EventSource等请求的加载策略.不允许的话会出现400|
|font-src|font.wufeifei.com|定义Web Font加载策略|
|object-src|'self'|定义\<object\>/\<embed\>/\<applet\>等标签引入的flash加载策略|
|media-src|media.wufeifei.com|定义\<audio\>/\<video\>等标签引入的多媒体加载策略|
|frame-src|'self'|定义iframe加载策略.有效防止ClickJacking(点击劫持)|
|sandbox|allow-forms|定义请求资源使用sandbox|
|report-uri|/report-uri|定义的策略如果不允许时,将POST一个请求到该地址|

####指令值
|值|说明|
|-|-|
|*|允许任何内容|
|'none'|不允许任何内容|
|'self'|运行同源内容|
|data|运行data:协议(Base64图片)|
|www.wufeifei.com|允许加载指定域|
|\*.wufeifei.com|允许加载子域|
|https://wufeifei.com|允许加载https指定域|
|https:|允许加载https资源|
|'unsafe-inline'|允许加载inline资源|
|'unsafe-eval'|允许动态加载js,如eval()|

####仅报告日志
正式加入生产环境时可以先仅收集不匹配的规则日志,观察一段时间没有问题再上生产环境

```
Content-Security-Policy-Report-Only: script-src 'self'; report-uri http://www.wufeifei.com/csp-report.html
```
加入上述代码后定义的加载策略还是会执行,只不过会POST一个JSON请求到csp-report.html上,格式如下:

```
{"csp-report":{"document-uri":"http://www.mogujie.com/","referrer":"http://www.baidu.com","violated-directive":"script-src 'self'","original-policy":"script-src 'self'; report-uri http://www.wufeifei.com/csp-report.html","blocked-uri":""}}
```

#### 总结
CSP不支持所有浏览器是硬伤,不过开发工作量低,加上也能改善一部分安全,大家浏览器也不断的升级,以后还是一个趋势,推荐加入!