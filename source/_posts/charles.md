title: Charles花瓶调试HTTPS网页
date: 2012-04-13 21:06:10
tags:
- safe

---

> Charles是Mac下最方便的APP截包工具，调试HTTPS页面也非常方便。

<!-- more -->

* 打开Safari输入 http://wufeifei.com/file/charles.crt 下载Charles证书安装

* 在Charles的工具栏上点击设置按钮，选择Proxy Settings,切换到SSL选项卡，选中Enable SSL Proxying

* SSL选项卡的Locations表单填写要抓包的域名和端口，点击Add按钮，在弹出的表单中Host填写域名要代理的域名、Port填443
