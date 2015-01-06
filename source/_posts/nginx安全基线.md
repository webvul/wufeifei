title: 安全基线[Nginx]
date: 2014-06-05 21:23:45
tags:

- security

---

> Nginx安全基线

<!-- more -->


|NO.1|禁止某些文件类型的访问|
|-|-|
|原因|某些文件不小心传如web目录后存在很大风险|
|解决|location *\.(txt|doc|docx|rar|zip)$ <br> root /var/www/www.xxx.xxx;<br>Deny all;<br>}|

|NO.2|禁止访问某目录|
|-|-|
|原因|一些敏感目录禁止直接访问|
|解决|location ^/(web-inf)/{ <br> Deny all; <br> }|

|NO.3|禁止某个IP或网段访问|
|-|-|
|原因|限制某些恶意用户的IP或网段|
|解决|location /{<br>Deny xxx.xxx.xxx.xxx;<br>Allow xxx.xxx.xxx.0/24;<br>Deny all;<br>}|

|NO.4|修改Nginx名称和版本号|
|-|-|
|原因|防止恶意者收集服务器信息|
|解决|vim src/http/ngx_http_header_fileter_module.c<br>Staticchar ngx_http_server_string[]="Server: Feei";<br>Staticchar ngx_http_server_full_string[]='Server: Feei'|

|NO.5|单用户并发链接限制|
|-|-|
|原因|限制单个用户IP不能同时请求超过50个链接|
|解决|limit_conn slimits 50;|

|NO.6|限制可用方法|
|-|-|
|原因|如果应用只用到GET/POST/HEAD，则禁止其他方法|
|解决|if($request_method !^(GET|HEAD|POST)$){<br>return 444;<br>}|

|NO.7|组织用户代理|
|-|-|
|原因|阻止用户代理访问、扫描器、机器人、垃圾邮件等|
|解决|if($http_user_agent * LWP::Simple|BBBike|wget){ <br> return 403; <br> }<br>if($http_user_agent * msnbot|scrapbot){ <br> return 403; <br> } <br> if($http_referer * (babes|forsale|girl|jewelry|love|nudit|organic|poker|porn|sex|teen)){<br>return 403;<br>}|

|NO.8|禁止其他网站引用本站图片|
|-|-|
|原因|如果其他网站应用本站图片将消耗本站资源|
|解决|location /images/{<br>valid_reerers none blocked www.xxx.com xxx.com;<br>if($invalid_referer){<br>return 403;<br>}<br>}<br># 替换图片<br> if($invalid_referer){<br> rewrite ^/images/uploads.*\.(gif|jpg|jpeg|png|bmp)$<br>http://www.xxx.xxx/noimp.png last<br>}|