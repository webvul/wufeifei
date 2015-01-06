title: Mysql安全基线
date: 2014-06-02 22:53:16
tags:

- security

---

> Mysql安全基线

<!-- more -->


|NO.1|增强root帐户密码登陆、删除空密码|
|-|-|
|原因|一、简单密码容易暴力破解<br>二、mysql默认是空密码|
|解决|一、增强密码强度<br>- 22位以上<br>- 同时包含大写字母、小写字母、数字、特殊字符<br>- 密码不重复使用 <br> - 密码定期更换（60天、90天）<br> 二、给空密码帐号加上密码<br>mysqladmin -u root password "newpassword" <br> mysql> use mysql; <br> mysql> update user set password=password('newpassword') where user='root';<br> mysql> flush privileges; # 刷新权限|

|NO.2|删除默认数据和帐户|
|-|-|
|原因|Mysql默认会有空用户和test库|
|解决|删除test库和除root外帐户再按照业务需求添加<br>mysql> drop database test;<br>mysql> delete from user where not (user='root');|

|NO.3|更改root帐户名称|
|-|-|
|原因|Mysql管理员帐号默认名称为root，存在被爆破的风险|
|解决|更改root帐户名称以增大爆破成本<br>mysql> update user set user='newrootname' where user='root';<br>mysql> flush privileges;|

|NO.4|限制用户的连接数|
|-|-|
|原因|同个用户可以多个远程链接，会导致性能下降|
|解决|# 修改my.cnf中max_user_connections<br>vim /etc/my.cnf <br> max_user_connections 150|

|NO.5|目录权限限制|
|-|-|
|原因|mysql默认安装在/usr/local/mysql下，数据库文件在/usr/local/mysql/var下，权限不正确会导致数据存在被COPY走的风险|
|解决|# 修改目录所有者 <br> chown -R root /usr/local/mysql<br>chown -R mysql.mysql /usr/local/mysql/var/|

|NO.6|历史命令泄漏|
|-|-|
|原因|linux的历史命令可能会泄漏mysql的帐号密码等信息|
|解决|# 限制历史命令记录为一个较小的数 <br> vim ~/.bash_profile <br> HISTSIZE=3 <br> HISTFLESIZE=3<br># 限制不记录某些命令 <br> export HISTCONTROL=ignorespace # 你在执行任何命令前只需要加一个空格就不会记录 <br># 定时清除历史命令 <br> history -c|

|NO.7|限制访问数据的IP|
|-|-|
|原因|不要使用%来设置来源IP，指定精确的来源IP限制|
|解决|grant selete on database.table to 'app'@'xx.xx.xx.xx' identified by 'password' with grant option;<br>flush privileges;|
