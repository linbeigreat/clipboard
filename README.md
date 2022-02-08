# 介绍
简单的将数据复制到剪贴板
# 安装

``` shell
npm i @kunping/clipboard --save
```

# 引入

``` js
import clipboard from "@kunping/clipboard"
```

# 例子

## 字符串

``` js
clipboard({data: "copy data"}).then(()=> {
    alert('ok')
  }).catch(() => {
    alert('fail')
  })

// copy data
```

## 数组

``` js
const data = ['hello',"world"]
clipboard({data}).then(()=> {
    alert('ok')
  }).catch(() => {
    alert('fail')
  })
/*
hello
world

*/
```

## 对象

``` js
const data = {
    age: 12,
    name: 'userName'
}
clipboard({data}).then(()=> {
    alert('ok')
  }).catch(() => {
    alert('fail')
  })
/*
age：12
name：userName

*/
```

## 分隔符

默认为`：`

``` js
const data = {
    age: 12,
    name: 'userName'
  }
  clipboard({data, separator: '-'}).then(()=> {
    alert('ok')
  }).catch(() => {
    alert('fail')
  })

/*
age-12
name-userName

*/
```

## 行分隔符

默认为`\n`

``` js
const data = {
    age: 12,
    name: 'userName'
  }
  clipboard({data, rowSeparator: ','}).then(()=> {
    alert('ok')
  }).catch(() => {
    alert('fail')
  })

/*
age：12,name：userName,

*/
```

## 有弹框

当有弹框时，不支持`navigator.clipboard`的浏览器无法复制到剪切板。这时需将当前弹框的`Element`传入

``` js
clipboard({data: "copy data", container: html}).then(()=> {
    alert('ok')
  }).catch(() => {
    alert('fail')
  })

// copy data
```

