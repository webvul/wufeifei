title: js瓷砖
date: 2013-06-23 11:37:55
tags:
- js
---
```javascript JS瓷砖背景 http://dabblet.com/gist/010759ccee339acdd190
for (var line=1; line<60; line++) {
    for(var i=1;i<29;i++) {
        var s = (Math.floor((Math.random()*2)%2)) ? "╱" : "╲";
        document.write(s);
    }
    document.writeln("<br>");
}
```
