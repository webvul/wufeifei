title: HttpOnly
date: 2013-03-20 01:23:13
tags:

- security

---
	HttpOnly是设置在浏览器中,使JavaScript无法获取Cookie数据,有效减少XSS危害
	
<!-- more -->

#### 浏览器支持
	2011年已超过99%浏览器支持HttpOnly

#### 设置方法

```php
ini_set( 'session.cookie_httponly', 1  );
```

```php
header( "Set-Cookie: name=value; httpOnly"  );
```

或者

```php
setcookie('cookieName','cookieValue',3600,'/',false,TRUE);
```

#### 总结
	HttpOnly设置只需要增加一行代码即可有效的阻挡XSS等危害,建议大家马上使用起来提升网站安全!
