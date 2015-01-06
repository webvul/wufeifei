title: Linux命令行下翻译工具
date: 2014-12-09 23:10:32
tags:
- linux
---

> 经常在Linux下开发会遇到一些单词需要不切换桌面就想知道解释，于是看了下往上几乎没有好用的命令行下的翻译工具。于是自己就用花了几十分钟使用有道翻译的API写的一个小工具！

<!-- more -->

#### 安装

```
wget https://raw.githubusercontent.com/wufeifei/dict/master/dict.py
sudo mv ./dict.py /usr/bin/dict
sudo chmod +x /usr/bin/dict
```

#### 使用

```
$ dict test
###################################
#  test 测试 (U: tɛst E: test )
#  n. 试验；检验
#  vt. 试验；测试
#  vi. 试验；测试
#  n. (Test)人名；(英)特斯特
###################################
```

#### 小提示
很多时候是在vim或者man下查看文档代码之类，这时候可以使用! dict test 来实现不退出vim、man即可翻译
