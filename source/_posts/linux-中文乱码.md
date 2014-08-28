title: linux中文乱码
date: 2011-03-23 00:16:32
tags:
- linux
---
中文文件、文件夹显示为????
```Bash 修改环境变量 ~/.bashrc
export LC_ALL="zh_CN.UTF-8"
```

命令行环境下无法输入中文
```Bash
apt-get install language-pack-zh-hans
```
然后再重启
```Bash
shutdown -r -h now
```
