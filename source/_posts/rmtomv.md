title: rmtomv
date: 2013-07-21 23:27:49
tags:
- safe
- linux

---

> Linux下是不存在回收站的概念，如果文件被误删了就后悔不及了。通过alias命令将rm映射为mv建立一个虚拟回收站

<!-- more -->

先建立一个回收站文件夹

```Bash
# mkdir ~/.Trash
```

建立脚本

```Bash
# vim /usr/bin/rmtomv
```

写入以下内容

```Bash
#!/bin/sh

if [ $# -eq 0 ]; then
        echo "usage: rmtomv <files...>" >&2
        exit 2;
fi

for file in "$@"; do
        destfile="`basename \"$file\"`"
        suffix='';
        i=0;

        # 如果文件已经存在则加上后缀
        while [ -e "$HOME/.Trash/${destfile}${suffix}" ]; do
                suffix=" - copy $i";
                i=`expr $i + 1`
        done
        
        # 如果下执行命令完不显示信息去掉-v参数
        mv -vi "$file" "$HOME/.Trash/${destfile}${suffix}"
done
```

最后写入alias

```Bash
# vim ~/.bash_aliases 或者 ~/.bashrc里添加一行
alias rm='rmtomv'
```

测试

```Bash
# touch a
# rm a
```

最终将会在~/.Trash/目录下看到被删除的文件
