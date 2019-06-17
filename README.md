# SearchTree 搜索树组件

[![](https://img.shields.io/badge/npm-0.0.1-orange.svg)](https://www.npmjs.com/package/search-filter-tree)

### 何时使用

当子节点内容较多需要搜索并高亮展示时，使用搜索树可快速找到目标节点。

### 安装

```shell
npm install search-filter-tree --save
```
或
```shell
yarn add search-filter-tree
```

### 在代码中使用
```jsx
import React from "react";
import SearchTree from "search-filter-tree";

const App = () => {
  return (
    <SearchTree
      placeholder="输入节点名称"
      checkable={true}
      dataSource={mock()}
      onCheck={(keys, key, checked) => console.log(keys, key, checked)}
    />
  );
};

function mock() {
  return [
    {
      key: "global",
      title: "global",
      children: []
    },
    {
      key: "dx",
      title: "电信",
      children: [
        {
          key: "dx-huadong",
          title: "电信-华东"
        },
        {
          key: "dx-xian",
          title: "电信-西安"
        },
        {
          key: "dx-huanan",
          title: "电信-华南"
        }
      ]
    }
  ];
}

ReactDOM.render(<App />, mountNode);
```

### API

| 参数 | 是否必填 | 说明 | 类型 | 默认值 |
| --------   | ----------| ------- | ------- | ------- |
| dataSource   | 必填     | 数据源      |   array    | - |
| placeholder    | 非必填|   搜索框提示的文本    |   string    | "Search" |
| parentCheckedAble | 非必填 | 父节点是否可选择 | bool | false |
| parentNodeHide | 非必填 | 过滤节点时父节点是否隐藏 | bool | false | 
| childNodeHide | 非必填 | 过滤节点时子节点是否隐藏 | bool | true |

## 数据源dataSource格式
```js
// 每个节点key值必须唯一
[
  {
    key:"1",
    title:"1",
    children:[
      {
        key:"1-1",
        title:"1-1"
      }
    ]
  }
]
```

 ## 注意
 1. react版本尽量在`16.8.0`之后，否则可能出现未知的问题。
 2. onCheck事件与Tree组件返回的结果不同，返回的参数为：
 
    | 参数 | 说明 | 
    | :---| :--- |
    | keys | 已选择的全部树节点 |
    | key | 选择的树节点key | 
    | checked | 选中或取消选中 |


 


