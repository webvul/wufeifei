title: CSP(Content Security Policy 内容安全策略)
date: 2013-06-24 23:11:45
tags:
- safe

---

> CSP主要用来定义页面可以加载哪些资源（JS/CSS/FONT/IFRAME/XHR/...）,可以有效起到很多安全作用！

<!-- more -->

#### 作用
* 防止运营商劫持（使用script-src限制指定域的JS代码才能运行，避免运营商插入代码）
* 防止XSS攻击（很多XSS攻击会去引用其他站点恶意代码在本站执行）
* 防止点击劫持
* 防止Android WebView UXSS（禁止iFrame嵌套其他站点内容等）
* ...

#### 浏览器支持
	Content-Security-Policy
		- Chrome 26+
	X-WebKit-CSP
		- Safari 5.1+
		- Chrome 14-25
	X-Content-Security-Policy
		- Firefox 4+
		- Internet Explorer 10+

语法例子:

```
Content-Security-Policy: default-src 'self'
```

PHP用法:

```php
header("Content-Security-Policy: script-src 'self' 'unsafe-inline' 'unsafe-eval'; ");
```

#### 策略设置
|键|指令值|描述|
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

#### 指令值
|值|说明|
|-|-|
|*|允许任何内容|
|'none'|不允许任何内容|
|'self'|运行同源内容|
|data|运行data:协议(Base64图片)|
|www.wufeifei.com|允许加载指定域|
|144.144.144.144|允许加载指定IP|
|\*.wufeifei.com|允许加载子域|
|https://wufeifei.com|允许加载https指定域|
|https:|允许加载https资源|
|'unsafe-inline'|允许加载inline资源|
|'unsafe-eval'|允许动态加载js,如eval()|

#### 一.CSP

```
Content-Security-Policy: 策略(script-src/style-src/...) 指令值(除域名/IP外需要加引号，每个值以空格分隔;策略（每个策略以分号分割） 指令值)
```

#### 例子(代码需要加在输出页面内容前):

```php（只允许同源内容、内嵌脚本、动态脚本和Google统计的脚本执行）
header("Content-Security-Policy: script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google-analytics.com; ");
```

```php(只允许同源内容、内嵌脚本、动态脚本和Google字体)
header("Content-Security-Policy: script-src 'self' 'unsafe-inline' 'unsafe-eval'; font-src: 'self' *.google-font.com");
```

#### 二.CSP-REPORT
正式加入生产环境前可以先仅收集一段时间的不匹配规则日志,观察一段时间没有问题再上生产环境。或者仅仅作为监控异常行为来使用也可以！

```
Content-Security-Policy-Report-Only: script-src 'self'; report-uri http://www.wufeifei.com/csp-report.html
```
加入上述代码后定义的加载策略还是会执行,只不过会POST一个Content-Type:的JSON请求到csp-report.html上,格式如下:

```
{"csp-report":{
    "document-uri":"http://wufeifei.com/about",// 触发页面
    "referrer":"http://wufeifei.com", // 触发页面的来源页
    "violated-directive":"script-src 'self'", // 触发规则
    "original-policy":"script-src 'self'; // 原始规则 
    report-uri http://www.wufeifei.com/csp-report.html",// 接收报告地址
    "blocked-uri":"http://www.google-analytics.com", // 触发原因
    "source-file":"http://wufeifei.com/link", // 违反链接
    "line-number":4, // 违反链接行数定位
    "column-number":75, // 违反链接列数定位
    "status-code":200, // 页面状态码
}}
```

服务端接收：

```PHP
$data = file_get_contents("php://input");
error_log($data);
```
#### 总结
CSP不支持所有浏览器是硬伤,不过开发工作量低,加上也能改善一部分安全,尤其是移动端基本上都支持！浏览器也一直在更新,还是一个趋势,强烈推荐加入!

#### 更多
[W3C CSP](http://www.w3.org/TR/CSP11/)
