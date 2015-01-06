title: 深入SSH
date: 2013-12-26 22:10:58
tags:
- linux
---

> SSH的密码和公私钥认证方式是最常用的，但是它还有两种用法也值得一试。这里总结下四种方式的优缺点来帮助我们大家选择！

<!-- more -->

#### 密码授权

使用SSH进行密码登陆授权的话就相当于是一个有加密功能的Telnet

|ID|说明|图例|
|-|-|-|
|1|homepc通过22端口创建一个TCP远程server链接，发送用户名|![1](http://www.unixwiz.net/images/sshpass1.gif)|
|2|server端ssh收到用户名后要求输入密码|![2](http://www.unixwiz.net/images/sshpass2.gif)|
|3|homepc的ssh收到server端sshd的需要密码响应后提示用户输入密码|![3](http://www.unixwiz.net/images/sshpass3.gif)|
|4|如果密码正确链接就会建立|![4](http://www.unixwiz.net/images/sshpass4.gif)|

|优缺点|说明|
|-|-|
|优点|容易设置|
|缺点|会有暴力破解的风险|
|缺点|每一次都要输密码|

#### 公钥授权

SSH支持公钥授权方式，用户可以在homepc上创建一对公钥和私钥，然后将公钥追加到目标server的$HOME/.ssh/authorized_keys里！公钥可以公开，保存好本地的私钥就行！

|ID|说明|图例|
|-|-|-|
|1|本地ssh发送用户名和密钥授权的请求到server端|![1](http://www.unixwiz.net/images/sshkey1.gif)|
|2|server端接到密钥授权请求后会去查看authorized_keys文件，然后构造一个基于公钥的询问|![2](http://www.unixwiz.net/images/sshkey2.gif)|
|3|homepc的ssh客户端收到询问后会去查看id_rsa私钥文件，需要输入密码解锁私钥|![3](http://www.unixwiz.net/images/sshkey3.gif)|
|4|homepc的ssh端会拿着私钥构建一个响应发给server端（不会发私钥本身）|![4](http://www.unixwiz.net/images/sshkey4.gif)|
|5|server端sshd验证homepc端发来的请求，验证成功即可登陆|![5](http://www.unixwiz.net/images/sshkey5.gif)|

|优缺点|说明|
|-|-|
|优点|无法暴力破解|
|优点|一个私钥可以登陆N个Server|
|缺点|需要一次配置|
|缺点|需要单独去除授权关系|

#### 公钥配合代理（Agent）

上面使用的公钥实际上就是每次都用私钥去验证，可以理解为类似密码授权，只不过每次密码都一样！而配合Agent来使用就会方便很多，只要电脑不关机每次只需要输入一次密码，以后都可以链接！

|ID|说明|图例|
|-|-|-|
|1|使用username+key方式请求|![1](http://www.unixwiz.net/images/sshagent1.gif)|
|2|server端sshd会去查看authorized_keys文件，构造一个基于密钥的询问给客户端|![2](http://www.unixwiz.net/images/sshagent2.gif)|
|3|客户端接到询问后转发给agent,agent再去打开私钥然后提示输入密码|![3](http://www.unixwiz.net/images/sshagent3.gif)|
|4|agent基于私钥构造一个返回值给ssh，ssh再发送给server端的sshd|![4](http://www.unixwiz.net/images/sshagent4.gif)|
|5|验证成功即可授权登陆(此时客户端的agent所构造的内容还在内存里)|![5](http://www.unixwiz.net/images/sshagent5.gif)|

|优缺点|说明|
|-|-|
|优点|解锁只需要一次了|
|优点|可以操作多个系统|
|缺点|设置Agent|
|缺点|如果登陆server2则需要提供远程客户端私钥|

#### 公钥配合代理转发（Agent Forwarding）

简单的说就是你登陆任何机器只需要一次解锁

|ID|说明|图例|
|-|-|-|
|1|假设现在已经通过Agent链接了一台server,在server1上是无法直接登入server2的|![1](http://www.unixwiz.net/images/sshfwd1.gif)|
|2|在server1上ssh使用username+key请求登入server2|![2](http://www.unixwiz.net/images/sshfwd2.gif)|
|3|server2的sshd读取authorized_keys文件，构造一个询问响应返回给server1的ssh|![2](http://www.unixwiz.net/images/sshfwd3.gif)|
|4|server1的ssh接到询问响应后会转发给server1的sshd，sshd会再转发给homepc的ssh，继而到了agent|![4](http://www.unixwiz.net/images/sshfwd4.gif)|
|5|agent收到询问后会将内存里基于私钥构造的值发送给server的sshd，sshd再转给ssh，ssh再登入server2的sshd|![5](http://www.unixwiz.net/images/sshfwd5.gif)|
|6|server2的sshd验证后即可登入|![6](http://www.unixwiz.net/images/sshfwd6.gif)|

|优缺点|说明|
|-|-|
|优点|非常便利|
|缺点|需要在所有目标server上安装公钥|

#### 响应询问

通过上面可以观察到响应询问是很重要的一部，我们可以再梳理下它的工作流程！

服务端：
本地ssh使用密钥授权方式，给远程server发送了username，远程服务器会在authorized_keys文件中定位这个username对应的公钥，接着拿着这个公钥和一个大随机数加密生成一个字符串返回给客户端

![0](http://www.unixwiz.net/images/ssh-key-challenge.gif)


客户端：
Agent读取本地私钥后和远程过来的响应询问解密出一个询问字符串和一个session ID，然后再将这两个值MD5下发送出去.

![1](http://www.unixwiz.net/images/ssh-key-challenge.gif)

#### Agent安全问题

虽然客户端的私钥不会被发送到远程server上，但是避免不了代理劫持(agent hijacking)的问题

agent必须为每一个ssh提供一个代理服务，在linux中是使用socket储存在/tmp/目录下，类似这样：/tmp/ssh-XXXXXXX/agent.XXXX

由于是存成文件形式，所以客户端机器上的用户可以操作这个文件，也就是说只要拿到这个文件就能劫持所有服务器的权限了。目前没有什么好的方法解决这个问题！
