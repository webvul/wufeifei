title: 破解Linux密码
date: 2013-03-05 16:08:10
tags:
- safe
---

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
