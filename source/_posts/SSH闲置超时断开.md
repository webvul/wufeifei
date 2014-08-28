title: SSH闲置超时断开
date: 2012-03-23 11:43:34
tags:
- linux
---
用SSH链接远程服务器时经常遇到长时间不操作的时候SSH链接断开的情况
```Bash
Write failed: Broken pipe
```

解决：
方法一：我们可以在本地客户端增加一个心跳包设置,让其每60秒发一个请求保持链接
```Bash /etc/ssh/ssh_config 增加一行
ServerAliveInterval 60
```

方法一二：我们也可以在服务端设置
```Bash /etc/ssh/ssh_config 增加一行
ClientAliveInterval 60
```
修改完必要忘记重启sshd
```Bash
$ /etc/init.d/sshd restart
```
