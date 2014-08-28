title: npm install error
date: 2012-03-22 23:39:26
tags:
- node
---
npm安装包失败
```Bash
npm http GET https://registry.npmjs.org/socket.io
npm ERR! Error: failed to fetch from registry: socket.io
```

问题是HTTPS访问失败，设置为HTTP访问即可解决:
    ```Bash
    npm config set registry http://registry.npmjs.org/
    ```

老版本ubuntu server node(0.6) 无法更新
```Bash
apt-get install python-software-properties
apt-add-repository ppa:chris-lea/node.js
apt-get update
apt-get install nodejs
```
