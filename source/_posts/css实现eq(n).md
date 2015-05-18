title: CSS实现eq(n)
date: 2014-03-19 11:51:24
tags:
- CSS
---

在某些特殊情况下，我们需要用纯CSS实现jQuery的eq(n)选择器，而CSS没有直接提供类似方法。

<!-- more -->

我们可以通过CSS的:nth-child。

```html
<div>
    <div id="bar1" class="foo"></div>
    <div id="bar2" class="foo"></div>
    <div id="bar3" class="foo"></div>
</div>
```

.foo:nth-child(2)会选中#bar2

同时也支持奇偶操作:nth-child(odd)和偶数选择器
