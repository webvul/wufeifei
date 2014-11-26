title: zsh
date: 2012-09-26 23:10:58
tags:
- linux
---
> 每天看着黑白命令行是很枯燥的，适当的可以给自己换换口味

<!-- more -->

#### 安装zsh

```Bash
curl -L http://install.ohmyz.sh | sh
```

#### 更换主题

```
git clone https://github.com/Lokaltog/powerline-fonts
cd powerline-fonts
./install.sh

# 安装完后

vim ~/.zshrc

#修改ZSH_THEME值为agnoster
```

接着再修改iTerm2的配置字体为Menlo 14px

重新打开iTerm2就能看到效果了

![zsh](http://wufeifei.com/img/zsh.png)

[更多主题](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)

当然这只是zsh的一部分功能，其它的就等你去挖掘了
